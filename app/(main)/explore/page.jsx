import { getInterviewers } from '@/actions/explore';
import PageHeader from '@/components/reusables';
import React from 'react'
import ExploreGrid from './_components/ExploreGrid';

const ExplorePage = async () => {

    const interviewers=await getInterviewers();
  return (
  <main className='min-h-screen bg-black'>
 <PageHeader label="Explore"
 gray="Search your"
 blue="expert interviewer"
 description="Browse senior engineers from top companies of your choice"/>

<div className='max-w-6xl mx-auto px-8 xl:px-0 py-10'>
    <ExploreGrid interviewers={interviewers}/>
</div>

  </main>
)};

export default ExplorePage;
