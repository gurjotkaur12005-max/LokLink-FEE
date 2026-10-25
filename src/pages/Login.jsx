import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import { EMAIL_REGEX, getProfile, makeNameFromEmail } from "../services/storage";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = {};
    if (form.email.trim() === "") {
      found.email = "Please enter your email.";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      found.email = "Enter a valid email, for example name@example.com.";
    }
    if (form.password === "") {
      found.password = "Please enter your password.";
    } else if (form.password.length < 6) {
      found.password = "Password must have at least 6 characters.";
    }
    setErrors(found);
    if (Object.keys(found).length > 0) {
      return;
    }

    // Demo login: we only check the format. The password is never saved.
    const email = form.email.trim();
    const savedProfile = getProfile(email);
    const userInfo = savedProfile || { name: makeNameFromEmail(email), email: email, localityId: "" };
    login(userInfo);
    navigate("/dashboard");
  }

  return (
    <div className="container page">
      <div className="auth-card">
        <div className="auth-side">
          <h2>Welcome back</h2>
          <p>Log in to see your saved schemes and complaints.</p>
        </div>
        <form className="form auth-form" onSubmit={handleSubmit} noValidate>
          <h1>Log in</h1>
          <p className="notice">Demo login only. Any valid email and a 6+ character password will work. Nothing is sent to a server.</p>
          <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
          <FormField label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
          <button type="submit" className="btn btn-primary btn-wide">Log in</button>
          <p className="small">New here? <Link to="/register" className="text-link">Create a demo account</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
