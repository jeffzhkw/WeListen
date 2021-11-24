import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Redirect } from "react-router-dom";

import axios from "axios";
import qs from "qs";

const {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_COGNITO_DOMAIN,
  REACT_APP_REDIRECT_URI,
} = process.env;

function Login({ handleUserInfo }) {
  const [userToken, setUserToken] = useState();

  const code = new URLSearchParams(useLocation().search).get("code");
  const payload = useMemo(() => {
    return {
      grant_type: "authorization_code",
      client_id: REACT_APP_CLIENT_ID,
      code: code,
      redirect_uri: REACT_APP_REDIRECT_URI,
    };
  }, [code]);

  useEffect(() => {
    if (code) {
      axios
        .post(
          `${REACT_APP_COGNITO_DOMAIN}/oauth2/token`,
          qs.stringify(payload),
          {
            auth: {
              username: REACT_APP_CLIENT_ID,
              password: REACT_APP_CLIENT_SECRET,
            },
          }
        )
        .then((response) => {
          setUserToken(response.data);
        })
        .catch((error) => {
          console.warn(error);
        });
    }
  }, [code, payload]);

  useEffect(() => {
    if (userToken) {
      console.log(userToken);
      axios
        .get(`${REACT_APP_COGNITO_DOMAIN}/oauth2/userInfo`, {
          headers: { authorization: `Bearer ${userToken.access_token}` },
        })
        .then((response) => {
          handleUserInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [userToken, handleUserInfo]);

  return (
    //TODO: Fix isLoggedIn State
    <Redirect to="/home" />
  );
}

export default Login;
