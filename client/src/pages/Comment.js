import React from 'react';
import './Comment.css';

export const Comment = props => {
  const { text, author } = props.comment;
  return (
    <div>
      <div className="Author">Commented By: {author.username}</div>
      <div className="Comment">{text}</div>
    </div>
  );
};
