import React, { useEffect, useState, useRef } from "react";
import { Input, Icon } from "semantic-ui-react";
import TaskCard from "./TaskCard";
import SignatureCanvas from "react-signature-canvas";
import Modal from "./Modal";
import upDateStatus from "./UpdateStatus";
import dataToBlog from "./DataURItoBlob";
import updateSignature from "./API/updateSignature";
import Loader from "./Loader";
import count from "./API/count";

const PendingTask = (props) => {
  const [searchText, setSearchText] = useState("");
  const [taskArr, setTaskArr] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [signature, setSignature] = useState(null);
  const sigRef = useRef(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignatureEnd = () => {
    if (sigRef.current) {
      const data_url = sigRef.current.toDataURL();
      const img_url = dataToBlog(data_url);
      setSignature(img_url);
    }
  };

  const clearSignature = () => {
    if (sigRef.current) {
      sigRef.current.clear();
      setSignature(null);
    }
  };

  const countTasks = async () => {
    const pending_criteria = `Status == "Pending" && Maintenance_ID == ${props.maintenance_id}`;
    const completed_criteria = `Status == "Completed" && Maintenance_ID == ${props.maintenance_id}`;
    const pending_count = await count(
      pending_criteria,
      "All_Maintenance_Scheduler_Task_List_Records"
    );
    const completed_count = await count(
      completed_criteria,
      "All_Maintenance_Scheduler_Task_List_Records"
    );
    props.setCount(pending_count, completed_count);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setIsLoading(true);
      const config = {
        appName: "smart-joules-app",
        reportName: "All_Maintenance_Scheduler_Task_List_Records",
        criteria: `Maintenance_ID == ${props.maintenance_id} && Status == "Pending"`,
      };
      try {
        await ZOHO.CREATOR.init();
        await countTasks();
        const resp = await ZOHO.CREATOR.API.getAllRecords(config);
        setTaskArr(resp.data);
      } catch (err) {
        console.log("API Call Failed", err);
      }
      setIsLoading(false);
    };
    fetchTasks();
  }, [props.maintenance_id]);

  const handleClick = async () => {
    await upDateStatus(props.maintenance_id);
    await updateSignature(signature, props.maintenance_id);
    setIsOpen(false);
    setShow(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-slate-100 custom-scroll">
          <div className="sticky top-0 bg-slate-100 p-2 flex gap-1 z-10">
            <Input
              icon
              placeholder="Search..."
              onChange={(e) => setSearchText(e.target.value)}
              className="w-auto"
              value={searchText}
            >
              <input />
              <Icon name="search" className="text-blue-500" />
            </Input>

            <button
              onClick={() => setIsOpen((curr) => !curr)}
              className="bg-green-700 text-white border px-2 rounded-md"
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
            >
              Submit
            </button>

            <Modal status={isOpen} handleClose={handleClose}>
              <div className="m-4">
                <div className="py-1">
                  Name <span className="text-red-600">*</span>
                </div>
                <Input
                  className="w-full mb-3 border-slate-300"
                  placeholder="Enter Your Name.."
                />
                <div className="py-1">Signature</div>
                <div className="w-full p-2 border border-slate-300 rounded-md relative">
                  <div
                    className="absolute right-0 top-0 transition-all hover:transition-all text-xs cursor-pointer p-1 hover:font-bold"
                    onClick={clearSignature}
                  >
                    Clear
                  </div>
                  <SignatureCanvas
                    penColor="black"
                    canvasProps={{
                      width: 230,
                      height: 100,
                      className: "sigCanvas",
                    }}
                    ref={sigRef}
                    onEnd={handleSignatureEnd}
                  />
                </div>
              </div>
              <div className="border-t flex justify-center gap-2 p-2 rounded-b-md">
                <button
                  onClick={handleClick}
                  className="bg-blue-600 p-2 rounded-md text-sm text-white shadow-sm"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 p-2 rounded-md text-sm text-white shadow-sm"
                >
                  Close
                </button>
              </div>
            </Modal>
            <Modal status={show}>
              <div className="text-center font-bold">
                Data Successfully Submitted
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShow(false)}
                  className="p-2 bg-blue-600 text-white rounded"
                >
                  Close
                </button>
                <button
                  onClick={() => props.toggleActivityTab()}
                  className="p-2 bg-blue-600 text-white rounded"
                >
                  Go Back
                </button>
              </div>
            </Modal>

            <button
              className="bg-red-600 text-white border px-2 rounded-md"
              onClick={() => props.toggleActivityTab()}
            >
              Back
            </button>
          </div>

          {taskArr ? (
            taskArr.length > 0 ? (
              taskArr
                .filter((record) =>
                  record.Task_Name.toLowerCase().includes(
                    searchText.toLowerCase()
                  )
                )
                .map((record, index) => (
                  <TaskCard
                    key={index}
                    task_name={record.Task_Name}
                    master_id={record.Maintenance_Master}
                    response_type={record.Field_Type.display_value}
                    id={record.ID}
                    response_value={record.Response_Value}
                    remarks={record.Remarks}
                    flag={record.Flags_For_Review}
                    img={record.Image}
                    audio={record.Audio}
                    video={record.Video}
                  />
                ))
            ) : (
              <div className="text-center">No Records to Show</div>
            )
          ) : (
            <div className="text-center">No Records to Show</div>
          )}
        </div>
      )}
    </>
  );
};

export default PendingTask;
