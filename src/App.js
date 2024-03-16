import "./App.css";
import ToolsSidebar from "./Sidebar/ToolSidebar";
import ToolsContent from "./ToolsContent/ToolsContent";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="blockOsn">
        <div className="sectionGridSK">
          <aside>
            <ToolsSidebar />
          </aside>
          <article>
            <Routes>
              <Route path="/" element={<ToolsContent />} />
            </Routes>
          </article>
        </div>
      </div>
    </div>
  );
}

export default App;
