const upDateStatus = async (params) => {
    const config = {
        appName: "smart-joules-app",
        reportName: "All_Maintenance_Scheduler_Task_List_Records",
        criteria: `Maintenance_ID == ${params} && Status == "Pending"`
    }
    try {
        await ZOHO.CREATOR.init();
        const all_task = await ZOHO.CREATOR.API.getAllRecords(config);
        all_task.data.forEach( async record => {
            if(record.Response_Value && record.Status == "Pending"){
                const formData = {
                    "data" : {
                        Status : "Completed"
                    }
                }
                const config = {
                    appName: "smart-joules-app",
                    reportName: "All_Maintenance_Scheduler_Task_List_Records",
                    id: record.ID,
                    data : formData
                }
                try {
                    await ZOHO.CREATOR.init();
                    const response = await ZOHO.CREATOR.API.updateRecord(config);
                } catch (error) {
                    console.log(error);
                }
            }
        });
    } catch (error) {
     console.log(error);
    }
}
export default upDateStatus