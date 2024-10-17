import React, { useState, useEffect, Suspense } from 'react'
import ActivityCard from './ActivityCard'
import { Input, Icon } from 'semantic-ui-react';
import getMaintenanceRecords from './API/fetch';

const PendingActivity = (props) => {

    const [completedRecords, setCompletedRecords] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        const getRecords = async () => {
            const allRecords = await getMaintenanceRecords("Completed",props.startAndEndDate.start_date,props.startAndEndDate.end_date);
            setCompletedRecords(allRecords);
        }
        getRecords();
    }, [props.startAndEndDate]);
    return (
        <>
            <div className="bg-slate-100 overflow-y-auto custom-scroll flex flex-col flex-1">
                <div className="sticky top-0 p-2 bg-slate-100">
                <Input icon placeholder='Search...' onChange={e => setSearchText(e.target.value)} className='w-full' value={searchText}>
                        <input />
                        <Icon name='search' className='text-blue-500' />
                    </Input>
                </div>
                <div className=''>
                    <Suspense fallback={<div>Loading...</div>}>
                        {
                            completedRecords.length > 0 ? (
                                completedRecords.filter(record => {
                                    return record.Area.toLowerCase().includes(searchText.toLowerCase()) ||
                                        record.Site_Name.display_value.toLowerCase().includes(searchText.toLowerCase()) ||
                                        record.Title.toLowerCase().includes(searchText.toLowerCase())
                                }).map((record, index) => (
                                    <ActivityCard key={index}
                                        area={record.Area}
                                        date={record.Start_Date}
                                        site_name={record.Site_Name.display_value}
                                        title={record.Title}
                                        progress={record.Progress}
                                        toggleTaskTab={props.toggleTaskTab}
                                        maintenance_id={record.ID} />
                                ))
                            )
                                :
                                (
                                    <div className='text-center'>No Records Found</div>
                                )
                        }
                    </Suspense>

                </div>
            </div>
        </>
    )
}

export default PendingActivity