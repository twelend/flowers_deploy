import React from "react";
import { Link } from "react-router-dom";

const ProfileHeader = () => {
  return (
    <div className="profile-header">
     <div className="header_auth">
        <Link to="/">
          <h1>Flowers</h1>
        </Link>
      </div>
    </div>
  );
};

export default ProfileHeader;
