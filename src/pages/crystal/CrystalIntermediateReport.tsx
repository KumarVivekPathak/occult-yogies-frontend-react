import React, { useState } from 'react'
import CustomReport from '../../components/CustomReport';

const CrystalIntermediateReport : React.FC = () => {
  const [page, setPage] = useState(1);
  const ItemToBeShown = 3;

  const tableData : any[] = [
    {
      id: 1,
      name: "John Doe",
    },
    {
      id: 2,
      name: "Vivek Pathak",
    },
    {
      id: 3,
      name: "Avhi Datta",
    },
    {
      id: 4,
      name: "Mohini Pathak",
    }

  ];

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

  const totalPages = Math.ceil(tableData.length / ItemToBeShown);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
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
    <CustomReport 
    title="Crystal Intermediate Reports" 
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
  )
}

export default CrystalIntermediateReport