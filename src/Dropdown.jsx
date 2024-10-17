import React, { useEffect, useState } from 'react'

const Dropdown = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [dropdownValue, setDropdownValue] = useState(props.response_value ? props.response_value : "Select");

    const handleClick = (e)=> {
        props.handleDropdown(e.target.innerText,options.filter(option=> option.text == e.target.innerText)[0].id);
        setDropdownValue(e.target.innerText);
    }

    useEffect(() => {
        const fetchTasks = async () => {
            const config = {
                appName: "smart-joules-app",
                reportName: "All_Tasks",
                criteria: `Maintanance_ID == ${props.master_id} && Task_Name == "${props.task}"`,
            };
            try {
                await ZOHO.CREATOR.init();
                const response = await ZOHO.CREATOR.API.getAllRecords(config);
                const tasks = response.data[0].Choices.map((choice) => ({
                    text: choice.display_value,
                    id: choice.ID,
                }));
                setOptions(tasks);
            } catch (err) {
                console.error("Error fetching choices:", err);
            }
        }
        fetchTasks();
    }, [props.master_id, props.task]);
    return (
        <div className='relative'>
            <div className='flex justify-between border p-2 rounded-sm cursor-pointer'
                onClick={() => setIsOpen(val => !val)}>
                <div className='text-sm'>{dropdownValue}</div>
                <div>
                    <svg className="-mr-1 h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className={`absolute z-10 rounded-md bg-white w-full border mt-1 shadow-lg ${isOpen ? "block" : "hidden"}`}>
                <div className='py-2' onClick={() => setIsOpen(false)}>
                    {
                        options.map((option, i) => (
                            <div key={i}
                                className='p-2 text-sm cursor-pointer hover:bg-gray-200 text-gray-600 transition-all'
                                choice_id={option.id}
                                onClick={handleClick}>{option.text}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Dropdown
