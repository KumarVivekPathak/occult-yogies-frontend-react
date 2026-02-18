import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import type { NameSuggestionsDTO } from "../service/types";

const CustomNameSuggestionsTable = ({
  suggestions,
}: {
  suggestions: NameSuggestionsDTO[];
}) => {
  const [selectedNames, setSelectedNames] = useState(new Set());

  const handleSelectName = (id: string) => {
    const newSelected = new Set(selectedNames);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedNames(newSelected);
  };

  return (
    <Table>
      <TableHeader className="bg-gradient-to-r from-lightPurple to-purple">
        <TableRow className="">
          <TableHead className="text-white font-bold text-sm sm:text-base">
            Select
          </TableHead>
          <TableHead className="text-white font-bold text-sm sm:text-base text-center">
            First Name
          </TableHead>
          <TableHead className="text-white font-bold text-sm sm:text-base text-center">
            Numerology
          </TableHead>
          <TableHead className="text-white font-bold text-sm sm:text-base">
            Full Name
          </TableHead>
          <TableHead className="text-white font-bold text-sm sm:text-base text-center">
            Numerology
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="divide-y divide-gray-200 text-sm sm:text-md md:text-base ">
        {suggestions.map((suggestion) => (
          <TableRow key={suggestion.id}>
            <TableCell className="">
              <Input
                type="checkbox"
                checked={selectedNames.has(suggestion.id.toString())}
                onChange={() => handleSelectName(suggestion.id.toString())}
                className="w-4 h-4 md:w-5 md:h-5 rounded-md border-2 border-grey accent-purple text-white focus:ring-purple focus:border-purple cursor-pointer hover:border-purple transition-all duration-200"
              />
            </TableCell>
            <TableCell className="text-center">
              <p className="font-medium text-black mb-1">
                {suggestion.firstName}
              </p>
            </TableCell>
            <TableCell className="text-center">
              <span className="inline-flex items-center px-2 md:px-4 py-1 md:py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:shadow-md bg-bgYellow text-darkPurple">
                {suggestion.firstNameSum}
              </span>
            </TableCell>
            <TableCell className="flex items-center gap-2">
              <p className="font-medium text-black mb-1">
                {suggestion.name}
              </p>
            </TableCell>
            <TableCell className="text-center">
              <span className="inline-flex items-center px-2 md:px-4 py-1 md:py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:shadow-md bg-bgYellow text-darkPurple">
                {suggestion.fullNameSum}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CustomNameSuggestionsTable;
