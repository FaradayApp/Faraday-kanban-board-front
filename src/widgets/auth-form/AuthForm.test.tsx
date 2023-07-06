import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AuthForm } from '.';

describe('AuthForm', () => {
  it('should have a login field', () => {
    render(<AuthForm />);

    const login = screen.getByTestId('username');
    expect(login).toBeInTheDocument();
  });

  it('should have a password field', () => {
    render(<AuthForm />);

    const password = screen.getByTestId('password');
    expect(password).toBeInTheDocument();
  });

  it('submit button should be disabled when form is empty', () => {
    render(<AuthForm />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('button should be available after filling out the form', async () => {
    const loginText = 'validlogin';
    const passwordText = 'validpassword';
    render(<AuthForm />);

    const login = screen.getByTestId('username');
    const password = screen.getByTestId('password');

    await userEvent.type(login, loginText);
    await userEvent.type(password, passwordText);

    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
  });

  it('the login function should be called once', async () => {
    const mockLogin = vi.fn(({ login, password }) => {
      console.log(1);
      return Promise.resolve({ login, password });
    });

    const loginText = 'validlogin';
    const passwordText = 'validpassword';

    render(<AuthForm login={mockLogin} />);

    const login = screen.getByTestId('username');
    const password = screen.getByTestId('password');

    await userEvent.type(login, loginText);
    await userEvent.type(password, passwordText);

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(mockLogin).toBeCalledTimes(1);
  });

  it('the login function should be called with correct data', async () => {
    const mockLogin = vi.fn(({ login, password }) => {
      console.log(1);
      return Promise.resolve({ login, password });
    });

    const loginText = 'validlogin';
    const passwordText = 'validpassword';

    render(<AuthForm login={mockLogin} />);

    const login = screen.getByTestId('username');
    const password = screen.getByTestId('password');

    await userEvent.type(login, loginText);
    await userEvent.type(password, passwordText);

    const button = screen.getByRole('button');

    await userEvent.click(button);

    expect(mockLogin).toBeCalledWith({ login: loginText, password: passwordText });
  });
});
