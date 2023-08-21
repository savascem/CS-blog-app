import React, { useState } from 'react'

const Login = () => {

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log('xyz2');
            const response = await fetch('http://127.0.0.1:8000/api/account/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginForm)
            });
            if (response.ok) {
                console.log('xyz1');
                const data = await response.json();
                const accessToken = data.access;
                console.log(accessToken);
                localStorage.setItem('accessToken', accessToken);
                window.location.href = '/'
            } else {
                setError('Please filling the form correctly!!');
            }
        } catch (error) {
            console.error('Login Error', error);
        }
    };

    return (
        <div className='flex h-screen bg-slate-50'>
            <div className='m-auto w-4/5 md:w-2/5 lg-w-3/5 border p-6 md:p-10 lg:p-20 rounded-xl bg-white'>
                <form onSubmit={handleLogin} >
                    <h2 className='text-center text-4xl text-slate-700 mb-2 font-semibold'>Login</h2>
                    <p className='text-center text-slate-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                    <hr className='mt-5 border border-slate-200' />
                    <div className='pt-10'>
                        <label htmlFor="email" className='text-xl text-bg-slate-500' >Email:</label>
                        <input className='mt-2 border border-slate-500 rounded-lg p-3 w-full text-slate-400 focus:text-slate-600 focus:outline-blue-400' type="email" id='email' name='email' value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
                    </div>
                    <div className='pt-5 mb-3'>
                        <label htmlFor="password" className='text-xl text-bg-slate-500' >Your Password:</label>
                        <input className='mt-2 border border-slate-500 rounded-lg p-3 w-full text-slate-400 focus:text-slate-600 focus:outline-blue-400' type="password" id='password' name='password' value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                    </div>
                    <button className='mt-6 py-2 rounded-md text-white bg-blue-600 w-full border border-blue-900 hover:bg-blue-500 transition duration-300' type='submit'>Login</button>
                    <h3 className='mt-3 text-center'>You don't have any account? <a href="/signup" className='text-blue-500 hover:text-blue-600 transition duration-150'>Register!</a></h3>
                    <div className='text-center'>
                        {error ? (<div className="text-red-500 mt-2">{error}</div>) : (<div></div>)}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login