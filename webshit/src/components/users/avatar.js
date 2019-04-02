
import React from 'react'


export default (props) => {
  if (!props.user) {
    return null;
  }

  const avatarId = 10000 + props.user.id;
  const defaultAvatar = `/assets/default-avatars/default-${avatarId}.jpg`;

  let picture = props.user.account.avatar;
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
