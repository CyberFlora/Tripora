import { Button, Container, Eyebrow } from '../components/common'
import { useServiceData } from '../hooks/useServiceData'
import { getCurrentUser } from '../services/authService'

export function ProfilePage() {
  const user = useServiceData(getCurrentUser, null)

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <Eyebrow>Account</Eyebrow>
        <h1 className="mt-4 font-serif text-4xl text-cream sm:text-5xl">
          {user?.displayName ?? 'Traveler'}
        </h1>
        <p className="mt-4 text-muted">{user?.email}</p>
        <p className="mt-6 max-w-xl text-sm text-muted">
          Profile is a placeholder until authentication is connected. The
          auth service is the only place that needs to change.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/my-trips">My Trips</Button>
          <Button to="/plan" variant="secondary">
            Plan My Trip
          </Button>
        </div>
      </Container>
    </div>
  )
}
