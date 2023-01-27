import { Button } from "antd";
import api from "../../api/api";
import "./index.css";
const Logout = ({ setIsLogin, setSignState, setOpen }) => {
  return (
    <>
      <div className="logoutForm">
        <div className="logoutText">You sure to sign out?</div>
        <Button
          className="modalButton"
          type="primary"
          onClick={async () => {
            try {
              let localToken = localStorage.getItem("Token");
              const userToken =
                localToken == null ? false : JSON.parse(localToken);
              const res = await api.logoutApi({ Token: userToken });
              const mes = await res.json();
              console.log(mes);
              setIsLogin("logout");
              setSignState("signIn");
              setOpen(false);
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Sign out
        </Button>
      </div>
    </>
  );
};
export default Logout;
