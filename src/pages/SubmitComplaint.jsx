import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import FormField from "../components/FormField";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import localities from "../data/localities.json";
import {
  addComplaint, generateComplaintId, COMPLAINT_CATEGORIES, EMAIL_REGEX,
} from "../services/storage";

// Check every field and return an object of error messages (empty object = valid)
function validate(form) {
  const errors = {};
  if (form.name.trim() === "") {
    errors.name = "Please enter your name.";
  }
  if (form.email.trim() === "") {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = "Enter a valid email, for example name@example.com.";
  }
  if (form.localityId === "") {
    errors.localityId = "Please choose your locality.";
  }
  if (form.category === "") {
    errors.category = "Please choose a category.";
  }
  if (form.title.trim().length < 5) {
    errors.title = "The title should have at least 5 characters.";
  }
  if (form.description.trim().length < 20) {
    errors.description = "Please describe the issue in at least 20 characters.";
  }
  if (form.priority === "") {
    errors.priority = "Please choose a priority.";
  }
  return errors;
}

function SubmitComplaint() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  // Pre-fill from the logged-in user and from the link (?locality=...&category=...)
  const categoryFromLink = searchParams.get("category");
  const [form, setForm] = useState({
    name: user ? user.name : "",
    email: user ? user.email : "",
    localityId: searchParams.get("locality") || (user && user.localityId ? user.localityId : ""),
    category: COMPLAINT_CATEGORIES.includes(categoryFromLink) ? categoryFromLink : "",
    title: "",
    description: "",
    priority: "Medium",
  });
  const [errors, setErrors] = useState({});
  const [createdId, setCreatedId] = useState("");

  // One handler for all fields: the input's "name" tells us which value to change
  function handleChange(event) {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const foundErrors = validate(form);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length > 0) {
      return; // stop: the form has errors
    }

    const today = new Date().toISOString().slice(0, 10);
    const id = generateComplaintId();
    const complaint = {
      id: id,
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      priority: form.priority,
      localityId: form.localityId,
      name: form.name.trim(),
      email: form.email.trim(),
      status: "Submitted",
      date: today,
      history: [{ status: "Submitted", date: today, note: "Complaint submitted by the citizen (simulated)." }],
    };
    addComplaint(complaint);
    setCreatedId(id);
  }

  function handleAnother() {
    setCreatedId("");
    setForm({ ...form, title: "", description: "", category: "" });
  }

  // Success screen
  if (createdId !== "") {
    return (
      <div className="container page narrow">
        <div className="success-box" role="status">
          <div className="success-icon" aria-hidden="true">✅</div>
          <h1>Complaint submitted</h1>
          <p>Your reference ID is</p>
          <p className="success-id">{createdId}</p>
          <p className="muted">
            This is a simulation. Your complaint was saved only in this browser and was not sent
            to any real official.
          </p>
          <div className="empty-actions">
            <Button to={"/complaints/" + createdId}>View complaint</Button>
            <Button variant="outline" onClick={handleAnother}>Submit another</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container page narrow">
      <header className="page-header">
        <h1>Report a civic issue</h1>
        <p className="muted">Tell us what is wrong and where. Fields marked with a red message need your attention.</p>
      </header>

      <p className="notice">
        Demo only: submission is simulated and does not contact real officials. Your complaint
        is stored in this browser's localStorage.
      </p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <FormField label="Your name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
          <FormField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
        </div>
        <div className="form-row">
          <FormField label="Locality" name="localityId" as="select" value={form.localityId} onChange={handleChange}
            error={errors.localityId}
            options={localities.map((l) => ({ value: l.id, label: l.name + ", " + l.district }))} />
          <FormField label="Category" name="category" as="select" value={form.category} onChange={handleChange}
            error={errors.category} options={COMPLAINT_CATEGORIES} />
        </div>
        <FormField label="Complaint title" name="title" value={form.title} onChange={handleChange}
          error={errors.title} placeholder="For example: Street light not working" />
        <FormField label="Description" name="description" as="textarea" value={form.description}
          onChange={handleChange} error={errors.description} placeholder="Describe the problem and the exact place." />
        <FormField label="Priority" name="priority" as="select" value={form.priority} onChange={handleChange}
          error={errors.priority} options={["Low", "Medium", "High"]} />
        <button type="submit" className="btn btn-primary btn-wide">Submit complaint</button>
      </form>
    </div>
  );
}

export default SubmitComplaint;
