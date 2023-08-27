import { Route, Routes } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import MainPage from "./components/MainPage";
import Data from "./components/Data";

function App() {
  return (
    <div className="App w-100">
      <Routes>
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/data" element={<Data />} />
        <Route path="/" element={<FeedbackForm />} />
      </Routes>
    </div>
  );
}

export default App;
