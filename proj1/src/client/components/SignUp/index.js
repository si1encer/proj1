import "./index.css";
import validator from "validator";
import { useState } from "react";
import EmailInput from "../Input/EmailInput";
import PasswordInput from "../Input/PasswordInput";
import { Button, Checkbox } from "antd";
const SignUp = ({ setIsLogin, setSignState }) => {
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
      <div className="signupForm">
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
        <Button className="modalButton" type="primary" onClick={handleUserInfo}>
          Create account
        </Button>
        <div className="signupFooter">
          <span>
            Already have an accout?{" "}
            <label
              className="modalLabel"
              onClick={() => {
                setSignState("signIn");
              }}
            >
              Sign in
            </label>
          </span>
        </div>
      </div>
    </>
  );
};
export default SignUp;
