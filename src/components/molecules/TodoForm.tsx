import { useState } from "react"
import { Task } from "../../types"

type TodoFormProps = {
  onTaskSubmit: (task: Task['name']) => void
}

export const TodoForm = ({ onTaskSubmit }: TodoFormProps) => {
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
