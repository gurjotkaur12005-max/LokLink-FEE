import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import { useAuth } from "../context/AuthContext";
import localities from "../data/localities.json";
import { EMAIL_REGEX, saveProfile } from "../services/storage";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", localityId: "" });
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
    if (form.name.trim() === "") {
      found.name = "Please enter your name.";
    }
    if (form.email.trim() === "") {
      found.email = "Please enter your email.";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      found.email = "Enter a valid email, for example name@example.com.";
    }
    if (form.password.length < 6) {
      found.password = "Password must have at least 6 characters.";
    }
    if (form.confirm !== form.password) {
      found.confirm = "The passwords do not match.";
    }
    setErrors(found);
    if (Object.keys(found).length > 0) {
      return;
    }

    // Save only name, email and locality. The password is NOT stored anywhere.
    const profile = { name: form.name.trim(), email: form.email.trim(), localityId: form.localityId };
    saveProfile(profile);
    login(profile);
    navigate("/dashboard");
  }

  return (
    <div className="container page">
      <div className="auth-card">
        <div className="auth-side">
          <h2>Join LokLink</h2>
          <p>Save schemes, track complaints and set your locality.</p>
        </div>
        <form className="form auth-form" onSubmit={handleSubmit} noValidate>
          <h1>Create account</h1>
          <p className="notice">Demo registration only. Your password is not stored, and this is not real security.</p>
          <FormField label="Full name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
          <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
          <FormField label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
          <FormField label="Confirm password" name="confirm" type="password" value={form.confirm} onChange={handleChange} error={errors.confirm} />
          <FormField label="Your locality (optional)" name="localityId" as="select" value={form.localityId}
            onChange={handleChange} options={localities.map((l) => ({ value: l.id, label: l.name + ", " + l.district }))} />
          <button type="submit" className="btn btn-primary btn-wide">Register</button>
          <p className="small">Already registered? <Link to="/login" className="text-link">Log in</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;
