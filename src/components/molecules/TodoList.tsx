import { Task } from "../../types"
import { TodoItem } from "./TodoItem"

type TodoListProps = {
  tasks: Task[]
  removeNode: (nodeId: Task['id']) => void
  toggleComplete: (nodeId: Task['id']) => void
}

export const TodoList = ({ tasks, removeNode, toggleComplete }: TodoListProps) => {
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
