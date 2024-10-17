const getMaintenanceRecords = async (status, start_date, end_date) => {
    await ZOHO.CREATOR.init();
    const initparams = await ZOHO.CREATOR.UTIL.getInitParams();
    const userConfig = {
        appName: "smart-joules-app",
        reportName: "All_Employees",
        criteria: `Email == "${initparams.loginUser}"`,
    };

    try {
        const userResp = await ZOHO.CREATOR.API.getAllRecords(userConfig);
        const user_obj = userResp.data[0];
        if (user_obj.Role.display_value === "Admin") {
            const config = {
                appName: "smart-joules-app",
                reportName: "Maintenance_Scheduler_Report",
                criteria: `Status == "${status}" && Start_Date >= "${start_date}" && Start_Date <= "${end_date}"`,
            };
            try {
                const response = await ZOHO.CREATOR.API.getAllRecords(config);
                return response.data;
            } catch (error) {
                console.log(error);
            }
        }
        else {
            let records = [];
            for (let i = 0; i < user_obj.Sites.length; i++) {
                const config = {
                    appName: "smart-joules-app",
                    reportName: "Maintenance_Scheduler_Report",
                    criteria: `Status == "${status}" && Start_Date >= "${start_date}" && Start_Date <= "${end_date}" && Site_Name == ${user_obj.Sites[i].ID}`,
                };
                try {
                    const response = await ZOHO.CREATOR.API.getAllRecords(config);
                    const each_data = response.data.map(record => record);
                    records = [...records, ...each_data];
                } catch (error) {
                    console.log(error);
                }
            }
            return records;
        }

    } catch (error) {
        throw error;
    }
};

export default getMaintenanceRecords;
