import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import Services from "./pages/Services";
import { Reports } from "./components/Dashboard/Reports";
import Contact from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Map from "./components/Patient Appointments/Map";
import { DoctorDashboard } from "./components/Dashboard/DoctorDashboard";
import { PatientDashboard } from "./components/Dashboard/PatientDashboard";
import AppointmentsList from "./components/Dashboard/AppointmentsList";
import { AdminDashboard } from "./components/Dashboard/AdminDashboard";
import Appointments from "./components/Appointments";
import { Dashboard } from "./components/Dashboard/Dashbaord"; // Import Dashboard
import BookAppointment from "./components/BookAppointment";
import { NotFound } from "./pages/NotFound";
import Patients from "./components/Dashboard/Patients";
import { Analytics } from "./components/Dashboard/Analytics";
import { Settings } from "./components/Dashboard/Settings";
import AppointmentDetails from "./components/Patient Appointments/AppointmentDetails";
import EditAppointment from "./components/Patient Appointments/EditAppointment";
import PrescriptionView from "./components/Patient Appointments/PrescriptionView";
import Blog from "./pages/Blog";
import ServiceDetail from "./pages/ServiceDetail";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:id" element={<ServiceDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="/appointment/:id" element={<AppointmentDetails />} />
          <Route path="/appointment/:id/edit" element={<EditAppointment />} />
          <Route path="/prescriptions/:id" element={<PrescriptionView />} />
          <Route path="AppointmentsList" element={<AppointmentsList />} />
          <Route path="reports" element={<Reports />} />
          <Route path="contact" element={<Contact />} />
          <Route path="map" element={<Map />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="patient-dashboard" element={<PatientDashboard />} />
          <Route path="book-appointment" element={<BookAppointment />} />

          {/* Nested Admin Dashboard Routes */}
          <Route path="admin-dashboard" element={<AdminDashboard />}>
            <Route index element={<Dashboard />} /> {/* Default view */}
            <Route path="AppointmentsList" element={<AppointmentsList />} />
            <Route path="patients" element={<Patients />} />
            <Route path="reports" element={<Reports />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
