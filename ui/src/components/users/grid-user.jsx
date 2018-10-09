
import React from 'react'

const Avatar = (props) => {
  let url = props.user.account.avatar;
  return (
    <div className="avatar">
      <img src={url} alt="Avatar" />
    </div>
  );
};


export default (props) => {

  return (
    <div className="user" onClick={props.onClick}>
      <Avatar user={props.user} />
      <div className="username">
       {props.user.username}
      </div>
    </div>
  );
};

