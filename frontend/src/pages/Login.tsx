import React, { useEffect, useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

import { reset } from '../features/auth/authSlice';
import { login } from '../features/auth/authThunks';
import { AuthState } from '../types/AuthState';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  const dispatch = useDispatch<any>();
  const { user, loading, error, message } = useSelector(
    (state: any) => state.auth as AuthState
  );

  useEffect(() => {
    if (error) {
      toast.error(message);
    }

    if (user) {
      navigate('/');
    }

    dispatch(reset());
  }, [error, message, user, dispatch, navigate]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName } = event.target;
    const { value: inputValue } = event.target;

    setFormData({
      ...formData,
      [inputName]: inputValue,
    });
  };

  const onSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login({ email, password }));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="heading">
      <h1>
        <FaSignInAlt /> Login
      </h1>
      <p>Start setting goals!</p>

      <form className="form" onSubmit={onSubmitForm}>
        <div className="form-group">
          <input
            className="form-control"
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required={true}
            onChange={onChangeInput}
            value={email}
          />
        </div>

        <div className="form-group">
          <input
            className="form-control"
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required={true}
            onChange={onChangeInput}
            value={password}
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
