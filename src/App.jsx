import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
  }

  function validateForm() {
    const newErrors = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must contain at least 3 characters.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!formData.course) {
      newErrors.course = "Please select a course.";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must have at least 8 characters.";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    setMessage("");

    if (Object.keys(validationErrors).length === 0) {
      const newStudent = {
        id: Date.now(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone,
        course: formData.course,
      };

      setStudents((previous) => [...previous, newStudent]);

      setMessage(
        `Registration successful! Welcome, ${newStudent.name}.`
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        password: "",
        confirmPassword: "",
      });

      setErrors({});
    }
  }

  return (
    <main className="container">
      <header className="header">
        <div className="logo">🎓</div>
        <h1>Student Registration</h1>
        <p>Register today and take the next step in your education.</p>
      </header>

      {message && (
        <div
          className="message"
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <small className="error">{errors.name}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <small className="error">{errors.email}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="10-digit phone number"
            value={formData.phone}
            onChange={handleChange}
            aria-invalid={Boolean(errors.phone)}
          />
          {errors.phone && <small className="error">{errors.phone}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="course">Select Course</label>
          <select
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            aria-invalid={Boolean(errors.course)}
          >
            <option value="">Choose a course</option>
            <option value="BCA">BCA</option>
            <option value="BBA">BBA</option>
            <option value="B.Tech">B.Tech</option>
            <option value="MCA">MCA</option>
            <option value="MBA">MBA</option>
          </select>
          {errors.course && <small className="error">{errors.course}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            value={formData.password}
            onChange={handleChange}
            aria-invalid={Boolean(errors.password)}
          />
          {errors.password && (
            <small className="error">{errors.password}</small>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            aria-invalid={Boolean(errors.confirmPassword)}
          />
          {errors.confirmPassword && (
            <small className="error">{errors.confirmPassword}</small>
          )}
        </div>

        <button type="submit" className="register-button">
          Register Student
        </button>
      </form>

      <p className="footer-text">
        Please check your details before submitting.
      </p>

      {students.length > 0 && (
        <section className="student-section">
          <h2>Registered Students</h2>
          <p>Total registrations: {students.length}</p>

          {students.map((student) => (
            <article className="student-item" key={student.id}>
              <h3>{student.name}</h3>
              <p>Email: {student.email}</p>
              <p>Phone: {student.phone}</p>
              <p>Course: {student.course}</p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default App;