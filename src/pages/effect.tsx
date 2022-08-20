import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

export const Effect: NextPage = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('called useEffect callback')
    document.title = `You clicked ${count} times`

    return () => {
      console.log('called useEffect clean up')
    }
  })

  return (
    <div>
      <h1>useEffect page</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}

export default Effect
