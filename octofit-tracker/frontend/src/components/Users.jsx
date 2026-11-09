import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  return (
    <CollectionPage
      columns={[
        { key: 'name', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'age', label: 'Age' },
        { key: 'fitnessGoal', label: 'Fitness goal' },
        { key: 'team', label: 'Team' },
      ]}
      description="Get to know the people in your fitness community."
      endpoint={endpoint}
      resource="users"
      title="Users"
    />
  )
}

export default Users
