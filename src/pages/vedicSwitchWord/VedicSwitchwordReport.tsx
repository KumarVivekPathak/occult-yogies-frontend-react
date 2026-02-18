import { useEffect, useState } from "react";
import {
  deleteVedicSwitchWordRecord,
  getVedicSwitchWordReportData,
} from "../../service/APIFunctions";
import type { VedicSwitchWordReportListDTO } from "../../service/types";
import toast, { Toaster } from "react-hot-toast";
import CustomReport from "../../components/CustomReport";

const VedicSwitchwordReport = () => {

  const [tableData, setTableData] = useState<VedicSwitchWordReportListDTO[]>([
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

  useEffect(() => {
    getReportList();
  }, []);

  const getReportList = async () => {
    const response = await getVedicSwitchWordReportData(page, ItemToBeShown);
    const responseData = response.data;
    const reportListData = responseData.data;
    const reportList = reportListData.map(
      (item: VedicSwitchWordReportListDTO) => {
        const firstName = item.firstName || "";
        const middleName = item.middleName ? ` ${item.middleName}` : "";
        const lastName = item.lastName ? ` ${item.lastName}` : "";

        return {
          id: item.id,
          name: `${firstName}${middleName}${lastName}`.trim(),
        };
      }
    );
    setTableData(reportList);
  };

  const handleView = (id: number) => {
    console.log("Viewing report with ID:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Editing report with ID:", id);
  };

  const handleDelete = async (id: number) => {
    console.log("Deleting report with ID:", id);
    const response = await deleteVedicSwitchWordRecord(id);
    const status = response.success;
    if (status == true) {
      toast.success(response.message);
      getReportList();
    } else {
      toast.error(response.message);
    }
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
        title="Vedic Switchword Reports"
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

export default VedicSwitchwordReport;
