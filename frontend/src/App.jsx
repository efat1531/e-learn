import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Navigate } from "react-router";

import DashboardLayout from "./components/DashboardLayout";
import Layout from "./components/Layout";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import ScrollToTop from "./components/ui/ScrollToTop";
import SingleCourse from "./pages/SingleCourse";
import WatchLecture from "./pages/WatchLecture";
import Courses from "./pages/Courses";
import Error from "./pages/Error";
import StudentDashboard from "./pages/StudentDashboard";
import StuDashboard from "./components/StudentDashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} index />
        <Route
          path="/home"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutUs />
            </Layout>
          }
        />
        <Route
          path="/faq"
          element={
            <Layout>
              <FAQ />
            </Layout>
          }
        />
        <Route
          path="/courses"
          element={
            <Layout>
              <Courses />
            </Layout>
          }
        ></Route>
        <Route
          path="/courses/:slug"
          element={
            <Layout>
              <SingleCourse />
            </Layout>
          }
        />
        <Route
          path="/courses/:slug/lecture/:lectureId"
          element={
            <Layout>
              <WatchLecture />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <UserDashboard />
            </DashboardLayout>
          }
        />
        <Route path="" element={<PrivateRoute />}>
          <Route
            path="/student"
            element={
              <Layout>
                <StudentDashboard />
              </Layout>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StuDashboard />} />
          </Route>
        </Route>
        <Route path="" element={<PrivateRoute />}>
          <Route
            path="/cart/checkout"
            element={
              <Layout>
                <Checkout />
              </Layout>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <Layout>
              <Error />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
