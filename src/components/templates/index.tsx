import { TodoBox } from '../organisms/TodoBox'

export const IndexTemplate = () => {
  return (
    <section className="container vert-offset-top-2">
      <div id="todoBox" className="todoBox col-xs-6 col-xs-offset-3">
        <TodoBox />
      </div>
    </section>
  )
}
