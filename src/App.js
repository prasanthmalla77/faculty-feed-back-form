import { Route, Routes } from "react-router-dom";
import FeedbackForm from "./components/FeedbackForm";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/mainpage" element={<MainPage />} />
        <Route path="/" element={<FeedbackForm />} />
      </Routes>
    </div>
  );
}

export default App;
