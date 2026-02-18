import React from "react";
import CustomGridChart from "../../components/CustomGridChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Dasha } from "../../service/types";
import { useState } from "react";

const AdvanceMobileNumerologyResults: React.FC<{ reportData: any }> = ({
  reportData,
}) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  console.log("i got report dataa reportData : ", reportData);
  // const [dob,setDob] = useState("19-09-2002");
  // const loshuGridData: string[][] = [
  //   ["", "99", "22"],
  //   ["", "5", ""],
  //   ["", "11", "6"],
  // ];

  const loshuGridData = reportData.loshuGrid;
  const dob = reportData.mobileNumerDetails.dateOfBirth
    .split("-")
    .reverse()
    .join("-");

  // const vedicGridData: string[][] = [
  //   ["", "11", "99"],
  //   ["", "", "5"],
  //   ["2", "", "6"],
  // ];

  const vedicGridData = reportData.vedicGrid;

  const listData = [
    {
      id: 1,
      name: "Mobile Number Prediction Details",
      key: "mobile",
    },
    {
      id: 2,
      name: "Grid Details",
      key: "grid",
    },
    {
      id: 3,
      name: "Dasha Chart",
      key: "dasha",
    },
  ];

  console.log("Mobile details report :: ", reportData.mobileNumerDetails);

  const mobileNumerDetails = reportData.mobileNumerDetails;

  const numberInsights = [
    {
      title: "Number 2",
      description:
        "You are very sentimental in nature... You continuously need motivation.",
    },
    {
      title: "Number 5",
      description:
        "You love mathematics and gives importance to money... You are lacking in emotion.",
    },
    {
      title: "Number 9 is appearing more than once.",
      description:
        "You may have more anger... You always want to contribute to society.",
    },
    {
      title: "Number 5",
      description:
        "You love mathematics and gives importance to money... You are lacking in emotion.",
    },
  ];

  const dashaData = reportData.dashaChart;

  console.log("dashaData : ", reportData.dashaChart);

  const MobileNumberDetails = () => (
    <div className="">
      <Table className="w-full rounded-md justify-start items-start text-left">
        <TableBody className="text-black ">
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Mobile Number
            </TableCell>
            <TableCell className="font-normal">
              {mobileNumerDetails.mobileNumber}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Compound
            </TableCell>
            <TableCell className="font-normal">
              {mobileNumerDetails.mobileNumberCompound}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">Total</TableCell>
            <TableCell className="font-normal">
              {mobileNumerDetails.mobileNumberTotal}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Recommended
            </TableCell>
            <TableCell className="font-normal">
              {mobileNumerDetails.recommendedMobileNumber}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Lucky Colors
            </TableCell>
            <TableCell className="font-normal">
              {mobileNumerDetails.luckyColor.join(", ")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Unlucky Color
            </TableCell>
            <TableCell className="font-normal">
              {mobileNumerDetails.unluckyColor}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Lucky Numbers
            </TableCell>
            <TableCell className="font-normal">
              {mobileNumerDetails.luckyNumber.join(", ")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Unlucky Numbers
            </TableCell>
            <TableCell className="font-normal">
              {mobileNumerDetails.unluckyNumber.join(", ")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Neutral Numbers
            </TableCell>
            <TableCell className="font-normal">
              {mobileNumerDetails.neutralNumber.join(", ")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Missing Numbers
            </TableCell>
            <TableCell className="font-normal">
              {mobileNumerDetails.missingNumber.join(", ")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Combinations
            </TableCell>
            <TableCell>
              <ul className="list-disc list-inside">
                {mobileNumerDetails.mobileCombination.map(
                  (item: { combination: string; type: string }, i: number) => (
                    <li key={i}>
                      {item.combination} — <em>{item.type}</em>
                    </li>
                  )
                )}
              </ul>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} className="text-center py-4">
              <div className="text-red-600 font-semibold">
                {mobileNumerDetails.recomendation}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Predictions
            </TableCell>
            <TableCell className="font-normal">
              <ul className="list-disc list-inside">
                {mobileNumerDetails.prediction.map(
                  (point: string, i: number) => (
                    <li key={i}>{point}</li>
                  )
                )}
              </ul>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Wallpaper
            </TableCell>
            <TableCell>
              <img
                src={mobileNumerDetails.recommendedWallpaper}
                alt="Wallpaper"
                className="w-40 h-40 rounded-md shadow"
              />
            </TableCell>
          </TableRow>
          {Array.isArray(mobileNumerDetails.areaWallpaper) &&
            mobileNumerDetails.areaWallpaper.length > 0 && (
              <TableRow>
                <TableCell className="w-1/3 font-medium uppercase">
                  Area Wallpaper
                </TableCell>
                <TableCell className="font-normal">
                  {Array.isArray(mobileNumerDetails.areaWallpaper) && (
                    <div className="mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        {mobileNumerDetails.areaWallpaper.map(
                          (
                            item: {
                              id: string;
                              name: string;
                              image_url: string;
                            },
                            index: number
                          ) => (
                            <div key={item.id || index} className="text-center">
                              <img
                                src={item.image_url}
                                alt={item.name || "Wallpaper"}
                                className="w-full h-32 object-cover rounded-md shadow"
                              />
                              {item.name && (
                                <p className="text-md mt-1 text-black">
                                  {item.name}
                                </p>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </div>
  );

  const GridDetails = () => (
    <div className="space-y-2">
      <CustomGridChart data={vedicGridData} label="Vedic Grid" />
      <Separator />
      {numberInsights.map((item, i) => (
        <Card
          key={i}
          className={`p-4 font-roboto border-b border-black ${
            i === numberInsights.length - 1 ? "border-b-0" : ""
          }`}
        >
          <h4 className="font-semibold text-medium text-black border-2 border-purple rounded-md mx-auto p-2 ">
            {item.title}
          </h4>
          <p className="text-medium text-black">{item.description}</p>
        </Card>
      ))}
    </div>
  );

  const DashaChart = () => (
    <div className="space-y-4">
      <div className="font-medium text-base mx-4 mt-4 uppercase">
        Ruling Planet : {"  "}
        <span className="text-black font-normal border-2 border-purple rounded-md p-1 capitalize">
          {dashaData.rulingPlanet}
        </span>
      </div>

      {dashaData.dashas.map((dasha: Dasha, i: number) => (
        <Card
          key={i}
          className={`p-4 font-roboto border-b border-gray-800 ${
            i === dashaData.dashas.length - 1 ? "border-b-0" : ""
          }`}
        >
          <h4 className="font-semibold text-medium text-black border-2 border-purple rounded-md mx-auto p-2  ">
            {dasha.period} ➝ {dasha.sequence}
          </h4>
          <p className="text-medium text-black text-center">
            {dasha.description}
          </p>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col bg-grey font-roboto w-full h-full px-10 py-10 rounded-xl outline-12 outline-textYellow">
      <h1 className="text-purple text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold uppercase">
        Mobile Numerology Report
      </h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border-1" />
      <div className="flex text-black font-medium mb-4 justify-center md:justify-start items-center md:items-start">
        <strong className="mr-2 text-lg font-medium text-purple">
          Date of Birth :
        </strong>{" "}
        {dob}
      </div>

      <div className="w-full flex flex-col md:flex-row gap-6 justify-evenly items-center">
        <CustomGridChart data={loshuGridData} label="Loshu Grid" />
        <CustomGridChart data={vedicGridData} label="Vedic Grid" />
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        value={openAccordion || ""}
        onValueChange={(value) => setOpenAccordion(value || null)}
      >
        {listData.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.key}
            className={`${
              openAccordion !== section.key ? "border-b border-darkPurple" : ""
            }`}
          >
            <AccordionTrigger className="text-left text-lg font-semibold text-purple uppercase">
              {section.name}
            </AccordionTrigger>
            <AccordionContent className="border-2 border-gray-800 rounded-lg">
              {section.id === 1 && <MobileNumberDetails />}
              {section.id === 2 && <GridDetails />}
              {section.id === 3 && <DashaChart />}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AdvanceMobileNumerologyResults;
