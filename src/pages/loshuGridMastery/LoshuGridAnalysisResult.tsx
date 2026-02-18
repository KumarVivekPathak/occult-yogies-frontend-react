import React, { useState } from "react";
import CustomGridChart from "../../components/CustomGridChart";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

const LoshuGridAnalysisResult: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const loshuGridData: string[][] = [
    ["", "99", "22"],
    ["", "5", ""],
    ["", "11", "6"],
  ];

  const vedicGridData: string[][] = [
    ["", "99", "22"],
    ["", "5", ""],
    ["", "11", "6"],
  ];

  const listData = [
    {
      id: 1,
      name: "Dasha Chart",
      key: "dasha",
    },
    {
      id: 2,
      name: "Name Analysis",
      key: "name",
    },
    {
      id: 3,
      name: "Chart",
      key: "chart",
    },
  ];

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

  const nameAnalysisData = [
    {
      title: "Your Name Number",
      content: "Your Full Name number as per Chaldean Numerology is : 41 / 5",
    },
    {
      title: "CHALDEAN NAME ANALYSIS: Name Compatibility as per Bhagyank",
      content: "First name is Neutral to your date of birth...",
    },
    {
      title:
        "CHALDEAN NAME ANALYSIS: Overall Name Compatibility as per Moolank & Bhagyank",
      content: "Great! Your Full Name is compatible/Lucky...",
    },
    {
      title: "Your Name Number",
      content: "Your First Name number as per Chaldean Numerology is: 20 / 2",
    },
    {
      title:
        "Suggested NAME NUMBER (FIRST & FULL NAME) as per your Birthday (Moolank) & Life Path Number (Bhagyank) :",
      content: "PRIMARY FAVOURABLE NUMBER: 1,5,6",
    },
  ];

  const ReportSection = ({
    title,
    content,
  }: {
    title?: string;
    content: string;
  }) => {
    return (
      <div className="space-y-2 font-roboto ">
        {title && (
          <h3
            className={`text-sm font-semibold ${
              title === title.toUpperCase() ? "uppercase" : ""
            }`}
          >
            {title}
          </h3>
        )}
        <p className="text-md font-normal text-black font-roboto ">
          {content}
        </p>
        <Separator className="bg-black" />
      </div>
    );
  };

  const DashaChart = () => (
    <div className="space-y-4">
      <div className="font-medium text-base mx-4 mt-4 uppercase">
        Ruling Planet : {"  "}
        <span className="text-black font-normal border-2 border-purple rounded-md p-1 capitalize">
          {dashaData.rulingPlanet}
        </span>
      </div>

      {dashaData.dashas.map((dasha, i : number) => (
        <Card key={i} className={`p-4 font-roboto border-b border-gray-800 ${i === dashaData.dashas.length - 1 ? 'border-b-0' : ''}`}>
          <h4 className="font-semibold text-medium text-black border-2 border-purple rounded-md mx-auto p-2">
            {dasha.period} ➝ {dasha.sequence}
          </h4>
          <p className="text-medium text-black text-center">{dasha.description}</p>
        </Card>
      ))}
    </div>
  );

  const NameAnalysis = () => {
    return (
      <section className="p-4 space-y-4 font-roboto">
        <h1 className="font-semibold text-base text-center text-black ">Name Analysis</h1>
        <p className="text-md text-black px-4">
          {" "}
          Name Analysis is a process of analyzing the name of a person to
          understand the meaning and significance of the name. It is a way to
          understand the personality of a person and the potential of the
          person.{" "}
        </p>
        <Separator className="mx-4 bg-black" />
        <Card className="gap-0 p-0">
          <CardContent className="space-y-4">
            {nameAnalysisData.map((section, index) => (
              <ReportSection
                key={index}
                title={section.title}
                content={section.content}
              />
            ))}
          </CardContent>
        </Card>
      </section>
    );
  };

  const Chart = () => {
    const chartData = {
      age: {
        completed: 23,
        running: 24,
      },
      missingDirection: ["east", "north", "north-east"],
      missingNumberSymptoms: [
        "You are a lucky person",
        "You can use it.",
        "Nice to meet you",
      ],
      missingNumberRemedies: [
        "You can use it.",
        "You can use it remidy 2.",
        "You can use it remedy 3.",
      ],
      moolank: 7,
      bhagyank: 5,
      elements: ["fire", "water", "air", "earth"],
      kuaNumber: 7,
      personalYear: 2,
      nameNumber: {
        compound: 2,
        name: 2,
      },
      mobileNumber: {
        compound: 2,
        number: 2,
      },
      mahaDasha: "7, Ketu",
      antarDasha: "2, Sun",
      zodiacSign: "Leo",
      luckyNumber: [4, 8, 9],
      unluckyNumber: [2, 7],
      neutralNumber: [1, 3, 5, 6],
      luckyColors: ["Red", "Orange", "White", "Yellow", "Green"],
      unluckyColors: ["Black"],


      gridNumero : [
        {key : "Memory Plane", value : "33.33%"}, 
        {key : "Emotional Plane", value : "66.66%"}, 
        {key : "Practical Plane", value : "66.66%"},
        {key : "Thought Plane", value : "0%"},
        {key : "Will Plane", value : "66.66%"},
        {key : "Action Plane", value : "100%"},
        {key : "Success Plane 1", value : "66.66%"},
        {key : "Success Plane 2", value : "66.66%"}
      ],
      kingNumberDescription : "8 \n Possitive : This makes person Logical , gritty , Authorative, powerful , good understanding of people around them, aura, striving for success, power, authority Hard from outside soft from inside , financial management, judge, argumentative, they keep hustling to achieve their goals \n Negative : Stubborn, get everything with lot of struggle, they get too materialistic many times",
      queenNumberDescription : "6 \n Possitive : This makes person Logical , gritty , Authorative, powerful , good understanding of people around them, aura, striving for success, power, authority Hard from outside soft from inside , financial management, judge, argumentative, they keep hustling to achieve their goals \n Negative : Stubborn, get everything with lot of struggle, they get too materialistic many times",
    };

    return (
      <Table className="w-full font-roboto border border-gray-200 shadow rounded-md ">
        <TableBody>
          <TableRow>
            <TableCell className="w-1/3 font-semibold text-black text-left">Age</TableCell>
            <TableCell className="text-left">
              <ul>
                <li>Completed : {chartData.age.completed} </li>
                <li>Running : {chartData.age.running} </li>
              </ul>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">
              Missing Direction
            </TableCell>
            <TableCell className="text-left">
              {" -" + chartData.missingDirection.join(" -- ") + "- "}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">
              Missing Number Symptoms
            </TableCell>
            <TableCell className="text-left">
              <ul className="list-disc pl-5 space-y-1">
                {chartData.missingNumberSymptoms.map((symptom, index) => (
                  <li key={index} className="text-sm">
                    {symptom}
                  </li>
                ))}
              </ul>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">
              Missing Number Remedies
            </TableCell>
            <TableCell className="text-left">
              <ul className="list-disc pl-5 space-y-1">
                {chartData.missingNumberRemedies.map((remedy, index) => (
                  <li key={index} className="text-sm">
                    {remedy}
                  </li>
                ))}
              </ul>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Moolank</TableCell>
            <TableCell className="text-left">{chartData.moolank}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Bhagyank</TableCell>
            <TableCell className="text-left">{chartData.bhagyank}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Elements</TableCell>
            <TableCell className="text-left">{chartData.elements.join(", ")}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Kua Number</TableCell>
            <TableCell className="text-left">{chartData.kuaNumber}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Personal Year</TableCell>
            <TableCell className="text-left">{chartData.personalYear}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Name Number</TableCell>
            <TableCell className="text-left">
              <ul>
                <li>Compound : {chartData.nameNumber.compound}</li>
                <li>Name : {chartData.nameNumber.name}</li>
              </ul>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Mobile Number</TableCell>
            <TableCell className="text-left">
              <ul>
                <li>Compound : {chartData.mobileNumber.compound}</li>
                <li>Number : {chartData.mobileNumber.number}</li>
              </ul>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Mahadasha</TableCell>
            <TableCell className="text-left">{chartData.mahaDasha}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Antar Dasha</TableCell>
            <TableCell className="text-left">{chartData.antarDasha}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Zodiac Sign</TableCell>
            <TableCell className="text-left">{chartData.zodiacSign}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Lucky Number</TableCell>
            <TableCell className="text-left">{chartData.luckyNumber.join(", ")}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Unlucky Number</TableCell>
            <TableCell className="text-left">{chartData.unluckyNumber.join(", ")}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Neutral Number</TableCell>
            <TableCell className="text-left">{chartData.neutralNumber.join(", ")}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Lucky Colors</TableCell>
            <TableCell className="text-left">{chartData.luckyColors.join(", ")}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/3 font-semibold text-left text-black">Unlucky Colors</TableCell>
            <TableCell className="text-left">{chartData.unluckyColors.join(", ")}</TableCell>
          </TableRow>
        
            <TableRow>
              <TableCell className="w-1/3 font-semibold text-left text-black">Grid Number</TableCell>
              <TableCell className="text-left">
                <ul className="list-disc pl-5 space-y-1">
                  {chartData.gridNumero.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item.key}: {item.value}
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="w-1/3 font-semibold text-left text-black">King Number</TableCell>
              <TableCell className="text-left">
                {chartData.kingNumberDescription}
              </TableCell>
            </TableRow>
          
            <TableRow>
              <TableCell className="w-1/3 font-semibold text-left text-black">Queen Number</TableCell>
              <TableCell className="text-left">
                {chartData.queenNumberDescription}
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    );
  };

  return (
    <div className="flex flex-col bg-grey font-roboto w-full h-full px-10 py-10 rounded-xl outline-12 outline-textYellow">
      <h1 className="text-purple text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold uppercase">
        Loshu Grid Report
      </h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border-1" />

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
          <AccordionItem key={section.id} 
          value={section.key} 
          className={`${
            openAccordion !== section.key 
              ? 'border-b border-darkPurple' 
              : ''
          }`}
          >
            <AccordionTrigger className="text-left text-lg font-semibold text-purple uppercase">
              {section.name}
            </AccordionTrigger>
            <AccordionContent className="border border-2 border-gray-800 rounded-lg">
              {section.id === 1 && <DashaChart />}
              {section.id === 2 && <NameAnalysis />}
              {section.id === 3 && <Chart />}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default LoshuGridAnalysisResult;
