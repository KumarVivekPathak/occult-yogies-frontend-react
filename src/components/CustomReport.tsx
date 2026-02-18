import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface CustomReportProps {
  title: string;
  tableData: any[];
  onExport?: (type: "copy" | "excel" | "csv" | "pdf" | "print") => void;
  handleView: (id: number) => void;
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  handleGenerateReport: (id: number) => void;
  handleGenerateRegionReport: (id: number) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (newPage: number) => void;
  ItemToBeShown?: number;
}

const buttons = [
  { label: "Copy", tooltip: "Copy to clipboard", type: "copy" as const },
  { label: "Excel", tooltip: "Export as Excel", type: "excel" as const },
  { label: "CSV", tooltip: "Export as CSV", type: "csv" as const },
  { label: "PDF", tooltip: "Export as PDF", type: "pdf" as const },
  { label: "Print", tooltip: "Print this report", type: "print" as const },
];

const CustomReport: React.FC<CustomReportProps> = ({
  title,
  tableData,
  handleView,
  handleEdit,
  handleDelete,
  handleGenerateReport,
  handleGenerateRegionReport,
  onExport,
  page = 1,
  totalPages = 1,
  onPageChange,
  ItemToBeShown = 10,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedData, setSearchedData] = useState(() =>
    tableData.slice(0, ItemToBeShown)
  );

  useEffect(() => {
    const start = (page - 1) * ItemToBeShown;
    const end = start + ItemToBeShown;
    setSearchedData(tableData.slice(start, end));
  }, [tableData, page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchQuery === "") {
      setSearchedData(tableData.slice(0, ItemToBeShown));
      return;
    }
    const filteredData = tableData.filter((item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchedData(filteredData.slice(0, ItemToBeShown));
  };

  const handleExportClick = (
    type: "copy" | "excel" | "csv" | "pdf" | "print"
  ) => {
    if (onExport) {
      onExport(type);
    } else {
      console.log(`Export as ${type} - Please implement onExport handler`);
    }
  };

  return (
    <div className="relative z-2 bg-grey flex flex-col font-roboto w-full h-full items-center justify-center max-w-4xl mx-auto gap-10 outline-12 outline-textYellow rounded-xl">
      <div className="flex flex-col w-11/12 items-center justify-center my-10">
        <h1 className="text-purple text-4xl font-extrabold uppercase">
          {title}
        </h1>
        <hr className="my-3 w-full mx-auto border-darkPurple border-1" />

        <div className="flex items-center justify-center gap-6 bg-transparent mx-auto rounded-lg px-6 py-3 mb-4 mt-6 font-medium text-gray-700 border-2 border-purple">
          {buttons.map((btn, idx) => (
            <div
              key={idx}
              className="relative group"
              onClick={() => handleExportClick(btn.type)}
            >
              <button className="focus:outline-none bg-purple px-3 py-1 rounded-md hover:bg-darkPurple text-grey transition">
                {btn.label}
              </button>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col items-start">
          <div className="relative w-full">
            <Input
              className="w-full pr-10 text-black hover:text-black focus:text-black border-2 focus:border-purple focus:ring-2 focus:ring-purple-200"
              placeholder="Search here"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={handleSearchClick}
            />
          </div>
        </div>

        <div className="overflow-x-auto w-full mx-auto">
          <Table className="w-full border border-gray-400 mt-6">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%] text-black font-semibold">
                  Serial No.
                </TableHead>
                <TableHead className="w-[20%] text-black font-semibold px-1">
                  Name
                </TableHead>
                <TableHead className="w-[70%] text-black font-semibold px-1">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchedData.length > 0 ? (
                searchedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="w-[10%] text-left">
                      {item.id}
                    </TableCell>
                    <TableCell className="w-[20%] px-1 text-left">
                      {item.name}
                    </TableCell>
                    <TableCell className="w-[70%] space-x-2 px-1 text-left">
                      <Button
                        onClick={() => handleView(item.id)}
                        size="sm"
                        variant="outline"
                        className="bg-blue-50 text-blue-600 hover:bg-blue-100 border-blue-200 my-1"
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => handleEdit(item.id)}
                        size="sm"
                        variant="outline"
                        className="bg-green-50 text-green-600 hover:bg-green-100 border-green-200 my-1"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        size="sm"
                        variant="outline"
                        className="bg-red-50 text-red-600 hover:bg-red-100 border-red-200 my-1"
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => handleGenerateReport(item.id)}
                        size="sm"
                        variant="outline"
                        className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200 my-1"
                      >
                        Generate Report
                      </Button>
                      <Button
                        onClick={() => handleGenerateRegionReport(item.id)}
                        size="sm"
                        variant="outline"
                        className="bg-amber-50 text-amber-600 hover:bg-amber-100 border-amber-200 my-1"
                      >
                        Generate Region Report
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="h-24 text-center text-black font-semibold"
                  >
                    No data available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={() => onPageChange && onPageChange(page - 1)}
            disabled={page === 1}
            className={`p-2 rounded-full ${
              page === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft color="black" className="h-5 w-5" />
          </button>

          <span className="text-sm text-black font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => onPageChange && onPageChange(page + 1)}
            disabled={page === totalPages}
            className={`p-2 rounded-full ${
              page === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Next page"
          >
            <ChevronRight color="black" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomReport;
