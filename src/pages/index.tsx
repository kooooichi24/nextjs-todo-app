import type { NextPage } from 'next'
import { useState } from 'react'
import { useData } from '../hooks/useData'
import { Task } from '../types'

type TodoFormProps = {
  onTaskSubmit: (task: Task['name']) => void
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
  nodeId: Task['id']
  name: Task['name']
  complete: Task['complete']
  removeNode: (nodeId: Task['id']) => void
  toggleComplete: (nodeId: Task['id']) => void
}

const TodoItem = ({ nodeId, name, complete, removeNode, toggleComplete }: TodoItemProps) => {
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
      {name}
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
  tasks: Task[]
  removeNode: (nodeId: Task['id']) => void
  toggleComplete: (nodeId: Task['id']) => void
}

const TodoList = ({ tasks, removeNode, toggleComplete }: TodoListProps) => {
  const listNodes = tasks.map(function (listItem) {
    return (
      <TodoItem
        key={listItem.id}
        nodeId={listItem.id}
        name={listItem.name}
        complete={listItem.complete}
        removeNode={removeNode}
        toggleComplete={toggleComplete}
      />
    )
  })

  return <ul className="list-group">{listNodes}</ul>
}

const TodoBox = () => {
  const [data, { removeData, addData, toggleComplete }] = useData([
    { id: '00001', name: 'Wake up', complete: false },
    { id: '00002', name: 'Eat breakfast', complete: false },
    { id: '00003', name: 'Go to work', complete: false }
  ])

  return (
    <div className="well">
      <h1 className="vert-offset-top-0">To do:</h1>
      <TodoList tasks={data} removeNode={removeData} toggleComplete={toggleComplete} />
      <TodoForm onTaskSubmit={addData} />
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
