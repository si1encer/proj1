import "./index.css";
import api from "../api/api";
import { useEffect, useState } from "react";
const Home = ({ isLogin }) => {
  const [info, setInfo] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isLogin == "logout") {
      setInfo({ email: "", password: "" });
    }
  }, [isLogin]);
  const clic = async function () {
    // let res = await api.infoApi();
    // let res = await api.adderApi({ email: "1@2.com", password: "123456" });
    // let str = await res.json();
    // console.log(str);
    // setInfo(str);
    /////////
    const localToken = localStorage.getItem("Token");
    const userToken = localToken == null ? false : JSON.parse(localToken);
    if (userToken) {
      const res = await api.infoApi({ Token: userToken });
      if (res.status === 200) {
        //set user info from response
        const userInfo = await res.json();
        console.log(userInfo);
        setInfo({ email: userInfo.email, password: userInfo.password });
      } else {
        const mes = await res.json();
        console.log(mes);
      }
    }
  };
  const homeContent = (flag) => {
    switch (flag) {
      case "login": {
        return (
          <>
            <div>
              <button onClick={clic}> show info</button>
            </div>
            <div>
              your email:{"  "}
              {info.email}
            </div>
            <div>
              your password:{"  "}
              {info.password}
            </div>
          </>
        );
      }
      case "logout": {
        return (
          <>
            <div>You may want to sign in now...</div>
          </>
        );
      }
      case "loading": {
        return (
          <>
            {" "}
            <div className="loadingContent"> loading...</div>
          </>
        );
      }
      default: {
        return (
          <>
            <div>Ooops, sry theres something goes wrong....</div>
          </>
        );
      }
    }
  };

  return (
    <>
      <div className="Home">
        <div>{homeContent(isLogin)}</div>
      </div>
    </>
  );
};
export default Home;
