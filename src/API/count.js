const count = async (criteria, reportName) => {
    const config = {
      appName: "smart-joules-app",
      reportName : reportName,
      criteria : criteria
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