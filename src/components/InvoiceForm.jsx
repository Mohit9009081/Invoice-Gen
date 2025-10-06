import { useState } from "react";

const IntialValue = {
  invoiceNo: "",
  date: "",
  name: "",
  mobileNumber: "",
  address: "",
  productDescription: "",
  amount: "",
  tax: "",
  discount: "",
  paymentMethod: "",
  notes: ""
};

const InvoiceForm = () => {
  const [formData, setFormData] = useState(IntialValue);

  const onChange = (e) => {
    const InputName = e.target.name;
    const InputValue = e.target.value;
    const updated = { ...formData, [InputName]: InputValue };
    setFormData(updated);
    localStorage.setItem("invoice", JSON.stringify(updated));
    console.log({ ...formData, [InputName]: InputValue });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted", formData);
  };

  return (
    <>
      <h1 className="text-3xl font-bold uppercase text-center mt-10 text-gray-800">
        Invoice Form
      </h1>

      <section className="p-6 md:p-12 lg:p-20">
        <form
          onSubmit={onFormSubmit}
          className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-10 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 font-medium">Invoice No.</label>
              <input
                onChange={onChange}
                type="text"
                name="invoiceNo"
                placeholder="Enter invoice no."
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Date</label>
              <input
                onChange={onChange}
                type="date"
                name="date"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Name</label>
              <input
                onChange={onChange}
                type="text"
                name="name"
                placeholder="Enter name"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Mobile Number</label>
              <input
                onChange={onChange}
                type="tel"
                name="mobileNumber"
                placeholder="Enter mobile number"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium">Address</label>
              <textarea
                onChange={onChange}
                name="address"
                placeholder="Enter address"
                rows={4}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-700 font-medium">
                Product/Service Description
              </label>
              <textarea
                onChange={onChange}
                name="productDescription"
                placeholder="Enter description"
                rows={4}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Amount</label>
              <input
                onChange={onChange}
                type="number"
                name="amount"
                placeholder="Enter amount"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Tax (%)</label>
              <input
                onChange={onChange}
                type="number"
                name="tax"
                placeholder="Enter tax"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Discount (%)</label>
              <input
                onChange={onChange}
                type="number"
                name="discount"
                placeholder="Enter discount"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">
                Payment Method
              </label>
              <select
                onChange={onChange}
                name="paymentMethod"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Payment Method</option>
                <option value="cash">Cash</option>
                <option value="credit_card">Credit Card</option>
                <option value="bank_transfer">Bank Transfer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-gray-700 font-medium">Notes</label>
            <textarea
              onChange={onChange}
              name="notes"
              placeholder="Enter notes"
              rows={3}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold py-2 px-4 rounded-lg mt-4"
          >
            Submit Invoice
          </button>
        </form>
      </section>
    </>
  );
};

export default InvoiceForm;