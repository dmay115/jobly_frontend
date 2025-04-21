import { useState } from "react";
import { JoblyApi } from "./App";

function Profile({ currentUser, updateUser }) {
  const [formData, setFormData] = useState({
    username: currentUser.username,
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email
  });

  const [formErrors, setFormErrors] = useState([]);
  const [saveConfirmed, setSaveConfirmed] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const updatedUser = await JoblyApi.request(`users/${currentUser.username}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      }, "patch");

      updateUser(updatedUser.user);
      setSaveConfirmed(true);
      setFormErrors([]);
    } catch (errors) {
      console.error("Profile update failed:", errors);
      setFormErrors(errors);
      setSaveConfirmed(false);
    }
  }

  return (
    <div className="Profile">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input disabled name="username" value={formData.username} />
        </div>
        <div>
          <label>First Name:</label>
          <input name="firstName" value={formData.firstName} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input name="lastName" value={formData.lastName} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input name="email" value={formData.email} onChange={handleChange} />
        </div>

        {formErrors.length ? (
          <div className="errors">{formErrors.join(", ")}</div>
        ) : null}

        {saveConfirmed && <div className="success">Updated successfully!</div>}

        <button>Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;
