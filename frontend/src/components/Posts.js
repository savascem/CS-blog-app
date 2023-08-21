import React, { useState, useEffect } from 'react'
import { BsHandThumbsUp, BsHandThumbsDown } from 'react-icons/bs';
import axios from 'axios';


const Posts = () => {

    const [data, setData] = useState('');
    const [visiblePosts, setVisiblePosts] = useState(4);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/blog/post/')
            .then(response => response.json())
            .then(data => {
                setData(data)
                console.log(data);
            })
            .catch(error => console.log('error'));
    }, []);

    const handleDay = (item) => {
        let dt1 = new Date();
        let dt2 = new Date(item.created_at);
        let diff = Math.floor(
            (Date.UTC(dt2.getFullYear(), dt1.getMonth(), dt1.getDate()) -
                Date.UTC(dt1.getFullYear(), dt2.getMonth(), dt2.getDate())) /
            (1000 * 60 * 60 * 24)
        );
        return <>{diff ? `${diff} days ago` : "Today"}</>
    }

    const handleLoadMore = () => {
        setVisiblePosts(prevCount => prevCount + 3);
    }

    return (
        <div>
            {data ? (
                <>
                    {data.slice(0, visiblePosts).map(item => (
                        <>
                            <div className='lg:m-10 bg-white rounded-md' key={item.id}>

                                <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700" key={`article-${item.id}`}>
                                    <div key={`id-category-${item.id}`} className="flex justify-between items-center mb-5 text-gray-500">
                                        <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                            <button onClick={() => window.location.replace(`/category/${item.category}`)}>{item.category}</button>
                                        </span>
                                        <span className="text-sm" key={`id-date-${item.id}`}>{handleDay(item)}</span>
                                    </div>
                                    <h2 className="mb-2 text-2xl font-bold tracking-tight text-slate-600 dark:text-white"><button key={`id-title-${item.id}`} onClick={() => window.location = `/article/${item.id}`}>{item.title}</button></h2>
                                    <p className="mb-5 font-light text-gray-500 dark:text-gray-400" key={`id-post-${item.id}`}>
                                        {item.post.length > 200 ? `${item.post.slice(0, 200)}...` : item.post}
                                    </p>
                                    <div className="flex justify-between items-center" key={`author-${item.id}`}>
                                        <div className="flex items-center space-x-4" key={`id-username-${item.id}`}>
                                            <span className="font-medium dark:text-white">
                                                Author : <button onClick={() => { window.location = `profile/${item.creator_id}` }}>{item.creator_username}</button>
                                            </span>
                                        </div>
                                        <button key='read-more' onClick={() => window.location = `/article/${item.id}`} className="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                            Read more
                                            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </button>
                                    </div>
                                </article>
                            </div>
                        </>
                    ))}
                    {data.length > visiblePosts && (
                        <div className="text-center mt-4" key='load-more'>
                            <button
                                onClick={handleLoadMore}
                                className="px-4 py-2 font-medium text-slate-700 rounded"
                            >
                                Load More..
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <>

                </>
            )
            }
        </div >
    )
}

export default Posts