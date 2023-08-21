import React, { useContext, useState } from 'react'
import { TfiPencilAlt } from 'react-icons/tfi';
import { ImBooks } from 'react-icons/im';
import Posts from './Posts';
import { useNavigate } from 'react-router-dom';
import NewPost from './NewPost';
import { UserContext } from '../contexts/UserContext';

const SwitchComponentHome = () => {

    const [newPost, setNewPost] = useState(false);

    const { user } = useContext(UserContext);

    const navigation = useNavigate();

    const mainClass = 'border-t border-r border-l px-6 pt-3 pb-1 bg-white text-slate-500 hover:text-slate-400 transition duration-200 items-center flex w-min';

    const readClass = " hover:text-slate-50 text-white";
    const postClass = " hover:text-slate-50 text-white";

    const btnText = "tracking-wider font-semibold text-md pl-3"

    return (
        <div>
            {/* Add Post */}

            {user ? (
                <>
                    <div className='flex justify-center' key='switch-components'>

                        <button key='read-switch' className={`${!newPost ? (readClass) : ("")} ${mainClass} rounded-tl-xl`} onClick={() => setNewPost(false)} style={!newPost ? { backgroundColor: "#1E90FF" } : {}}>
                            <ImBooks size={40} />
                            <span className={`${btnText}`}>Read</span>
                        </button>

                        <button key='post-switch' className={`${mainClass} rounded-tr-xl ${newPost ? (postClass) : ("")}`} onClick={() => setNewPost(true)} style={newPost ? { backgroundColor: "#32CD32" } : {}}>
                            <TfiPencilAlt size={46} />
                            <span className={`${btnText}`}>New Post</span>
                        </button>

                    </div>
                    <hr className='mx-20 border border-slate-200' />
                </>
            ) : (
                <>
                    <div className='flex justify-center'>
                        <div className='w-50 flex justify-center'>
                            <hr className='border' />
                            <h2 className='text-slate-600 text-5xl mb-3 py-6 px-8 bg-white rounded-lg font-bold tracking-tight'>Articles</h2>
                        </div>
                    </div>
                </>
            )}

            <div className='bg-slate-100 mx-2 py-4 mb-6 rounded-xl'>


                {newPost ? (
                    <>
                        <NewPost />
                    </>
                ) : (
                    <div >
                        {/* POSTS */}
                        <div className='w-50 flex justify-center'>
                        </div>
                        <Posts className='bg-white mx-4 mb-8' />
                    </div>
                )}
            </div>

        </div>
    )
}

export default SwitchComponentHome