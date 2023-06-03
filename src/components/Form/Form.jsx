import styles from "./Form.module.css"

import { v4 as uuid } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'


const Form = ({ inputText, setInputText, todos, setTodos, setStatus }) => {
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  }

  const submitTodoHandler = (e) => {
    e.preventDefault()
    if (inputText === "") {
      alert("Please enter a Todo")
    } else {
      setTodos([
        ...todos,
        {
          text: inputText,
          complete: false,
          id: uuid()
        }
      ])
      setInputText("")
    }
  }

  const statusHandler = (e) => {
    setStatus(e.target.value)
  }

  return (
    <form>
      <input
        type="text"
        value={ inputText }
        onChange={ inputTextHandler }
        className={ styles.todoInput }
        placeholder="Enter a Todo"
      />
      <button type="submit" onClick={ submitTodoHandler } className={ styles.todoButton } data-testid="add-todo">
        {/* <i class="fas fa-plus-square"></i> */ }
        <FontAwesomeIcon icon={ faSquarePlus } />
      </button>
      <div className={ styles.select }>
        <select name="todos" className={ styles.filterTodo } onChange={ statusHandler }>
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
    </form>
  )
}

export default Form