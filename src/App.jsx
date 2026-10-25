import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import LocalityDetails from "./pages/LocalityDetails";
import Schemes from "./pages/Schemes";
import SchemeDetails from "./pages/SchemeDetails";
import Complaints from "./pages/Complaints";
import SubmitComplaint from "./pages/SubmitComplaint";
import ComplaintDetails from "./pages/ComplaintDetails";
import Community from "./pages/Community";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* Layout is a nested route: it draws the navbar and footer around every page */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/locality/:id" element={<LocalityDetails />} />
        <Route path="/schemes" element={<Schemes />} />
        <Route path="/schemes/:id" element={<SchemeDetails />} />
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/complaints/new" element={<SubmitComplaint />} />
        <Route path="/complaints/:id" element={<ComplaintDetails />} />
        <Route path="/community" element={<Community />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
