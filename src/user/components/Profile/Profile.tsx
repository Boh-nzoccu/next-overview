import Image from 'next/image';
import React from 'react';
import { getAllUsersUid } from '~/utils';
import classes from './Profile.module.css';

export function formatDate(date: Date) {
  return Intl.DateTimeFormat('it', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date)
}

type ProfileProps = {
  avatar: string;
  name: string;
  location?: string | null;
  bio?: string | null;
  followers: number;
  following: number;
  timestampISO: string;
};

const Profile = (props: ProfileProps) => {
  return (
    <div className={classes.root}>
      <small>
        Last updates:{' '}
        <span style={{ fontSize: "1em", fontWeight: "bolder" }}>
          {formatDate(new Date(props.timestampISO))}
        </span>
      </small>
      <Image
        src={props.avatar}
        alt=""
        width={300}
        height={300}
        style={{ borderRadius: '13px' }}
      />
      <article>
        <h1 className={classes.title}>
          {props.name} {props.location && `, ${props.location}`}
        </h1>
        <p>{props.bio}</p>
        <aside className={classes.counters}>
          <small style={{ paddingRight: 10 }}>
            {props.followers} followers
          </small>
          <small>{props.following} following</small>
        </aside>
        {/* 
        // ... spiegare dopo il perché di questo commento
        {getAllUsersUid().map((uid) => (
          <div key={uid}>{uid}</div>
        ))} */}
      </article>
    </div>
  );

};

export default Profile;
