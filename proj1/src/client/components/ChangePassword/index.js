import "./index.css";
import validator from "validator";
import { useState } from "react";
import EmailInput from "../Input/EmailInput";
import PasswordInput from "../Input/PasswordInput";
import { Button, Checkbox } from "antd";
const ChangePassword = ({ setSignState }) => {
  const [userEmail, setUserEmail] = useState({
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
  const handleUserInfo = async () => {
    if (!validEmail()) {
      return;
    }
    try {
      //validate from back-end
    } catch (e) {
      return;
    }
    setSignState("messageSent");
  };
  return (
    <>
      <div className="passwordForm">
        <div className="passwordText">
          Enter your email link. We will send you the recovery link.
        </div>
        <EmailInput
          onChange={(e) => setUserEmail({ ...e, value: e.target.value })}
          value={userEmail.value}
          formatError={userEmail.error}
          infoError={userEmail.error}
          message={userEmail.message}
        />
        <Button className="pwButton" type="primary" onClick={handleUserInfo}>
          Update password
        </Button>
      </div>
    </>
  );
};
export default ChangePassword;
