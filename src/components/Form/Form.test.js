import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from './Form';

test('renders form component', () => {
  render(<Form />);
  const inputElement = screen.getByPlaceholderText(/Enter a Todo/i);
  expect(inputElement).toBeInTheDocument();
});

test('adds todo on form submission', () => {
  const mockSetInputText = jest.fn();
  const mockSetStatus = jest.fn();

  render(<Form inputText="" setInputText={ mockSetInputText } todos={ [] } setStatus={ mockSetStatus } />);

  const inputElement = screen.getByPlaceholderText(/Enter a Todo/i);
  fireEvent.change(inputElement, { target: { value: 'Todo 1' } });

  const buttonElement = screen.getByTestId('add-todo');
  fireEvent.click(buttonElement);

  expect(mockSetInputText).toHaveBeenCalledWith('Todo 1');
});

test('alerts if no todo is entered on form submission', () => {
  const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => { });
  const mockSetInputText = jest.fn();
  const mockSetStatus = jest.fn();

  render(<Form inputText="" setInputText={ mockSetInputText } todos={ [] } setStatus={ mockSetStatus } />);

  const buttonElement = screen.getByTestId('add-todo');
  fireEvent.click(buttonElement);

  expect(mockAlert).toHaveBeenCalledWith('Please enter a Todo');
  expect(mockSetInputText).not.toHaveBeenCalled();
  expect(mockSetStatus).not.toHaveBeenCalled();
});
