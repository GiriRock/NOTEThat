import React from 'react'

type Props = {
    title: string,
    body: string
}

const DisplayNote = (props: Props) => {
  return (
    <div className="flex flex-col bg-white/75 mx-auto p-5 gap-5 rounded-lg shadow-sm w-3/5 h-72 overflow-y-scroll scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#7e22ce]/80">
        <p className="text-4xl font-bold text-purple-600">{props.title}</p>
        <p className='text-center text-xl'>{props.body}</p>
    </div>
  )
}

export default DisplayNote