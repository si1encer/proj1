import { Input } from "antd";

const EmailInput = ({ onChange, value, formatError, infoError, message }) => {
  return (
    <div
      className={
        !formatError ? (infoError ? "infoError" : "userInput") : "formatError"
      }
    >
      Email
      <div>
        <Input
          className={
            !formatError
              ? infoError
                ? "infoError"
                : "userInput"
              : "formatError"
          }
          type={"text"}
          onChange={onChange}
          placeholder={"you@example.com"}
          value={value}
          //   disabled={disabled}
        ></Input>
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
export default EmailInput;
