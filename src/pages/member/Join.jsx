import styled from "@emotion/styled";
import * as yup from "yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const ErrorDiv = styled.p`
  width: 100%;
  color: red;
  font-size: 10px;
`;

// 전화번호에 '-' 를 자동으로 붙여줌
const formatPhoneNumber = value => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, "");
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 8) {
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
  }
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;
};

// Yup 적용해보기
//   1. schema 를 먼저 설장한다.
const schema = yup.object({
  name: yup
    .string()
    .required("이름을 입력하세요 :D")
    .min(2, "2글자 이상 작성하세요 :)"),
  pw: yup
    .string()
    .required("비밀번호를 입력하세요 :D")
    .min(8, "8글자 이상 작성하세요 :D")
    .max(16, "16글자 이하로 작성하세요 :(")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
      "대소문자, 숫자, 특수문자를 확인하세요 :D",
    ),
  pw_confirm: yup
    .string()
    .required("비밀번호를 확인 하세요 :D")
    .oneOf([yup.ref("pw")], "비밀번호가 일치하지 않아요 :("),
  email: yup
    .string()
    .required("이메일은 필수에요 :D")
    .email("올바른 이메일 형식이 아니에요 :("),
  policy: yup.boolean().oneOf([true], "이용약관 동의를 확인하세요 :D"),
});

//  2. schema 가 만들어지면 hookform 과 연결 (resolver)

function Join() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      pw: "",
      pw_confirm: "",
      birthday: "",
      gender: "",
      phone: "",
      address: {
        postcode: "",
        basic: "",
        detail: "",
      },
      policy: false,
    },
    // mode: "all",
    resolver: yupResolver(schema),
  });

  //   전송용 데이터
  const onSubmit = data => {
    console.log("전송시 데이터 ", data);
    const sendData = { ...data, phone: data.phone.replaceAll("-", "") };
    console.log("전송시 데이터 sendData ", sendData);
  };

  useEffect(() => {
    trigger();
  }, [trigger]);

  // daumPost 적용
  // 1. 외부 자바스크립트를 불러들여서 사용
  useEffect(() => {
    // Daum 우편번호 스크립트 로드
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    document.body.appendChild(script);

    // 컴포넌트 언마운트 시 스크립트 제거
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 2. 선택시 주소 입력 팝업창 띄우기
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: data => {
        // 우편번호와 기본주소 입력
        setValue("address.postcode", data.zonecode);
        setValue("address.basic", data.address);

        // 상세주소 입력 필드로 포커스 이동
        document.querySelector('input[name="address.detail"]').focus();
      },
    }).open();
  };

  return (
    <div style={{ padding: "25px" }}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>이름　　</label>
          <input {...register("name")} placeholder="홍킬동" />
          {/* name이 없을 때 에러 내용 출력자리 */}
          {errors.name && <ErrorDiv>{`${errors.name.message}`}</ErrorDiv>}
        </div>
        <div>
          <label>비밀번호</label>
          <input type="password" {...register("pw")} />
          {errors.pw && <ErrorDiv>{`${errors.pw.message}`}</ErrorDiv>}
        </div>
        <div>
          <label>비번확인</label>
          <input type="password" {...register("pw_confirm")} />
          {errors.pw_confirm && (
            <ErrorDiv>{`${errors.pw_confirm.message}`}</ErrorDiv>
          )}
        </div>
        <div>
          <label>이메일　</label>
          <input {...register("email")} placeholder="GG@GG.net" />
          {errors.email && <ErrorDiv>{`${errors.email.message}`}</ErrorDiv>}
        </div>
        <div>
          <label>생년월일</label>
          <input type="date" {...register("birthday")} />
          {errors.birthday && (
            <ErrorDiv>{`${errors.birthday.message}`}</ErrorDiv>
          )}
        </div>
        <div>
          <label>성별　　</label>
          <select {...register("gender")}>
            <option value={""}>선택하기</option>
            <option value={"male"}>남성</option>
            <option value={"female"}>여성</option>
            <option value={"other"}>기타</option>
          </select>
        </div>
        <div>
          <label>전화번호</label>
          <input
            type="tel"
            {...register("phone")}
            placeholder="010-1234-1234"
            onChange={e => {
              const tempPhone = formatPhoneNumber(e.target.value);
              // hookform의 기능중 강제로 값을 넣기
              setValue("phone", tempPhone);
            }}
          />
          {errors.phone && <ErrorDiv>{`${errors.phone.message}`}</ErrorDiv>}
        </div>
        <div>
          <label>우편번호</label>
          <input {...register("address.postcode")} placeholder="12356" />
          <button onClick={() => handleAddressSearch()}>우편번호 찾기</button>
        </div>
        <div>
          <label>주소　　</label>
          <input {...register("address.basic")} placeholder="주소 입력" />
        </div>
        <div>
          <label>상세주소</label>
          <input {...register("address.detail")} placeholder="상세주소 입력" />
        </div>
        <div>
          <br />
          <div style={{ height: 150, overflowX: "hidden", overflowY: "auto" }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam velit
            consectetur exercitationem sunt eos doloribus earum corrupti sequi
            quasi blanditiis. Corporis praesentium enim maiores animi adipisci
            quae ipsum facilis quia! Velit dicta rerum, iste repellat itaque
            doloremque harum reprehenderit vitae cupiditate necessitatibus,
            atque incidunt nesciunt enim ex porro corrupti? Accusamus fugit
            aliquid fuga accusantium error dolorem sapiente enim ea rem!
            Voluptates harum nisi fugit non fugiat quas numquam inventore
            ratione labore commodi ea, quod, molestias fuga minus iure! Odio
            earum placeat odit voluptates! Harum tenetur incidunt tempore
            deleniti dolores distinctio! Modi, natus. Qui quaerat ea laudantium,
            earum impedit illo commodi, tenetur deleniti itaque sint expedita!
            Doloremque qui quidem, totam consectetur nam ducimus sequi
            reprehenderit. Exercitationem nam sapiente placeat vel laboriosam.
            Itaque consectetur id vitae nesciunt illo quae veniam consequatur
            quasi dolorem ea beatae, maxime incidunt amet fugit officiis
            cupiditate quos facilis, eveniet nostrum laborum, nihil nemo! Minus
            harum autem iure.
          </div>
          <input
            type="checkbox"
            {...register("policy", {
              required: "이용약관에 동의를 확인하세요 :(",
            })}
          />
          <label>이용약관 내용에 동의하십니까?</label>
          <div></div>

          {errors.policy && <ErrorDiv>{`${errors.policy.message}`}</ErrorDiv>}
        </div>
        <div>
          <input type="button" onClick={() => reset()} value="다시작성" />
          <button type="submit">제출하기</button>
        </div>
      </form>
    </div>
  );
}

export default Join;
