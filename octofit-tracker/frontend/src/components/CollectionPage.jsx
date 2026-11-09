import { useEffect, useState } from 'react'
import { getRecords } from '../lib/api.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.map(formatValue).join(', ')
  }

  if (typeof value === 'object') {
    return value.name ?? value._id ?? JSON.stringify(value)
  }

  return String(value)
}

function CollectionPage({ title, description, resource, endpoint, columns }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadRecords() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`)
        }

        const payload = await response.json()
        setRecords(getRecords(payload))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError(requestError.message || 'Unable to load records.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadRecords()
    return () => controller.abort()
  }, [endpoint, resource, reloadKey])

  return (
    <section aria-labelledby={`${resource}-heading`}>
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-3">
        <div>
          <h2 className="h4 mb-1" id={`${resource}-heading`}>{title}</h2>
          <p className="text-secondary mb-0">{description}</p>
        </div>
        <button
          className="btn btn-outline-primary btn-sm"
          disabled={loading}
          onClick={() => setReloadKey((key) => key + 1)}
          type="button"
        >
          Refresh
        </button>
      </div>

      {loading && <p className="alert alert-info" role="status">Loading {title.toLowerCase()}…</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          <p className="mb-2">Could not load {title.toLowerCase()}: {error}</p>
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => setReloadKey((key) => key + 1)}
            type="button"
          >
            Try again
          </button>
        </div>
      )}
      {!loading && !error && records.length === 0 && (
        <p className="alert alert-secondary">No {title.toLowerCase()} found.</p>
      )}
      {!loading && !error && records.length > 0 && (
        <div className="table-responsive collection-table">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? `${resource}-${index}`}>
                  {columns.map((column) => (
                    <td key={column.key}>{formatValue(record[column.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default CollectionPage
