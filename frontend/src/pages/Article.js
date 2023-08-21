import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './../contexts/UserContext';
import { MdPostAdd } from 'react-icons/md';
import { FaBookReader } from 'react-icons/fa';
import UpdateArticle from '../components/UpdateArticle';
import ReactMarkdown from 'react-markdown';

const Article = () => {

    const { articleid } = useParams();
    const { user } = useContext(UserContext);

    const [item, setItem] = useState('');
    const [update, setUpdate] = useState(false);
    const [postC, setPostC] = useState();


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/blog/post/${articleid}`)
            .then(response => response.json())
            .then(data => {
                setItem(data)
                setPostC(item.post.split('\n'))
            })
            .catch(error => console.log('error'));
    }, []);

    const handleDay = () => {
        let date = new Date(item.created_at);
        console.log(date)
        return <>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</>
    }

    const mainClass = 'border-t border-r border-l px-6 pt-3 pb-1 bg-white text-slate-500 hover:text-slate-400 transition duration-200 items-center flex w-min';

    const profileClass = " text-white hover:text-slate-50";
    const updateClass = " text-white hover:text-slate-50";

    const btnText = "tracking-wider font-semibold text-md pl-3"

    return (
        <div className='bg-slate-50 pb-10'>
            <div>
                {item.creator_id == user.user_id ? (
                    <div>
                        <div className='flex justify-center pt-6'>
                            <button className={`${mainClass} rounded-tl-xl ${update ? "" : (profileClass)}`} onClick={() => setUpdate(false)} style={!update ? { backgroundColor: "#1E90FF" } : {}}>
                                <FaBookReader size={30} />
                                <span className={`${btnText}`}>Article</span>
                            </button>

                            <button className={`${mainClass} rounded-tr-xl ${update ? (updateClass) : ""}`} onClick={() => setUpdate(true)} style={update ? { backgroundColor: "#32CD32" } : {}}>
                                <MdPostAdd size={40} />
                                <span className={`${btnText}`}>Config</span>
                            </button>
                        </div>
                        <hr className='mx-52 border border-slate-200' />
                    </div>) : (<div className='pb-10'></div>)}

            </div>

            <div className='container mx-auto'>
                <div className='pb-8 px-0 sm:px-2 md:px-4 lg:px-8'>
                    {update ? (
                        <>
                            <div className='pb-10 mx-4 rounded-lg'>
                                <UpdateArticle post={item} />
                            </div>
                        </>
                    ) : (
                        <div className='pb-10 mx-4 rounded-lg'>
                            {/* POSTS */}
                            <article class="p-16 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <div class="flex justify-between items-center mb-5 text-gray-500 pb-4">
                                    <span class="bg-primary-100 text-primary-800 text-lg font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">Category :
                                        <button className='text-slate-600 text-xl hover:text-blue-500 transition duration-150' onClick={() => window.location.replace(`/category/${item.category}`)}> {item.category}</button>
                                    </span>
                                    <span class="text-md">{handleDay(item)}</span>
                                </div>
                                <h2 class="my-4 text-center text-5xl font-bold tracking-tight text-slate-600 dark:text-white">{item.title}</h2>
                                <div className='mb-5 py-4 sm:py-6 md:py-10'>
                                    {item.post ? (item.post.split('\n').map(
                                        post => (

                                            !post.startsWith('https://') ?

                                                (post.startsWith('# ') ?

                                                    (<p className='text-2xl font-semibold tracking-tight text-slate-600'><span>&nbsp;</span>{post}</p>)
                                                    :
                                                    (<p class="font-tight text-xl text-gray-500 dark:text-gray-400"><span>&nbsp;</span>{post}</p>)

                                                )

                                                :

                                                (<img src={post} alt="image" className='flex w-3/5 mx-auto' />)
                                        )

                                    )

                                    ) : (<div></div>)}
                                </div>
                                <div class="flex justify-between items-center">
                                    <div class="flex items-center space-x-4">
                                        <span class="font-medium text-lg dark:text-white">
                                            Author : <button onClick={() => window.location.replace(`/profile/${item.creator_id}`)}>{item.creator_username}</button>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default Article