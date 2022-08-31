import React from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner';
import { UserDTO } from '../types/UserDTO';
import { register } from '../features/auth/authThunks';
import { useForm } from '../hooks/useForm';
import { useWatchAuthentication } from '../hooks/useWatchAuthentication';

function Register() {
  const { loading, dispatch } = useWatchAuthentication();
  const { values, onChangeInput } = useForm({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = values;

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
