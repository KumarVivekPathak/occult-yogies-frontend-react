import React, { useState } from "react";
import CustomGridChart from "../../components/CustomGridChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const MobileNumerologyResults: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [dob] = useState("19-09-2002");
  const loshuGridData: string[][] = [
    ["", "99", "22"],
    ["", "5", ""],
    ["", "11", "6"],
  ];

  const vedicGridData: string[][] = [
    ["", "11", "99"],
    ["", "", "5"],
    ["2", "", "6"],
  ];

  const listData = [
    {
      id: 1,
      name: "Mobile Number Prediction details",
      key: "mobile",
    },
    {
      id: 2,
      name: "General Chart Details",
      key: "chart",
    },
  ];

  const mobileNumerDetails = {
    mobileNumber: "9760306834",
    mobileNumberCompound: "46",
    mobileNumberTotal:
      "1, You are a lucky person... lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    recommendedMobileNumber:
      "Your Recomended MobileNumber should be 1, 2, 3...",
    luckyColours: ["Red", "Orange", "White", "Yellow", "Green"],
    unLuckeyColor: "Black",
    recommendedWallpaper:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?auto=format&fit=crop&w=400&q=80",
  };

  const dashaData = {
    rulingPlanet: "Sun",
    dashas: [
      {
        period: "19 - 09 - 2002 to 2003",
        sequence: 1,
        description:
          "It can bring money, wealth, name... The native will have acquisition of wealth...",
      },
      {
        period: "19 - 09 - 2003 to 2005",
        sequence: 2,
        description:
          "Great dealings with the mother. More artistic tendencies...",
      },
    ],
  };

  const generalData = {
    moolank: 1,
    bhagyank: 5,
    age: {
      completedAge: "23",
      runningAge: "24",
    },
    missingDirection: ["North", "South", "East", "West"],
    luckeyNumber: [1, 2, 3, 5],
    unLuckeyNumber: [8],
    neutralNumber: [4, 6, 7, 9],
    mobileNumber: { compound: 46, total: 1 },
    recommendedMobileNumber:
      "Your Recomended MobileNumber should be 1, 2, 3...",
    luckyColors: ["Red", "Orange", "White", "Yellow", "Green"],
    unluckyColors: ["Black"],
  };

  const MobileNumberDetails = () => (
    <Table className="w-full rounded-md justify-start items-start text-left">
      <TableBody className="text-black">
        <TableRow>
          <TableCell className="w-1/3 font-medium uppercase">Mobile Number</TableCell>
          <TableCell>{mobileNumerDetails.mobileNumber}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="w-1/3 font-medium uppercase">Compound</TableCell>
          <TableCell className="font-normal">{mobileNumerDetails.mobileNumberCompound}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="w-1/3 font-medium uppercase">Total</TableCell>
          <TableCell className="font-normal">{mobileNumerDetails.mobileNumberTotal}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="w-1/3 font-medium uppercase">Lucky Colors</TableCell>
          <TableCell className="font-normal">{mobileNumerDetails.luckyColours.join(", ")}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="w-1/3 font-medium uppercase">Unlucky Color</TableCell>
          <TableCell className="font-normal">{mobileNumerDetails.unLuckeyColor}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="w-1/3 font-medium uppercase">Recommended</TableCell>
          <TableCell className="font-normal">{mobileNumerDetails.recommendedMobileNumber}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell className="w-1/3 font-medium uppercase">Wallpaper</TableCell>
          <TableCell>
            <img
              src={mobileNumerDetails.recommendedWallpaper}
              alt="Wallpaper"
              className="w-40 h-40 rounded-md shadow"
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );

  const GeneralDetails = () => (
    <div>
      <Table className="w-full rounded-md justify-start items-start text-left">
      <TableBody className="text-black">
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">Age</TableCell>
            <TableCell className="font-normal">
              <div>Completed Age : {generalData.age.completedAge}</div>
              <div>Running Age : {generalData.age.runningAge}</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">Missing Direction</TableCell>
            <TableCell className="font-normal">{generalData.missingDirection.join(", ")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">Moolank</TableCell>
            <TableCell className="font-normal">{generalData.moolank}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">Bhagyank</TableCell>
            <TableCell className="font-normal">{generalData.bhagyank}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">Lucky Numbers</TableCell>
            <TableCell className="font-normal">{generalData.luckeyNumber.join(", ")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">Unlucky Numbers</TableCell>
            <TableCell className="font-normal">{generalData.unLuckeyNumber.join(", ")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">Neutral Numbers</TableCell>
            <TableCell className="font-normal">{generalData.neutralNumber.join(", ")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">Mobile Number</TableCell>
            <TableCell className="font-normal">
              <div>Compound : {generalData.mobileNumber.compound}</div>
              <div>Total : {generalData.mobileNumber.total}</div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Recommended Mobile Number
            </TableCell>
            <TableCell className="font-normal">{generalData.recommendedMobileNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Lucky Colours (Recomended for mobile colour)
            </TableCell>
            <TableCell className="font-normal">{generalData.luckyColors.join(", ")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-medium uppercase">
              Unlucky Colours (Recomended for mobile colour)
            </TableCell>
            <TableCell className="font-normal">{generalData.unluckyColors.join(", ")}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
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
            <AccordionTrigger className="text-left text-base font-medium">
              {section.name}
            </AccordionTrigger>
            <AccordionContent className="border-2 border-gray-800 rounded-lg">
              {section.id === 1 && <MobileNumberDetails />}
              {section.id === 2 && <GeneralDetails />}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default MobileNumerologyResults;
