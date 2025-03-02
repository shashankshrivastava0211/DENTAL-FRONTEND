import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import {
  ArrowLeft,
  FileText,
  Pill,
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Stethoscope,
  Info,
  Download,
  Printer,
  Share2,
} from "lucide-react";
import { VITE_REACT_APP_BASE_URL } from "../utils/constants";

function PrescriptionView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptionDetails = async () => {
      try {
        console.log("Fetching prescription for appointment ID:", id);

        // First fetch the prescription using the correct API endpoint
        const prescriptionResponse = await axios.get(
          `${VITE_REACT_APP_BASE_URL}/api/v1/prescription?appointmentId=${id}`
          // `${VITE_REACT_APP_BASE_URL}/api/v1/prescription?appointmentId=67c075abdd3807a28a731ad7`
        );

        console.log("Prescription Response:", prescriptionResponse);

        let prescriptionData;
        if (
          prescriptionResponse.data &&
          Array.isArray(prescriptionResponse.data)
        ) {
          prescriptionData = prescriptionResponse.data[0];
        } else if (
          prescriptionResponse.data &&
          prescriptionResponse.data.data
        ) {
          prescriptionData = Array.isArray(prescriptionResponse.data.data)
            ? prescriptionResponse.data.data[0]
            : prescriptionResponse.data.data;
        } else {
          throw new Error(
            "Invalid prescription data format received from server"
          );
        }

        if (!prescriptionData) {
          throw new Error("No prescription found for this appointment");
        }

        setPrescription(prescriptionData);

        console.log("Prescription Data:", prescriptionData);

        // Check if appointmentId is an object or a string
        const appointmentIdValue =
          typeof prescriptionData.appointmentId === "object"
            ? prescriptionData.appointmentId._id
            : prescriptionData.appointmentId;

        console.log("Appointment ID to fetch:", appointmentIdValue);

        // Then fetch the associated appointment
        const appointmentResponse = await axios.get(
          `${VITE_REACT_APP_BASE_URL}/api/v1/appointments?id=${appointmentIdValue}`
        );

        console.log("Appointment Response:", appointmentResponse);

        let appointmentData;
        if (
          appointmentResponse.data &&
          Array.isArray(appointmentResponse.data)
        ) {
          appointmentData = appointmentResponse.data[0];
        } else if (appointmentResponse.data && appointmentResponse.data.data) {
          appointmentData = Array.isArray(appointmentResponse.data.data)
            ? appointmentResponse.data.data[0]
            : appointmentResponse.data.data;
        } else {
          throw new Error(
            "Invalid appointment data format received from server"
          );
        }

        if (!appointmentData) {
          throw new Error("No appointment found with the associated ID");
        }

        setAppointment(appointmentData);
      } catch (error) {
        console.error("API Error:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch prescription details"
        );
        toast.error("Failed to fetch prescription details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPrescriptionDetails();
    } else {
      setError("No appointment ID provided");
      setLoading(false);
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return dateString;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    toast.success("Prescription downloaded successfully");
  };

  const handleShare = () => {
    toast.success("Prescription shared successfully");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <div className="text-rose-600 mb-4">
            <AlertTriangle className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!prescription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Prescription not found
          </h3>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Helper function to safely get appointmentId
  const getAppointmentId = () => {
    if (!prescription) return "";

    if (typeof prescription.appointmentId === "object") {
      return prescription.appointmentId._id || "";
    }

    return prescription.appointmentId || "";
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "1rem",
            padding: "1rem 1.5rem",
            fontSize: "0.875rem",
            maxWidth: "24rem",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          },
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <div className="relative min-h-screen">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyek0zMCAzNGgtMnYtNGgydjR6bTAtNnYtNGgtMnY0aDJ6TTI0IDM0aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>

          <div className="relative z-10 container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div className="flex items-center">
                  <button
                    onClick={() => navigate(-1)}
                    className="mr-4 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:bg-indigo-50 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 text-indigo-600" />
                  </button>
                  <h1 className="text-3xl font-bold text-indigo-900">
                    Prescription
                  </h1>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </button>
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </button>
                </div>
              </div>

              {/* Prescription Document */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                {/* Prescription Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold">
                        Medical Prescription
                      </h2>
                      <p className="text-indigo-100">
                        Prescription ID: {prescription._id.substring(0, 8)}...
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-10 w-10" />
                    </div>
                  </div>
                </div>

                {/* Patient & Doctor Info */}
                <div className="p-6 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Patient Information
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Name:</span>{" "}
                          {appointment?.patientName || "N/A"}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Age:</span>{" "}
                          {appointment?.age || "N/A"} years
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Gender:</span>{" "}
                          {appointment?.gender || "N/A"}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Phone:</span>{" "}
                          {appointment?.phoneNo || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Prescription Details
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-700">
                          <span className="font-medium">Date:</span>{" "}
                          {formatDate(prescription.createdAt)}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">
                            Follow-up Required:
                          </span>{" "}
                          {prescription.followUpRequired ? "Yes" : "No"}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Next Visit:</span>{" "}
                          {formatDate(prescription.nextVisit)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medicines */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                    <Pill className="w-5 h-5 mr-2 text-indigo-600" />
                    Medications
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Medicine
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Dosage
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Frequency
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {prescription.medicines &&
                        prescription.medicines.length > 0 ? (
                          prescription.medicines.map((medicine, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {medicine.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {medicine.dosage}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {medicine.frequency}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {medicine.duration}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="4"
                              className="px-6 py-4 text-center text-sm text-gray-500"
                            >
                              No medications prescribed
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Instructions */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                    <ClipboardList className="w-5 h-5 mr-2 text-indigo-600" />
                    Instructions
                  </h3>
                  {prescription.instructions &&
                  prescription.instructions.length > 0 ? (
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                      {prescription.instructions.map((instruction, index) => (
                        <li key={index}>{instruction}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 italic">
                      No specific instructions provided
                    </p>
                  )}
                </div>

                {/* Procedures Performed */}
                <div className="p-6 border-b border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                    <Stethoscope className="w-5 h-5 mr-2 text-indigo-600" />
                    Procedures Performed
                  </h3>
                  {prescription.proceduresPerformed &&
                  prescription.proceduresPerformed.length > 0 ? (
                    <div className="space-y-4">
                      {prescription.proceduresPerformed.map(
                        (procedure, index) => (
                          <div
                            key={index}
                            className="p-4 bg-gray-50 rounded-xl"
                          >
                            <p className="font-medium text-gray-900 mb-1">
                              {procedure.procedureName}
                            </p>
                            {procedure.notes && (
                              <p className="text-gray-700 text-sm">
                                {procedure.notes}
                              </p>
                            )}
                          </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">
                      No procedures performed
                    </p>
                  )}
                </div>

                {/* Allergies */}
                {prescription.allergies &&
                  prescription.allergies.length > 0 && (
                    <div className="p-6 border-b border-gray-200">
                      <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                        <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                        Allergies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {prescription.allergies.map((allergy, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-amber-50 text-amber-800 rounded-full text-sm"
                          >
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Additional Notes */}
                {prescription.additionalNotes && (
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="flex items-center text-lg font-semibold text-gray-900 mb-4">
                      <Info className="w-5 h-5 mr-2 text-indigo-600" />
                      Additional Notes
                    </h3>
                    <div className="p-4 bg-gray-50 rounded-xl text-gray-700">
                      {prescription.additionalNotes}
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="p-6 bg-gray-50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <p className="text-gray-500 text-sm">
                        This prescription was issued on{" "}
                        {formatDate(prescription.createdAt)}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Next appointment: {formatDate(prescription.nextVisit)}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <div className="flex items-center">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
                        <span className="text-gray-700 font-medium">
                          Digitally Verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back to Appointment Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={() =>
                    navigate(`/appointments/${getAppointmentId()}`)
                  }
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 mr-2" />
                  Back to Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrescriptionView;
