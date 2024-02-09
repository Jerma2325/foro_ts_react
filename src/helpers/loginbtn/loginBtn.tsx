import React from "react";

interface LoginButtonProps {
  onLogin: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onLogin }) => {
  return (
    <button
      onClick={onLogin}
      className="loginBtn"
    >
      Login
    </button>
  );
};

export default LoginButton;
