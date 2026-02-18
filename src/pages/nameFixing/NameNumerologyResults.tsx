import { Button } from "@/components/ui/button";
import React from "react";

const NameNumerologyResults : React.FC = () => {
  const numerologyAnalysisSummary = {
    currentFirstNameSum: 2,
    currentFullNameSum: 5,
    interactionValues: [1, 3, 5, 6],
    neutralNumbers: [4, 6, 7, 9],
    luckyNumbers: [1, 2, 3, 5],
    unluckyNumbers: [8],
  };

  const originalNameDetails = {
    firstName: "Vivek",
    fullName: "Vivek Pathak",
    dateOfBirth: "16 July 2025",
    firstNameSum: "20/2",
    fullNameSum: "41/5",
    gender: "Male",
  };

  const numerologyAnalysis = {
    currentFirstNameSum: 2,
    currentFullNameSum: 5,
    neutralNumbers: [4, 6, 7, 9],
    luckyNumbers: [1, 2, 3, 5],
    unluckyNumbers: [8],
  };

  const faimilyDetails = {
    fatherName: "Vivek Pathak",
    fatherNuerology: "20/2",
    motherName: "Vivek Pathak",
    motherNuerology: "20/2",
    spouseName: "Vivek Pathak",
    spouseNuerology: "20/2",
  };

  const nameSuggestionsOptions = [
    {
        id : '1',
        firstName: "Vivek",
        fullName: "Vivek Pathak",
        firstNameSum: "20/2",
        fullNameSum: "41/5",
    },
    {
        id : '2',
        firstName: "Sonal",
        fullName: "Sonal Madan",
        firstNameSum: "30/3",
        fullNameSum: "25/7",
    },
    {
        id : '3',
        firstName: "Sachin",
        fullName: "Sachin Kumar",
        firstNameSum: "32/5",
        fullNameSum: "17/8",
    }
  ]

  return (
    <div className="min-h-screen bg-red-500 p-24 font-sans leading-normal tracking-normal flex justify-center items-center">
      <div className="bg-green-200 w-full h-full px-10 py-10 flex flex-col">
        <h1 className="text-2xl font-bold self-center text-gray-600">
          Name Suggestions
        </h1>
        <hr className="my-2 mx-auto w-full border-gray-400 border-1 " />

        <article className="bg-blue-50 p-6 rounded-lg mb-6 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Faimily Details
          </h3>

          <section className="grid grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Father Name:</span>
              <span className="text-gray-800">{faimilyDetails.fatherName}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Mother Name:</span>
              <span className="text-gray-800">{faimilyDetails.motherName}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Spouse Name:</span>
              <span className="text-gray-800">{faimilyDetails.spouseName}</span>
            </div>
          </section>

          <section className="grid grid-cols-3 gap-8 mt-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">
                Father Numerology:
              </span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded">
                {faimilyDetails.fatherNuerology}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">
                Mother Numerology:
              </span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded">
                {faimilyDetails.motherNuerology}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">
                Spouse Numerology:
              </span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded">
                {faimilyDetails.spouseNuerology}
              </span>
            </div>
          </section>
        </article>

        <article className="bg-blue-50 p-6 rounded-lg mb-6 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Numerology Analysis
          </h3>

          <section className="grid grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">
                Current First Name Sum:
              </span>
              <span className="text-gray-800">
                {numerologyAnalysis.currentFirstNameSum}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">
                Current Full Name Sum:
              </span>
              <span className="text-gray-800">
                {numerologyAnalysis.currentFullNameSum}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">
                Neutral Numbers:
              </span>
              <div className="flex gap-1">
                {numerologyAnalysis.neutralNumbers.map((num, index) => (
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

          <section className="grid grid-cols-3 gap-8 mt-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Lucky Numbers:</span>
              <div className="flex gap-1">
                {numerologyAnalysis.luckyNumbers.map((num, index) => (
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
              <span className="text-gray-700 font-medium">
                Unlucky Numbers:
              </span>
              <div className="flex gap-1">
                {numerologyAnalysis.unluckyNumbers.map((num, index) => (
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

        <article className="bg-blue-50 p-6 rounded-lg mb-6 border-l-4 border-red-500">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Original Name Details
          </h3>

          <section className="grid grid-cols-3 gap-8">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">First Name:</span>
              <span className="text-gray-800">
                {originalNameDetails.firstName}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Full Name:</span>
              <span className="text-gray-800">
                {originalNameDetails.fullName}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Date of Birth:</span>
              <span className="text-gray-800">
                {originalNameDetails.dateOfBirth}
              </span>
            </div>
          </section>

          <section className="grid grid-cols-3 gap-8 mt-4">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Numerology:</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded">
                {originalNameDetails.firstNameSum}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Numerology:</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded">
                {originalNameDetails.fullNameSum}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Gender:</span>
              <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">
                {originalNameDetails.gender}
              </span>
            </div>
          </section>
        </article>


        <section className="">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Name Suggestions
          </h3>
          <article className="flex flex-col gap-4 space-y-4 rounded-lg">
          {nameSuggestionsOptions.map((option) => (
          <section 
            key={option.id} 
            className="border-l-4 border-green-500 bg-gray-50 p-4 rounded-lg"
          >
            <div className="grid grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Option {option.id}
                </h3>
                
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">First Name:</span>
                  <span className="text-gray-800">{option.firstName}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">First Name Numerology:</span>
                  <span className="bg-purple-500 text-white px-3 py-1 rounded text-sm">
                    {option.firstNameSum}
                  </span>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-3">
                <div className="h-8"></div> {/* Spacer to align with Option title */}
                
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Full Name:</span>
                  <span className="text-gray-800">{option.fullName}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium">Full Name Numerology:</span>
                  <span className="bg-purple-500 text-white px-3 py-1 rounded text-sm">
                    {option.fullNameSum}
                  </span>
                </div>
              </div>
            </div>
          </section>
        ))}
            
          </article>

        </section>
        
        <section className="flex gap-4 justify-center m-6 ">
          <Button className="bg-blue-500 text-white">Create New Analysis</Button>
          <Button className="bg-green-500 text-white">Download Report</Button>
          <Button className="bg-green-500 text-white">Download Hindi Report</Button>
        </section>

      </div>
    </div>
  );
};

export default NameNumerologyResults;
