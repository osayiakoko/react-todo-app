import PropTypes from 'prop-types'

const TodoItem = ({todo, onDelete, onToggleDone}) => {

  return (
    <li className="todo-item">
        <div>
          <input type="checkbox" checked={todo.done} onChange={() => onToggleDone(todo.id)} />
          <span> <span className={todo.done ? 'done' : ''}>{todo.name}</span>
          </span>
        </div>
        <span onClick={() => onDelete(todo.id)}>x</span>
    </li>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
}

export default TodoItem
