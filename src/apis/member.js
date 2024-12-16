import axios from "axios";

// axios 연동
export const postMember = async data => {
  console.log(data);
  try {
    // 보통 IP 주소는 proxy로 대체가 가능하다. 그래서 . 찍음.
    const res = await axios.post("./member", data);
    console.log("회원가입 결과 : ", res.data);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// login api 연동
export const postLoginMember = async data => {
  try {
    const res = await axios.post("./member", data);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
