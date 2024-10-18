import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Home() {
  const { data: session } = useSession()
  const [levels, setLevels] = useState([])

  useEffect(() => {
    if (session) {
      console.log('Session active, fetching levels')
      axios.get('/api/levels')
        .then((response) => {
          console.log('Levels fetched:', response.data.length)
          setLevels(response.data)
        })
        .catch((error) => {
          console.error('Failed to fetch levels:', error)
        })
    }
  }, [session])

  if (!session) {
    console.log('No active session, prompting user to sign in')
    return (
      <div>
        <h1>Welcome to Treasure Hunt</h1>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    )
  }

  console.log('Session active, rendering levels for user:', session.user.email)
  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
      <button onClick={() => signOut()}>Sign Out</button>
      <h2>Levels</h2>
      <ul>
        {levels.map((level) => (
          <li key={level.id}>{level.title}</li>
        ))}
      </ul>
    </div>
  )
}