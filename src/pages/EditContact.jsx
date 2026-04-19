import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import db from "../db";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const contactData = docSnap.data();
        setFirstName(contactData.firstName);
        setLastName(contactData.lastName);
        setEmail(contactData.email);
      }
    };

    fetchContact();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "contacts", id);

    await updateDoc(docRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    navigate(`/contact/${id}`);
  };

  return (
  <div className="page">
    <h1>Edit Contact</h1>

    <p>
      <Link to={`/contact/${id}`} className="button-link secondary-button">
        Back to Details
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

      <button type="submit">Save Changes</button>
    </form>
  </div>
  );
}

export default EditContact;