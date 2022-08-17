import { useData } from '../../hooks/useData'
import { TodoForm } from '../molecules/TodoForm'
import { TodoList } from '../molecules/TodoList'

export const TodoBox = () => {
  const [data, { removeData, addData, toggleComplete }] = useData()

  return (
    <div className="well">
      <h1 className="vert-offset-top-0">To do:</h1>
      <TodoList tasks={data} removeNode={removeData} toggleComplete={toggleComplete} />
      <TodoForm onTaskSubmit={addData} />
    </div>
  )
}
