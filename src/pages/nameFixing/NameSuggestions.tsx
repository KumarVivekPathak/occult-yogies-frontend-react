import React, { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomNameSuggestionsTable from "../../components/CustomNameSuggestionsTable";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { getNameFixingReport } from "../../service/APIFunctions";
import type { NameSuggestionsDTO } from "../../service/types";

const NameSuggestions : React.FC<{ reportID: number }> = ({ reportID }) => {
  const { userData } = useUser();
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState([
    {
      id: "1",
      firstName: "Vivek",
      fullName: "Vivek Pathak",
      firstNameSum: "20/2",
      fullNameSum: "41/5",
    },
    {
      id: "2",
      firstName: "Sonal",
      fullName: "Sonal Madan",
      firstNameSum: "30/3",
      fullNameSum: "25/7",
    },
    {
      id: "3",
      firstName: "Sachin",
      fullName: "Sachin Kumar",
      firstNameSum: "32/5",
      fullNameSum: "17/8",
    },
  ]);

  const [numerologyAnalysisSummary, setNumerologyAnalysisSummary] = useState({
    currentFirstNameSum: 2,
    currentFullNameSum: 5,
    interactionValues: [1, 3, 5, 6],
    neutralNumbers: [4, 6, 7, 9],
    luckyNumbers: [1, 2, 3, 5],
    unluckyNumbers: [8],
  });

  const [originalNameDetails, setOriginalNameDetails] = useState({
    firstName: "Vivek",
    fullName: "Vivek Pathak",
    dateOfBirth: "16 July 2025",
    firstNameSum: "20/2",
    fullNameSum: "41/5",
    targetNumbers: [1, 2, 3, 5],
  });

  const [faimilyDetails, setFaimilyDetails] = useState({
    fatherName: "Vivek Pathak",
    motherName: "Vivek Pathak",
    spouseName: "Vivek Pathak",
  });

  const form = useForm({
    defaultValues: {
      firstName: "",
      fullName: "",
      additionalNotes: "",
    },
  });

  useEffect(() => {
    if (reportID) {
      getSuggestionReport();
    }
  }, [reportID]);

  const getSuggestionReport = async () => {
    try {
      const response = await getNameFixingReport(reportID);
      const responseData = await response;
      const luckyNumbers = responseData.lucky_numbers;
      const unluckyNumbers = responseData.unlucky_numbers;
      const interactionValues = Object.values(responseData.intersection);
      const neutralNumbers = responseData.neutral_numbers;
      const firstNameSum = responseData.first_name_numerology;
      const fullNameSum = responseData.full_name_numerology;
      const kingNumber = responseData.king_number;
      const queenNumber = responseData.queen_number;

      const selectedNames = responseData.selected_names.map(
        (name: NameSuggestionsDTO, index: number) => {
          const id = index;
          const firstName = name.firstName;
          const firstNameSum = name.firstNameSum;
          const firstNamePrediction = name.firstNamePrediction;
          const fullName = name.name;
          const fullNameSum = name.fullNameSum;
          const fullNamePrediction = name.fullNamePrediction;
          const obj = {
            id: id,
            firstName: firstName,
            firstNameSum: firstNameSum,
            firstNamePrediction: firstNamePrediction,
            fullName: fullName,
            fullNameSum: fullNameSum,
            fullNamePrediction: fullNamePrediction,
          };
          return obj;
        }
      );

      setSuggestions(selectedNames);

      setNumerologyAnalysisSummary({
        currentFirstNameSum: firstNameSum,
        currentFullNameSum: fullNameSum,
        interactionValues: interactionValues as number[],
        neutralNumbers: neutralNumbers as number[],
        luckyNumbers: luckyNumbers as number[],
        unluckyNumbers: unluckyNumbers as number[],
      });

      setOriginalNameDetails({
        firstName: responseData?.first_name || "",
        fullName: responseData?.full_name || "",
        dateOfBirth: responseData?.date_of_birth || "",
        firstNameSum: firstNameSum,
        fullNameSum: fullNameSum,
        targetNumbers: luckyNumbers as number[],
      });
      console.log("Report generated successfully", responseData);
    } catch (error) {
      console.log("Report generation failed", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full bg-grey font-roboto p-4 sm:p-6 md:p-8 rounded-xl outline-12 outline-textYellow">
      <h1 className="text-purple text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase">
        Name Suggestions
      </h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border-1" />

      <article className="my-2 md:my-4">
        <h2 className="text-md md:text-lg lg:text-xl font-semibold text-black mb-4 uppercase">
          Numerology Analysis Summary
        </h2>
        <section className=" border-2 border-purple p-6 rounded grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          <div className="flex items-center gap-3">
            <span className="text-black font-medium">
              Current First Name Sum:
            </span>
            <span className="bg-purple-500 text-white px-3 py-1 rounded">
              {numerologyAnalysisSummary.currentFirstNameSum}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black font-medium">Intersection Values:</span>
            <div className="flex gap-1">
              {numerologyAnalysisSummary.interactionValues.map((num, index) => (
                <span
                  key={index}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black font-medium">Lucky Numbers:</span>
            <div className="flex gap-1">
              {numerologyAnalysisSummary.luckyNumbers.map((num, index) => (
                <span
                  key={index}
                  className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black font-medium">
              Current Full Name Sum:
            </span>
            <span className="bg-purple-500 text-white px-3 py-1 rounded">
              {numerologyAnalysisSummary.currentFullNameSum}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black font-medium">Neutral Numbers:</span>
            <div className="flex gap-2">
              {numerologyAnalysisSummary.neutralNumbers.map((num, index) => (
                <span
                  key={index}
                  className="bg-purple text-white px-2 py-1 rounded text-sm"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black font-medium">Unlucky Numbers:</span>
            <div className="flex gap-1">
              {numerologyAnalysisSummary.unluckyNumbers.map((num, index) => (
                <span
                  key={index}
                  className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        </section>
      </article>

      <article className="my-2 md:my-4">
        <h3 className="text-md md:text-lg lg:text-xl font-semibold text-black mb-4 uppercase">
          Original Name Details
        </h3>

        <section className="border-2 border-purple p-6 rounded grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
          <div className="flex items-center gap-3">
            <span className="text-black font-medium">First Name:</span>
            <span className="text-gray-800">
              {originalNameDetails.firstName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black font-medium">Full Name:</span>
            <span className="text-black">{originalNameDetails.fullName}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black font-medium">Date of Birth:</span>
            <span className="text-black">
              {originalNameDetails.dateOfBirth}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black font-medium">Numerology:</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded">
              {originalNameDetails.firstNameSum}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black font-medium">Numerology:</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded">
              {originalNameDetails.fullNameSum}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black font-medium">Target Numbers:</span>
            <div className="flex gap-1">
              {originalNameDetails.targetNumbers.map((num, index) => (
                <span
                  key={index}
                  className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                >
                  {num}
                </span>
              ))}
            </div>
          </div>
        </section>
      </article>

      <article className="my-2 md:my-4">
        <h3 className="text-md md:text-lg lg:text-xl font-semibold text-black mb-4 uppercase">
          Family Names
        </h3>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4 border-2 border-purple p-6 rounded">
          <div className="flex items-center gap-3">
            <span className="text-black font-medium">Father's Name:</span>
            <span className="text-black">{faimilyDetails.fatherName}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black font-medium">Mother's Name:</span>
            <span className="text-black">{faimilyDetails.motherName}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-black font-medium">Spouse Name:</span>
            <span className="text-black">{faimilyDetails.spouseName}</span>
          </div>
        </section>
      </article>

      <article className="w-full flex flex-col gap-4 py-1 my-2 md:my-4">
        <h2 className="text-md md:text-lg lg:text-xl font-semibold text-black mb-2 uppercase">
          Names Suggested
        </h2>
        <CustomNameSuggestionsTable suggestions={suggestions} />
      </article>

      <article className="w-full justify-center items-center my-4">
        <h2 className="text-md md:text-lg lg:text-xl font-semibold text-black mb-2 uppercase ">
          Manual Name Input
        </h2>

        <Form {...form}>
          <form action="">
            <div className="w-full flex flex-row gap-4 py-1 my-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2 text-xs md:text-sm ">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        className="elevation-2 shadow-lg text-xs md:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="w-1/2 text-xs md:text-sm">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Full Name"
                        {...field}
                        className="elevation-2 shadow-lg text-xs md:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex flex-row gap-4 py-1">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2 text-xs md:text-sm">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        className="elevation-2 shadow-lg text-xs md:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="w-1/2 text-xs md:text-sm">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Full Name"
                        {...field}
                        className="elevation-2 shadow-lg text-xs md:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex flex-row gap-4 py-1 my-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-1/2 text-xs md:text-sm">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        className="elevation-2 shadow-lg text-xs md:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="w-1/2 text-xs md:text-sm">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Full Name"
                        {...field}
                        className="elevation-2 shadow-lg text-xs md:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full flex flex-row gap-4 py-1">
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem className="w-full text-xs md:text-sm">
                    <FormLabel>Additional Notes and Comments</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Additional Notes and Comments"
                        {...field}
                        className="elevation-2 shadow-lg text-xs md:text-sm"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <Button
          onClick={() => navigate(`/name-fixing/${userData?.id}`)}
          className="flex mt-4 mx-auto justify-center items-center self-center p-4 elevation-2 shadow-lg bg-button font-medium text-md text-darkPurple hover:text-purple hover:bg-buttonHover"
        >
          Save Selected Names
        </Button>
      </article>
    </div>
  );
};

export default NameSuggestions;
