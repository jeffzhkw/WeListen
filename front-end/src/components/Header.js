import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function Header({ isLoggedIn, userInfo, setIsLoggedIn, setUserInfo }) {
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

  return (
    // <div className="headerWrapper">
    //   <div className="title">
    //     <h1>WeListen</h1>
    //   </div>

    //   <nav className="navBar">
    //     <h2>
    //       <Link to="/home">Home</Link>
    //     </h2>
    //     <h2>
    //       <Link to="/groups">Groups</Link>
    //     </h2>
    //     {/* <h2>
    //         <Link to="/song">Song</Link>
    //       </h2> */}
    //     <h2>
    //       <Link to="/activity">Activity</Link>
    //     </h2>
    //   </nav>

    //   {isLoggedIn ? (
    //     <div className="userDetail">
    //       <h2>
    //         <Link to={"/user/" + userInfo.username}>{userInfo.username}</Link>
    //       </h2>
    //       <h2>
    //         <button onClick={signOut}>Sign Out</button>
    //       </h2>
    //     </div>
    //   ) : (
    //     <>
    //       <h2>
    //         <Link to="/login">Login</Link>
    //       </h2>
    //     </>
    //   )}
    // </div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h4" color="inherit" component="div">
            WeListen
          </Typography>
          <Container sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/home"
            >
              Home
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/groups"
            >
              Groups
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/Activity"
            >
              Activity
            </Button>
          </Container>

          <Typography
            color="inherit"
            component={Link}
            to={"/user/" + userInfo.username}
          >
            {userInfo.username}
          </Typography>
          {isLoggedIn ? (
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={signOut}
            >
              Sign Out
            </Button>
          ) : (
            <></>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
