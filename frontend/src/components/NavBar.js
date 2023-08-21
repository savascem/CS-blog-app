import React, { useState, useEffect, useContext } from 'react'
import { FaRegUser } from "react-icons/fa";
import jwtDecode from 'jwt-decode';
import { UserContext } from '../contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { TfiWrite } from "react-icons/tfi";
import SearchPost from './SearchPost';
import { CiSearch } from 'react-icons/ci';

const NavBar = ({ setSearch, search, setState }) => {

    const { user } = useContext(UserContext);

    const navigation = useNavigate();

    const searchClick = () => {
        navigation('/search/');
        setState(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    };

    const clickProfile = () => {
        navigation("/profile/" + String(user.user_id));
        window.location.reload();
    }

    const newPost = () => {
        navigation("/create/");
        //window.location.reload();
    }

    const buttonStyles = 'py-3 px-5 rounded-full border transition duration-200 tracking-wide font-medium';

    return (
        <div className='w-full bg-gradient-to-b from-white to-backdrop-opacity-100 pt-6'>
            <div className='md:container md:mx-auto'>
                <div className="flex justify-between pb-6 items-center">

                    {/* navbar logo */}
                    <button className='py-1 px-2 border-slate-250 hover:border-blue-800 hover:bg-slate-50 transition duration-200 border-solid border-4 rounded-md bg-white' onClick={() => navigation('/')}>
                        <h1 className="px-1 font-medium text-transparent text-5xl bg-clip-text bg-gradient-to-r from-blue-800 to-slate-600 tracking-tighter">CS</h1>
                        <hr className='border border-slate-600 bg-clip-text bg-gradient-to-r from-blue-800 to-slate-600' />
                        <span className='font-extralight tracking-widest text-xs bg-clip-text bg-gradient-to-r from-blue-800 to-slate-600'>BLOG</span>
                    </button>

                    {/* navbar search */}
                    <div className='w-4/5 lg:w-3/5 invisible md:visible '>
                        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <CiSearch className='absolute my-4 ml-1' size={20} />
                            </div>
                            <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} required />
                            <button type="submit" onClick={searchClick} className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </div>

                    {/* navbar buttons */}
                    <div className="">
                        {user ? (
                            <div className='flex'>

                                <button onClick={newPost} className='font-semibold text-lg flex items-center text-green-700 hover:text-green-500 transition duration-200 mx-2 gap-1'>
                                    <TfiWrite size={24} /><span>New Post</span>
                                </button>

                                <button onClick={clickProfile} className='font-semibold text-lg flex items-center text-blue-800 hover:text-blue-400 transition duration-200 mx-5' key={user.id}>
                                    <FaRegUser className='pr-1' />{user.user}
                                </button>

                                <a onClick={handleLogout}>
                                    <button className={buttonStyles + ' border-red-900 bg-white text-red-800 hover:bg-red-600 hover:text-white'}>Logout</button>
                                </a>
                            </div>
                        ) : (
                            <div className='flex'>

                                <a href="/login">
                                    <button className={buttonStyles + ' border-blue-900 bg-white text-blue-800 hover:bg-blue-300 hover:text-white'}>Login</button>
                                </a>

                                <a href="/signup">
                                    <button className={buttonStyles + ' sm:ml-3 border-blue-900 bg-blue-600 text-white hover:bg-blue-300 hover:text-white'}>Register</button>
                                </a>

                            </div>
                        )}
                    </div>
                </div>
                {/* navbar search */}
                <div className='md:h-0 visible md:invisible' s>
                    <div className='visible md:invisible pb-2'>
                        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <input type="search" id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} required />
                            <button type="submit" onClick={searchClick} className="text-white absolute right-2.5 bottom-2.5 bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default NavBar