import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  return (
    <CollectionPage
      columns={[
        { key: 'type', label: 'Activity' },
        { key: 'user', label: 'User' },
        { key: 'durationMinutes', label: 'Duration (min)' },
        { key: 'distanceKm', label: 'Distance (km)' },
        { key: 'calories', label: 'Calories' },
        { key: 'completedAt', label: 'Completed' },
      ]}
      description="Recent workouts and movement logged by your community."
      endpoint={endpoint}
      resource="activities"
      title="Activities"
    />
  )
}

export default Activities
