import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import ProfileDetails from '../components/ProfileDetails';
import { RiAccountBoxLine } from 'react-icons/ri';
import { MdManageAccounts } from 'react-icons/md';
import ProfileForm from '../components/ProfileForm';
import RightSide from './../components/RightSide';


const Profile = () => {

    const { id } = useParams();
    const { user } = useContext(UserContext);

    const [profile, setProfile] = useState('');
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/profile/${id}/`)
            .then(response => {
                setProfile(response.data);
            })
            .catch(error => {
                console.error('GET Error:', error);
            });
    }, []);

    const mainClass = 'border-t border-r border-l px-6 pt-3 pb-1 bg-white text-slate-500 hover:text-slate-400 transition duration-200 items-center flex w-min';

    const profileClass = " text-white hover:text-slate-50";
    const updateClass = " text-white hover:text-slate-50";

    const btnText = "tracking-wider font-semibold text-md pl-3"

    return (
        <div className='bg-slate-50'>
            <div className='container mx-auto'>
                <div className="lg:grid lg:grid-cols-4 lg:grid-rows-1">
                    <div className='col-span-3'>
                        {id == user.user_id ? (
                            <div>
                                <div className='flex justify-center pt-6'>
                                    <button className={`${mainClass} rounded-tl-xl ${update ? "" : (profileClass)}`} onClick={() => setUpdate(false)} style={!update ? { backgroundColor: "#1E90FF" } : {}}>
                                        <RiAccountBoxLine size={40} />
                                        <span className={`${btnText}`}>Profile</span>
                                    </button>

                                    <button className={`${mainClass} rounded-tr-xl ${update ? (updateClass) : ""}`} onClick={() => setUpdate(true)} style={update ? { backgroundColor: "#32CD32" } : {}}>
                                        <MdManageAccounts size={40} />
                                        <span className={`${btnText}`}>Update</span>
                                    </button>
                                </div>
                                <hr className='mx-52 border border-slate-200' />
                            </div>) : (
                            <div className='pb-10'>

                            </div>

                        )}


                        {update ? (

                            <>
                                <div className='md:pb-10 mx-4 rounded-lg'>
                                    <ProfileForm userProfile={profile} id={id} />
                                </div>
                            </>

                        ) : (
                            <div className='pb-10 mx-4 rounded-lg'>
                                {/* POSTS */}
                                <ProfileDetails userProfile={profile} id={id} />
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-1 mt-10 pr-2">

                        {/* Right Component */}
                        <RightSide />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;