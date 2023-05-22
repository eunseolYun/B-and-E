import { debounce } from "debounce";
import React, { useState } from "react";
import styled from "styled-components";

export default function Signup() {
  const {isModal}
  const [inputValue, setInputValue] = useState({
    name: '',
    id: '',
    password: '',
    passwordCheck: '',
    email: '',
    isAdvisor: false,
  });
  const [ isCheck, setisCheck ] = useState(false);
  const [ errMsg, setErrMsg ] = useState('');


  const handleInputChange = debounce((e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    console.log(inputValue);
  });
  const handleCheck = (e:React.ChangeEvent<HTMLInputElement>) => {
    setisCheck(e.target.checked);
    const { name, checked } = e.target;
    setInputValue({ ...inputValue, [name]: checked });
    console.log(inputValue);
  }
  const handleSignUp = () => {
    //모달켜기(회원가입 할건지 메시지 모달로 props전달)
    //모달에서 확인 누를 시 로그인 해주세요 메시지 전달
    //로그인 페이지 이동
    console.log('회원가입')
  }
  return (
    <>
      <div>Signup</div>
      <div>
        <Box>
          <InputName className="name">이름</InputName>
          <InputBox name="name" onChange={(e) => handleInputChange(e)} />
        </Box>
        <Box>
          <InputName className="id">아이디</InputName>
          <InputBox name="id" onChange={(e) => handleInputChange(e)}/>
        </Box>
        <Box>
          <InputName className="password">비밀번호</InputName>
          <InputBox name="password" onChange={(e) => handleInputChange(e)}/>
        </Box>
        <Box>
          <InputName className="passwordCheck">비밀번호 확인</InputName>
          <InputBox name="passwordCheck" onChange={(e) => handleInputChange(e)}/>
        </Box>
        <Box>
          <InputName className="email">이메일</InputName>
          <InputBox name="email" onChange={(e) => handleInputChange(e)}/>
        </Box>
        <Box>
          <label htmlFor="isAdvisor">상담가 로그인</label>
          <input name="isAdvisor" type="checkbox" onChange={(e) => handleCheck(e)} checked={isCheck} />
        </Box>
      </div>  
      <div>
        <button onClick={}>회원가입</button>
      </div>
    </>
  );
}
const Box = styled.div``;
const InputName = styled.div``;
const InputBox = styled.input``;
