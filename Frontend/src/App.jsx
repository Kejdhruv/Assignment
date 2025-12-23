import { Routes, Route } from "react-router-dom";
import { PipelineUI } from "./Layout/Ui";


function App() {
  return (
    <Routes>
      <Route path="/" element={<PipelineUI/>} />
    </Routes>
  );
}

export default App;