import React from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import Spinner from '../components/Spinner';

import { login } from '../features/auth/authThunks';
import { useForm } from '../hooks/useForm';
import { useWatchAuthentication } from '../hooks/useWatchAuthentication';

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const { loading, dispatch } = useWatchAuthentication();
  const { values, onChangeInput } = useForm<FormData>({
    email: '',
    password: '',
  });
  const { email, password } = values;

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
