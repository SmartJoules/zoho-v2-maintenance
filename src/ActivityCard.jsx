import React from 'react'

const ActivityCard = (props) => {
    return (
        <div className='border rounded-md shadow-sm h-auto mt-2 mx-2'>
            <div className='border-b rounded-t-md border-gray-30 bg-blue-100 flex justify-between items-center'>
                <div className='p-2'>
                    <div className='font-bold text-md flex flex-col text-sm text-black'>{props.area}</div>
                    <div className='text-black text-xs'>{props.date}</div>
                </div>
                <div className='p-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-play-btn-fill text-blue-600" viewBox="0 0 16 16">
                        <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2m6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z" />
                    </svg>
                </div>
            </div>
            <div className="p-2 bg-white rounded-b-md">
                <table className='border-collapse'>
                    <tbody>
                        <tr>
                            <th className='text-start text-xs w-20'>Site</th>
                            <td className='text-xs'>{props.site_name}</td>
                        </tr>
                        <tr>
                            <th className='text-start text-xs w-20'>Title</th>
                            <td className='text-xs'>{props.title}</td>
                        </tr>
                        <tr>
                            <th className='text-start text-xs w-20'>Propgress</th>
                            <td className='text-xs'>{props.progress}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-end">
                    <button
                        className='border border-blue-700 text-blue-600 hover:bg-blue-600 hover:text-white hover:ease-in-out hover:transition-all py-1 px-2 text-sm rounded'
                        onClick={() => props.toggleTaskTab(props.maintenance_id)}>Checklist</button>
                </div>
            </div>

        </div>
    )
}

export default ActivityCard