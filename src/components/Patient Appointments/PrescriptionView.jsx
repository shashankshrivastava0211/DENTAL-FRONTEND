import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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
        const prescriptionResponse = await axios.get(
          `${VITE_REACT_APP_BASE_URL}/prescription?appointmentId=${id}`
        );

        let prescriptionData;
        if (Array.isArray(prescriptionResponse.data)) {
          prescriptionData = prescriptionResponse.data[0];
        } else if (prescriptionResponse.data?.data) {
          prescriptionData = Array.isArray(prescriptionResponse.data.data)
            ? prescriptionResponse.data.data[0]
            : prescriptionResponse.data.data;
        }

        if (!prescriptionData) throw new Error("No prescription found");
        setPrescription(prescriptionData);

        const appointmentIdValue =
          typeof prescriptionData.appointmentId === "object"
            ? prescriptionData.appointmentId._id
            : prescriptionData.appointmentId;

        const appointmentResponse = await axios.get(
          `${VITE_REACT_APP_BASE_URL}/appointments?id=${appointmentIdValue}`
        );

        let appointmentData;
        if (Array.isArray(appointmentResponse.data)) {
          appointmentData = appointmentResponse.data[0];
        } else if (appointmentResponse.data?.data) {
          appointmentData = Array.isArray(appointmentResponse.data.data)
            ? appointmentResponse.data.data[0]
            : appointmentResponse.data.data;
        }

        if (!appointmentData) throw new Error("No appointment found");
        setAppointment(appointmentData);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
        toast.error("Failed to fetch prescription details");
      } finally {
        setLoading(false);
      }
    };

    id ? fetchPrescriptionDetails() : setError("No appointment ID provided");
  }, [id]);

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString || "N/A";
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById("prescription-content");
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Prescription - ${prescription?._id}</title>
          <style>
            @media print {
              body * { visibility: hidden; }
              #prescription-content, #prescription-content * { 
                visibility: visible; 
              }
              #prescription-content { 
                position: absolute; 
                left: 0; 
                top: 0; 
                width: 100%; 
              }
            }
          </style>
        </head>
        <body>${printContent?.outerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const handleDownload = async () => {
    try {
      const element = document.getElementById("prescription-content");
      if (!element) throw new Error("Content not found");

      const canvas = await html2canvas(element, { scale: 2 });
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(canvas, "PNG", 10, 5, imgWidth, imgHeight);
      pdf.save(`prescription-${prescription._id}.pdf`);
      toast.success("Prescription downloaded successfully");
    } catch (error) {
      toast.error("Failed to download prescription");
    }
  };

  const getAppointmentId = () => {
    if (!prescription) return "";
    return typeof prescription.appointmentId === "object"
      ? prescription.appointmentId._id
      : prescription.appointmentId;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !prescription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
          <AlertTriangle className="h-12 w-12 mx-auto text-rose-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {error || "Prescription not found"}
          </h3>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Medical Prescription | 32 Pearls Dental Clinic</title>
        <meta
          name="description"
          content="Official digital prescription with detailed medication information and doctor's instructions."
        />
        <meta
          name="keywords"
          content="dental prescription, medical prescription, digital prescription, medication details"
        />
        <meta
          property="og:title"
          content="Medical Prescription | 32 Pearls Dental Clinic"
        />
        <meta
          property="og:description"
          content="Digitally signed medical prescription with complete treatment details"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b"
        />
      </Helmet>

      <Toaster position="top-center" toastOptions={{ duration: 4000 }} />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <div className="relative z-10 container mx-auto px-4 pt-20 pb-8 md:pt-28">
          <div className="max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
              <div className="flex items-center">
                <button
                  onClick={() => navigate(-1)}
                  className="mr-4 flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm hover:bg-indigo-50"
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
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>

            {/* Prescription Content */}
            <div
              id="prescription-content"
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">Medical Prescription</h2>
                    <p className="text-indigo-100">
                      ID: {prescription._id.substring(0, 8)}...
                    </p>
                  </div>
                  <FileText className="h-10 w-10" />
                </div>
              </div>

              {/* Patient & Details */}
              <div className="p-6 border-b border-gray-200">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Patient Information
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {appointment.patientName}
                      </p>
                      <p>
                        <span className="font-medium">Age:</span>{" "}
                        {appointment.age} years
                      </p>
                      <p>
                        <span className="font-medium">Gender:</span>{" "}
                        {appointment.gender}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {appointment.phoneNo}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Prescription Details
                    </h3>
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {formatDate(prescription.createdAt)}
                      </p>
                      <p>
                        <span className="font-medium">Follow-up:</span>{" "}
                        {prescription.followUpRequired ? "Yes" : "No"}
                      </p>
                      <p>
                        <span className="font-medium">Next Visit:</span>{" "}
                        {formatDate(prescription.nextVisit)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medicines Table */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="flex items-center text-lg font-semibold mb-4">
                  <Pill className="w-5 h-5 mr-2 text-indigo-600" />
                  Medications
                </h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Medicine
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Dosage
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Frequency
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          Duration
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {prescription.medicines?.length > 0 ? (
                        prescription.medicines.map((medicine, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {medicine.name}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {medicine.dosage}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {medicine.frequency}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {medicine.duration}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-4 text-center text-gray-500"
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
                <h3 className="flex items-center text-lg font-semibold mb-4">
                  <ClipboardList className="w-5 h-5 mr-2 text-indigo-600" />
                  Instructions
                </h3>
                {prescription.instructions?.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {prescription.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 italic">
                    No instructions provided
                  </p>
                )}
              </div>

              {/* Procedures */}
              <div className="p-6 border-b border-gray-200">
                <h3 className="flex items-center text-lg font-semibold mb-4">
                  <Stethoscope className="w-5 h-5 mr-2 text-indigo-600" />
                  Procedures
                </h3>
                {prescription.proceduresPerformed?.length > 0 ? (
                  <div className="space-y-4">
                    {prescription.proceduresPerformed.map(
                      (procedure, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-xl">
                          <p className="font-medium">
                            {procedure.procedureName}
                          </p>
                          {procedure.notes && (
                            <p className="text-sm">{procedure.notes}</p>
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
              {prescription.allergies?.length > 0 && (
                <div className="p-6 border-b border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold mb-4">
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

              {/* Footer */}
              <div className="p-6 bg-gray-50">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <p className="text-gray-500 text-sm">
                      Issued on {formatDate(prescription.createdAt)}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Next visit: {formatDate(prescription.nextVisit)}
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-2" />
                    <span className="font-medium">Digitally Verified</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate(`/appointments/${getAppointmentId()}`)}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrescriptionView;
