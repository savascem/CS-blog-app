import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { RiDeleteBin2Line } from 'react-icons/ri';


const ProfileDetails = (props) => {

    const { id } = useParams();
    const { user } = useContext(UserContext);
    const navigation = useNavigate();

    const [userPosts, setUserPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(3);

    const propTitleClass = 'text-slate-500 tracking-wider font-semibold text-xl';
    const propContentClass = 'font-medium text-slate-400 tracking-wide text-lg'

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/blog/post/user/${props.id}/`)
            .then(response => setUserPosts(response.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = async (e, id) => {
        e.preventDefault();
        axios.delete(`http://127.0.0.1:8000/api/blog/post/${id}/`)
        window.location.reload(false);
    }

    const handleDay = (item) => {
        let date = new Date(item.created_at);
        console.log(date)
        return <>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</>
    }

    const handleLoadMore = () => {
        setVisiblePosts(prevCount => prevCount + 3);
    }

    return (
        <>
            <div className='sm:grid sm:grid-cols-3 gap-6 mx-4 p-10 bg-white rounded-xl shadow-md'>
                <div className='sm:col-1 flex justify-center'>
                    <div className='border rounded-full w-48 p-2'>
                        <img className='w-48 rounded-full' src={props.userProfile.profile_picture} alt="" />
                    </div>
                </div>
                <div className='sm:col-2'>
                    <div className='p-4'>
                        <h1 className={propTitleClass}>First Name :</h1>
                        <h2 className={propContentClass}>{props.userProfile.first_name}</h2>
                    </div>
                    <div className='p-4'>

                        <h1 className={propTitleClass}>Country :</h1>
                        <h2 className={propContentClass}>{props.userProfile.country}</h2>
                    </div>

                </div>
                <div className="sm:ol-3">
                    <div className='p-4'>
                        <h1 className={propTitleClass}>Last Name :</h1>
                        <h2 className={propContentClass}>{props.userProfile.last_name}</h2>
                    </div>
                    <div className='p-4'>
                        <h1 className={propTitleClass}>Education :</h1>
                        <h2 className={propContentClass}>{props.userProfile.education}</h2>
                    </div>
                </div>

            </div>

            <div className='w-50 flex justify-center pt-10'>
                <hr className='border' />
                <h2 className='text-slate-600 text-5xl my-3 py-6 px-8 bg-white rounded-lg font-bold tracking-tight'>Articles</h2>
            </div>
            <div>
                {userPosts.slice(0, visiblePosts).map(item => (
                    <div>
                        <article class="my-6 p-10 mx-4 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <div class="flex justify-between items-center mb-5 text-gray-500">
                                <span class="bg-primary-100 text-primary-800 text-sm font-medium inline-flex items-center rounded dark:bg-primary-200 dark:text-primary-800">Category :
                                    <button onClick={() => window.location.replace(`/category/${item.category}`)}> {item.category}</button>
                                </span>
                                <span class="text-sm">{handleDay(item)}</span>
                            </div>
                            <h2 class="mb-2 text-2xl font-bold tracking-tight text-slate-600 dark:text-white"><button onClick={() => window.location = `/article/${item.id}`}>{item.title}</button></h2>
                            <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
                                {item.post.length > 150 ? `${item.post.slice(0, 150)}...` : item.post}
                            </p>
                            <div class="flex justify-between items-center">
                                <div class="flex items-center space-x-4">
                                    <span class="font-medium dark:text-white">
                                        Author : <button onClick={() => { window.location.replace(`/profile/${item.creator_id}`) }}>{item.creator_username}</button>
                                    </span>
                                </div>
                                <div className=''>
                                    {id == user.user_id ? (
                                        <form onSubmit={(e) => handleDelete(e, item.id)}>
                                            <button className='py-1 px-3 text-red-800 border rounded-3xl border-red-500 bg-white hover:bg-red-500 hover:text-white transition duration-150 flex items-center gap-2' type='submit'><RiDeleteBin2Line /> Delete</button>
                                        </form>
                                    ) : (
                                        <div></div>
                                    )}

                                </div>
                                <button onClick={() => window.location = `/article/${item.id}`} class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                    Read more
                                    <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                            </div>

                        </article>
                    </div>
                )
                )}
                {userPosts.length > visiblePosts && (
                    <div className="text-center mt-4">
                        <button
                            onClick={handleLoadMore}
                            className="px-4 py-2 font-medium text-slate-700 rounded"
                        >
                            Load More..
                        </button>
                    </div>
                )}
            </div >
        </>
    )
}

export default ProfileDetails