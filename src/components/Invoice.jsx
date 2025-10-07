import React from 'react'

const Invoice = () => {
  return (
    <div className="relative w-[210mm] h-[297mm] mx-auto shadow-lg">
      <img src="form.jpg" className='w-full h-full' alt="" />
      <div className='mx-auto m-5 px-8 py-20 z-10 absolute top-40'>
        <p className='font-bold'>Billed To:</p>
        <p>Name: Shivam Dayma</p>
        <p>Mobile: +91 9907472038 </p>
        <p className='mb-10'>Address: Bull streat , Bombay </p>
        <h3 className='font-bold'>Description of services:</h3>
        <div className='overflow-x-auto  mb-10'>
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
              <tr>
                <td className='border px-2 py-1'>1</td>

                <td className='border px-2 py-1'>

                </td>
                <td className='border px-2 py-1 text-right'>

                </td>
                <td className='border px-2 py-1 text-right'>

                </td>
                <td className='border px-2 py-1 text-right'>

                </td>
                <td className='border px-2 py-1 text-right'>

                </td>
                <td className='border px-2 py-1 text-right'>

                </td>
              </tr>
            </tbody>
          </table>
        </div>


        <p>
          Total Invoice Amount (incl.GST):
        </p>
        <p>Amount in words :199Rs</p>
        <p>Amount Paid :199Rs</p>
        <p className='mb-8'>Amount Due : None</p>

        <h2 className='font-bold'>Additional Notes :</h2>
        <p>-Amount include GST @18%</p>
        <p className='mb-5'>-Nodues pending</p>
      </div>
    </div>
  )
}

export default Invoice