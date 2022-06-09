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

  // Fetch API Data each time the Index from the user effect is Updated
  React.useEffect(() => {
    fetchData();
  }, [index]);

  // Fetch API Data
  function fetchData () {
    fetch(`https://jsonplaceholder.typicode.com/posts/${index}`)
    .then((res) => res.json())
    .then((res) => {
      setPost({ id: res.id, title: res.title, text: res.body });
    });
  }

  // Increment and Decrement the index based on a boolean and prevent going under zero
  function updateIndex (dec: boolean) {
    if (dec  == true && index != 1) {
      setIndex(index - 1)
    } 
    if (dec == false) {
      setIndex(index + 1)
    } 
  }

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
          onClick={() => updateIndex(true)}
        >
          Decrease
        </button>
        {/* Btn increase */}
        <button
          className={styles['btn--increase']}
          onClick={() => updateIndex(false)}
        >
          Increase
        </button>
      </div>
    </div>
  );
}
