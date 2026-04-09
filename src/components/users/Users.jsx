import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([]); // Database theke ana data ekhane thakbe

  // ১. Data Load kora (Page load holei data dekhabe)
  useEffect(() => {
    fetch('http://localhost:5000/users')    
    .then(res => res.json())
      .then(data => {
        setUsers(data);
        // console.log("Fetched Users:", data);
      })
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  // ২. Notun User Add kora
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };

    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          alert('User added successfully');
          // UI-te sathe sathe notun user add korar jonno:
          setUsers([...users, { ...user, _id: data.insertedId }]);
          e.target.reset();
        }
      })
      .catch(err => console.error("Error posting data:", err));
  }

  const handleDelete = (id) => {
    console.log("Deleting ID:", id);
    fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          alert('User deleted successfully');
          setUsers(users.filter(user => user._id !== id));
        }
      })
      .catch(err => console.error("Error deleting user:", err));

  }

  const handleUpdate = (id) => {
    console.log("Updating ID:", id);
    // Update logic will go here
    alert('Update functionality coming soon!');
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Users Management</h1>

      {/* Form for adding users */}
      <form onSubmit={handleSubmit} className='space-y-4 bg-gray-100 p-4'>
        <input type="text" name="name" placeholder='Name' required />
        <input type="email" name="email" placeholder='Email' required />
        <button type="submit">Add User</button>
      </form>

      <hr style={{ margin: '20px 0' }} />

      {/* ৩. Data List UI te dekhano */}
      <h2>Total Users: {users.length}</h2>
      <ul>
        {
          users.map(u => (
            <li key={u._id || u.email}>
              <strong>{u.name}</strong> - {u.email}

              <button onClick={() => handleDelete(u._id)} style={{ marginLeft: '10px' }}>
                Delete
              </button>

              <button style={{ marginLeft: '10px' }} onClick={() => handleUpdate(u._id)}>
                Update
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Users;
