import React from 'react'

const AlreadyLoggedIn = () => {

    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // Remove the token from local storage
        window.location.href = '/login';
    };

    return (
        <div>
            <h1>You have already logged in..</h1>
            <h2>Do you want to <button onClick={handleLogout} className='text-red-600'>Logout</button>!!</h2>
        </div>
    )
}

export default AlreadyLoggedIn