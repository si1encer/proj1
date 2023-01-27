import { useState } from "react";
import ChangePassword from "../components/ChangePassword";
import Login from "../components/Login";
import Logout from "../components/Logout";
import SignUp from "../components/SignUp";
import MyModel from "../components/MyModal";
import MessageSent from "../components/MessageSent";
import { Input } from "antd";

import "./index.css";
const Header = () => {
  //isLogin=> logout/login/loading
  const [isLogin, setIsLogin] = useState("logout");
  //open => true/false
  const [open, setOpen] = useState(false);
  //signState => signIn/signOut/signUp/password/messageSent
  const [signState, setSignState] = useState("signIn");
  const { Search } = Input;
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
      case "messageSent": {
        return "";
      }
      default: {
        return "Error";
      }
    }
  };
  const signModal = (flag = "signIn") => {
    switch (flag) {
      case "signIn": {
        return (
          <Login
            setIsLogin={setIsLogin}
            setSignState={setSignState}
            setOpen={setOpen}
          />
        );
      }
      case "signOut": {
        return (
          <Logout
            setIsLogin={setIsLogin}
            setSignState={setSignState}
            setOpen={setOpen}
          />
        );
      }
      case "signUp": {
        return (
          <SignUp
            setIsLogin={setIsLogin}
            setSignState={setSignState}
            setOpen={setOpen}
          />
        );
      }
      case "password": {
        return <ChangePassword setSignState={setSignState} />;
      }
      case "messageSent": {
        return <MessageSent setSignState={setSignState} />;
      }
      default: {
        return <>OOps, there's something wrong...</>;
      }
    }
  };
  return (
    <>
      <div className="Header">
        <span className="HeaderText">
          <span className="head1">M</span>
          <span className="head2">enagement</span>
          <span className="head3"> Chuwa</span>
        </span>
        <Search placeholder="Search " className="headSearch"></Search>

        <span className="HeaderIcon">
          <button className="signButton"
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
              if (signState == "password" || signState == "messageSent") {
                setSignState("signIn");
              }
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
