import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import CustomReport from "../../components/CustomReport";

const DivineHealingCodesReport = () => {


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
  const ItemToBeShown = 10;
  const [page, setPage] = useState<number>(1);
  const totalPages = Math.ceil(tableData.length / ItemToBeShown);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };


  const handleView = (id: number) => {
    console.log("Viewing report with ID:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Editing report with ID:", id);
  };

  const handleDelete = async (id: number) => {
    console.log("Deleting report with ID:", id);
  };

  const handleGenerateReport = (id: number) => {
    console.log("Generating report for ID:", id);
  };

  const handleGenerateRegionReport = (id: number) => {
    console.log("Generating region report for ID:", id);
  };

  const handleExport = (type: 'copy' | 'excel' | 'csv' | 'pdf' | 'print') => {
    console.log(`Exporting as ${type}`);
    switch (type) {
      case 'copy':
        navigator.clipboard.writeText(JSON.stringify(tableData));
        break;
      case 'excel':
        console.log("Exporting as Excel");
        break;
      case 'csv':
        console.log("Exporting as CSV");
        break;
      case 'pdf':
        console.log("Exporting as PDF");
        break;
      case 'print':
        window.print();
        break;
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <CustomReport
        title="Divine Healing Codes Reports"
        tableData={tableData}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleGenerateReport={handleGenerateReport}
        handleGenerateRegionReport={handleGenerateRegionReport}
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        ItemToBeShown={ItemToBeShown}
        onExport={handleExport}
      />
    </>
  );
};

export default DivineHealingCodesReport;
