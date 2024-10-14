import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/Common/PageHeader';

const breadcrumb = [
    {

        name: 'Home /',
        link: '/home',
    },
    {
        
        name: ' Become an Instructor',
        link: '/become-an-instructor',
    },
    ];

const BecomeAnInstructor = () => {
  return (
    <div className='w-full'>
        <PageHeader title="Become an Instructor" breadcrumb={breadcrumb} /> 
    </div>
  );
}

export default BecomeAnInstructor;