const fetchByArea = async (area, start_date, end_date) => {
    const area_name = await areaIdtoText(area);
    const config = {
        appName: "smart-joules-app",
        reportName: "Maintenance_Scheduler_Report",
        criteria: `Start_Date >= "${start_date}" && Start_Date <= "${end_date}" && Area == "${area_name.Area}"`
    }
    try {
        const response = await ZOHO.CREATOR.API.getAllRecords(config);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const areaIdtoText = async (id) => {
    const config = {
        appName: "smart-joules-app",
        reportName: "All_Areas",
        criteria: `ID == ${id}`
    }
try {
    const response = await ZOHO.CREATOR.API.getAllRecords(config);
    return response.data[0];
} catch (error) {
    console.log(error);
}
}

export default fetchByArea;