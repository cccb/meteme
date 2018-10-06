
import React from 'react'

const Avatar = (props) => {
  let url = props.url;
  if (!url) {
    url = "/default/avatar/path";
  }

  return (
    <div className="avatar">
      <img src={url} alt="Avatar" />
    </div>
  );
};


export default (props) => {

  return (
    <div className="user" onClick={props.onClick}>
      <Avatar url={props.user.avatar} />
      <div className="username">
       {props.user.username}
      </div>
    </div>
  );
};

