// Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: ""
  });

  const [errors, setErrors] = useState([]);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
      navigate("/"); // or redirect to "/companies" or wherever
    } catch (err) {
      setErrors(err);
    }
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
        <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <button>Sign Up</button>
      </form>
      {errors.length > 0 && <div>{errors.map(e => <p key={e}>{e}</p>)}</div>}
    </div>
  );
}

export default Signup;
