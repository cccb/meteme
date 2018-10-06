import React from 'react'

import GridUser from './grid-user'

export default class UsersGrid extends React.Component {
  render() {
    const users = this.props.users.map((user) => (
      <GridUser key={user.id} user={user} />
    ));

    return (
      <div className="users-grid">
        {users}
      </div>
    );
  }
}

