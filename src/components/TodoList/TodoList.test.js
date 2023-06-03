import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TodoList from './TodoList';

describe('TodoList', () => {
  const todos = [
    { id: 1, text: 'Add E2E tests' },
    { id: 2, text: 'Fix the CSS' },
    { id: 3, text: 'Deploy' },
  ];
  const setTodos = jest.fn();
  const filteredTodos = todos;

  it('renders the list of todos', () => {
    render(<TodoList todos={ todos } setTodos={ setTodos } filteredTodos={ filteredTodos } />);
    const todoItems = screen.queryAllByRole('listitem');
    const element = screen.getByText(/Add E2E tests/);
    expect(element).toBeInTheDocument();
    expect(todoItems).toHaveLength(todos.length);
  });
});
