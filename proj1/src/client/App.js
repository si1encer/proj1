import "./App.css";
import { useState } from "react";
import Header from "./common/Header";
import Home from "./common/Home";
import Footer from "./common/Footer";
function App() {
  //isLogin=> logout/login/loading
  const [isLogin, setIsLogin] = useState("loading");
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Header isLogin={isLogin} setIsLogin={setIsLogin} />
      <Home isLogin={isLogin} />
      <Footer />
    </div>
  );
}

export default App;
