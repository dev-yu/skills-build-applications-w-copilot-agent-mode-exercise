import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  return (
    <CollectionPage
      columns={[
        { key: 'name', label: 'Workout' },
        { key: 'type', label: 'Type' },
        { key: 'description', label: 'Description' },
        { key: 'durationMinutes', label: 'Duration (min)' },
        { key: 'difficulty', label: 'Difficulty' },
        { key: 'targetGoal', label: 'Goal' },
      ]}
      description="Find a workout that fits your goals and experience."
      endpoint={endpoint}
      resource="workouts"
      title="Workouts"
    />
  )
}

export default Workouts
