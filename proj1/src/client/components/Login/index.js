import "./index.css";
import validator from "validator";
import { useState } from "react";
import EmailInput from "../Input/EmailInput";
import PasswordInput from "../Input/PasswordInput";
import { Button, Checkbox } from "antd";
import api from "../../api/api";

const Login = ({
  userEmail,
  setUserEmail,
  userPw,
  setUserPw,
  setIsLogin,
  setSignState,
  setOpen,
}) => {
  // const [userEmail, setUserEmail] = useState({
  //   value: "",
  //   error: false,
  //   message: "",
  // });
  // const [userPw, setUserPw] = useState({
  //   value: "",
  //   error: false,
  //   message: "",
  // });
  const validEmail = () => {
    if (!validator.isEmail(userEmail.value)) {
      setUserEmail({
        ...userEmail,
        error: true,
        message: "invalid Email Input!",
      });
      return false;
    }
    return true;
  };
  const validPassword = () => {
    if (userPw.value.length < 6) {
      setUserPw({ ...userPw, error: true, message: "invalid Password Input!" });
      return false;
    }
    return true;
  };
  const handleUserInfo = async () => {
    if (!validEmail() || !validPassword()) {
      return;
    }

    //validate from back-end
    const res = await api.loginApi({
      email: userEmail.value,
      password: userPw.value,
    });
    switch (res.status) {
      case 202: {
        //password incorrect
        const mes = await res.json();
        const message = mes.message;
        console.log(message);
        setUserPw({ ...userPw, error: true, message: message });
        return;
      }
      case 404: {
        //user email doesnt exist
        const mes = await res.json();
        const message = mes.message;
        console.log(message);
        setUserEmail({
          ...userEmail,
          error: true,
          message: message,
        });
        return;
      }
      case 201: {
        const mes = await res.json();
        // console.log(mes);
        localStorage.setItem("Token", JSON.stringify(mes.returnToken.Token));

        setIsLogin("login");
        setSignState("signOut");
        setOpen(false);
        break;
      }
      default: {
        console.log("sth wrong");
      }
    }
  };
  return (
    <>
      <div className="modalForm">
        <EmailInput
          onChange={(e) => setUserEmail({ ...e, value: e.target.value })}
          value={userEmail.value}
          formatError={userEmail.error}
          infoError={userEmail.error}
          message={userEmail.message}
        />
        <PasswordInput
          onChange={(e) => {
            setUserPw({ ...e, value: e.target.value });
          }}
          value={userPw.value}
          formatError={userPw.error}
          infoError={userPw.error}
          message={userPw.message}
        />
        <div className="loginCheck">
          <Checkbox>remember me</Checkbox>
        </div>
        <Button className="modalButton" type="primary" onClick={handleUserInfo}>
          Sign in
        </Button>
        <div className="loginFooter">
          <span>
            Don't have an account?{" "}
            <label
              className="modalLabel"
              onClick={() => {
                setSignState("signUp");
              }}
            >
              Sign up
            </label>
          </span>
          <label
            className="modalLabel"
            onClick={() => {
              setSignState("password");
            }}
          >
            Forget Password?
          </label>
        </div>
      </div>
    </>
  );
};
export default Login;
