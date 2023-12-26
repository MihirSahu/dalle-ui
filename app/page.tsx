"use client";

import MagnifyingGlass from '../public/magnifying_glass.svg'
import Upload from '../public/upload.svg'
import Surprise from '../public/surprise.svg'
import { Loader, Notification, Burger, Autocomplete } from '@mantine/core'
import { useState } from 'react'

export default function Home() {
  const [magnifyLoader, setMagnifyLoader] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [surpriseLoader, setSurpriseLoader] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-20">
      <div className="text-black font-semibold text-6xl">Unleash Your Creativity.</div>
      <div className="flex flex-row justify-center w-4/5 space-x-5">
        <input
          className="w-1/2 h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none"
          placeholder="A group of three computer science friends hugging"
        />
        <button onClick={() => setMagnifyLoader(!magnifyLoader)} className='w-1/8 h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1'>{magnifyLoader ? <Loader color='blue' size={30} /> : <MagnifyingGlass/>}</button>
        <button onClick={() => setUploadLoader(!uploadLoader)} className='w-1/8 h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1'>{uploadLoader ? <Loader color='blue' size={30} /> : <Upload/>}</button>
        <button onClick={() => setSurpriseLoader(!surpriseLoader)} className='w-1/8 h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1'>{surpriseLoader ? <Loader color='blue' size={30} /> : <Surprise/>}</button>
        <Notification className='text-darkGray' color='red' title="test">testing</Notification>
      </div>
    </main>
  )
}
