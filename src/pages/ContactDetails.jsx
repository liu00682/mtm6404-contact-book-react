import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import db from "../db";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

function ContactDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      const docRef = doc(db, "contacts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContact({
          id: docSnap.id,
          ...docSnap.data(),
        });
      } else {
        setContact(null);
      }
    };

    fetchContact();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this contact?");

    if (!confirmDelete) {
      return;
    }

    await deleteDoc(doc(db, "contacts", id));
    navigate("/");
  };

  if (!contact) {
    return <p>Loading or contact not found...</p>;
  }

  return (
  <div className="page">
    <h1>Contact Details</h1>

    <div className="details-card">
      <h2>
        {contact.firstName} {contact.lastName}
      </h2>
      <p>Email: {contact.email}</p>
    </div>

    <div className="button-group">
      <Link to="/" className="button-link secondary-button">
        Back to Home
      </Link>

      <Link to={`/edit/${contact.id}`} className="button-link">
        Edit Contact
      </Link>

      <button onClick={handleDelete}>Delete Contact</button>
    </div>
  </div>
);
}

export default ContactDetails;