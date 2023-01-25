import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import "./index.css";
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
        // !formatError ? (infoError ? "infoError" : "userInput") : "formatError"
        "userInput"
      }
    >
      Password
      <div>
        <Input.Password
          style={{ margin: "0.2rem 0" }}
          className={
            !formatError ? (infoError ? "infoError" : null) : "formatError"
          }
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
          <div style={{ textAlign: "right" }} className="infoError">
            {message}
          </div>
        ) : null
      ) : (
        <div style={{ textAlign: "right" }} className="formatError">
          {message}
        </div>
      )}
    </div>
  );
};
export default PasswordInput;
