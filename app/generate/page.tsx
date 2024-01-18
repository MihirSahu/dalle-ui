"use client";

import MagnifyingGlass from '../../public/magnifying_glass.svg'
import Upload from '../../public/upload.svg'
import Surprise from '../../public/surprise.svg'
import { Loader, Notification } from '@mantine/core'
import { useState } from 'react'
import ModelSelect from '../components/modelSelect'
import { notifications } from '@mantine/notifications';
import Image from 'next/image';

export default function Home() {
  const modelNames: any = {
    'DALL-E 2': 'dall-e-2',
    'DALL-E 3': 'dall-e-3',
  }
  const [model, setModel] = useState('')
  const [magnifyLoader, setMagnifyLoader] = useState(false);
  const [uploadLoader, setUploadLoader] = useState(false);
  const [surpriseLoader, setSurpriseLoader] = useState(false);

  const [prompt, setPrompt] = useState('A group of three friends hugging');
  const [size, setSize] = useState('1024x1024');
  const [imageCount, setImageCount] = useState(1);

  const [imageURLs, setImageURLs] = useState<string[]>([]);

  const handleModelSelectValueChange = (value: string) => {
    setModel(modelNames[value])
  }

  const handleSubmit = async () => {
    if (model === '') {
      notifications.show({ 
        title: 'Please select a model', 
        message: 'You can select a model from the dropdown', 
        color: 'red',
        closeButtonProps: { display: 'none' },
      })
      return;
    }

    const formData = new URLSearchParams();
    formData.append('prompt', prompt);
    formData.append('size', size);
    formData.append('imageCount', imageCount.toString());

    const response = await fetch('/models/openai/dalle2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })

    if (response.status !== 200) {
      notifications.show({ 
        title: response.statusText, 
        message: 'Please try again', 
        color: 'red',
        closeButtonProps: { display: 'none' },
      })
    }
    else {
      const url = await response.json()
      setImageURLs(prevImageURLs => [...prevImageURLs, url.data.data[0].b64_json]);
      /*
      notifications.show({ 
        title: "Hello world!",
        message: 'You can create images now!', 
        color: 'blue',
        closeButtonProps: { display: 'none' },
      })
      */
    }
  }

  return (
    <main className="flex h-fit flex-col items-center p-24 space-y-16">
      <div className="text-black font-semibold text-6xl text-center">Unleash Your Creativity.</div>
      <div className="flex flex-row flex-wrap justify-center w-4/5 space-x-5 space-y-5 md:-space-y-0">
        <textarea
          rows={1}
          className="w-1/2 min-w-80 h-32 lg:h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none whitespace-normal resize-none overflow-hidden"
          placeholder="A group of three computer science friends hugging"
          onChange={(text) => setPrompt(text.target.value)}
        />
        <button onClick={() => {
          setMagnifyLoader(!magnifyLoader)
          handleSubmit()
        }} className='w-1/8 h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1'><MagnifyingGlass/></button>
        <button onClick={() => setUploadLoader(!uploadLoader)} className='w-1/8 h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1'><Upload/></button>
        <button onClick={() => setSurpriseLoader(!surpriseLoader)} className='w-1/8 h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1'><Surprise/></button>
      </div>
      <div className="flex flex-row justify-center w-4/5">
        <ModelSelect onValueChange={handleModelSelectValueChange}/>
      </div>
      {/*<div>
        1. Generate API key from OpenAI
        <br/>
        2. Set API key in settings
        <br/>
        3. Set model
        <br/>
        4. Generate!
      </div>
      */}
      <div className='flex flex-wrap flex-row space-x-5 space-y-5'>
        {
          imageURLs.map((url, index) => (
            <Image src={`data:image/jpeg;base64,${url}`} key={index} width={256} height={256} className='rounded' alt='image lol' />
          ))
        }
      </div>
    </main>
  )
}
