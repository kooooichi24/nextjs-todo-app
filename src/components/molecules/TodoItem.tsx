import { Task } from "../../types"

type TodoItemProps = {
  nodeId: Task['id']
  name: Task['name']
  complete: Task['complete']
  removeNode: (nodeId: Task['id']) => void
  toggleComplete: (nodeId: Task['id']) => void
}

export const TodoItem = ({ nodeId, name, complete, removeNode, toggleComplete }: TodoItemProps) => {
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