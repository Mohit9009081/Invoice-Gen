import { useState } from "react";

const initialProductRow = {
  description: "",
  hsnSac: "",
  qty: "",
  taxableValue: "",
  cgst: "",
  sgst: "",
  total: ""
};

const InvoiceForm = ({ onSubmit, onChange }) => {
  const [productRows, setProductRows] = useState([{ ...initialProductRow }]);

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = productRows.map((row, i) =>
      i === index ? { ...row, [name]: value } : row
    );
    setProductRows(updatedRows);
    // Optionally, call a parent onChange with all productRows
    if (onChange) onChange({ target: { name: "productRows", value: updatedRows } });
  };

  const addProductRow = () => {
    setProductRows([...productRows, { ...initialProductRow }]);
  };

  return (
    <>
      <h1 className="text-3xl font-bold uppercase text-center mt-10 text-gray-800">
        Invoice Form
      </h1>

      <section className="p-6 md:p-12 lg:p-20">
        <form
          onSubmit={onSubmit}
          className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 md:p-10 flex flex-col gap-4"
        >
          <div className=" flex flex-col gap-4">
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

            {productRows.map((row, idx) => (
              <div key={idx} className="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                <div>
                  <label className="text-gray-700 font-medium">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={row.description}
                    onChange={e => handleProductChange(idx, e)}
                    placeholder="Product Name"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">HSN/SAC</label>
                  <input
                    type="text"
                    name="hsnSac"
                    value={row.hsnSac}
                    onChange={e => handleProductChange(idx, e)}
                    placeholder="HSN/SAC"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">Qty</label>
                  <input
                    type="number"
                    name="qty"
                    value={row.qty}
                    onChange={e => handleProductChange(idx, e)}
                    placeholder="Qty"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">Taxable Value</label>
                  <input
                    type="text"
                    name="taxableValue"
                    value={row.taxableValue}
                    onChange={e => handleProductChange(idx, e)}
                    placeholder="Taxable Value"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">CGST</label>
                  <input
                    type="text"
                    name="cgst"
                    value={row.cgst}
                    onChange={e => handleProductChange(idx, e)}
                    placeholder="CGST"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">SGST</label>
                  <input
                    type="text"
                    name="sgst"
                    value={row.sgst}
                    onChange={e => handleProductChange(idx, e)}
                    placeholder="SGST"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">Total</label>
                  <input
                    type="number"
                    name="total"
                    value={row.total}
                    onChange={e => handleProductChange(idx, e)}
                    placeholder="Total"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addProductRow}
              className="mt-2 block bg-green-500 text-white px-3 py-1 rounded w-fit"
            >
              + Add Row
            </button>

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
              <label className="text-gray-700 font-medium"> Amount in words</label>
              <input
                onChange={onChange}
                type="text"
                name="ainw"
                placeholder="Enter Amount"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium">Amount Paid</label>
              <input
                onChange={onChange}
                type="text"
                name="amountPaid"
                placeholder="Enter Amount"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  <div>
              <label className="text-gray-700 font-medium">Amount Due</label>
              <input
                onChange={onChange}
                type="text"
                name="amountdue"
                placeholder="Enter Amount"
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