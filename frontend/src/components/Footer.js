import React from 'react'
import { SocialIcon } from 'react-social-icons';

const Footer = () => {
    return (
        <div className='bg-gradient-to-b to-slate-800 from-slate-700'>
            <hr className='border border-slate-300' />
            <div className="lg:container lg:mx-auto grid grid-cols-4 p-10">
                <div className="col-1 p-2">
                    <h3 className='text-white tracking-wider text-lg'>Social Accounts</h3>
                    <div className='p-2'>
                        <SocialIcon className='scale-75' url="https://twitter.com/cem_savass" />
                        <SocialIcon className='scale-75' url="https://instagram.com/csavass" />
                        <SocialIcon className='scale-75' url="https://www.linkedin.com/in/cemsavas/" />
                    </div>
                </div>
                <div className="col-span-2 p-2 space-y-1">
                    <h3 className='text-white tracking-wider text-lg pb-2'>Lorem</h3>
                    <div className="grid grid-cols-2">
                        <div className="col-1">
                            <h4 className='text-white tracking-tighter'><a href="">Impsum</a></h4>
                            <h4 className='text-white tracking-tighter'><a href="">Impsum lorem</a></h4>
                            <h4 className='text-white tracking-tighter'><a href="">Lorem impsum</a></h4>
                        </div>
                        <div className="col-1">
                            <h4 className='text-white tracking-tighter'><a href="">Impsum</a></h4>
                            <h4 className='text-white tracking-tighter'><a href="">Impsum lorem</a></h4>
                            <h4 className='text-white tracking-tighter'><a href="">Lorem impsum</a></h4>
                        </div>
                    </div>
                </div>
                <div className="col-1 p-2 space-y-2">
                    <h3 className='text-white tracking-wider text-lg'>Lorem</h3>
                    <p className='text-white tracking-tighter' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nisi!</p>
                </div>
            </div>
            <h5 className='text-center text-slate-400 tracking-tighter pb-4'>© Copyright by <a className='text-slate-200 hover:text-blue-500 transition duration-150' href="https://www.linkedin.com/in/cemsavas/">Cem Savas</a>. Use for learning or your portfolio.</h5>
        </div>
    )
}

export default Footer