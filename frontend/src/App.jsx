import { useEffect, useState, Suspense, lazy } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFetchUserQuery } from "./features/api/userApiSlice";
import { setUserInformation } from "./features/authSlice";

import ScrollToTop from "./components/ui/ScrollToTop";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";
import LayoutMin from "./components/LayoutMin";
import DashboardLayout from "./components/DashboardLayout";

// Lazy load components
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const SingleCourse = lazy(() => import("./pages/SingleCourse"));
const WatchLecture = lazy(() => import("./pages/WatchLecture"));
const Courses = lazy(() => import("./pages/Courses"));
const Error = lazy(() => import("./pages/Error"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const StuDashboard = lazy(() =>
  import("./components/StudentDashboard/Dashboard")
);
const CreateCourse = lazy(() => import("./pages/CreateCourse"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Stripe_Successful = lazy(() => import("./pages/Stripe_Successful"));
const AdminCourses = lazy(() => import("./pages/AdminCourses"));
const EditCourse = lazy(() => import("./pages/EditCourse"));
const VerifyUser = lazy(() => import("./pages/VerifyUser"));
const BecomeAnInstructor = lazy(() => import("./pages/BecomeAnInstructor"));

function App() {
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);
  const localStorageUser = JSON.parse(localStorage.getItem("eLearn-userInfo"));
  const [needFetch, setNeedFetch] = useState(authenticated.needFetch);
  const { data } = useFetchUserQuery({
    skip: !needFetch,
  });

  useEffect(() => {
    if (data && !authenticated && localStorageUser) {
      dispatch(setUserInformation(data.data));
      setNeedFetch(false);
    }
  }, [data, dispatch, authenticated]);

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div className="text-red-600">Loading...</div>}>
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
            path="/verify"
            element={
              <LayoutMin>
                <VerifyUser />
              </LayoutMin>
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
          />
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
          <Route
            path="/dashboard/create-course"
            element={
              <DashboardLayout>
                <CreateCourse />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/all-courses"
            element={
              <DashboardLayout>
                <AdminCourses />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/edit-course/:slug"
            element={
              <DashboardLayout>
                <EditCourse />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/courses"
            element={
              <DashboardLayout>
                <AdminCourses />
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
            path="/stripe/payment/successful"
            element={
              <Layout>
                <Stripe_Successful />
              </Layout>
            }
          />
          <Route
            path="/become-an-instructor"
            element={
              <Layout>
                <BecomeAnInstructor />
              </Layout>
            }
          />
          <Route
            path="*"
            element={
              <Layout>
                <Error />
              </Layout>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
