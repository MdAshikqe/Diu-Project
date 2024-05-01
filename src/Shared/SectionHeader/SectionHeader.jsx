import React from 'react';

const SectionHeader = ({heading,subHeading}) => {
    return (
        <div className='mx-auto w-4/12 text-center py-8'>
            <p className='text-yellow-600 py-2'>--- {subHeading} ---</p>
            <h3 className='uppercase text-4xl font-semibold border-y-4 py-4 '>{heading}</h3>
            
        </div>
    );
};

export default SectionHeader;