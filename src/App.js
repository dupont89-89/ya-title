import "./App.css";
import Test from "./Test/Test";
import ToolsContent from "./ToolsContent/ToolsContent";
import { Route, Routes } from "react-router-dom";
import Footer from "./footer/Footer";

function App() {
  return (
    <div className="App">
      <Test />
      <div className="blockOsn">
        <article>
          <Routes>
            <Route path="/" element={<ToolsContent />} />
          </Routes>
        </article>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
