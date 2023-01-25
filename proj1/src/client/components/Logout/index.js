import { Button } from "antd";

const Logout = ({ setIsLogin, setSignState }) => {
  return (
    <>
      <div>You sure to sign out?</div>
      <Button
        className="modalButton"
        type="primary"
        onClick={() => {
          setIsLogin("logout");
          setSignState("signIn");
        }}
      >
        Sign out
      </Button>
    </>
  );
};
export default Logout;
