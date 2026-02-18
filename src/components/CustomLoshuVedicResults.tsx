import React from 'react';
import CustomGridChart from './CustomGridChart';
import type { PartnerInfoDTO } from '../service/types';

interface CustomLoshuVedicResultsProps {
  title: string;
  partners: PartnerInfoDTO[];
}

const CustomLoshuVedicResults: React.FC<CustomLoshuVedicResultsProps> = ({ title, partners }) => {
  return (
    <div className="flex flex-col bg-grey font-roboto w-full h-full px-10 py-10 rounded-xl outline outline-12 outline-textYellow">
      <h1 className="text-purple text-lg sm:text-xl md:text-3xl lg:text-4xl font-extrabold uppercase">{title}</h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border-1" />
     

      <div className="w-full flex flex-col lg:flex-row gap-6 justify-evenly items-center lg:items-start mt-6 px-4">
        {partners.map((partner, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4">
            <h2 className="text-lg font-semibold text-black text-center uppercase">
              {index === 0 ? 'First Partner' : 'Second Partner'}
            </h2>

            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-black justify-start items-start">
              <p className="flex flex-row justify-start items-start "><span className="font-medium mr-1">Name : </span>{" "} {partner.name}</p>
              <p className="flex flex-row justify-start items-start "><span className="font-medium mr-1">DOB : </span>{" "} {partner.dob}</p>
              <p className="flex flex-row justify-start items-start "><span className="font-medium mr-1">King Number : </span>{" "} {partner.kingNumber}</p>
              <p className="flex flex-row justify-start items-start "><span className="font-medium mr-1">Queen Number : </span>{" "} {partner.queenNumber}</p>
            </div>

            <CustomGridChart data={partner.loshuGridData} label={`Loshu Grid ${index === 0 ? 'First' : 'Second'} Partner`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomLoshuVedicResults;
