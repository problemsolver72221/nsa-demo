"use client"

import { useOptimisticAction } from "next-safe-action/hook"
import { addLikes } from "./addlikes-action"

type Props = {
  initialLikesCount: number
}

const AddLikesForm = ({ initialLikesCount }: Props) => {
  // Here we pass safe action (`addLikes`) and current server state to `useAction` hook.
  const {
    execute,
    res,
    isExecuting,
    hasExecuted,
    hasSucceded,
    hasErrored,
    reset,
    optimisticData,
  } = useOptimisticAction(
    addLikes,
    { likesCount: initialLikesCount },
    {
      onSuccess(data, reset) {
        console.log("HELLO FROM ONSUCCESS", data)

        // You can reset response object by calling `reset`.
        // reset();
      },
      onError(error, reset) {
        console.log("OH NO FROM ONERROR", error)

        // You can reset response object by calling `reset`.
        // reset();
      },
    }
  )

  console.log(
    "hasExecuted",
    hasExecuted,
    "hasSucceded",
    hasSucceded,
    "hasErrored",
    hasErrored
  )

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          const formData = new FormData(e.currentTarget)
          const input = Object.fromEntries(formData) as {
            incrementBy: string
          }

          const intIncrementBy = parseInt(input.incrementBy)

          // Action call. Here we pass action input and expected (optimistic)
          // data.
          execute(
            { incrementBy: intIncrementBy },
            {
              likesCount: res.data?.likesCount
                ? res.data.likesCount + intIncrementBy
                : initialLikesCount + intIncrementBy,
            }
          )
        }}
      >
        <input
          type="text"
          name="incrementBy"
          id="incrementBy"
          placeholder="Increment by"
        />
        <button type="submit">Add likes</button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </form>
      <div id="response-container">
        {/* This object will update immediately when you execute the action.
            Real data will come back once action has finished executing. */}
        <pre>Optimistic data: {JSON.stringify(optimisticData)}</pre>{" "}
        <pre>Is executing: {JSON.stringify(isExecuting)}</pre>
        <div>Action response:</div>
        <pre className="response">
          {
            res // if got back a response,
              ? JSON.stringify(res, null, 1)
              : "fill in form and click on the add likes button" // if action never ran
          }
        </pre>
      </div>
    </>
  )
}

export default AddLikesForm
