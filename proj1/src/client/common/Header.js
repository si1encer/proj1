import { useState } from "react";
import ChangePassword from "../components/ChangePassword";
import Login from "../components/Login";
import Logout from "../components/Logout";
import SignUp from "../components/SignUp";
import MyModel from "../components/MyModal";
import "./index.css";
const Header = () => {
  //isLogin=> logout/login/loading
  const [isLogin, setIsLogin] = useState("logout");
  //open => true/false
  const [open, setOpen] = useState(false);
  //signState => signIn/signOut/signUp/password
  const [signState, setSignState] = useState("signIn");
  const signText = (flag = "logout") => {
    switch (flag) {
      case "logout": {
        return "Sign in";
      }
      case "login": {
        return "Sign out";
      }
      case "loading": {
        return "Loading";
      }
      default: {
        return "Wrong";
      }
    }
  };
  const signTitle = (flag) => {
    switch (flag) {
      case "signIn": {
        return "Sign in to your account";
      }
      case "signOut": {
        return "Sign out";
      }
      case "signUp": {
        return "Sign up an account";
      }
      case "password": {
        return "Update your password";
      }
      default: {
        return "Error";
      }
    }
  };
  const signModal = (flag = "signIn") => {
    switch (flag) {
      case "signIn": {
        return <Login setIsLogin={setIsLogin} setSignState={setSignState} />;
      }
      case "signOut": {
        return <Logout />;
      }
      case "signUp": {
        return <SignUp setSignState={setSignState} />;
      }
      case "password": {
        return <ChangePassword />;
      }
      default: {
        return <>OOps, there's something wrong...</>;
      }
    }
  };
  return (
    <>
      <div className="Header">
        <span>Chuwa</span>
        <span className="circleSearch">
          <input className="headSearch" type={"text"} placeholder=" bonjour" />
          <button>search</button>
        </span>

        <span>
          <button
            onClick={() => {
              console.log(signState);
              setOpen(true);
            }}
          >
            {signText(isLogin)}
          </button>
          <MyModel
            titleText={signTitle(signState)}
            open={open}
            setVisible={() => {
              setOpen(false);
              //   setSignState("signIn");
            }}
          >
            {signModal(signState)}
          </MyModel>
        </span>
      </div>
    </>
  );
};
export default Header;
