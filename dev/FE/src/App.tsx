import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import MemberPage from './pages/manager/MemberPage';
import EquipmentPage from './pages/manager/EquipmentPage';
import WaitListPage from './pages/manager/WaitListPage';
import WaitListDetailPage from './pages/manager/WaitListDetailPage';
import MainPage from './pages/manager/MainPage';
import NavBar from './components/common/NavBar';
import UsagePage from './pages/manager/UsagePage';
import AuthProvider from './components/common/AuthProvider';
import { RecordPage } from './pages/user/RecordPage';
import MonthRecordPage from './pages/user/MonthRecordPage';
import WaitInfoPage from './pages/user/WaitInfoPage';
import LoginPage from './pages/user/LoginPage';
import SignUpPage from './pages/user/SignUpPage';
import UserNavBar from './components/common/UserNavBar';
import ManagerAuthGuard from './components/manager/auth/ManagerAuthGuard';
import UserAuthGuard from './components/user/auth/UserAuthGuard';
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<MainPage />} />
              <Route element={<ManagerAuthGuard />}>
                <Route path="member" element={<MemberPage />} />
                <Route path="equipment" element={<EquipmentPage />} />
                <Route path="usage" element={<UsagePage />} />
                <Route path="waitlist" element={<WaitListPage />} />
              </Route>
            </Route>
            <Route path="/" element={<NoNavbarLayout />}>
              <Route
                path="waitlist/:sectionName"
                element={<WaitListDetailPage />}
              />
            </Route>
            <Route path="/user" element={<UserLayout />}>
              <Route element={<UserAuthGuard />}>
                <Route path="record" element={<RecordPage />} />
                <Route path="record/:month" element={<MonthRecordPage />} />
                <Route path="information" element={<WaitInfoPage />} />
              </Route>
            </Route>
            <Route path="/user" element={<NoNavbarUserLayout />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignUpPage />} />
            </Route>
          </>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

function NoNavbarLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

function UserLayout() {
  return (
    <div>
      <div className="mx-auto w-[360px]">
        <Outlet />
      </div>
      <UserNavBar />
    </div>
  );
}

function NoNavbarUserLayout() {
  return (
    <div className="w-[360px] mx-auto">
      <Outlet />
    </div>
  );
}

export default App;
