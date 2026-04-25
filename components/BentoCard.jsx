import React from 'react'

const BentoCard = ({icon,title,desc,children,className="" }) => {
  return (
    <div
    className={`relative bg-[#0f0f11] border-white/10 hover:border-cyan-400 
    rounded-2xl p-9 h-full transition duration-300 overflow-hidden ${className}`}>
<span className='w-11 h-11 rounded-xl bg-cyan-400/10 border border-cyan-400/20 
flex items-center justify-center text-xl mb-5 '>
    {icon}
 </span>  

<h3 className='font-serif text-xl tracking-tight mb-2'>{title}</h3>

<p className='text-sm text-stone-400 leading-relaxed'>{desc}</p>

{children}

    </div>
  )
}

export default BentoCard
