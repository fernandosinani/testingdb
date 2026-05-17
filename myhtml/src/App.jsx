import { useState, useEffect } from "react";

const emptyForm = { id: "", name: "", lastname: "", email: "", phone: "" };

export default function App() {
  const [form, setForm] = useState(emptyForm);
  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStaff();
  }, []);

  async function loadStaff() {
    const res = await fetch("/staff");
    if (res.ok) setStaff(await res.json());
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    const body = { ...form, id: parseInt(form.id, 10) };
    const res = await fetch("/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const err = await res.json();
      setError(err.detail || "Failed to add staff member");
      return;
    }
    setForm(emptyForm);
    setMessage("New staff member added successfully!");
    loadStaff();
  }

  function handleClear() {
    setForm(emptyForm);
    setError(null);
    setMessage(null);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this staff member?")) return;
    await fetch(`/staff/${id}`, { method: "DELETE" });
    loadStaff();
  }

  const filtered = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.lastname.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone.includes(search) ||
      String(s.id).includes(search)
  );

  return (
    <div className="container">
      <h1>Staff Database</h1>

      <div className="card">
        <h2>Add Staff Member</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="id">Employee ID</label>
              <input
                type="number"
                name="id"
                id="id"
                value={form.id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="name">First Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                value={form.lastname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {message && <div className="msg msg-success">{message}</div>}
          {error && <div className="msg msg-error">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h2>Staff List</h2>

        <div className="search-bar">
          <label htmlFor="search">Order your staff here</label>
          <input
            type="text"
            id="search"
            placeholder="Search by name, ID, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty">
                  No staff members found
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.lastname}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-delete"
                      onClick={() => handleDelete(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
