import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import styles from "./Login.module.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      const response = {
        status: 'success',
        data: {
          email,
        },
      };
      Cookies.set('user', response.data.email);
      navigate('/');
    }, 1000);
  };

  return (
    <form onSubmit={ handleSubmit } className={styles.login}>
      <input
        type="email"
        placeholder="Email"
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
      />
      <input
        type="password"
        placeholder="Password"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login