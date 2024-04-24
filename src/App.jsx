import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form text="Signup" />} />
        <Route path="/login" element={<Form text="Login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
