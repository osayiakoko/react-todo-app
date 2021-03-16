import TodoItem from './TodoItem'

const TodoList = ({todos, onDelete, onToggleDone}) => {
  return (
    <ul className="todo-list">
        { todos.map(todo => <TodoItem 
                                key={todo.id} 
                                todo={todo} 
                                onToggleDone={onToggleDone} 
                                onDelete={onDelete} 
                            />
        )}
    </ul>
  )
}

export default TodoList
