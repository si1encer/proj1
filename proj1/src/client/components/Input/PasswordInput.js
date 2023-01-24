import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
const PasswordInput = ({
  onChange,
  value,
  formatError,
  infoError,
  message,
}) => {
  return (
    <div
      className={
        !formatError ? (infoError ? "infoError" : "userInput") : "formatError"
      }
    >
      Password
      <div>
        <Input.Password
          className={
            !formatError ? (infoError ? "infoError" : null) : "formatError"
          }
          // type={"password"}
          onChange={onChange}
          placeholder={"at least 6 characters"}
          value={value}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </div>
      {!formatError ? (
        infoError ? (
          <div className="infoError">{message}</div>
        ) : null
      ) : (
        <div className="formatError">{message}</div>
      )}
    </div>
  );
};
export default PasswordInput;
