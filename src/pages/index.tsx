import type { NextPage } from 'next'
import { useState } from 'react'

type Data = {
  id: string
  task: string
  complete: boolean
}

type TodoFormProps = {
  onTaskSubmit: (task: Data['task']) => void
}

const TodoForm = ({ onTaskSubmit }: TodoFormProps) => {
  const [value, setValue] = useState('')

  const doSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value) {
      return
    }

    onTaskSubmit(value)
    setValue('')
  }

  return (
    <div className="commentForm vert-offset-top-2">
      <hr />
      <div className="clearfix">
        <form className="todoForm form-horizontal" onSubmit={doSubmit}>
          <div className="form-group">
            <label htmlFor="task" className="col-md-2 control-label">
              Task
            </label>
            <div className="col-md-10">
              <input
                type="text"
                id="task"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                className="form-control"
                placeholder="What do you need to do?"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 col-md-offset-2 text-right">
              <input type="submit" value="Save Item" className="btn btn-primary" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

type TodoItemProps = {
  nodeId: Data['id']
  task: Data['task']
  complete: Data['complete']
  removeNode: (nodeId: Data['id']) => void
  toggleComplete: (nodeId: Data['id']) => void
}

const TodoItem = ({ nodeId, task, complete, removeNode, toggleComplete }: TodoItemProps) => {
  const handleToggleComplete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleComplete(nodeId)
  }

  const handleRemoveNode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    removeNode(nodeId)
  }

  return (
    <li className={'list-group-item clearfix' + (complete === true ? ' list-group-item-success' : '')}>
      {task}
      <div className="pull-right" role="group">
        <button type="button" className="btn btn-xs btn-success img-circle" onClick={handleToggleComplete}>
          &#x2713;
        </button>{' '}
        <button type="button" className="btn btn-xs btn-danger img-circle" onClick={handleRemoveNode}>
          &#xff38;
        </button>
      </div>
    </li>
  )
}

type TodoListProps = {
  data: Data[]
  removeNode: (nodeId: Data['id']) => void
  toggleComplete: (nodeId: Data['id']) => void
}

const TodoList = ({ data, removeNode, toggleComplete }: TodoListProps) => {
  const listNodes = data.map(function (listItem) {
    return (
      <TodoItem
        key={listItem.id}
        nodeId={listItem.id}
        task={listItem.task}
        complete={listItem.complete}
        removeNode={removeNode}
        toggleComplete={toggleComplete}
      />
    )
  })

  return <ul className="list-group">{listNodes}</ul>
}

const TodoBox = () => {
  const [data, setData] = useState<Data[]>([
    { id: '00001', task: 'Wake up', complete: false },
    { id: '00002', task: 'Eat breakfast', complete: false },
    { id: '00003', task: 'Go to work', complete: false }
  ])

  const generateId = (): number => {
    return Math.floor(Math.random() * 90000) + 10000
  }

  const handleNodeRemoval = (nodeId: Data['id']): void => {
    const newData = [...data]
    const filterdData = newData.filter((el) => {
      return el.id !== nodeId
    })
    setData(filterdData)
    return
  }

  const handleSubmit = (task: Data['task']): void => {
    const id = generateId().toString()
    const complete = false
    setData((prevData) => [...prevData, { id, task, complete }])
  }

  const handleToggleComplete = (nodeId: Data['id']): void => {
    const newData = [...data]
    for (var i in newData) {
      if (newData[i].id == nodeId) {
        newData[i].complete = newData[i].complete === true ? false : true
        break
      }
    }
    setData(newData)
    return
  }

  return (
    <div className="well">
      <h1 className="vert-offset-top-0">To do:</h1>
      <TodoList data={data} removeNode={handleNodeRemoval} toggleComplete={handleToggleComplete} />
      <TodoForm onTaskSubmit={handleSubmit} />
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <section className="container vert-offset-top-2">
      <div id="todoBox" className="todoBox col-xs-6 col-xs-offset-3">
        <TodoBox></TodoBox>
      </div>
    </section>
  )
}

export default Home
