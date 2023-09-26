import Link from "next/link"
import AddLikeForm from "./addlikes-form"
import { getLikes } from "./db"

export const metadata = {
  title: "Action using optimistic hook",
}

export default async function OptimisticHook() {
  const likesCount = getLikes()
  const randomPost = Math.floor(Math.random() * 101);
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${randomPost}`)
  const data = await res.json()
  return (
    <>
      <Link href="/">Go to home</Link>
      <h1>Action using optimistic hook</h1>
      <pre style={{ marginTop: "1rem" }}>
        Server state: {JSON.stringify(likesCount)}
      </pre>
      <p>{JSON.stringify(data)}</p>
      {/* Pass the server state and typesafe mutation to Client Component */}
      <AddLikeForm initialLikesCount={likesCount} />
    </>
  )
}
