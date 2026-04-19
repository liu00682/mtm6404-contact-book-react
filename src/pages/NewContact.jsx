import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import db from "../db";
import { collection, addDoc } from "firebase/firestore";

function NewContact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = await addDoc(collection(db, "contacts"), {
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    navigate(`/contact/${docRef.id}`);
  };

  return (
  <div className="page">
    <h1>New Contact</h1>

    <p>
      <Link to="/" className="button-link secondary-button">
        Back to Home
      </Link>
    </p>

    <form onSubmit={handleSubmit} className="contact-form">
      <div>
        <label htmlFor="firstName">First Name:</label>
        <br />
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <br />
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <br />
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <button type="submit">Add Contact</button>
    </form>
  </div>
  );
}

export default NewContact;