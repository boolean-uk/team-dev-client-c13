import FullLogo from "../../assets/fullLogo";
import useAuth from "../../hooks/useAuth";
import "./style.css";
import Card from "../card";
import ProfileIcon from "../../assets/icons/profileIcon";
import CogIcon from "../../assets/icons/cogIcon";
import LogoutIcon from "../../assets/icons/logoutIcon";
import { getInitials } from "../../service/getInitials";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { token, onLogout, user } = useAuth();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const onClickProfileIcon = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  if (!token) {
    return null;
  }

  return (
    <header>
      <FullLogo textColour="white" />

      {user && (
        <div className="profile-icon" onClick={onClickProfileIcon}>
          <p>{getInitials(user.firstName, user.lastName)}</p>
        </div>
      )}

      {isMenuVisible && (
        <div className="user-panel">
          <Card>
            <section className="post-details">
              <div className="profile-icon">
                <p>{`${user.firstName[0]}${user.lastName[0]}`}</p>
              </div>

              <div className="post-user-name">
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <small>Software Developer, Cohort {user.cohort_id}</small>
              </div>
            </section>

            <section className="user-panel-options border-top">
              <ul>
                <li>
                  <NavLink to={`/profile/${user.id}`}>
                    <ProfileIcon /> <p>Profile</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/">
                    <CogIcon /> <p>Settings &amp; Privacy</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="#" onClick={onLogout}>
                    <LogoutIcon /> <p>Log out</p>
                  </NavLink>
                </li>
              </ul>
            </section>
          </Card>
        </div>
      )}
    </header>
  );
};

export default Header;
