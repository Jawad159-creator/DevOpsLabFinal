import { useState, useEffect } from 'react';
import './App.css'; // Importing your simple CSS file

function App() {
    const [name, setName] = useState('');
    const [submittedNames, setSubmittedNames] = useState([]);

    const fetchNames = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/names');
            const data = await res.json();
            setSubmittedNames(data.names || []);
        } catch (err) {
            console.error("Error fetching names", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) return;

        try {
            await fetch('http://localhost:5000/api/name', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            setName('');
            fetchNames();
        } catch (err) {
            console.error("Error saving name", err);
        }
    };

    const handleDelete = async (index) => {
        try {
            await fetch(`http://localhost:5000/api/names/${index}`, {
                method: 'DELETE',
            });
            fetchNames();
        } catch (err) {
            console.error("Error deleting name", err);
        }
    };

    useEffect(() => {
        fetchNames();
    }, []);

    return (
        <div className="app-container">
            <h2>Add/Delete To-Do List</h2>

            <form onSubmit={handleSubmit} className="input-form">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter a user name..."
                    className="name-input"
                />
                <button type="submit" className="add-btn">Add</button>
            </form>

            <h3 className="list-header">
                Total Items ({submittedNames.length})
            </h3>

            <ul className="list-container">
                {submittedNames.map((n, i) => (
                    <li key={i} className="list-item">
                        <span className="item-name">{n}</span>
                        <button onClick={() => handleDelete(i)} className="delete-btn">
                            Delete
                        </button>
                    </li>
                ))}
                {submittedNames.length === 0 && (
                    <p className="empty-message">No items found.</p>
                )}
            </ul>
        </div>
    );
}

export default App;