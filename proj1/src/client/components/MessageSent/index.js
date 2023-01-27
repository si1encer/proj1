import "./index.css";

const MessageSent = ({ setSignState }) => {
  return (
    <>
      <div className="messageForm">
        <div className="messageText">
          We have sent the update password link to your email, please check
          that!
        </div>
        <div className="messageFooter">
          {" "}
          <label
            className="modalLabel"
            onClick={() => {
              setSignState("signIn");
            }}
          >
            back to sign in
          </label>{" "}
        </div>
      </div>
    </>
  );
};
export default MessageSent;
