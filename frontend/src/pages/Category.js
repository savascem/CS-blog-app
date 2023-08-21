import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Link, Navigate } from 'react-router-dom';
import axios from "axios";


const Category = () => {

    const { category } = useParams();
    const [catPosts, setCatPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState(3);

    let today = 0;
    let thisMonth = 0;
    let lastMonth = 0;
    let thisYear = 0;

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/blog/post/category/${category}/`)
            .then(response => setCatPosts(response.data))
            .catch(error => console.log(error))
    }, []);

    const handleLoadMore = () => {
        setVisiblePosts(prevCount => prevCount + 3);
    }

    let now = new Date();

    catPosts.map(item => {
        let itemDate = new Date(item.created_at);
        if (itemDate.getYear() === now.getYear()) {
            thisYear++;;
            if (itemDate.getMonth() + 1 === now.getMonth() + 1) {
                thisMonth++;
                if (itemDate.getDate() === now.getDate()) {
                    today++;
                }
            } else if (itemDate.getMonth() + 1 === now.getMonth()) {
                lastMonth++;
            }
        }
    })

    let postNumber = [
        ['Today', today,],
        ['This Month', thisMonth,],
        ['Last Month', lastMonth,],
        ['This Year', thisYear,],
        ['All Time', catPosts.length]
    ]

    const handleDay = (item) => {
        let date = new Date(item.created_at);
        console.log(date)
        return <>{date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}</>
    }

    const uniqueUsers = () => {
        let arr = [];
        catPosts.map(item => {
            let id = item.creator_id;
            if (!arr.includes(id)) arr.push(id);
        })
        console.log(arr);
        return <>{arr.length}</>
    }

    return (
        <div>
            <div className='bg-slate-50'>
                <div className='container mx-auto pt-6 pb-6'>
                    <div className='bg-white px-20 py-6 rounded-xl'>
                        <h1 className='text-slate-600 text-3xl font-bold pb-4 tracking-wide'>Category : {category}</h1>
                        <h2 className='text-slate-500 text-xl pb-8'>In this category, <span className='font-bold'>{uniqueUsers()} different authors</span> have written articles.</h2>
                        <h1 className='text-slate-600 text-2xl font-bold pb-4 tracking-wide'>Total articles by time intervals:</h1>
                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">

                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Total Posts
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {postNumber.map(item => (
                                            <>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {item[0]}
                                                    </th>
                                                    <td class="px-6 py-4">
                                                        {item[1]}
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                        )}
                                    </>

                                </tbody>
                            </table>

                        </div>
                    </div>

                    <>
                        <hr className='my-10 border' />
                        <div className='w-50 flex justify-center'>
                            <h2 className='text-slate-600 text-5xl my-3 py-6 px-8 bg-white rounded-lg font-bold tracking-tight'>Articles</h2>
                        </div>
                        {catPosts ? (
                            <>
                                {catPosts.slice(0, visiblePosts).map(item => (
                                    <article class="my-12 p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                        <div class="flex justify-end items-center mb-5 text-gray-500">
                                            <span class="text-sm">{handleDay(item)}</span>
                                        </div>
                                        <h2 class="mb-2 text-2xl font-bold tracking-tight text-slate-600 dark:text-white"><button onClick={() => window.location = `/article/${item.id}`}>{item.title}</button></h2>
                                        <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
                                            {item.post.length > 300 ? `${item.post.slice(0, 300)}...` : item.post}
                                        </p>
                                        <div class="flex justify-between items-center">
                                            <div class="flex items-center space-x-4">
                                                <span class="font-medium dark:text-white">
                                                    Author : <button onClick={() => { window.location.replace(`/profile/${item.creator_id}`) }}>{item.creator_username}</button>
                                                </span>
                                            </div>
                                            <button onClick={() => window.location = `/article/${item.id}`} class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                                Read more
                                                <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                            </button>
                                        </div>
                                    </article>))}
                                {catPosts.length > visiblePosts && (
                                    <div className="text-center mt-4">
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
                            <div>
                                None
                            </div>
                        )
                        }
                    </>
                </div>
            </div>
        </div>
    )
}

export default Category