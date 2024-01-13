'use client';

import { useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications';
import Image from 'next/image';

const History = () => {
  const [URLs, setURLs] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const formData = new URLSearchParams();
      formData.append('offset', '0');
      formData.append('numImages', '10');

      const response = await fetch('/components/history/read', {
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

  const handleDownload = async (url: string) => {
    const res = await fetch(url);
    const image = await res.blob();
    const blobUrl = URL.createObjectURL(image);

    const anchor = document.createElement('a');
    anchor.style.display = 'none';

    anchor.href = blobUrl;
    anchor.download = 'image.png';

    document.body.appendChild(anchor);
    anchor.click();
  }

  return(
    <main className="flex h-fit flex-row flex-wrap justify-center items-center">
      <div className='flex flex-wrap flex-row space-x-10 space-y-5'>
        {
          URLs &&
          URLs.map((url: any, index) => (
            <div className='relative group'>
              <Image src={url.signedUrl} key={index} width={256} height={256} className='rounded' alt={url.name} />
              <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded'>
                <button onClick={() => handleDownload(url.signedUrl)} className='text-white'>Download</button>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  );
}

export default History;