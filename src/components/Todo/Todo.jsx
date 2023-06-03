import React, { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from "./Todo.module.css"

const Todo = ({ text, todos, setTodos, todo }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedText, setUpdatedText] = useState(text);

  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id))
  }

  const completeHandler = () => {
    setTodos(todos.map((item => {
      if (item.id === todo.id) {
        return {
          ...item, complete: !item.complete
        }
      }
      return item
    })))
  }

  const editHandler = () => { setEditMode(true) }

  const updateHandler = () => {
    setTodos(todos.map((item) => {
      if (item.id === todo.id) {
        return {
          ...item,
          text: updatedText
        }
      }
      return item
    }))
    setEditMode(false)
  }

  return (
    <div className={ styles.todo }>
      {
        editMode ? (
          <>
            <input
              className={ styles.todo }
              type='text'
              value={ updatedText }
              onChange={ (e) => setUpdatedText(e.target.value) }
            />
            <button
              className={ styles.saveButton }
              onClick={ updateHandler }
            >
              <FontAwesomeIcon icon={ faFloppyDisk } />
            </button>
          </>
        ) : (
          <>
            <li className={ `${styles.todoItem} ${todo.complete ? styles.complete : ""}` }>
              { text }
            </li>
            <button
              className={ styles.editButton }
              title='Edit todo'
              onClick={ editHandler }
            >
              <FontAwesomeIcon icon={ faPenToSquare } />
            </button>
            <button
              className={ styles.completeButton }
              onClick={ completeHandler }
            >
              <FontAwesomeIcon icon={ faCheck } />
            </button>
            <button
              className={ styles.trashButton }
              onClick={ deleteHandler }
            >
              <FontAwesomeIcon icon={ faTrash } />
            </button>
          </>
        )
      }
    </div>
  )
}

export default Todo