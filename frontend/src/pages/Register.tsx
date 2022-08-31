import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import { AuthState } from '../types/AuthState';
import { UserDTO } from '../types/UserDTO';
import { register } from '../features/auth/authThunks';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = formData;

  // Use to navigate to other routes
  const navigate = useNavigate();

  // Dispatch store actions
  const dispatch = useDispatch<any>();

  // Grab auth state fields
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

    // Reset auth state fields minus User
    dispatch(reset());
  }, [user, error, message, dispatch, navigate]);

  /**
   * Update formData fields
   */
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

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Register new User
    const newUser: UserDTO = { name, email, password };
    dispatch(register(newUser));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className="heading">
      <h1>
        <FaUser /> Register
      </h1>
      <p>Start your goals journey!</p>

      <form className="form" onSubmit={onSubmitForm}>
        <div className="form-group">
          <input
            className="form-control"
            id="name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required={true}
            onChange={onChangeInput}
            value={name}
          />
        </div>

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
          <input
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            required={true}
            onChange={onChangeInput}
            value={confirmPassword}
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

export default Register;
