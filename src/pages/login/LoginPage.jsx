import styled from "@emotion/styled";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { postLoginMember } from "../../apis/member";
import { useContext } from "react";
import { LoginContext } from "../../contexts/LoginContext";

const ErrorDiv = styled.p`
  width: 100%;
  color: red;
  font-size: 10px;
`;
const EmailPw = styled.div`
  padding: 10px;
`;

const schema = yup.object({
  email: yup
    .string()
    .required("이메일은 필수에요 :)")
    .email("올바르지 않아요 :("),
  pw: yup
    .string()
    .required("비밀번호를 입력하세요 :)")
    .min(8, "8글자 이상 작성하세요 :D")
    .max(16, "16글자 이하로 작성하세요 :(")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "대소문자, 숫자, 특수문자를 확인하세요 :D",
    ),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleTodoLogin } = useContext(LoginContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      pw: "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  // 로그인 시도
  const onSubmit = async data => {
    try {
      const result = await postLoginMember(data);
      if (result.data) {
        // 사용자가 로그인 했음을 관리
        handleTodoLogin(false);
        // 화면이동
        navigate("/");
      } else {
        alert("로그인 대실패!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이메일</label>
          <input
            {...register("email")}
            type="email"
            placeholder="hong123@gmail.com"
          />
          {errors.email && <ErrorDiv>{`${errors.email.message}`}</ErrorDiv>}
        </div>
        <div>
          <label>비밀번호</label>
          <input
            {...register("pw")}
            type="password"
            placeholder="비밀번호 입력"
          />
          {errors.pw && <ErrorDiv>{`${errors.pw.message}`}</ErrorDiv>}
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
        <div>
          <Link to="">
            <EmailPw>이메일 찾기</EmailPw>
          </Link>
          <Link to="">
            <EmailPw>비밀번호 찾기</EmailPw>
          </Link>
          <Link to="/member">
            <EmailPw>회원가입하기</EmailPw>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
