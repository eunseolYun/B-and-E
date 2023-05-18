import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from '../img/logo/logo.png';

const LoginBtn = styled.button``;
const SignupBtn = styled.button``;

export default function Header() {
  const navigate = useNavigate();
  const loginBtnClick = () => {
    navigate('/login');
  }
  const signupBtnClick = () => {
    navigate('/signup')
  }
  return (
    <div>
      <header className="App-header">
        <img src={logo} alt="logo" />
        B & E
        counseling
        program
      </header>
      header(로그인, 회원가입)
      <LoginBtn onClick={loginBtnClick}>로그인</LoginBtn>
      <SignupBtn onClick={signupBtnClick}>회원가입</SignupBtn>
    </div>
  );
}
