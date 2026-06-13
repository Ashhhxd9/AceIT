import { getInterviewerProfile } from '@/actions/booking';
import { GravityStarsBackgroundDemo } from '@/components/demo-components-backgrounds-stars';
import { GrayTitle, SectionLabel } from '@/components/reusables';
import {Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowLeft} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import React from 'react'
import { CATEGORY_LABEL, EXPECT_ITEMS } from '@/lib/data';
import  SlotPicker  from './_components/SlotPicker';
import { getCurrentUser } from '@/actions/user';

const InterviewerProfilePage = async({params}) => {
  const {id} =await params;

  const dbUser = await getCurrentUser();
  const interviewer = await getInterviewerProfile(id);
  if(!interviewer) notFound();
  const plainInterviewer= JSON.parse(JSON.stringify(interviewer));
  return (
   <main className='min-h-screen bg-black'>
    <section className='relative border-b border-white/8 overflow-hidden'>
    <GravityStarsBackgroundDemo />


      <div className='relative max-w-6xl mx-auto px-8 pt-20 pb-14 flex flex-col
      gap-8'>
        <Link href="/explore">
        <Button variant='link' className="text-stone-500 cursor-pointer">
          <ArrowLeft size={13} />
          Back to Explore
          </Button>
        </Link>

        <div className='flex items-start gap-8'>
            <Avatar className="w-24 h-24 border-2 border-white/10 shrink-0
            rounded-2xl">
                <AvatarImage
                src={interviewer.imageUrl}
                alt={interviewer.name}
                className="rounded-2xl"/>

                <AvatarFallback className="rounded-2xl bg-cyan-400/10 border
                border-cyan-400/20 text-cyan-400 text-3xl font-medium">
                    {interviewer.name?.[0] ?? "?"}

                </AvatarFallback>
            </Avatar>
            <div className='flex flex-col gap-3 min-w-0 pt-1'>
                <h1 className='font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.05]
                tracking-tight'>
                    <GrayTitle>{interviewer.name}</GrayTitle>
                </h1>

                {interviewer.title && interviewer.company &&(
                    <p className='text-base text-stone-400 font-light'>
                        {interviewer.title}
                        <span className='text-stone-700 mx-2'>.</span>
                        {interviewer.company}
                    </p>
                )}

                <div className='flex items-center gap-2 flex-wrap mt-1'>
                    {interviewer.yearsExp && (
                        <Badge
                        variant="outline"
                        className='border-white/10 text-stone-400 text-xs px-3 py-1'>
                            {interviewer.yearsExp}+ years experience
                        </Badge>
                    )}
                    <Badge
                    variant="outline"
                    className='border-cyan-400/25 bg-cyan-400/8 text-cyan-400 text-xs 
                    px-3 py-1'>
                        {interviewer.creditRate ?? 1} credits / session
                    </Badge>

                    {interviewer.availabilities?.[0] && (
                        <Badge
                        variant="outline"
                        className='border-green-500/20 bg-green-500-8 text-green-400
                        text-xs px-3 py-1'>
                          🟢 Available
                        </Badge>
                    )}
                </div>
            </div>
        </div>
      </div>
    </section>

    <div className='max-w-6xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-5
    gap-10 items-start'>
        <div className='lg:col-span-3 flex flex-col gap-6 order-2 lg:-order-1'>
            {interviewer.bio && (
                <div className='bg-[#0f0f11] border border-white/10 rounded-2xl p-8 flex
                flex-col gap-5'>
                    <SectionLabel>About</SectionLabel>
                    <p className='text-base text-stone-300 font-light leading-relaxed'>
                        {interviewer.bio}
                    </p>
                </div>
            )}

            {interviewer.categories?.length > 0 && (
                <div className='bg-[#0f0f11] border border-white/10 rounded-2xl p-8 flex
                flex-col gap-5'>
                    <div>
                        <SectionLabel>Specialities</SectionLabel>
                        <p className='text-sm text-stone-500 font-light mt-1'>
                            Categories of Interviews that this expert covers.
                        </p>
                    </div>
                    <div>
                        {interviewer.categories.map((cat) => (
                            <span key={cat}
                            className='text-sm px-4 py-2 rounded-xl border border-cyan-400/20
                            bg-cyan-400/5 text-cyan-400'>
                                {CATEGORY_LABEL[cat] ?? cat}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            <div className='bg-[#0f0f11] border border-white/10 rounded-2xl p-8 flex flex-col
            gap-6'>
                <div>
                    <SectionLabel>What to expect</SectionLabel>
                    <p className='text-sm text-stone-500 font-light mt-1'>
                        Every session on AceIT includes the following.
                    </p>
                </div>

                <ul>
                    {EXPECT_ITEMS.map(([icon,title,desc])=>(
                        <li key={title} className='flex items-start gap-4'>
                            <span className='mt-0.5 w-10 h-10 shrink-0 rounded-xl
                            bg-cyan-400/10 border border-cyan-400/20 flex items-center
                            justify-center text-lg'>
                                {icon}
                            </span>

                            <div className='flex flex-col gap-0.5'>
                                <p className='text-sm font-medium text-stone-200'>
                                    {title}
                                </p>
                                <p className='text-xs text-stone-500 font-light leading-relaxed' >
                                    {desc}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

{/*RIGHt Side-sticky slot picker*/}



<div className='w-full lg:col-span-2'>
   <SlotPicker 
  interviewer={plainInterviewer}
  interviewerCredits={plainInterviewer.creditRate ?? 1}
  userCredits={dbUser.credits}
/>
</div>


    </div>
    </main>
  )
}

export default InterviewerProfilePage;
