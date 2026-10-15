import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/Toast';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import RecruiterLayout from './layouts/RecruiterLayout';
import CandidateLayout from './layouts/CandidateLayout';

// Public pages
import LandingPage from './pages/LandingPage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Candidate pages
import CandidateDashboard from './pages/candidate/CandidateDashboard';
import CandidateApplications from './pages/candidate/CandidateApplications';
import CandidateProfile from './pages/candidate/CandidateProfile';
import CandidateSavedJobs from './pages/candidate/CandidateSavedJobs';
import CandidateInterviews from './pages/candidate/CandidateInterviews';
import CandidateMessages from './pages/candidate/CandidateMessages';

// Recruiter pages
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import RecruiterJobs from './pages/recruiter/RecruiterJobs';
import RecruiterCandidates from './pages/recruiter/RecruiterCandidates';
import RecruiterPipeline from './pages/recruiter/RecruiterPipeline';
import RecruiterInterviews from './pages/recruiter/RecruiterInterviews';
import RecruiterReports from './pages/recruiter/RecruiterReports';
import RecruiterMessages from './pages/recruiter/RecruiterMessages';

const App: React.FC = () => (
  <BrowserRouter>
    <ToastProvider>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
        </Route>

        {/* Auth routes (no layout wrapper) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Candidate portal */}
        <Route path="/candidate" element={<CandidateLayout />}>
          <Route index element={<Navigate to="/candidate/dashboard" replace />} />
          <Route path="dashboard" element={<CandidateDashboard />} />
          <Route path="applications" element={<CandidateApplications />} />
          <Route path="profile" element={<CandidateProfile />} />
          <Route path="saved" element={<CandidateSavedJobs />} />
          <Route path="interviews" element={<CandidateInterviews />} />
          <Route path="messages" element={<CandidateMessages />} />
        </Route>

        {/* Recruiter / HR portal */}
        <Route path="/recruiter" element={<RecruiterLayout />}>
          <Route index element={<Navigate to="/recruiter/dashboard" replace />} />
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="jobs" element={<RecruiterJobs />} />
          <Route path="candidates" element={<RecruiterCandidates />} />
          <Route path="pipeline" element={<RecruiterPipeline />} />
          <Route path="interviews" element={<RecruiterInterviews />} />
          <Route path="reports" element={<RecruiterReports />} />
          <Route path="messages" element={<RecruiterMessages />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  </BrowserRouter>
);

export default App;
