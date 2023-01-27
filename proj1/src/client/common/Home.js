import "./index.css";
import api from "../api/api";
import { useState } from "react";
const Home = () => {
  const [info, setInfo] = useState({});
  const clic = async function () {
    // let res = await api.infoApi();
    let res = await api.adderApi({ email: "1@2.com", password: "123456" });
    let str = await res.json();
    console.log(str);
    setInfo(str);
  };
  return (
    <>
      <div className="Home">
        <div>
          <button onClick={clic}> show info</button>
        </div>
        <div></div>
      </div>
    </>
  );
};
export default Home;
