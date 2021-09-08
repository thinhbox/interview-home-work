import React from 'react';
import { Image } from 'react-bootstrap';
import userDefaultIcon from 'images/user-default.svg';

export default function Comment(props) {
  return (
    <div className='post-reply'>
      <Image
        className='reply-author-avatar'
        src={userDefaultIcon}
        roundedCircle></Image>
      <div>
        <div>
          <strong>{props.data.name ? props.data.name : 'Username'}</strong>{' '}
          <em>{props.date}</em>
        </div>
        <div>{props.data.body ? props.data.body : 'Comment Body'}</div>
        <div>
          <a className='sub-text' href='/#'>
            <small>Reply to</small>
          </a>
        </div>
      </div>
    </div>
  );
}
