import "./App.css";
import Header from "./common/Header";
import Home from "./common/Home";
import Footer from "./common/Footer";
function App() {
  return (
    <div className="App" style={{ width: "100vw", height: "100vh" }}>
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
