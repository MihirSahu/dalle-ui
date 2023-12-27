"use client";

import MagnifyingGlass from '../public/magnifying_glass.svg'
import Upload from '../public/upload.svg'
import Surprise from '../public/surprise.svg'
import { Loader, Notification } from '@mantine/core'
import { useState } from 'react'
import ModelSelect from './components/modelSelect'

export default function Home() {
  const [magnifyLoader, setMagnifyLoader] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [surpriseLoader, setSurpriseLoader] = useState(false);

  return (
    <main className="flex h-fit flex-col items-center p-24 space-y-16">
      <div className="text-black font-semibold text-6xl text-center">Unleash Your Creativity.</div>
      <textarea
        rows={1}
        className="w-1/2 min-w-80 h-32 lg:h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none whitespace-normal resize-none overflow-hidden"
        placeholder="A group of three computer science friends hugging"
      />
      <div className="flex flex-row justify-center w-4/5 space-x-5">
        <ModelSelect/>
        <button onClick={() => setMagnifyLoader(!magnifyLoader)} className='w-1/8 h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1'><MagnifyingGlass/></button>
        <button onClick={() => setUploadLoader(!uploadLoader)} className='w-1/8 h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1'><Upload/></button>
        <button onClick={() => setSurpriseLoader(!surpriseLoader)} className='w-1/8 h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1'><Surprise/></button>
      </div>
      <div>
        1. Generate API key from OpenAI
        <br/>
        2. Set API key in settings
        <br/>
        3. Set model
        <br/>
        4. Generate!
      </div>
    </main>
  )
}
