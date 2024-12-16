import "./assets/styles/reset.css";
import React from "react";
import Layout from "./layout/Layout";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ADMIN_ROUTES, ROUTES } from "./routes";

import Educational from "./pages/Academic/Home/Educational";

import { AuthProvider } from "./context/authContext";

import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import Contact from "./pages/Academic/Contact";
import Fields from "./pages/Academic/Fields";
import Blogs from "./pages/Academic/Blog";
import Events from "./pages/Academic/Events";
import About from "./pages/Academic/About";
import VacancyDetails from "./pages/Academic/Career";
import EventDetails from "./pages/Academic/Events/Details";
import BlogDetails from "./pages/Academic/Blog/Details";
import Login from "./pages/Admin/Login";
import AdminHome from "./pages/Admin/Home";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminLayout from "./layout/AdminLayout";
import AdminMain from "./pages/Admin/Main";
import AdminUsers from "./pages/Admin/Users";
import AdminVacancies from "./pages/Admin/Vacancies";
import AdminCategories from "./pages/Admin/Categories";
import AdminEvents from "./pages/Admin/Events";
import Corporate from "./pages/Corporate/Home/Corporate";
import { ThemeProvider } from "./context/themeContext";
import CourseDetails from "./pages/Academic/Fields/Details";
import AdminAdvantages from "./pages/Admin/Advantages";
import AdminCourses from "./pages/Admin/Courses";
import AdminSubjects from "./pages/Admin/Subjects";
import MainForm from "./pages/Admin/Main/Form";
import CourseForm from "./pages/Admin/Courses/Form";
import UserForm from "./pages/Admin/Users/NewUser";
import AdminBlogs from "./pages/Admin/Blogs";
import BlogForm from "./pages/Admin/Blogs/Form";
import AcademicApply from "./pages/Admin/Applies/Academic";
import AdminTeachers from "./pages/Admin/Teachers";
import TeacherForm from "./pages/Admin/Teachers/Form";
import AlumniPage from "./pages/Academic/Alumni";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path={ROUTES.EDUCATIONAL.HOME.PATH}
                element={<Educational />}
              />
              <Route
                path={ROUTES.CORPORATE.HOME.PATH}
                element={<Corporate />}
              />
              <Route
                path={ROUTES.EDUCATIONAL.CONTACT.PATH}
                element={<Contact />}
              />
               <Route
                path={ROUTES.EDUCATIONAL.ALUMNI.PATH}
                element={<AlumniPage />}
              />
                <Route
                path={ROUTES.CORPORATE.CONTACT.PATH}
                element={<Contact />}
              />
              <Route path={ROUTES.EDUCATIONAL.ABOUT.PATH} element={<About />} />
              <Route
                path={ROUTES.EDUCATIONAL.VACANCY.DETAILS.PATH}
                element={<VacancyDetails />}
              />
              <Route
                path={ROUTES.EDUCATIONAL.EVENTS.MAIN.PATH}
                element={<Events />}
              />
              <Route
                path={ROUTES.EDUCATIONAL.EVENTS.DETAILS.PATH}
                element={<EventDetails />}
              />
              <Route
                path={ROUTES.EDUCATIONAL.COURSES.MAIN.PATH}
                element={<Fields />}
              />
              <Route
                path={ROUTES.EDUCATIONAL.COURSES.DETAILS.PATH}
                element={<CourseDetails />}
              />
              <Route
                path={ROUTES.EDUCATIONAL.BLOGS.MAIN.PATH}
                element={<Blogs />}
              />
              <Route
                path={ROUTES.EDUCATIONAL.BLOGS.DETAILS.PATH}
                element={<BlogDetails />}
              />
            </Route>

            <Route path={ADMIN_ROUTES.LOGIN.PATH} element={<Login />} />

            <Route
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path={ADMIN_ROUTES.HOME.PATH} element={<AdminHome />} />
              <Route
                path={ADMIN_ROUTES.MAIN.HOME.PATH}
                element={<AdminMain />}
              />
              <Route
                path={ADMIN_ROUTES.MAIN.EDIT.PATH}
                element={<MainForm />}
              />
              <Route
                path={ADMIN_ROUTES.COURSES.MAIN.PATH}
                element={<AdminCourses />}
              />
              <Route
                path={ADMIN_ROUTES.COURSES.NEW_COURSE.PATH}
                element={<CourseForm />}
              />
               <Route
                path={ADMIN_ROUTES.COURSES.EDIT_COURSE.PATH}
                element={<CourseForm />}
              />
              <Route
                path={ADMIN_ROUTES.USERS.MAIN.PATH}
                element={<AdminUsers />}
              />
              <Route
                path={ADMIN_ROUTES.APPLIES.ACADEMIC.PATH}
                element={<AcademicApply />}
              />
              <Route
                path={ADMIN_ROUTES.USERS.NEW_USER.PATH}
                element={<UserForm />}
              />
              <Route
                path={ADMIN_ROUTES.VACANCIES.MAIN.PATH}
                element={<AdminVacancies />}
              />
              <Route
                path={ADMIN_ROUTES.CATEGORIES.MAIN.PATH}
                element={<AdminCategories />}
              />
              <Route
                path={ADMIN_ROUTES.EVENTS.MAIN.PATH}
                element={<AdminEvents />}
              />
              <Route
                path={ADMIN_ROUTES.BLOGS.MAIN.PATH}
                element={<AdminBlogs />}
              />
               <Route
                path={ADMIN_ROUTES.BLOGS.NEW_BLOG.PATH}
                element={<BlogForm />}
              />
               <Route
                path={ADMIN_ROUTES.BLOGS.EDIT_BLOG.PATH}
                element={<BlogForm />}
              />
              <Route
                path={ADMIN_ROUTES.ADVANTAGES.MAIN.PATH}
                element={<AdminAdvantages />}
              />
              <Route
                path={ADMIN_ROUTES.TEACHERS.MAIN.PATH}
                element={<AdminTeachers />}
              />
              <Route
                path={ADMIN_ROUTES.TEACHERS.NEW_TEACHER.PATH}
                element={<TeacherForm />}
              />
              <Route
                path={ADMIN_ROUTES.TEACHERS.MAIN.PATH}
                element={<TeacherForm />}
              />
               
              <Route
                path={ADMIN_ROUTES.SUBJECTS.MAIN.PATH}
                element={<AdminSubjects />}
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </AuthProvider>
      <Toaster />
    </Router>
  );
};

export default App;
