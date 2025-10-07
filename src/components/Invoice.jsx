const Invoice = ({ data }) => {
  return (
    <div className="relative w-[210mm] h-[297mm] mx-auto shadow-lg">
      <img src="form.jpg" className='w-full h-full' alt="" />
      <div className='mx-auto m-5 px-8 py-20 z-10 absolute top-40'>
        <p>Invoice No:{data.invoiceNo} </p>
        <p className="mb-5">Data: {data.date} </p>
        <p className='font-bold'>Billed To:</p>
        <p>Name: {data.name}</p>
        <p>Mobile: {data.mobileNumber}</p>
        <p className='mb-5'>Address: {data.address}</p>
        <h3 className='font-bold'>Description of services:{data.productdescription}</h3>
        <div className='overflow-x-auto  mb-5'>
          <table className='w-full table-auto border-collapse border'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='border px-2 py-1 text-left'>S.No</th>
                <th className='border px-2 py-1 text-left'>Description</th>
                <th className='border px-2 py-1 text-left'>HSN/SAC</th>
                <th className='border px-2 py-1 text-right'>Qty</th>
                <th className='border px-2 py-1 text-right'>Taxable Value</th>
                <th className='border px-2 py-1 text-right'>CGST (9%)</th>
                <th className='border px-2 py-1 text-right'>SGST (9%)</th>
                <th className='border px-2 py-1 text-right'>Total</th>
              </tr>
            </thead>
            <tbody>
     {data.productRows && data.productRows.length > 0 && data.productRows.map((row, index) => (
         
              <tr>
                <td className='border px-2 py-1'>{index + 1}</td>

                <td className='border px-2 py-1'>
                  {row.description}
                </td>
                <td className='border px-2 py-1 text-right'>
                  {row.hsnSac}
                </td>
                <td className='border px-2 py-1 text-right'>
                  {row.quantity}
                </td>
                <td className='border px-2 py-1 text-right'>
                  {row.taxableValue}
                </td>
                <td className='border px-2 py-1 text-right'>
                  {row.cgst}
                </td>
                <td className='border px-2 py-1 text-right'>
                  {row.sgst}
                </td>
                <td className='border px-2 py-1 text-right'>
                  {row.total}
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>


        <p>
          Total Invoice Amount (incl.GST):{data.amount}
        </p>
        <p>Amount in words :{data.ainw}</p>
        <p>Amount Paid :{data.amountPaid}</p>
        <p className='mb-5'>Amount Due : {data.amountdue}</p>

        <h2 className='font-bold'>Additional Notes : {}</h2>
        <p>-Amount include GST @18%</p>
        <p className='mb-5'>-Nodues pending</p>
      </div>
    </div>
  )
}

export default Invoice;