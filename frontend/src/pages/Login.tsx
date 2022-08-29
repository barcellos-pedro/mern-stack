import React, { useState } from 'react';
import { FaSignInAlt } from 'react-icons/fa';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

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
    console.log(formData);
  };

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
