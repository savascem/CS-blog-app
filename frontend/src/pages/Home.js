import React, { useContext, useEffect, useState } from 'react';
import RightSide from '../components/RightSide';
import SwitchComponentHome from '../components/SwitchComponentHome';
import { UserContext } from '../contexts/UserContext';

const Home = () => {

    return (
        <div className='bg-slate-50'>
            <div className='lg:container lg:mx-auto'>
                <div className="lg:grid lg:grid-cols-4 lg:grid-rows-1">

                    <div className="col-span-3 pt-6">

                        {/* Hero content */}
                        <SwitchComponentHome />

                    </div>

                    <div className="col-span-1 mt-10 pr-2">

                        {/* Right Component */}
                        <RightSide />

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;