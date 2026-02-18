import React, { useEffect, useState } from "react";
import { getMobileNumerologyReportList } from "../../service/APIFunctions";
import type { MobileNumerologyReportListDTO } from "../../service/types";
import { useNavigate } from "react-router-dom";
import CustomReport from "../../components/CustomReport";

const MobileNumerologyReport = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<MobileNumerologyReportListDTO[]>(
    []
  );
  const ItemToBeShown = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(tableData.length / ItemToBeShown);

  useEffect(() => {
    getReportList();
  }, []);

  const getReportList = async () => {
    try {
      const response = await getMobileNumerologyReportList();
      const responseData = response.data || [];
      console.log("API Response:", responseData);

      const formattedData = responseData.map(
        (item: MobileNumerologyReportListDTO) => {
          const firstName = item.first_name || "";
          const middleName = item.middle_name ? ` ${item.middle_name}` : "";
          const lastName = item.last_name ? ` ${item.last_name}` : "";

          return {
            id: item.id,
            name: `${firstName}${middleName}${lastName}`.trim(),
          };
        }
      );

      setTableData(formattedData);
    } catch (error) {
      console.error("Error fetching report list:", error);
    }
  };

  const handleView = (id: number) => {
    console.log("Viewing report with ID:", id);
  };

  const handleEdit = (id: number) => {
    navigate(`/advance-mobile-numerology`, { state: { id } });
    console.log("Editing report with ID:", id);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      console.log("Deleting report with ID:", id);
      setTableData((prevData) => prevData.filter((item) => item.id !== id));
    }
  };

  const handleGenerateReport = (id: number) => {
    console.log("Generating report for ID:", id);
  };

  const handleGenerateRegionReport = (id: number) => {
    console.log("Generating region report for ID:", id);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleExport = (type: "copy" | "excel" | "csv" | "pdf" | "print") => {
    switch (type) {
      case "copy":
        navigator.clipboard.writeText(JSON.stringify(tableData));
        break;
      case "excel":
        console.log("Exporting as Excel");
        break;
      case "csv":
        console.log("Exporting as CSV");
        break;
      case "pdf":
        console.log("Exporting as PDF");
        break;
      case "print":
        window.print();
        break;
    }
  };

  return (
    <CustomReport
      title="Mobile Numerology Analysis"
      tableData={tableData}
      handleView={handleView}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      handleGenerateReport={handleGenerateReport}
      handleGenerateRegionReport={handleGenerateRegionReport}
      onExport={handleExport}
      page={page}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      ItemToBeShown={ItemToBeShown}
    />
  );
};

export default MobileNumerologyReport;
