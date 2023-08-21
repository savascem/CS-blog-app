import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);

    const navigation = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/account/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                const data = await response.json();
                navigation('/login');
            } else {
                setError('Please filling the form correctly!!');
            }
        } catch (error) {
            setError("An error occurred while processing your request.");
        }
    };

    return (
        <div className='flex h-screen bg-slate-50'>
            <div className='m-auto w-4/5 md:w-2/5 lg-w-3/5 border p-6 md:p-10 lg:p-20 rounded-xl bg-white'>
                <form onSubmit={submit}>
                    <h2 className='text-center text-4xl text-slate-700 mb-2 font-semibold'>Sign up</h2>
                    <p className='text-center text-slate-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                    <hr className='mt-5 border border-slate-200' />
                    <div className='pt-10'>
                        <label htmlFor="username" className='text-xl text-bg-slate-500' >Username:</label>
                        <input className='mt-2 border border-slate-500 rounded-lg p-3 w-full text-slate-400 focus:text-slate-600 focus:outline-blue-400' type="text" name="username" id="username" placeholder='username' value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                    </div>
                    <div className='pt-5'>
                        <label htmlFor="email" className='text-xl text-bg-slate-500' >Email:</label>
                        <input className='mt-2 border border-slate-500 rounded-lg p-3 w-full text-slate-400 focus:text-slate-600 focus:outline-blue-400' type="email" name="email" id="email" placeholder='email' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div className='pt-5'>
                        <label htmlFor="password" className='text-xl text-bg-slate-500' >Your Password:</label>
                        <input className='mt-2 border border-slate-500 rounded-lg p-3 w-full text-slate-400 focus:text-slate-600 focus:outline-blue-400' type="password" name="password" id="password" placeholder='password' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </div>
                    <button className='mt-5 py-2 rounded-md text-white bg-blue-600 w-full border border-blue-900 hover:bg-blue-500 transition duration-300' type='submit'>Register</button>
                    <h3 className='mt-3 text-center'>Already you have an account? <a href="/login" className='text-blue-900 hover:text-blue-600 transition duration-150'>Login!</a></h3>
                    <div className='text-center'>
                        {error ? (<div className="text-red-500 mt-2">{error}</div>) : (<div></div>)}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp