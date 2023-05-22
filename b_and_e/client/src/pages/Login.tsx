import { debounce } from "debounce";
import React, { useState } from "react";
import styled from "styled-components";
import userApi from "../api/user";
// import { useSelector } from "react-redux";
// import { user } from "../redux/modules/userSlice";


export default function Login() {
  // const { isLogin, accessToken } = useSelector((userReducer: user) => userReducer);
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
    isAdvisor: false,
  });
  const [isCheck, setIsCheck] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState('');

  const handleInputChange = debounce(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputValue({ ...inputValue, [name]: value });
      console.log('인풋벨류', inputValue);
    }
  );

  const handleBoxChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheck(e.target.checked)
    console.log('체크됐다', isCheck)
    console.log(e.target.checked)
    const { name, checked } = e.target;
    setInputValue({ ...inputValue, [name]: checked })
  };

  const getUserInfo = async (accessToken:string) => {
    //유저 정보 가져오기
    console.log(accessToken)
    return await userApi.getUserInfo(accessToken)
      .then((res) => console.log('유저인포를 보자', res));
  }; 
  const handleLogin = async() => {
    console.log(inputValue);
    if (!inputValue.isAdvisor) {
      let { email, password } = inputValue;
      // await userApi.login({
      //   email: inputValue.email,
      //   password: inputValue.password
      // })
        
      // await fetch(`${process.env.REACT_APP_BASE_URL}/user/login`, {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password }),
      //   headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
      // }).then((res) => {
      //   res.json();
      // }).then((res) => {
      //   console.log(res)
      // });
      
      await userApi.login({ email, password })
        .then((res) => {
          console.log(res.data);
          getUserInfo(res.data.data.accessToken);
        }).then((res) => console.log(res)).catch(() => {
          setEmailCheckMessage('등록되지 않은 아이디이거나 아이디 또는 비밀번호를 잘못 입력했습니다.');
        })
      
    }
  }

  return (
    <>
      <p>Log in</p>
      <div>
        <div>
          <InputName>아이디</InputName>
          <Input
            id='email'
            name='email'
            placeholder='아이디를 입력해 주세요'
            onChange={handleInputChange}
          />
        </div>
        <div>
          <InputName>비밀번호</InputName>
          <Input
            id='password'
            name='password'
            placeholder='비밀번호를 입력해 주세요'
            onChange={handleInputChange}
            />
          <div>{emailCheckMessage}</div>
        </div>
        <input
          name='isAdvisor'
          id='isAdvisor'
          type='checkbox'
          onChange={handleBoxChecked}
          checked={isCheck}
        />
        <label htmlFor='isAdvisor'>상담사로 로그인하기</label>
      </div>
      <button onClick={handleLogin}>로그인</button>
      <button >회원가입</button>
      <button>카카오 로그인</button>
    </>
  );
}

const InputName = styled.div``;
const Input = styled.input``;