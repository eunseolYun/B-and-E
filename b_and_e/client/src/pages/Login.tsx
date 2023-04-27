import { debounce } from "debounce";
import React, { useState } from "react";
import styled from "styled-components";

const InputName = styled.div``;
const Input = styled.input``;

export default function Login() {
  const [inputValue, setInputValue] = useState({
    id: '',
    password: '',
    isAdvisor: false,
  });
  const [isCheck, setIsCheck] = useState(false);

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
    console.log(inputValue)
  };

  const handleLogin = () => {

  }

  return (
    <>
      <p>Log in</p>
      <div>

        <div>
          <InputName>아이디</InputName>
          <Input
            id='id'
            name='id'
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
      <button>회원가입</button>
      <button>카카오 로그인</button>
    </>
  );
}
