import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Home from "./pages/home/Home";

import HomeLayout from "./layout/HomeLayout.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx"
import Resume from "./pages/resume/Resume.jsx"
import History from "./pages/history/History.jsx"
import ATSAnalysis from "./pages/ats/ATSAnalysis.jsx";
import Profile from "./pages/profile/Profile";

import ProtectedRoute from "./components/common/ProtectedRoute";
import PublicRoute from "./components/common/PublicRoute";
import Interview from "./pages/interview/Interview.jsx";
import InterviewReport from "./pages/interview/InterviewReport.jsx";
import CreateInterview from "./pages/interview/CreateInterview.jsx";
import InterviewReview from "./pages/interview/InterviewReview";

function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}/>

      </Route>

      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>

          <Route path="/dashboard" element={<Dashboard />}/>

          <Route path="/resume" element={<Resume />} />

          <Route path="/history" element={<History />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/ats-analysis" element={<ATSAnalysis />} />

          <Route path="/create-interview" element={<CreateInterview />} />

          <Route path="/interview/:id" element={<Interview />} />

          <Route path="/interview-review/:id" element={<InterviewReview/>}
/>

          <Route path="/interview-report/:id" element={<InterviewReport />}
          
          
  />


      </Route>
    </Routes>
  );
}

export default App;