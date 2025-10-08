import { useState } from "react";

const initialProductRow = {
  description: "",
  hsnSac: "",
  qty: "",
  taxableValue: "",
  gst: "",
  gstType: "inclusive", // new field
  cgst: "",
  sgst: "",
  total: ""
};

const InvoiceForm = ({ onSubmit, onChange }) => {
  const [productRows, setProductRows] = useState([{...initialProductRow }]);

  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    let updatedRows = productRows.map((row, i) =>
      i === index ? { ...row, [name]: value } : row
    );

    // Auto-calculate Taxable Value, GST, CGST, SGST if total, gst, or gstType changes
    const row = updatedRows[index];
    let total = row.total;
    let gstRate = row.gst;
    let gstType = row.gstType || "inclusive";
    if (name === "total" || name === "gst" || name === "gstType") {
      total = name === "total" ? value : row.total;
      gstRate = name === "gst" ? value : row.gst;
      gstType = name === "gstType" ? value : row.gstType || "inclusive";
      if (total && gstRate) {
        const totalNum = parseFloat(total);
        const gstNum = parseFloat(gstRate);
        let taxableValue = 0, gstAmount = 0;
        if (gstType === "inclusive") {
          taxableValue = (totalNum / (1 + gstNum / 100));
          gstAmount = totalNum - taxableValue;
        } else {
          taxableValue = totalNum;
          gstAmount = totalNum * (gstNum / 100);
        }
        const halfGst = (gstAmount / 2).toFixed(2);
        updatedRows[index] = {
          ...row,
          total: total,
          gst: gstRate,
          gstType: gstType,
          taxableValue: taxableValue.toFixed(2),
          cgst: halfGst,
          sgst: halfGst
        };
      }
    }

    setProductRows(updatedRows);
    if (onChange) onChange({ target: { name: "productRows", value: updatedRows } });
  };

  const addProductRow = () => {
    setProductRows([...productRows, { ...initialProductRow }]);
  };

  const removeProductRow = (index) => {
    // keep at least one row
    if (productRows.length === 1) return;
    const updatedRows = productRows.filter((_, i) => i !== index);
    setProductRows(updatedRows);
    if (onChange) onChange({ target: { name: "productRows", value: updatedRows } });
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
                  <label className="text-gray-700 font-medium">Product Description</label>
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
                <div>
                  <label className="text-gray-700 font-medium">GST (%)</label>
                  <select
                    onChange={e => handleProductChange(idx, e)}
                    value={row.gst}
                    name="gst"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select GST</option>
                    <option value="5">5%</option>
                    <option value="12">12%</option>
                    <option value="18">18%</option>
                    <option value="28">28%</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 font-medium">GST Type</label>
                  <select
                    name="gstType"
                    value={row.gstType || "inclusive"}
                    onChange={e => handleProductChange(idx, e)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="inclusive">Inclusive</option>
                    <option value="exclusive">Exclusive</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-700 font-medium">CGST</label>
                  <input
                    type="text"
                    name="cgst"
                    value={row.cgst}
                    readOnly
                    placeholder="CGST"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="text-gray-700 font-medium">SGST</label>
                  <input
                    type="text"
                    name="sgst"
                    value={row.sgst}
                    readOnly
                    placeholder="SGST"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  />
                </div>
                        <div>
                  <label className="text-gray-700 font-medium">Taxable Value</label>
                  <input
                    type="text"
                    name="taxableValue"
                    value={row.taxableValue}
                    readOnly
                    placeholder="Taxable Value"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                  />
                </div>
               

                <div className="md:col-span-4 text-right">
                  <button
                    type="button"
                    onClick={() => removeProductRow(idx)}
                    className="mt-1 inline-block text-red-600 bg-red-100 px-3 py-1 rounded"
                  >
                    Remove
                  </button>
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
            <div>
              <label className="text-gray-700 font-medium">GST (%)</label>
              <select
                onChange={onChange}
                name="gst"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select GST</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
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