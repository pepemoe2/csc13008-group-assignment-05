import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ShippingForm, ShippingStorage } from './shipping.jsx'

function App() {
  const [tab, setTab] = useState('form')

  return (
    <div className='w-full max-w-full sm:max-w-xl bg-white rounded-none sm:rounded-xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 mx-auto my-0 sm:my-8'>
      {/* tabs */}
      <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center border-b pb-4'>
          <button onClick={() => setTab('form')}
            className={`w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium ${tab === 'form' ? 'bg-blue-600 text-white': 'bg-gray-200 text-gray-700 '}`}  
          >
            Tạo đơn mới
          </button>
          <button onClick={() => setTab('storage')}
            className={`w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium ${tab === 'storage' ? 'bg-blue-600 text-white': 'bg-gray-200 text-gray-700'}`}    
          >
            Quản lý đơn
          </button>
      </div>

      {/* content */}
      {tab === "form" && <ShippingForm />}
      {tab === "storage" && <ShippingStorage />}

    </div>
  )
}

export default App
