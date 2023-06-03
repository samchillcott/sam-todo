import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Todo from './Todo';

describe('Todo component', () => {
  test('renders inputs and buttons', () => {
    const todo = {
      id: 1,
      text: 'Do morning stretches',
      complete: false,
    };
    const todos = [todo];
    const setTodos = jest.fn();
    render(<Todo text={ todo.text } todos={ todos } setTodos={ setTodos } todo={ todo } />);

    // Assert that the input element is rendered with the correct value
    expect(screen.queryByRole('textbox')).toBeNull();
    const todoItem = screen.getByText(todo.text);
    expect(todoItem).toBeInTheDocument();

    // Assert that all the buttons are rendered
    const editButton = screen.queryByTitle('Edit todo');
    expect(editButton).toBeInTheDocument();
    const completeButton = screen.getByRole('button', { name: /complete-btn/i });
    expect(completeButton).toBeInTheDocument();
    const deleteButton = screen.getByRole('button', { name: /trash-btn/i });
    expect(deleteButton).toBeInTheDocument();
  });

  test('calls mock functions when buttons are clicked', () => {
    const todo = {
      id: 1,
      text: 'Buy milk',
      complete: false,
    };
    const todos = [todo];
    const setTodos = jest.fn();
    render(<Todo text={ todo.text } todos={ todos } setTodos={ setTodos } todo={ todo } />);

    // Mock all the functions passed as props to the Todo component
    const deleteHandler = jest.fn();
    const completeHandler = jest.fn();
    const editHandler = jest.fn();
    const updateHandler = jest.fn();

    // Assert that the mock functions haven't been called yet
    expect(deleteHandler).not.toHaveBeenCalled();
    expect(completeHandler).not.toHaveBeenCalled();
    expect(editHandler).not.toHaveBeenCalled();
    expect(updateHandler).not.toHaveBeenCalled();

    // Click the buttons and assert that the mock functions have been called
    const editButton = screen.queryByTitle('Edit todo');
    fireEvent.click(editButton);
    expect(editHandler).toHaveBeenCalled();

    const completeButton = screen.getByRole('button', { name: /complete-btn/i });
    fireEvent.click(completeButton);
    expect(completeHandler).toHaveBeenCalled();

    const deleteButton = screen.getByRole('button', { name: /trash-btn/i });
    fireEvent.click(deleteButton);
    expect(deleteHandler).toHaveBeenCalled();

    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    expect(updateHandler).toHaveBeenCalled();
  });
});
