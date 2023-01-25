import { Input } from "antd";
import "./index.css";
const EmailInput = ({ onChange, value, formatError, infoError, message }) => {
  return (
    <div
      className={
        // !formatError ? (infoError ? "infoError" : "userInput") : "formatError"
        "userInput"
      }
    >
      Email
      <div>
        <Input
          style={{ margin: "0.2rem 0" }}
          className={
            !formatError
              ? infoError
                ? "infoError"
                : "normalInput"
              : "formatError"
          }
          type={"text"}
          onChange={onChange}
          placeholder={"you@example.com"}
          value={value}
        ></Input>
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
export default EmailInput;
