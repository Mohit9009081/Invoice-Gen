import { useState } from 'react'
import './App.css'
import InvoiceForm from './components/InvoiceForm'
import Invoice from './components/Invoice'
import GSTCalculator from './components/GSTCalculator';

const IntialValue = {
  invoiceNo: "",
  date: "",
  name: "",
  mobileNumber: "",
  address: "",
  amount: "",
  ainw: "",
  amountpaid:"",
  amountdue: "",
  paymentMethod: "",
  notes: ""
};

function App() {

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
      <InvoiceForm formData={formData} onSubmit={onFormSubmit} onChange={onChange} />
      <Invoice data={formData} />
     
    </>
  )
}
export default App
