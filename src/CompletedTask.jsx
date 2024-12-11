import React, { useState, useEffect } from 'react'
import { Input, Icon} from 'semantic-ui-react'
import TaskCard from './TaskCard';

const PendingTask = (props) => {
    const [searchText, setSearchText] = useState("");
    const [taskArr, setTaskArr] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
                const config = {
                    appName: "smart-joules-app",
                    reportName: "All_Maintenance_Scheduler_Task_List_Records",
                    criteria: `Maintenance_ID == ${props.maintenance_id} && Status == "Completed"`
                }
                try {
                    await ZOHO.CREATOR.init();
                    const resp = await ZOHO.CREATOR.API.getAllRecords(config);
                    props.setCompletedCount(resp.data.length);
                    setTaskArr(resp.data);
                }
                catch (err) {
                    console.log('API Call Failed', err);
                }
        }
        fetchTasks();
    }, [props.maintenance_id])

    return (
        <div className='flex flex-col flex-1 overflow-y-auto bg-white custom-scroll'>
            <div className="sticky top-0 bg-white p-2 flex gap-2 z-10">
                <Input icon placeholder='Search...' onChange={e => setSearchText(e.target.value)}
                    className='w-full' value={searchText}>
                    <input />
                    <Icon name='search' />
                </Input>
                <button className='bg-blue-700 px-3 py-2 rounded-md text-white hover:bg-blue-600 transition-all hover:transition-all'
                    onClick={() => props.toggleActivityTab()}>Back</button>
            </div>

            {
                taskArr ? (
                    taskArr.length > 0 ?
                        (
                            taskArr.filter(record => record.Task_Name.toLowerCase().includes(searchText.toLowerCase()))
                                .map((record, index) =>
                                (
                                    <TaskCard key={index}
                                    task_name={record.Task_Name}
                                    master_id={record.Maintenance_Master}
                                    response_type={record.Field_Type.display_value}
                                    id={record.ID}
                                    response_value={record.Response_Value} 
                                    remarks={record.Remarks}
                                    flag={record.Flags_For_Review}
                                    img={record.Image}
                                    audio={record.Audio}
                                    video={record.Video} />
                                ))
                        )
                        :
                        (
                            <div className='text-center'>No Records to Show</div>
                        )
                )
                    :
                    (
                        <div className='text-center'>No Records to Show</div>
                    )
            }
        </div>
    )
}

export default PendingTask