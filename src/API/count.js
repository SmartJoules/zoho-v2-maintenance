const count = async (status , start_date , end_date) => {
    const config = {
      appName: "smart-joules-app",
      reportName: "Maintenance_Scheduler_Report",
      criteria: `Status == "${status}" && Start_Date >= "${start_date}" && Start_Date <= "${end_date}"`
    }
    try {
      await ZOHO.CREATOR.init();
      const response = await ZOHO.CREATOR.API.getRecordCount(config);
      return response.result.records_count;
    } catch (error) {
      console.log(error);
      return 0
    }
  }
  export default count;