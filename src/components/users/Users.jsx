import React from 'react'

const Users = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        console.log(name, email);
    }
  return (
    <div>
      <div>
        <h1>users</h1>
        <form className='space-y-4 bg-gray-100 p-4 ' action="" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder='name' />
          <input type="text" name="email" placeholder='email' />
          <button>add user</button>
        </form>
      </div>
    </div>
  )
}

export default Users
