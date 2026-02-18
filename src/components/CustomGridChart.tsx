import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface CustomGridChartProps {
  data: string[][];
  label: string;
}

const CustomGridChart: React.FC<CustomGridChartProps> = ({ data, label }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-transparent">
      <h2 className="text-xl md:text-2xl font-bold text-purple  mb-2 text-center uppercase ">
        {label}
      </h2>

      <div className="overflow-x-auto">
        <Table className="border-2 border-textYellow rounded-md shadow-md w-full">
          <TableBody className="">
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="dark:border-textYellow divide-x divide-textYellow border-b ">
                {row.map((cell, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className={`w-16 h-16 text-center align-middle text-black text-lg md:text-xl font-bold ${
                      cell
                        ? 'bg-[#f7d4da] text-black'
                        : 'bg-[#fbf1f2] text-gray-400 italic'
                    }`}
                  >
                    {cell || ''}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CustomGridChart;
