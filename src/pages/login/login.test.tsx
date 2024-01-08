import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {internet} from 'faker';
import { withHistory, withStore } from '../../utils/mock-component';
import Login from './login.tsx';

describe('Component: Login', () => {
  it('should render correctly', () => {
    const loginText = 'Email address';
    const passwordText = 'Password';
    const { withStoreComponent } = withStore(<Login />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    const signInBtn = screen.getByTestId('log-in-btn');

    expect(signInBtn).toBeInTheDocument();
    expect(screen.getByText(loginText)).toBeInTheDocument();
    expect(screen.getByText(passwordText)).toBeInTheDocument();
  });

  it('should render correctly when user enter login and password', async () => {
    const loginElementTestId = 'login-element';
    const passwordElementTestId = 'password-element';
    const expectedLoginValue = internet.userName();
    const expectedPasswordValue = internet.password();
    const { withStoreComponent } = withStore(<Login />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });
});
