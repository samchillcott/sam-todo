import React from 'react'
import Todo from '../Todo/Todo'
import styles from "./TodoList.module.css"

const TodoList = ({ todos, setTodos, filteredTodos }) => {
  return (
    <div className={ styles.todoContainer }>
      <ul className={ styles.todoList }>
        { filteredTodos.map((todo) => (
          <Todo
            key={ todo.id }
            text={ todo.text }
            id={ todo.id }
            todos={ todos }
            setTodos={ setTodos }
            todo={ todo }
          />
        )) }
      </ul>
    </div>
  )
}

export default TodoList