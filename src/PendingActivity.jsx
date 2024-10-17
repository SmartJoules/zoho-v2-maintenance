import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Input, Icon } from 'semantic-ui-react';
import Modal from './Modal';
import Filter from './Filter';
import { Scanner } from '@yudiel/react-qr-scanner';
import getMaintenanceRecords from './API/fetch';
const ActivityCard = lazy(() => import('./ActivityCard'));
import fetchByArea from './API/fetchByArea';

const PendingActivity = ({ toggleTaskTab, startAndEndDate, filterDate }) => {
    const [pendingRecords, setPendingRecords] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isQrModal, setIsQrModalOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        setIsQrModalOpen(false);
    }

    useEffect(() => {
        const getRecords = async () => {
            const allRecords = await getMaintenanceRecords("Pending", startAndEndDate.start_date, startAndEndDate.end_date);
            setPendingRecords(allRecords);
        }
        getRecords();
    }, [startAndEndDate]);

    const handleRead = async (res) => {
        if (res) {
            const result = res[0].rawValue;
            setIsQrModalOpen(false);
            if (!isNaN(result)) {
                const area_id = parseInt(result);
                const response = await fetchByArea(result, startAndEndDate.start_date, startAndEndDate.end_date);
                setPendingRecords(response.filter(rec => rec.Status == "Pending"));
                console.log(response);
            }
        }
    };

    return (
        <>
            <div className="bg-slate-100 overflow-y-auto overflow-x-hidden custom-scroll flex flex-col flex-1">
                <div className="sticky top-0 p-2 bg-slate-100 flex gap-2">
                    <Input icon placeholder='Search...' onChange={e => setSearchText(e.target.value)} className='w-full' value={searchText}>
                        <input />
                        <Icon name='search' className='text-blue-500' />
                    </Input>
                    <button onClick={() => setIsOpen(curr => !curr)} className='bg-white px-3 rounded border shadow-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-funnel-fill text-blue-600" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                        </svg>
                    </button>
                    <Modal status={isOpen} handleClose={handleClose}>
                        <Filter
                            filterDate={filterDate}
                            handleClose={handleClose}
                        />
                    </Modal>
                    <button onClick={() => setIsQrModalOpen(curr => !curr)} className='text-blue-600 bg-white px-3 rounded border shadow-sm'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-qr-code-scan" viewBox="0 0 16 16">
                            <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z" />
                            <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z" />
                            <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z" />
                            <path d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z" />
                            <path d="M12 9h2V8h-2z" />
                        </svg>
                    </button>
                    <Modal status={isQrModal} handleClose={handleClose}>
                        {isQrModal && (
                            <Scanner onScan={handleRead} />
                        )}
                    </Modal>
                </div>
                <div className=''>
                    <Suspense fallback={<div>Loading...</div>}>
                        {pendingRecords &&
                            pendingRecords.length > 0 ? (
                            pendingRecords
                                .filter(record => {
                                    return record.Area.toLowerCase().includes(searchText.toLowerCase()) ||
                                        record.Site_Name.display_value.toLowerCase().includes(searchText.toLowerCase()) ||
                                        record.Title.toLowerCase().includes(searchText.toLowerCase())
                                })
                                .map((record, index) => (
                                    <ActivityCard
                                        key={index}
                                        area={record.Area}
                                        date={record.Start_Date}
                                        site_name={record.Site_Name.display_value}
                                        title={record.Title}
                                        progress={record.Progress}
                                        toggleTaskTab={toggleTaskTab}
                                        maintenance_id={record.ID}
                                    />
                                ))
                        ) : (
                            <></>
                        )}
                    </Suspense>
                </div>
            </div>
        </>
    );
}

export default PendingActivity;
