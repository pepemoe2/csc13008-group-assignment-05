import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ShippingForm, ShippingStorage } from './shipping.jsx'

function App() {
  const [tab, setTab] = useState('form')

  return (
    <div className='min-h-screen bg-gray-100 p-4 flex justify-center'>
      <div className= 'w-full max-w-3x1 bg-white rounded-x1 shadow p-6 flex flex-col gap-6'>
        {/* tabs */}
        <div className = 'flex gap-4 justify-center borde-b pb-4'>
            <button onClick={() => setTab('form')}
              className={`px-5 py-2 rounded-lg font-medium ${tab === 'form' ? 'bg-blue-600 text-white ': 'bg-gray-800'}`}  
            >
              Tạo đơn mới
            </button>
            <button onClick={() => setTab('storage')}
              className={`px-5 py-2 rounded-lg font-medium ${tab === 'storage' ? 'bg-blue-600 text-white ': 'bg-gray-800'}`}    
            >
              Quản lý đơn
            </button>
        </div>

        {/* content */}
        {tab === "form" && <ShippingForm />}
        {tab === "storage" && <ShippingStorage />}

      </div>

    </div>
  )
}

export default App
