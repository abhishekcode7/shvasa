import "./App.css";
import SupportAgent from "./components/SupportAgent";
import NavigationBar from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateTicket from "./components/CreateTicket";
function App() {
  return (
    <>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SupportAgent />} />
          <Route path="/agent" exact element={<SupportAgent />} />
          <Route path="/createTicket" exact element={<CreateTicket />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
