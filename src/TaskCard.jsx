import React, { useState } from 'react';
import Dropdown from './Dropdown';
import {  Input } from 'semantic-ui-react';
import Multimedia from './Multimedia';

const TaskCard = (props) => {
    const [respNumber, setRespNumber] = useState(props.response_value);
    const [remark, setRemark] = useState(props.remarks);
    const [isFlag , setIsFlag] = useState(props.flag);
    const handleDropdown = async (value, id) => {
        const formData = {
            "data": {
                Response_Option: id,
                Response_Value: value
            }
        }
        const config = {
            appName: "smart-joules-app",
            reportName: "All_Maintenance_Scheduler_Task_List_Records",
            id: props.id,
            data: formData
        }
        try {
            await ZOHO.CREATOR.init();
            await ZOHO.CREATOR.API.updateRecord(config);
        } catch (error) {
            console.log(error);
        }
    }

    const updateResponse = async (e) => {
        e.preventDefault();
        setRespNumber(props.response_type == "Number" || props.response_type == "Meter" ? e.target.value : undefined)
        const formData = (props.response_type == "Number" || props.response_type == "Meter Reading") ? {
            "data": {
                Response_Value: e.target.value,
                Response_Amount: e.target.value
            }
        }
            : {

                "data": {
                    Response_Value: e.target.value,
                    Response_Text: e.target.value
                }
            }
        const config = {
            appName: "smart-joules-app",
            reportName: "All_Maintenance_Scheduler_Task_List_Records",
            id: props.id,
            data: formData
        }
        try {
            await ZOHO.CREATOR.init();
            await ZOHO.CREATOR.API.updateRecord(config);
        } catch (error) {
            console.log(error);
        }
    }
    const handleBlur = async (e) => {
        if (e.target.value) {
            const formData = {
                "data": {
                    Remarks: e.target.value
                }

            }
            const config = {
                appName: "smart-joules-app",
                reportName: "All_Maintenance_Scheduler_Task_List_Records",
                id: props.id,
                data: formData
            }
            try {
                await ZOHO.CREATOR.init();
                await ZOHO.CREATOR.API.updateRecord(config);
            } catch (error) {
                console.log(error);
            }
        }
    }
    const handleCheck = async (e)=> {
        setIsFlag(e.target.checked);
        const formData = {
            "data" : {
                Flags_For_Review : e.target.checked
            }
        }
        const config = {
            appName: "smart-joules-app",
            reportName: "All_Maintenance_Scheduler_Task_List_Records",
            id: props.id,
            data: formData
        }
        try {
            await ZOHO.CREATOR.init();
            await ZOHO.CREATOR.API.updateRecord(config);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='border bg-white rounded-md shadow-sm h-auto mt-1 mb-2 mx-2'>
            <div className='border-b border-gray-300 bg-blue-600 rounded-t-md'>
                <div className='p-2'>
                    <div className=' text flex flex-col text-white text-md'>{props.task_name}</div>
                </div>
            </div>
            <div className='p-2 flex gap-2 flex-col'>
                <div className="flex flex-col gap-2">
                    <div className='flex'>
                        <div className='w-[40%]'>Reponse</div>
                        <div className='border rounded w-full'>
                            {
                                props.response_type === "Multiple Choice" || props.response_type === "Expense" || props.response_type === "Consumption" ?
                                    (
                                        <Dropdown task={props.task_name}
                                            master_id={props.master_id}
                                            handleDropdown={handleDropdown}
                                            response_value={props.response_value} />
                                    )
                                    :
                                    props.response_type === "Number" || props.response_type === "Meter Reading" ?
                                        (
                                            <Input className='w-full text-sm' type='number' onChange={updateResponse} value={respNumber} />
                                        )
                                        :
                                        (
                                            <Input className='w-full text-sm' onChange={updateResponse} value={props.Response_Value} />
                                        )
                            }

                        </div>
                    </div>

                    <div className='flex'>
                        <div className='text w-[40%]'>Remarks</div>
                        <Input className='w-full text-sm' onBlur={handleBlur} value={remark} onChange={(e) => setRemark(e.target.value)} placeholder={"Remarks"} />
                    </div>
                    <div className='flex'>
                        <div className='text w-[40%]'>Flag</div>
                        <div className='text-start w-full flex items-center'>
                            <input type="checkbox" className='w-4 h-4' checked={isFlag === "true" || isFlag === true ? true : false} onChange={handleCheck} />
                        </div>

                    </div>
                </div>
            </div>
            <Multimedia
             img_url={props.img}
             audio={props.audio}
             video={props.video}
             id={props.id} />
        </div>
    )
}

export default TaskCard
