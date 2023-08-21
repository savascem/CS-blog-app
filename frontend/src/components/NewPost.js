import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {

    const { user } = useContext(UserContext);
    const userID = user.user_id;

    const navigation = useNavigate();

    const [postForm, setPostForm] = useState({
        title: '',
        post: '',
        category: '',
        creator: userID,
    })

    const handlePost = async (e) => {
        e.preventDefault();

        try {
            let result = await axios.post('http://127.0.0.1:8000/api/blog/post/', postForm)
            console.log(result.data);
            navigation("/");
            window.location.reload(false);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const inputClass = 'w-full outline-none border border-green-200 text-slate-500 focus:border-green-500 focus:text-slate-600 focus:bg-white py-2 px-2 rounded-lg shadow-sm';

    return (
        <div className='rounded-xl bg-slate-100'>
            <div className='flex justify-center'>
                <span className='bg-white shadow-sm rounded-md mb-2 text-2xl font-bold tracking-tight text-slate-600 dark:text-white text-center py-4 px-10 mt-6'>
                    <h1>Create new article</h1>
                    <span className='text-sm font-light'>*If you want to add an image to your article, after moving to a new line, simply paste the image link that starts with '<mark>https://</mark>' onto the screen. </span>
                </span>
            </div>
            <form onSubmit={handlePost} className='w-4/5 mx-auto space-y-4 py-4'>
                <div className='space-y-4'>
                    <input type="text" name='title' key='title' id='title' className={inputClass} placeholder='Title here..' value={postForm.title} onChange={
                        (e) => setPostForm({ ...postForm, title: e.target.value })
                    } />
                    <textarea className={inputClass}
                        key='post'
                        value={postForm.post}
                        onChange={(e) => setPostForm({ ...postForm, post: e.target.value })}
                        rows={30}
                        cols={100}
                    />
                </div>
                <div className='text-center'>
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                        Category</label>
                    <div className="relative flex justify-center">
                        <select key='category' className="block appearance-none text-center bg-gray-200 border border-gray-200 text-gray-700 py-3 w-3/5 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" value={postForm.category} onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                        >
                            <option>-</option>
                            <option>Education</option>
                            <option>Tech</option>
                            <option>Sport</option>
                            <option>Life</option>
                            <option>Development</option>
                            <option>Music</option>
                            <option>AI</option>
                        </select>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button type='submit' className='border border-green-400 text-white bg-green-500 hover:bg-green-400 hover:text-white px-4 py-2 rounded-full text-lg tracking-wide transition duration-200'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default NewPost