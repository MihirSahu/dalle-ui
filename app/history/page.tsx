'use client';

import { useEffect, useState } from 'react'
import { notifications } from '@mantine/notifications';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const History = () => {
  const { push } = useRouter();
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

  const handleDelete = async (imageName: string) => {
      const formData = new URLSearchParams();
      formData.append('imageName', imageName);

      const response = await fetch('/image/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      })

      if (response.status !== 200) {
        notifications.show({ 
          title: 'Something went wrong', 
          message: 'Image couldn\'t be deleted', 
          color: 'red',
          closeButtonProps: { display: 'none' },
        })
      }

      else {
        setURLs(URLs.filter((url: any) => url.path.split("/").pop() !== imageName))
        notifications.show({ 
          title: 'Image deleted!', 
          message: 'The image was deleted', 
          color: 'red',
          closeButtonProps: { display: 'none' },
        })
      }
  }

  return(
    <main className="flex flex-col h-fit justify-center items-center">
      <div className='flex flex-wrap flex-row space-x-10 space-y-5 justify-center items-center'>
        {
          URLs &&
          URLs.map((url: any, index) => (
            <div className='relative group'>
              { url && 
                <>
                  <Image src={url.signedUrl} key={index} width={256} height={256} className='rounded' alt={url.name} />
                  <div className='flex flex-col absolute inset-0 bg-black bg-opacity-50 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded'>
                    <button onClick={() => handleDownload(url.signedUrl)} className='text-white'>Download</button>
                    <button onClick={() => handleDelete(url.path.split("/").pop())} className='text-white'>Delete</button>
                  </div>
                </>
              }
            </div>
          ))
        }
        {
          URLs.length === 0 &&
          <div className='text-black font-semibold text-3xl text-center'>You don't have any images yet! Generate images to get started.</div>
        }
      </div>
    </main>
  );
}

export default History;