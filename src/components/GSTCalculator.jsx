import React, { useEffect, useState } from "react";

// Default export is a single-file React component styled with TailwindCSS
// Usage: import GSTCalculator from './GSTCalculator.jsx' and render <GSTCalculator />

export default function GSTCalculator() {
  const [amount, setAmount] = useState(0); // user-entered amount
  const [isInclusive, setIsInclusive] = useState(false); // whether the entered amount already includes GST
  const [gstRate, setGstRate] = useState(18);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);

  // helper for clean numeric input
  const parseNumber = (v) => {
    if (v === null || v === undefined || v === "") return 0;
    // remove commas and spaces
    const normalized = String(v).replace(/[,\s]/g, "");
    const num = Number(normalized);
    return Number.isFinite(num) ? num : 0;
  };

  useEffect(() => {
    // Always recalculate whenever amount, gstRate or isInclusive changes
    const amt = parseNumber(amount);
    const rate = Number(gstRate) || 0;

    if (isInclusive) {
      // amount includes GST. We need to find base price and tax portion.
      // base = amount / (1 + rate/100)
      const base = rate === 0 ? amt : amt / (1 + rate / 100);
      const tax = Math.max(0, amt - base);
      const halfTax = tax / 2; // CGST / SGST split

      setTaxAmount(round(tax));
      setTotalAmount(round(amt));
      setCgst(round(halfTax));
      setSgst(round(halfTax));
    } else {
      // amount is base price (exclusive). Tax = base * rate/100
      const tax = (amt * rate) / 100;
      const total = amt + tax;
      const halfTax = tax / 2;

      setTaxAmount(round(tax));
      setTotalAmount(round(total));
      setCgst(round(halfTax));
      setSgst(round(halfTax));
    }
  }, [amount, gstRate, isInclusive]);

  const round = (n) => {
    return Math.round((n + Number.EPSILON) * 100) / 100; // 2 decimals
  };

  const handleAmountChange = (e) => {
    // accept numbers, commas, etc.
    setAmount(e.target.value);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // small visual feedback could be added; kept minimal here
    } catch (err) {
      // ignore
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/80 dark:bg-gray-900/60 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">GST Calculator</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Amount</span>
            <input
              type="text"
              inputMode="decimal"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount (e.g. 1000)"
              className="mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <p className="text-xs text-gray-500 mt-1">You can enter amount inclusive or exclusive of GST (toggle below).</p>
          </label>

          <label className="block">
            <span className="text-sm font-medium">GST Rate</span>
            <select
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              className="mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
             
               <option value={5}>5%</option>
              <option value={12}>12%</option>
              <option value={18}>18%</option>
              <option value={28}>28%</option>
            </select>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isInclusive}
              onChange={(e) => setIsInclusive(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm">Amount includes GST (inclusive)</span>
          </label>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => {
                // quickly set some popular values
                setAmount(1000);
                setGstRate(18);
                setIsInclusive(false);
              }}
              className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Quick: ₹1,000 @18%
            </button>

            <button
              onClick={() => {
                setAmount(0);
                setGstRate(18);
                setIsInclusive(false);
              }}
              className="px-3 py-2 rounded-lg border hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-lg border bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Tax Rate</p>
                <p className="text-xl font-semibold">{gstRate}%</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Mode</p>
                <p className="text-lg">{isInclusive ? "Inclusive" : "Exclusive"}</p>
              </div>
            </div>

            <hr className="my-3" />

            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm text-gray-600">Tax Amount</div>
              <div className="text-right font-medium">₹ {formatNumber(taxAmount)}</div>

              <div className="text-sm text-gray-600">CGST</div>
              <div className="text-right">₹ {formatNumber(cgst)}</div>

              <div className="text-sm text-gray-600">SGST</div>
              <div className="text-right">₹ {formatNumber(sgst)}</div>

              <div className="text-sm text-gray-600">Total</div>
              <div className="text-right text-lg font-semibold">₹ {formatNumber(totalAmount)}</div>
            </div>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => copyToClipboard(`Tax: ₹ ${formatNumber(taxAmount)} | Total: ₹ ${formatNumber(totalAmount)}`)}
                className="px-3 py-2 rounded-lg border hover:bg-gray-100"
              >
                Copy summary
              </button>

              <button
                onClick={() => {
                  // The user might want a CSV or quick export — we open a new tab with downloadable content
                  const csv = `Amount,Mode,GST Rate,Tax,Total\n${amount},${isInclusive ? "Inclusive" : "Exclusive"},${gstRate},${taxAmount},${totalAmount}`;
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = "gst-calculation.csv";
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Export CSV
              </button>
            </div>
          </div>

          <div className="p-4 rounded-lg border">
            <p className="text-sm text-gray-500">Breakdown</p>
            <div className="mt-2 text-sm text-gray-700">
              <p>
                {isInclusive
                  ? `Entered amount (₹ ${formatNumber(parseNumber(amount))}) includes ${gstRate}% GST. Base price and tax portion are calculated accordingly.`
                  : `Entered amount (₹ ${formatNumber(parseNumber(amount))}) is treated as base price and GST is added on top.`}
              </p>

              <ol className="mt-2 list-decimal pl-5 text-gray-600">
                <li>Base amount: {isInclusive ? `₹ ${formatNumber(round(parseNumber(amount) - taxAmount))}` : `₹ ${formatNumber(parseNumber(amount))}`}</li>
                <li>Tax amount: ₹ {formatNumber(taxAmount)}</li>
                <li>Total: ₹ {formatNumber(totalAmount)}</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-4 text-xs text-gray-500">Split shows CGST and SGST (half of total GST). For IGST or special cases adjust externally.</footer>
    </div>
  );
}

// small helper below the component (keeps the component file tidy)

function formatNumber(v) {
  const num = Number(v) || 0;
  // format with 2 decimal places and thousand separators
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
