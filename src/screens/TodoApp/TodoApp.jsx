import React, { useEffect, useState } from 'react'

import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';

import Form from '../../components/Form/Form'
import TodoList from '../../components/TodoList/TodoList'
import styles from "./TodoApp.module.css"

const TodoApp = () => {
  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState("all")
  const [filteredTodos, setFilteredTodos] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getLocalTodos()
  }, [])

  useEffect(() => {
    filterHandler()
    saveLocalTodos()
  }, [todos, status])

  const filterHandler = () => {
    switch (status) {
      case 'complete':
        setFilteredTodos(todos.filter(todo => todo.complete === true))
        break
      case 'incomplete':
        setFilteredTodos(todos.filter(todo => todo.complete === false))
        break
      default:
        setFilteredTodos(todos)
        break
    }
  }

  const saveLocalTodos = () => {
    if (todos.length !== 0) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }

  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let localTodos = JSON.parse(localStorage.getItem('todos'))
      setTodos(localTodos)
    }
  }

  const handleLogout = () => {
    Cookies.remove('user');
    localStorage.clear()
    navigate('/login');
  };

  return (
    <div>
      <div className={styles.logoutWrapper}>
        <button
          className={styles.logoutButton}
          onClick={ handleLogout }>
            Logout
          <i class="fa-light fa-arrow-right-from-bracket"></i>
        </button>
      </div>
      <Form
        inputText={ inputText }
        setInputText={ setInputText }
        todos={ todos }
        setTodos={ setTodos }
        setStatus={ setStatus }
      />
      <TodoList
        todos={ todos }
        setTodos={ setTodos }
        filteredTodos={ filteredTodos }
      />
    </div>
  );
}

export default TodoApp