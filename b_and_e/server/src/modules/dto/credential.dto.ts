import { IsString, Matches, MinLength } from 'class-validator';

class CredentialDto {
  @IsString()
  @Matches(
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
    {
      message: '이메일 형식으로 작성해 주세요.',
    },
  )
  email: string;

  //특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내의 암호 정규식 ( 3 가지 조합)
  @IsString()
  @Matches(/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/, {
    message:
      '비밀번호는 특수문자 / 문자 / 숫자 포함 형태의 8~15자리 이내로 작성해 주세요',
  })
  password: string;

  @IsString()
  @MinLength(2)
  name: string;

  //생물학적 남자 0 |여자 1
  @Matches(/0|1/, {
    message: '남자는 0 여자는 1을 입력해주세요.',
  })
  sex: number;

  //일반로그인 0 |카카오로그인 1
  @Matches(/0|1/)
  loginMethod: number;
}

export class UserCredentialDto extends CredentialDto {
  birth: string;

  @Matches(/^\d{2,3}-\d{3,4}-\d{4}$/, {
    message: '전화번호 형식에 맞지 않습니다.',
  })
  phone: string;
}

export class AdvisorCredentialDto extends CredentialDto {
  center: string;

  info: string;
}
