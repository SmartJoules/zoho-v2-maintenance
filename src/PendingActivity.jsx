import React, { useState, useEffect } from "react";
import { Input, Icon } from "semantic-ui-react";
import Filter from "./Filter";
import getMaintenanceRecords from "./API/fetch";
import ActivityCard from "./ActivityCard";
import Loader from "./Loader";
import { Button, Modal } from "antd";
import ScannerWrapper from "./ScanWrapper";

const PendingActivity = ({ toggleTaskTab, startAndEndDate, filterDate, getCurrentMonthDates }) => {
  const [pendingRecords, setPendingRecords] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isQrModal, setIsQrModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setIsQrModal(false);
    setIsOpen(false);
  };

  const fetchPendingRecords = async () => {
    setIsLoading(true);
    const allRecords = await getMaintenanceRecords(
      "Pending",
      startAndEndDate.start_date,
      startAndEndDate.end_date
    );
    setPendingRecords(allRecords);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPendingRecords();
  }, [startAndEndDate]);

  const handleRefresh = async () => {
    getCurrentMonthDates();

  }

  const handleRead = async (res) => {
    if (res) {
      const result = res[0].rawValue;
      setIsQrModal(false);
      if (!isNaN(result)) {
        setPendingRecords((records) =>
          records.filter((i) => i.Area_ID == result)
        );
      }
    }
  };

  return (
    <>
      {isLoading === false ? (
        <div className="bg-slate-100 overflow-y-auto overflow-x-hidden custom-scroll flex flex-col flex-1">
          <div className="sticky top-0 p-2 bg-slate-100 flex gap-2">
            <Input
              icon
              placeholder="Search..."
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full"
              value={searchText}
            >
              <input />
              <Icon name="search" className="text-blue-500" />
            </Input>
            <button
              onClick={() => setIsOpen((curr) => !curr)}
              className="bg-white px-3 rounded border shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-funnel-fill text-blue-600"
                viewBox="0 0 16 16"
              >
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
              </svg>
            </button>
            <Modal
              open={isOpen}
              onCancel={handleClose}
              style={{ top: 10 }}
              footer={<Button onClick={handleClose}>Cancel</Button>}
            >
              <Filter filterDate={filterDate} handleClose={handleClose} />
            </Modal>
            <button
              onClick={() => setIsQrModal((curr) => !curr)}
              className="text-blue-600 bg-white px-3 rounded border shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-qr-code-scan"
                viewBox="0 0 16 16"
              >
                <path d="M0 .5A.5.5 0 0 1 .5 0h3a.5.5 0 0 1 0 1H1v2.5a.5.5 0 0 1-1 0zm12 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0V1h-2.5a.5.5 0 0 1-.5-.5M.5 12a.5.5 0 0 1 .5.5V15h2.5a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H15v-2.5a.5.5 0 0 1 .5-.5M4 4h1v1H4z" />
                <path d="M7 2H2v5h5zM3 3h3v3H3zm2 8H4v1h1z" />
                <path d="M7 9H2v5h5zm-4 1h3v3H3zm8-6h1v1h-1z" />
                <path d="M9 2h5v5H9zm1 1v3h3V3zM8 8v2h1v1H8v1h2v-2h1v2h1v-1h2v-1h-3V8zm2 2H9V9h1zm4 2h-1v1h-2v1h3zm-4 2v-1H8v1z" />
                <path d="M12 9h2V8h-2z" />
              </svg>
            </button>
            <Modal
              open={isQrModal}
              onCancel={handleClose}
              onClose={handleClose}
              footer={
                <Button onClick={() => setIsQrModal(false)}>Cancel</Button>
              }
            >
              <ScannerWrapper onScan={handleRead} isActive={isQrModal} />
            </Modal>
            <button
              className="text-blue-600 bg-white px-3 rounded border shadow-sm"
              onClick={handleRefresh}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
              </svg>
            </button>
          </div>
          <div className="">
            {pendingRecords && pendingRecords.length > 0 ? (
              pendingRecords
                .filter((record) => {
                  return (
                    record.Area.toLowerCase().includes(
                      searchText.toLowerCase()
                    ) ||
                    record.Site_Name.display_value
                      .toLowerCase()
                      .includes(searchText.toLowerCase()) ||
                    record.Title.toLowerCase().includes(
                      searchText.toLowerCase()
                    )
                  );
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
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PendingActivity;
