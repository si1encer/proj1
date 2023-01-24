import "./index.css";
import validator from "validator";
import { useState } from "react";
import EmailInput from "../Input/EmailInput";
import PasswordInput from "../Input/PasswordInput";
import { Button, Checkbox } from "antd";
const Login = ({ setIsLogin, setSignState }) => {
  const [userEmail, setUserEmail] = useState({
    value: "",
    error: false,
    message: "",
  });
  const [userPw, setUserPw] = useState({
    value: "",
    error: false,
    message: "",
  });
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
    try {
      //validate from back-end
    } catch (e) {
      return;
    }
    setIsLogin("login");
    setSignState("signOut");
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
        <div>
          <Checkbox>remember me</Checkbox>
        </div>
        <Button type="primary" onClick={handleUserInfo}>
          Sign in
        </Button>
        <div className="loginFooter">
          <span>
            Don't have an account?
            <label
              onClick={() => {
                setSignState("signUp");
              }}
            >
              Sign up
            </label>
          </span>
          <label
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
