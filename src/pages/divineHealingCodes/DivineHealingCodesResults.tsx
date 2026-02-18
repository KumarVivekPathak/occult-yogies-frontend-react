import { Table, TableBody, TableCell, TableFooter, TableRow } from "@/components/ui/table";
import React from "react";

const DivineHealingCodesResults: React.FC = () => {

  const data = {
    category: "Relationship",
    purpose: "New Love",
    healingCodes : "Divine-Together",
    description : "Above is Switchpair Use this switchwords to improve relationship between two or more parties",
    details : "Any of this Divine Healing Codes can be chanted for this particular purpose"
  }

  return (
    <div className="flex flex-col bg-grey font-roboto w-full h-full px-2 sm:px-4 md:px-10 py-10 rounded-xl outline-12 outline-textYellow">
      <h1 className="text-purple text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase">
        Divine Healing Codes Prediction
      </h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border-1" />

      <section className="w-full">
        <Table className="w-full rounded-md justify-start items-start text-left">
          <TableBody className="text-black">
            <TableRow>
              <TableCell className="w-1/3 font-medium uppercase">Category</TableCell>
              <TableCell className="font-normal">{data.category}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/3 font-medium uppercase">Divine Healing Codes Purpose</TableCell>
              <TableCell className="font-normal">{data.purpose}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/3 font-medium uppercase">Divine Healing Codes to chant</TableCell>
              <TableCell className="font-normal">{data.healingCodes}</TableCell>
            </TableRow>
          </TableBody>

          <TableFooter className="text-black w-full dark:bg-transparent">
            <TableRow>
              <TableCell colSpan={2} className="p-2 font-bold text-md md:text-lg">
                {data.description}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <h2 className="text-black mt-4 text-left font-bold text-md md:text-lg">
          {data.details}
        </h2>

        
      </section>
    </div>
  );
};

export default DivineHealingCodesResults;
