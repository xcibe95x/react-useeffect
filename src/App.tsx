import * as React from 'react';
//import { useState, useEffect } from 'react';
import styles from './style.module.css';

export interface Post {
  id: number | null;
  title: string | null;
  text: string | null;
}

export default function App() {
  const [index, setIndex] = React.useState<number>(1);
  const [post, setPost] = React.useState<Post>({
    id: null,
    title: null,
    text: null,
  });

  React.useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${index}`)
      .then((res) => res.json())
      .then((res) => {
        setPost({ id: res.id, title: res.title, text: res.body });
      });
  }, [index]);

  return (
    <div className={styles.container}>
      {/* card container */}
      <div className={styles['card-container']}>
        <div className={styles.card}>
          <h2 className={styles['card__title']}>{post?.title}</h2>
          <p className={styles['card__text']}>{post?.text}</p>
          <p style={{ color: 'grey' }} className={styles['card__text']}>
            Post number: #{post?.id}
          </p>
        </div>
      </div>
      {/* Card Actions */}
      <div className={styles['card__actions']}>
        {/* Btn decrease */}
        <button
          className={styles['btn--decrease']}
          onClick={() => setIndex(index - 1)}
        >
          Decrease
        </button>
        {/* Btn increase */}
        <button
          className={styles['btn--increase']}
          onClick={() => setIndex(index + 1)}
        >
          Increase
        </button>
      </div>
    </div>
  );
}
