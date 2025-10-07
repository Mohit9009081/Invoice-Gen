import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import InvoiceForm from './components/InvoiceForm'
import Invoice from './components/Invoice'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <InvoiceForm/> */}
    <Invoice/>
     </>
  )}
export default App
