import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomReport from "../../components/CustomReport";

const LoshuGridReport = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([
    {
      id: 1,
      name: "Vivek",
    },
    {
      id: 2,
      name: "Kumar",
    },
    {
      id: 3,
      name: "Rajj",
    },
    {
      id: 4,
      name: "Axis",
    },
  ]);
  const ItemToBeShown = 3;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(tableData.length / ItemToBeShown);

  useEffect(() => {
    getReportList();
  }, []);

  const getReportList = async () => {
    console.log("Fetching report list...");
  };

  const handleView = (id: number) => {
    console.log("Viewing report with ID:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Editing report with ID:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Deleting report with ID:", id);
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
    <>
      <CustomReport
        title="Loshu Grid Reports"
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
    </>
  );
};

export default LoshuGridReport;
