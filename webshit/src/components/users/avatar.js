
import React from 'react'

import defaultAvatar from './img/default_avatar.png'

export default (props) => {

  let picture = props.picture;
  if (!picture) {
    picture = defaultAvatar;
  }

  return (
    <div className="avatar">
      <img alt="Avatar"
           title="Profile Picture"
           src={picture} />
    </div>
  );
}
