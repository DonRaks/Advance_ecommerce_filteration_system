import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";
import MainContent from "./components/MainContent.tsx";

const App = () => {
  return (
    <Router>
      <div className="flex h-screen w-full bg-amber-200">
        <Sidebar />
        <div className="rounded w-full flex justify-between flex-wrap ">
          <Routes>
            <Route   path="/" element={<MainContent />} />
          </Routes>
        </div>
      </div>
      
    </Router>
  );
};

export default App