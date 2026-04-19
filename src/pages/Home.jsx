import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "../db";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts"));

      const contactsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setContacts(contactsData);
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts
    .filter((contact) =>
      (contact.firstName + " " + contact.lastName)
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort((a, b) => a.lastName.localeCompare(b.lastName));

  return (
    <div className="page">
      <div className="page-header">
        <h1>Contact Book</h1>
        <Link to="/new" className="button-link">
          Add New Contact
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search by first or last name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <ul className="contact-list">
          {filteredContacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              <Link to={`/contact/${contact.id}`} className="contact-link">
                {contact.firstName} {contact.lastName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;