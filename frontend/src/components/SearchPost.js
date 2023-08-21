import React, { useState, useEffect } from 'react'

const SearchPost = ({ search, setState, state, setSearch }) => {
    const [data, setData] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [title, setTitle] = useState('');

    const getData = (state) => {
        if (state) {
            fetch('http://127.0.0.1:8000/api/blog/post/')
                .then(response => response.json())
                .then(data => {
                    setData(data)
                    if (search === '') {
                        setFilteredData(data);
                    } else {
                        const filtered = data.filter(item =>
                            item.title.toLowerCase().includes(search.toLowerCase()) || item.creator_username.toLowerCase().includes(search.toLowerCase())
                        );
                        setFilteredData(filtered);
                    }
                    setTitle(search);
                    setSearch('');
                })
                .catch(error => console.log('error'));
        }
        setState(false);
    }

    getData(state);
    console.log(filteredData)

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
    return (
        <div className='bg-slate-50'>
            {filteredData ?
                (<div>
                    <div className='flex justify-center'>
                        <span className='bg-white shadow-sm rounded-md mb-2 text-2xl font-bold tracking-tight text-slate-600 dark:text-white text-center py-4 px-10 mt-6'>Search results for: '<mark>{title}</mark>'</span>
                    </div>

                    {filteredData.map(item =>
                        <>
                            <div className='lg:m-10 bg-white rounded-md' key={item.id}>

                                <article class="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                    <div class="flex justify-between items-center mb-5 text-gray-500">
                                        <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
                                            <button onClick={() => window.location.replace(`/category/${item.category}`)}>{item.category}</button>
                                        </span>
                                        <span class="text-sm">{handleDay(item)}</span>
                                    </div>
                                    <h2 class="mb-2 text-2xl font-bold tracking-tight text-slate-600 dark:text-white"><button onClick={() => window.location = `/article/${item.id}`}>{item.title}</button></h2>
                                    <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
                                        {item.post.length > 200 ? `${item.post.slice(0, 200)}...` : item.post}
                                    </p>
                                    <div class="flex justify-between items-center">
                                        <div class="flex items-center space-x-4">
                                            <span class="font-medium dark:text-white">
                                                Author : <button onClick={() => { window.location = `profile/${item.creator_id}` }}>{item.creator_username}</button>
                                            </span>
                                        </div>
                                        <button onClick={() => window.location = `/article/${item.id}`} class="inline-flex items-center font-medium text-primary-600 dark:text-primary-500 hover:underline">
                                            Read more
                                            <svg class="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        </button>
                                    </div>
                                </article>
                            </div>
                        </>

                    )}
                </div>) : (
                    <>
                    </>
                )}
        </div >

    )
}

export default SearchPost;