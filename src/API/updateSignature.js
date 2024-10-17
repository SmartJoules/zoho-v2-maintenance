const updateSignature = async (sign,maintenance_id) => {
    const config = {
        appName: "smart-joules-app",
        reportName: "Maintenance_Scheduler_Report",
        id: maintenance_id,
        fieldName: "Signature",
        file: sign
    }
    try {
        await ZOHO.CREATOR.init();
        await ZOHO.CREATOR.API.uploadFile(config);
    } catch (error) {
        console.log(error);
    }
}
export default updateSignature;