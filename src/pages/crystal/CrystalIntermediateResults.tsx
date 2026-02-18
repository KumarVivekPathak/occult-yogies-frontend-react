import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import SampleImage from "../../assets/logo.jpg";

const CrystalIntermediateResults: React.FC = () => {
  const data = [
    { key: "Category", value: "Health" },
    { key: "Crystal Purpose", value: "Insomnia" },
    { key: "Area of life", value: "Insomnia  " },
    { key: "Recommended Crystal", value: "Amethyst" },
    {
      key: "Crystal Color",
      value: "It is a purple lilac and lavender color to deep purple.",
    },
    {
      key: "About Crystal",
      value:
        "It is all rounder healer for people, plants & animals. Many experienced crystal healers can program it for wish fulfillment & manifestation.",
    },
    { key: "Crystal Chakra", value: "Third Eye Chakra/Ajna" },
    { key: "Benefits", value: "Emotional" },
    {
      key: "Crystal Helps in",
      value: "A raw pieces guards against nightmares & insomnia.",
    },
    { key: "Crystal Image", value: SampleImage },
    {
      key: "Method Of Charge Crystal",
      value:
        "Hold your crystal few cms above the sage/camphor/pure incense sticks. Now visualize a white light passing through the crystals for few seconds. This process can be repeated weekly once.",
    },
    {
      key: "Purchase Link",
      value: "https://thebatraanumerology.com/product-category/crystal/",
    },
  ];

  return (
    <div className="flex flex-col bg-grey font-roboto w-full h-full px-10 py-10 rounded-xl outline-12 outline-textYellow">
      <h1 className="text-purple text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold uppercase">
        Crystal Analysis Intermediate Report
      </h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border-1" />

      <div className="border-2 border-gray-800 rounded-lg">
        <Table className="w-full justify-start items-start text-left">
          <TableBody className="text-black ">
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="w-1/3 font-medium uppercase">
                  {item.key}
                </TableCell>
                <TableCell className="font-normal">
                  {item.key === "Crystal Image" ? (
                    <img src={item.value} alt="" className="w-20 h-20" />
                  ) : item.key === "Purchase Link" ? (
                    <a
                      href={item.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-800"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CrystalIntermediateResults;
