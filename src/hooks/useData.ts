import axios from 'axios'
import { useEffect, useState } from 'react'
import { Task } from '../types'

export const useData = () => {
  const [data, setData] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async (): Promise<void> => {
      const response = await axios.get('http://localhost:3004/tasks')
      console.log('fetchTasks() response.data: ', response.data)
      setData(response.data)
    }

    fetchTasks()
  }, [])

  const generateId = (): number => {
    return Math.floor(Math.random() * 90000) + 10000
  }

  const removeData = (id: Task['id']): void => {
    const newData = [...data]
    const filterdData = newData.filter((el) => {
      return el.id !== id
    })
    setData(filterdData)
    return
  }

  const addData = (task: Task['name']): void => {
    const id = generateId().toString()
    const complete = false
    setData((prevData) => [...prevData, { id, name: task, complete }])
  }

  const toggleComplete = (id: Task['id']): void => {
    const newData = [...data]
    for (const i in newData) {
      if (newData[i].id == id) {
        newData[i].complete = newData[i].complete === true ? false : true
        break
      }
    }
    setData(newData)
    return
  }

  return [data, { removeData, addData, toggleComplete }] as const
}
