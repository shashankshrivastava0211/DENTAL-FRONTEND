import React, { useState, useEffect } from "react";
import { X, Plus, Minus, FileText, AlertCircle, Download } from "lucide-react";
import { VITE_REACT_APP_BASE_URL } from "../utils/constants";

const BillModal = ({
  isOpen,
  onClose,
  appointmentId,
  existingBill,
  onSave,
}) => {
  const [bill, setBill] = useState({
    items: [{ description: "", amount: "" }],
    discount: "",
    tax: "",
    notes: "",
    amount: 0,
  });

  const [errors, setErrors] = useState({ items: false });

  useEffect(() => {
    if (existingBill) {
      setBill({
        ...existingBill,
        items: (
          existingBill.items || [
            { description: "", amount: "", discount: "", tax: "" },
          ]
        ).map((item) => ({
          ...item,
          tax: item.tax || "",
          discount: item.discount || "",
          amount: item.amount || "",
          description: item.description || "",
        })),
        discount: existingBill.discount || "",
        tax: existingBill.tax || "",
        notes: existingBill.notes || "",
      });
    } else {
      setBill({
        items: [{ description: "", amount: "" }],
        discount: "",
        tax: "",
        notes: "",
        amount: 0,
      });
    }
    setErrors({ items: false });
  }, [existingBill]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...bill.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setBill({ ...bill, items: newItems });
    if (field === "description" && value.trim() !== "") {
      setErrors({ ...errors, items: false });
    }
  };

  const addItem = () => {
    setBill({
      ...bill,
      items: [
        ...bill.items,
        { description: "", amount: "", discount: "", tax: "" },
      ],
    });
  };

  const removeItem = (index) => {
    if (bill.items.length > 1) {
      const newItems = bill.items.filter((_, i) => i !== index);
      setBill({ ...bill, items: newItems });
      const hasDesc = newItems.some((item) => item.description.trim() !== "");
      setErrors({ ...errors, items: !hasDesc });
    }
  };

  const validateForm = () => {
    const newErrors = { items: false };
    const hasDesc = bill.items.some((item) => item.description.trim() !== "");
    if (!hasDesc) newErrors.items = true;
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  };

  const downloadBill = () => {
    // Calculate totals
    const subtotal = bill.items.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
    const discount = parseFloat(bill.discount) || 0;
    const tax = parseFloat(bill.tax) || 0;
    const total = subtotal - discount + tax;

    // Create bill content
    const billContent = `
DENTAL CLINIC BILL
==================

Date: ${new Date().toLocaleDateString()}
Bill ID: ${existingBill?._id || "New Bill"}

ITEMS:
${bill.items
  .filter((item) => item.description.trim() !== "")
  .map(
    (item, index) => `${index + 1}. ${item.description} - ₹${item.amount || 0}`
  )
  .join("\n")}

Subtotal: ₹${subtotal}
Discount: ₹${discount}
Tax: ₹${tax}
Total: ₹${total}

Notes: ${bill.notes || "No additional notes"}

Thank you for choosing our dental services!
    `;

    // Create blob and download
    const blob = new Blob([billContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bill-${existingBill?._id || Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Calculate total amount from items
    const amount = bill.items
      .filter((item) => item.description.trim() !== "")
      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

    // Prepare payload including items
    const payload = {
      appointmentId,
      amount,
      isBaseAdded: true, // or set as needed
      discount: parseFloat(bill.discount) || 0,
      paymentMethod: "cash",
      isPaid: false,
      notes: bill.notes,
      items: bill.items, // <- include items array here
    };

    try {
      // Call the onSave callback with the bill data
      await onSave(payload);
    } catch (error) {
      // Handle error (show toast, etc.)
      console.error(error);
    }
  };

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = bill.items.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0
  );
  const discount = parseFloat(bill.discount) || 0;
  const tax = parseFloat(bill.tax) || 0;
  const total = subtotal - discount + tax;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="h-6 w-6 text-indigo-600" />
            {existingBill ? "View/Edit Bill" : "Add New Bill"}
          </h2>
          <div className="flex items-center gap-2">
            {existingBill && (
              <button
                onClick={downloadBill}
                className="inline-flex items-center px-4 py-2 border border-green-300 rounded-lg text-sm font-medium text-green-700 bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Bill
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Bill Items Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Bill Items</h3>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center px-4 py-2 border border-indigo-300 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </button>
            </div>
            {errors.items && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-red-500" />
                Please add at least one bill item with a description
              </div>
            )}
            <div className="space-y-4">
              {bill.items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-200 rounded-xl bg-gray-50"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        placeholder="Service or item description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.amount}
                        onChange={(e) =>
                          handleItemChange(index, "amount", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        placeholder="Amount"
                      />
                    </div>
                    {bill.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="ml-2 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Minus className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discount, Tax, and Total */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 border border-gray-200 rounded-xl bg-gray-50">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={bill.discount}
                onChange={(e) => setBill({ ...bill, discount: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="Discount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tax (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={bill.tax}
                onChange={(e) => setBill({ ...bill, tax: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                placeholder="Tax"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total (₹)
              </label>
              <input
                type="text"
                value={total}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-lg font-medium text-gray-900 mb-2">
              Additional Notes
            </label>
            <textarea
              value={bill.notes}
              onChange={(e) => setBill({ ...bill, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              placeholder="Add any notes for this bill..."
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 border border-transparent rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              {existingBill ? "Update Bill" : "Save Bill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillModal;
