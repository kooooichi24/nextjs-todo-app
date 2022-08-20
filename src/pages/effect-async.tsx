import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'

export interface Weather {
  title: string
  text: string
}

export const EffectAsync: NextPage = () => {
  const [data, setData] = useState<Weather>({ title: '', text: '' })
  useEffect(() => {
    console.log('called useEffect callback')
    ;(async () => {
      console.log('called fetchWether')
      const response = await axios.get('https://weather.tsukumijima.net/api/forecast/city/400040')
      console.log('response.data: ', response.data)
      setData({ title: response.data.title, text: response.data.description.text })
    })()

    return () => {
      console.log('called useEffect clean up')
    }
  }, [])

  return (
    <div>
      <h1>useEffect Async page</h1>
      <p>title: {data.title}</p>
      <p>text: {data.text}</p>
    </div>
  )
}

export default EffectAsync
