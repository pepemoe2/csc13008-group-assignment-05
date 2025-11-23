import React, {useState, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import wardJSON from  '../ward.json'
import provinceJSOn from '../province.json'

function ShippingStorage() {
    const provinces = Object.values(provinceJSOn);
    const wards = Object.values(wardJSON);

    const [data, setFromData] = useState(() => {
        const saved = localStorage.getItem('data');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    function removeShip(index) {
        const newData = data.filter((_, i) => i !== index);
        setFromData(newData);
    }

    return (
        <div className="grid gap-4 text-black">
            {data.length === 0 && (
                <p className="text-gray-500 text center">Chưa có đơn nào.</p>
            )}

            {data.map((d,index) => (
                <div
                    key={index}
                    className="flex justify-center items-start bg-gray-100 p-4 rounded-lg shadow-sm gap-8">
                    <div>
                        <p className="font-semibold">{d.username} - {d.phone}</p>
                        <p className="text-gray-700 text-sm mt-1">
                            {d.home}, {wards.find(w => w.code === d.ward)?.name_with_type},
                            {provinces.find(p => p.code === d.province)?.name_with_type}
                        </p>
                    </div>    

                    <button
                        onClick={() => removeShip(index)}
                        className='bg-blue-600 text-white font-medium'>
                        Xóa
                    </button>
                </div>
            ))}
        </div>
            
    )
}

function ShippingForm() {
    const [data, setFromData] = useState(() => {
        const saved = localStorage.getItem('data');
        return saved ? JSON.parse(saved) : [];
    });

    const provinces = Object.values(provinceJSOn);
    const wards = Object.values(wardJSON);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const selectedProvince = watch('province');
    const filteredWard = selectedProvince ? wards.filter((w) => w['parent_code'] === selectedProvince) : [];

    function onSubmit(dat) {
        console.log(dat);
        setFromData(prev => [...prev, dat]);
        reset();
    }
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    return(
        <form onSubmit ={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    <label className = 'text-black text-left font-bold'>
                        Username
                    </label>

                    {errors.username && <p className='text-red-500 text-sm'>*Required</p>}
                </div>
                <input
                    {...register('username', {required: true })}
                    className="bg-white p-3 border rounded-lg focus:outline-blue-500 text-black"
                    placeholder='Nhập tên...'
                />
                
            </div>

            <div className = 'flex flex-col gap-1'>
                <div className='flex justify-between items-center'>
                    <label className = 'text-black text-left font-bold'>
                        Phone Number
                    </label>
                    {errors.phone && <p className='text-red-500 text-sm'>*Invalid value</p>}  
                </div>
                <input 
                    {...register('phone', {
                        required: true,
                        pattern: /^\d{10,11}$/
                    })}
                    className = "bg-white p-3 border rounded-lg focus:outline-blue-500 text-black"
                    placeholder='Nhập số điện thoại'
                />
               
            </div>
            
            <div className=' flex flex-col gap-1'>
                <div className ='flex justify-between items-center'>
                    <label className='text-black text-left font-bold'>
                        House Number
                    </label>
                    {errors.street && <p className='text-red-500 text-sm'>*Required</p>}
                </div>

                <input 
                    {...register('street', { required: true})}
                    className = "bg-white p-2 border rounded-lg focus:outline-blue-500 text-black"
                    placeholder='Nhập đường...'
                />
                
            </div>
            
            <div className = 'flex flex-col gap-1'>
                <div className= 'flex justify-between items-center'>
                    <label className='text-black text-left font-bold'>
                        Street
                    </label>

                    {errors.housenumber && <p className='text-red-500 text-sm'>*Required</p>}
                </div>
            
                <input 
                    {...register('housenumber', { required: true})}
                    className = 'bg-white p-3 border rounded-lg focus-blue-500 text-black'
                    placeholder='Nhập số nhà...'
                />
                
            </div>
            
            <div className = 'flex flex-col gap-1 '>
                <div className='flex justify-between items-center'>
                    <label className= 'text-black text-left font-bold'>
                        Province
                    </label>
                    {errors.province && <p className='text-red-500 text-sm'>*Required</p>}
                    
                </div>
                <select {...register('province', {required: true})}
                    className={`bg-white p-3 border rounded-lg ${watch("province") ? "text-black" : "text-gray-400"}`}>                
                    <option value=''>
                        Lựa chọn tỉnh/thành
                    </option>
                    {provinces.map((p) => (
                        <option key={String(p.code)} value={p.code}> {p.name_with_type} </option>
                    ))}
                </select>
                
            </div>
            
            <div className= 'flex flex-col gap-1'>
                <div className= "flex justify-between items-center">
                    <label className= 'text-black text-left font-bold'>
                        Ward
                    </label>
                    {errors.ward && <p className='text-red-500 text-sm'>*Required</p>}
                </div>

                <select {...register('ward', {required: true})}
                    className={`bg-white p-3 border rounded-lg ${watch("ward") ? "text-black" : "text-gray-400"}`}>
                    <option value=''>
                        Lựa chọn quận 
                    </option>

                    {filteredWard.map((p) => (
                        <option key={String(p.code)} value={p.code}> {p.name_with_type} </option>
                    ))}
                </select>
                

            </div>
            
            <div className="flex flex-col">
                {errors.agree && <p className='text-red-500 text-sm text-left'>*Required</p>}
                <label className="flex items-center gap-2 text-black">
                    <input type='checkbox' {...register('agree', { required: true})} />
                    Tôi cam kết thông tin vừa nhập là hoàn toàn chính xác!
                </label>
            </div>
  
            
            <button type="submit" className='bg-blue-900 p-3 rounded text-gray'>
                Submit
            </button>
        </form>
    )
}


export { ShippingForm, ShippingStorage };
