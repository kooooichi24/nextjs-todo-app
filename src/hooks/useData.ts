import { useState } from 'react'
import { Task } from '../types'

export const useData = (initialValue: Task[]) => {
  const [data, setData] = useState<Task[]>(initialValue)

  const generateId = (): number => {
    return Math.floor(Math.random() * 90000) + 10000
  }

  const remove = (id: Task['id']): void => {
    const newData = [...data]
    const filterdData = newData.filter((el) => {
      return el.id !== id
    })
    setData(filterdData)
    return
  }

  const submit = (task: Task['name']): void => {
    const id = generateId().toString()
    const complete = false
    setData((prevData) => [...prevData, { id, name: task, complete }])
  }

  const toggleComplete = (id: Task['id']): void => {
    const newData = [...data]
    for (var i in newData) {
      if (newData[i].id == id) {
        newData[i].complete = newData[i].complete === true ? false : true
        break
      }
    }
    setData(newData)
    return
  }

  return [data, { remove, submit, toggleComplete }] as const
}
