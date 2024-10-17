import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const Filter = ({ filterDate, handleClose }) => {
    const [startDate, SetStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        filterDate(formatDate(startDate), formatDate(endDate));
        handleClose();
    }
    return (
        <>
            <form>
                <div className="flex gap-2">
                    <div className='my-2 text-nowrap w-24 text-sm'>Start Date</div>
                    <div className='border p-1 mb-3 rounded w-full'>
                        <DatePicker className='w-full text-sm focus:border-0 focus:outline-0' selected={startDate} onChange={date => SetStartDate(date)} required />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className='my-2 text-nowrap w-24 text-sm'>End Date</div>
                    <div className='border p-1 mb-3 rounded w-full'>
                        <DatePicker className='w-full text-sm focus:border-0 focus:outline-0' selected={endDate} onChange={date => setEndDate(date)} required />
                    </div>
                </div>
                <div className='text-center'>
                    <button onClick={handleSubmit} type='submit' className='bg-blue-600 rounded text-white p-1 px-2'>Submit</button>
                </div>
            </form>
        </>
    )
}

export default Filter