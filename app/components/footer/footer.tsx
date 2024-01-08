'use client';

import { Container, Group, Anchor } from '@mantine/core';
import Image from 'next/image';

export default function Footer() {

  return (
    <div className='flex flex-row bottom-0 pb-5 w-max sm:absolute'>
      <Container>
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
          Made with
          <Image style={{marginLeft: '8px', marginRight: '8px'}} src="/heart.png" alt='hi' width={20} height={20} />
          by&nbsp; <a href='https://mihirsahu.com' target='_blank' style={{color: 'red'}}>Mihir Sahu</a>
        </span>
      </Container>
    </div>
  );
}