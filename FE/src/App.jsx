import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Viewer from "./pages/Viewer";
import ViewerTest from "./pages/ViewerTest";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/viewerTest" element={<ViewerTest />} />
      </Routes>
    </Router>
  );
}

export default App;
