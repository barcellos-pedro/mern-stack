import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

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
          <input
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
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
