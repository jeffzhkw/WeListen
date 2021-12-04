import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
const { REACT_APP_LOGOUT_URI } = process.env;

function Header({ userInfo, setIsLoggedIn, setUserInfo }) {
  const navigate = useNavigate();

  async function signOut() {
    try {
      await Auth.signOut();
      console.log("SignOut");
      setIsLoggedIn(false);
      setUserInfo({});
      navigate(`/`);
    } catch (error) {
      console.log("error signing out: ", error);
    }
  }

  const username = "temp user";
  return (
    <>
      <div className="headerWrapper">
        <div className="title">
          <h1>WeListen</h1>
        </div>

        <nav className="navBar">
          <h2>
            <Link to="/home">Home</Link>
          </h2>
          <h2>
            <Link to="/groups">Groups</Link>
          </h2>
          <h2>
            <Link to="/song">Song</Link>
          </h2>
          <h2>
            <Link to="/activity">Activity</Link>
          </h2>
        </nav>

        <div className="userDetail">
          <h2>
            <Link to={"/user/" + userInfo.username}>{userInfo.username}</Link>
          </h2>
          <h2>
            <button onClick={signOut}>Sign Out</button>
          </h2>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Header;
