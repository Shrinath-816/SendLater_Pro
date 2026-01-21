import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ScheduledEmails from "./pages/ScheduledEmails";
import SentEmails from "./pages/SentEmails";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Dashboard</Link> |{" "}
        <Link to="/scheduled">Scheduled</Link> |{" "}
        <Link to="/sent">Sent</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/scheduled" element={<ScheduledEmails />} />
        <Route path="/sent" element={<SentEmails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


