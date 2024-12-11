import React, { useEffect } from "react";
import Headers from "./Headers";
import { useState } from "react";
import PendingActivity from "./PendingActivity";
import CompletedActivity from "./CompletedActivity";
import "semantic-ui-css/semantic.min.css";
import PendingTask from "./PendingTask";
import CompletedTask from "./CompletedTask";
import count from "./API/count";

const App = () => {
  const [tabType, setTabType] = useState("Pending");
  const [pendingCount, setPendingCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [listType, setListType] = useState("Activity");
  const [maintenanceID, setMaintenanceID] = useState("");
  const [startAndEndDate, setStartAndEndDate] = useState({
    start_date: "",
    end_date: "",
  });

  const getCurrentMonthDates = () => {
    const now = new Date();
    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, "0");
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    };
    const start_date = new Date(now.getFullYear(), now.getMonth(), 1);
    const end_date = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    setStartAndEndDate({
      start_date: formatDate(start_date),
      end_date: formatDate(end_date),
    });
  };

  const filterDate = (start_date, end_date) => {
    setStartAndEndDate((prev) => ({
      ...prev,
      start_date: start_date,
      end_date: end_date,
    }));
  };

  const toggleTaskTab = (value) => {
    setListType("Task");
    setMaintenanceID(value);
  };

  const toggleActivityTab = () => {
    setListType("Activity");
  };

  useEffect(() => {
    getCurrentMonthDates();
  }, [listType]);

  useEffect(() => {
    if (startAndEndDate.start_date && startAndEndDate.end_date) {
      const fetch = async () => {
        const pending_criteria = `Status == "Pending" && Start_Date >= "${startAndEndDate.start_date}" && Start_Date <= "${startAndEndDate.end_date}"`;
        const completed_criteria = `Status == "Completed" && Start_Date >= "${startAndEndDate.start_date}" && Start_Date <= "${startAndEndDate.end_date}"`;
        const pending_count = await count(
          pending_criteria,
          "Maintenance_Scheduler_Report"
        );
        setPendingCount(pending_count);
        const completed_count = await count(
          completed_criteria,
          "Maintenance_Scheduler_Report"
        );
        setCompletedCount(completed_count);
      };
     listType === "Activity" && fetch();
    }
  }, [startAndEndDate]);
  const setCount = (pending_cnt, completed_cnt) => {
    setPendingCount(pending_cnt);
    setCompletedCount(completed_cnt);
  };

  return (
    <>
      <div className="flex h-[100vh] flex-col overflow-hidden">
        <div className="lg:h-32 sm:h-32 md:h-32 flex flex-col">
          <Headers pending={pendingCount} completed={completedCount} />
          <div className="tabs flex bg-slate-100">
            <div
              onClick={(e) => setTabType("Pending")}
              className={`tab text-center w-full text-black p-2 text-sm cursor-pointer hover:transition-all ease ${
                tabType === "Pending"
                  ? "font-bold border-b-2 border-blue-600"
                  : "hover:text-slate-500"
              }`}
            >
              Pending
            </div>
            <div
              onClick={(e) => setTabType("Completed")}
              className={`tab text-center w-full text-black p-2 text-sm cursor-pointer hover:transition-all ease ${
                tabType === "Completed"
                  ? "font-bold border-b-2 border-blue-600"
                  : "hover:text-slate-500"
              }`}
            >
              Completed
            </div>
          </div>
        </div>
        {listType === "Activity" ? (
          tabType === "Pending" ? (
            <PendingActivity
              toggleTaskTab={toggleTaskTab}
              startAndEndDate={startAndEndDate}
              setStartAndEndDate={setStartAndEndDate}
              getCurrentMonthDates={getCurrentMonthDates}
              filterDate={filterDate}
            />
          ) : (
            <CompletedActivity
              toggleTaskTab={toggleTaskTab}
              startAndEndDate={startAndEndDate}
            />
          )
        ) : listType === "Task" ? (
          tabType === "Pending" ? (
            <PendingTask
              toggleActivityTab={toggleActivityTab}
              setCount={setCount}
              maintenance_id={maintenanceID}
            />
          ) : (
            <CompletedTask
              toggleActivityTab={toggleActivityTab}
              setCount={setCount}
              maintenance_id={maintenanceID}
            />
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default App;
