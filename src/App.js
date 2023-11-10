
import {Routes, Route, BrowserRouter} from "react-router-dom";
import './App.css';
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Util/Home";
import Shop from "./Components/Util/Shop";
import PageNotFound from "./Components/Util/PageNotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop/>} /> 
          <Route path="/template" element={<Home/>} /> 
          <Route path="/*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
