import "./App.css";
import { useState } from "react";
import Header from "./common/Header";
import Home from "./common/Home";
import Footer from "./common/Footer";
function App() {
  //isLogin=> logout/login/loading
  const [isLogin, setIsLogin] = useState("loading");
  const [productStorage, setProductStorage] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [curItem, setCurItem] = useState({
    id: "",
  });
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Header
        productStorage={productStorage}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        userCart={userCart}
        setUserCart={setUserCart}
      />
      <Home
        productStorage={productStorage}
        setProductStorage={setProductStorage}
        isLogin={isLogin}
        userCart={userCart}
        setUserCart={setUserCart}
        curItem={curItem}
        setCurItem={setCurItem}
      />
      <Footer />
    </div>
  );
}

export default App;
