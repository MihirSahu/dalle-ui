'use client';

import { Container, Title, Text, Group } from '@mantine/core';
import { Illustration } from './not-found/Illustration';
import classes from './not-found/NothingFoundBackground.module.css';
import { useRouter } from 'next/navigation';

export default function NothingFoundBackground() {

  const { push } = useRouter();

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group justify="center">
            <button onClick={() => push('/')} className='w-1/8 h-1/2 bg-lightGray rounded p-4 text-darkGray drop-shadow-lg outline-none duration-100 transform hover:shadow-lg hover:-translate-y-1'>Take me home</button>
          </Group>
        </div>
      </div>
    </Container>
  );
}