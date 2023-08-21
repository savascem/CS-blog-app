import React, { useState, useContext } from 'react'
import axios from 'axios';
import { UserContext } from './../contexts/UserContext';


const UpdateArticle = (props) => {

    const { user } = useContext(UserContext);
    const userID = user.user_id;
    let obj = props.post;

    const [article, setArticle] = useState({
        title: obj.title,
        post: obj.post,
        category: obj.category,
        creator: userID,
    });

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://127.0.0.1:8000/api/blog/post/${obj.id}/`, article, {
            })
            window.location.reload(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }

    const inputClass = 'w-full outline-none border border-green-200 text-slate-500 bg-slate-50 focus:border-green-500 focus:text-slate-600 focus:bg-white py-2 px-2 rounded-lg';

    console.log(article);


    return (
        <div className='rounded-xl bg-white py-8 px-10 shadow-sm'>
            <form onSubmit={handleUpdate}>

                <div className='space-y-4'>
                    <input type="text" name='title' id='title' className={inputClass} placeholder='Title here..' value={article.title} onChange={(e) => setArticle({ ...article, title: e.target.value })} />
                    <textarea className={inputClass}
                        value={article.post}
                        onChange={(e) => setArticle({ ...article, post: e.target.value })}
                        rows={30}
                        cols={100}
                    />
                </div>
                <div className='text-center
                py-4'>
                    <label class="block uppercase tracking-wide text-gray-700 text-sm font-bold mb-2" for="grid-state">
                        Category</label>
                    <div class="relative flex justify-center">
                        <select class="block appearance-none text-center bg-gray-200 border border-gray-200 text-gray-700 py-3 w-3/5 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state" value={article.category} onChange={(e) => setArticle({ ...article, category: e.target.value })}
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

export default UpdateArticle