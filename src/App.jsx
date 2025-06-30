import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import { Login } from "./pages/Login";
import Map from "./components/Patient Appointments/Map";
import AppointmentsList from "./components/Dashboard/AppointmentsList";
import { AdminDashboard } from "./components/Dashboard/AdminDashboard";
import Appointments from "./pages/Appointments";
import { Dashboard } from "./components/Dashboard/Dashbaord";
import BookAppointment from "./pages/BookAppointment";
import { NotFound } from "./pages/NotFound";
import Patients from "./components/Dashboard/Patients";
import { Settings } from "./components/Dashboard/Settings";
import AppointmentDetails from "./components/Patient Appointments/AppointmentDetails";
import EditAppointment from "./components/Patient Appointments/EditAppointment";
import PrescriptionView from "./components/Patient Appointments/PrescriptionView";
import Blog from "./pages/Blog";
import ServiceDetail from "./components/ServiceDetail";
import { AuthProvider } from "./Auth/AuthContext";
import RouteGuard from "./Auth/RouteGaurd";
import ProtectedRoute from "./Auth/ProtectedRoute";
// import Main from "./components/extra/New Dashboard/Main";

function App() {
	return (
		<AuthProvider>
			<Router>
				<RouteGuard />
				<Routes>
					<Route path="/" element={<Layout />}>
						{/* Public routes */}
						<Route index element={<Home />} />
						<Route path="about" element={<About />} />
						<Route path="services" element={<Services />} />
						<Route path="services/:id" element={<ServiceDetail />} />
						<Route path="/blog" element={<Blog />} />
						<Route path="appointments" element={<Appointments />} />
						<Route path="/appointment/:id" element={<AppointmentDetails />} />
						<Route path="/appointment/:id/edit" element={<EditAppointment />} />
						<Route path="/prescriptions/:id" element={<PrescriptionView />} />
						<Route path="contact" element={<Contact />} />
						<Route path="map" element={<Map />} />
						<Route path="login" element={<Login />} />
						<Route path="book-appointment" element={<BookAppointment />} />
					</Route>

					{/* Protected Admin Routes */}
					<Route element={<ProtectedRoute />}>
						<Route path="admin-dashboard" element={<AdminDashboard />}>
							<Route index element={<Dashboard />} />
							<Route path="AppointmentsList" element={<AppointmentsList />} />
							<Route path="patients" element={<Patients />} />
							<Route path="settings" element={<Settings />} />
						</Route>
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</AuthProvider>
	);
}

export default App;
