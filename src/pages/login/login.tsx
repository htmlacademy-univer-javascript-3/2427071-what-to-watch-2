import React, {FormEvent, useRef, useState} from 'react';
import { Navigate } from 'react-router-dom';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import {EMAIL_PATTERN, PASSWORD_PATTERN} from '../../constants/validation-patterns.ts';
import {AuthStatus} from '../../enums/auth-status.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/store.ts';
import {loginAction} from '../../store/api-actions.ts';
import {getAuthStatus} from '../../store/user-process/user-process.selectors.ts';

function Login(): React.JSX.Element {
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const authStatus = useAppSelector(getAuthStatus);
  const isAuth = authStatus === AuthStatus.Auth;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      if (!EMAIL_PATTERN.test(emailRef.current?.value)) {
        setError('Please enter a valid email address');
        return;
      }

      if (!PASSWORD_PATTERN.test(passwordRef.current?.value)) {
        setError(
          'Passwords must contain: a minimum of 1 letter and a minimum of 1 numeric character'
        );
        return;
      }

      dispatch(
        loginAction({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          {error && (
            <div className="sign-in__message">
              <p>{error}</p>
            </div>
          )}
          <div className="sign-in__fields">
            <div
              className={`sign-in__field ${
                error ? 'sign-in__field--error' : ''
              }`}
            >
              <input
                ref={emailRef}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
                data-testid="login-element"
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-email"
              >
                Email address
              </label>
            </div>
            <div
              className={`sign-in__field ${
                error ? 'sign-in__field--error' : ''
              }`}
            >
              <input
                ref={passwordRef}
                className="sign-in__input"
                type="password"
                placeholder="Password"
                name="user-password"
                id="user-password"
                data-testid="password-element"
              />
              <label
                className="sign-in__label visually-hidden"
                htmlFor="user-password"
              >
                Password
              </label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit" data-testid="log-in-btn">
              Sign in
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
