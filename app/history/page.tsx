'use client';

import { useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications';

const History = () => {
  const [URLs, setURLs] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const formData = new URLSearchParams();
      formData.append('offset', '0');
      formData.append('numImages', '5');

      const response = await fetch('/components/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      })

      if (response.status !== 200) {
        notifications.show({ 
          title: 'Something went wrong', 
          message: 'Images could not be fetched', 
          color: 'red',
          closeButtonProps: { display: 'none' },
        })
      }

      const urls = await response.json()
        setURLs(urls.data)
    };
    fetchHistory();
  }, []);

  return(
    <main className="flex h-fit flex-row flex-wrap justify-ceneter items-center">
      <div className='flex flex-wrap flex-row space-x-5 space-y-5'>
        {
          URLs.map((url: any, index) => (
            <img src={url.signedUrl} key={index} width={256} height={256} className='rounded'/>
          ))
        }
      </div>
    </main>
  );
}

export default History;