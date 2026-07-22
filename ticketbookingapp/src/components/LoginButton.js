import React from 'react';

function LoginButton(props) {
  return (
    <button className="auth-btn login-btn" onClick={props.onClick}>
      Login
    </button>
  );
}

export default LoginButton;
