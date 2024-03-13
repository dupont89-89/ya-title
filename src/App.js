import "./App.css";
import ToolSidebar from "./Sidebar/ToolSidebar";
import ApiSendYaSearch from "./api-ya-search/ApiSendYaSearch";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="blockOsn">
        <div className="sectionGridSK">
          <aside>
            <ToolSidebar />
          </aside>
          <article>
            <Routes>
              <Route path="/" element={<ApiSendYaSearch />} />
            </Routes>
          </article>
        </div>
      </div>
    </div>
  );
}

export default App;
