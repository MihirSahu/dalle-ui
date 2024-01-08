'use client';

import { useEffect, useState } from 'react';
import { Loader } from '@mantine/core'
import classes from './NavbarSimple.module.css';
import OpenAI from '../../public/openai-svgrepo-com.svg';
import Image from 'next/image';
import { notifications } from '@mantine/notifications';

const data = [
  { link: '', label: 'OpenAI', icon: <OpenAI height={20} width={20} /> },
  { link: '', label: 'StabilityAI', icon: <Image src="/stabilityAI.png" alt='StabilityAI logo' height={20} width={20} /> },
  { link: '', label: 'DeepAI', icon: <Image src="/deepAI.png" alt='DeepAI logo' height={20} width={20} /> },
];

export default function Keys() {
  const [active, setActive] = useState('OpenAI');

  const [key, setKey] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [model, setModel] = useState('OpenAI')

  useEffect(()  => {
    const fetchKey = async () => {
      const formData = new URLSearchParams();
      formData.append('model', model);

      const response = await fetch('/apiKeys/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      })

      if (response.status !== 200) {
        notifications.show({ 
          title: 'Something went wrong', 
          message: 'Key could not be fetched', 
          color: 'red',
          closeButtonProps: { display: 'none' },
        })
      }

      const key = await response.json()
      setKey(key.data[0].key)
    }
    fetchKey()
  }, [model])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formData = new URLSearchParams();
    formData.append('apiKey', key);
    formData.append('model', model);

    const response = await fetch('/apiKeys/insert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })

    if (response.status !== 200) {
      setLoading(false)
      setError('Something went wrong')
      notifications.show({ 
        title: 'Something went wrong', 
        message: 'Please try again', 
        color: 'red',
        closeButtonProps: { display: 'none' },
      })
    }
    else {
      setLoading(false);
      notifications.show({ 
        title: 'Key set successfully', 
        message: 'You can create images now!', 
        color: 'blue',
        closeButtonProps: { display: 'none' },
      })
    }
  }

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        setModel(item.label);
      }}
    >
      {item.icon}
      <span className='ml-5 hidden md:block'>{item.label}</span>
    </a>
  ));

  return (
    <div className='flex flex-row'>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          {links}
        </div>
      </nav>
      <form className="flex h-fit flex-col items-center p-24 space-y-12" onSubmit={handleSubmit} method='post'>
        <input
          name='api'
          className="w-1/3 min-w-80 h-12 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none whitespace-normal resize-none overflow-hidden"
          onChange={(e) => setKey(e.target.value)}
          value={key}
          placeholder='API Key'
        />
        <div className='flex flex-row space-x-5'>
          <button className='w-1/8 h-1/5 bg-lightGray rounded p-3 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1' onClick={() => setLoading(true)}>
            { loading ? <Loader type='dots' color='black' /> : <div>Set key</div>}
          </button>
        </div>
      </form>
    </div>
  );
}