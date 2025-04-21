import React, { useState } from "react";

function Login({ login }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    login(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input name="username" value={formData.username} onChange={handleChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <button>Login</button>
    </form>
  );
}

export default Login;
