
/**
 * User View 
 * ---------
 * 
 * Show user view with profile image and 
 * account info.
 */


import React from 'react'
import {connect} from 'react-redux'



var ProfileImage = React.createClass({
  // Render profile image from user profile 
  render() {
    var imageUrl = this.props.avatarUrl;
    return(
      <div className="user-profile-avatar">
        <img src="{avatarUrl}" />
      </div>
    );
  }
});


var ProfileInfo = React.createClass({
  render() {
    var user = this.props.user;

    var fullName = undefined;
    if (user.first_name != '' || user.last_name != '') {
      fullName = (
        <p className="user-profile-fullname">
          {user.first_name} {user.last_name}
        </p>
      );
    }

    var email = undefined;
    if (user.email != '') {
      email = ( <p className="user-profile-email">{user.email}</p> );
    }

    return(
      <div className="user-profile-info">
        <p className="user-profile-username">{user.username}</p>
        {fullName}
        {email}
      </div>
    );
  }
})

var UserProfileView = React.createClass({
  render() {
    // Render User profile:
    //  - Name
    //  - Avatar
    //  - Account
    var user = this.props.user;
    var account = user.account;

    return(
      <div className="user-profile">
        <div className="row">
          <div className="col-sm-5">
            <ProfileImage avatarUrl={account.avatar} />
          </div>
          <div className="col-sm-7">
            <ProfileInfo user={user} />
          </div>
        </div>
      </div>
    );
  }
});


// Create user profile container component
export default connect(
  (state) => {
    return {
      user: {
        first_name: 'Ben',
        last_name: 'Utzer',
        email: 'ben.utzer@aol.com',
        username: 'benutzer',

        account: {
          avatar: "/fnord.gif",
          balance: "-0.70 EUR",
          locked: false,
          created_at: "2016-05-09T14:52:09.249542Z",
          updated_at: "2016-05-09T15:11:37.611436Z"
        }
      }
    };
  })(UserProfileView);


