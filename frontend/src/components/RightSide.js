import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { TwitterTimelineEmbed, TwitterFollowButton, TwitterShareButton } from 'react-twitter-embed';
import axios from "axios";


const RightSide = () => {

    const [users, setUsers] = useState();
    const categories = [
        'Education', 'Tech', 'Sport', 'Life', 'Development', 'Music', 'AI'
    ];

    const navigation = useNavigate();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/account/users/')
            .then(response => setUsers(response.data))
            .catch(error => console.log('error'));
    }, [])

    let handleDate = (item) => {
        let date = new Date(item.last_login);
        let minutes = date.getMinutes();
        let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return <>
            <h2>Last Login : {date.getDate()}/{date.getMonth()}/{date.getFullYear()}</h2>
            <h2>({date.getHours()}:{formattedMinutes})</h2>
        </>
    }

    return (
        <div className=''>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="cem_savass"
                options={{ height: 400 }}
            />
            <div className='pt-2 flex justify-center'>
                <TwitterFollowButton
                    screenName={'cem_savass'}
                />
            </div>

            <div className='p-6 mt-8 border border-collapse rounded-lg bg-slate-100'>
                <h2 className='text-center text-slate-500 tracking-wider font-semibold text-xl'>Categories</h2>
                <div className='pt-3 flex flex-wrap gap-2 justify-center'>

                    {categories.map(item => (
                        <div key={`${item}`}>
                            <button className='bg-white py-2 px-6 border font-medium border-slate-400 text-slate-400 tracking-wide rounded-full hover:bg-blue-300 hover:text-white transition duration-200' onClick={() => window.location.replace(`/category/${item}`)}>{item}</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className='p-6 my-8 border border-collapse rounded-lg bg-slate-100'>
                <h1 className='flex justify-center text-slate-500 tracking-wider font-semibold text-xl' >Users</h1>
                {users ? (
                    users.slice(0, 3).map(item =>
                        <div key={`user${item.id}`}>
                            <hr className='border border-slate-300 my-2' />
                            <div className=''>
                                <a className='text-slate-500 tracking-wide font-semibold text-md' onClick={() => window.location = `/profile/${item.id}`}><button>{item.username}</button></a>
                                <div className='text-end text-slate-400 tracking-medium font-semibold text-sm'>{handleDate(item)}</div>
                            </div>
                        </div>
                    )
                ) : (
                    <>  </>
                )}


            </div>
        </div>
    )
}

export default RightSide;