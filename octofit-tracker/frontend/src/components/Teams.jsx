import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  return (
    <CollectionPage
      columns={[
        { key: 'name', label: 'Team' },
        { key: 'description', label: 'About' },
        { key: 'members', label: 'Members' },
        { key: 'challengePoints', label: 'Challenge points' },
      ]}
      description="Meet the teams building healthy habits together."
      endpoint={endpoint}
      resource="teams"
      title="Teams"
    />
  )
}

export default Teams
