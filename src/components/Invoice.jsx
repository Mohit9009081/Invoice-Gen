import React from 'react'

const Invoice = () => {
  return (
    <>
    <div className='relative '><img src="form.jpg" className='  ' alt="" style={{ width: '210mm', height: '297mm', boxSizing: 'border-box' }}></img></div>
  <section className='mx-auto m-5 px-8 py-20  absolute top-40' style={{ width: '210mm', height: '297mm', boxSizing: 'border-box' }}>
    
      
       <h3 className='font-bold'>Billed To:</h3>
       <p>Name:Shivam Dayma</p>
       <p>Mobile:91835900@#$%</p>
         <p className='mb-10'>Address:bull streat , Bombay </p>

         <h3 className='font-bold'>Description of sercvices :</h3>

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


        
    </section>
    </>
  )
}

export default Invoice