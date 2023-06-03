import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from './Login';

describe('Login component', () => {
  it('submits form with email and password', async () => {
    const history = createMemoryHistory();
    const originalSetTimeout = window.setTimeout;

    // Mock setTimeout to instantly resolve
    window.setTimeout = (fn) => fn();

    // Mock useNavigate and Cookies.set
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));
    const mockSetCookie = jest.fn();
    jest.mock('js-cookie', () => ({
      set: mockSetCookie,
    }));

    const { getByPlaceholderText, getByRole } = render(
      <Router history={ history }>
        <Login />
      </Router>
    );

    // Fill in form inputs
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // Submit form
    const submitButton = getByRole('button', { name: 'Login' });
    fireEvent.click(submitButton);

    // Ensure form was submitted correctly
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
      expect(mockSetCookie).toHaveBeenCalledWith('user', 'test@example.com');
    });

    // Restore original setTimeout function
    window.setTimeout = originalSetTimeout;
  });
});
