import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';

const UpdateUser = () => {
    const { id } = useParams(); // URL থেকে আইডি নেওয়ার জন্য
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        // এখানে আমরা আইডি ব্যবহার করে ইউজারের ডেটা লোড করব
        fetch(`http://localhost:5000/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data))
            .catch(error => console.error("Error fetching user data:", error));
    }, [id]);

    const handleFormUpdate = (e) => {
        e.preventDefault();
        // এখানে আমরা ইউজারের ডেটা আপডেট করার জন্য ফর্ম সাবমিট হ্যান্ডলার লিখব
        // উদাহরণস্বরূপ, আমরা ইউজারের নাম এবং ইমেইল আপডেট করতে পারি
        const updatedUser = {
            name: e.target.name.value,
            email: e.target.email.value
        };

        // ব্যাকএন্ডে PUT রিকোয়েস্ট পাঠানো
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        })
            .then(response => response.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    alert('User updated successfully');
                    navigate('/users'); // আপডেটের পরে ইউজার লিস্ট পেজে রিডাইরেক্ট করা
                }
            })
            .catch(error => console.error("Error updating user:", error));
    }

    return (
        <div>
            <h2>Update Info for: {user.name}</h2>
            <p>This is where the update user form will go.</p>
          
            {/* এখানে আমরা ইউজারের ডেটা দেখাব এবং আপডেট করার ফর্ম রাখব */}
            <form onSubmit={handleFormUpdate}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={user.name}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={user.email}
                    />
                </div>
                <button type="submit">Update User</button>
            </form>
        </div>
    )
}

export default UpdateUser
