import React, { useState } from 'react'
import CustomLoshuVedicAnalysis from '../../components/CustomLoshuVedicAnalysis'
import type { LoshuVedicAnalysisFormDTO } from '../../service/types';
import CustomLoshuVedicResults from '../../components/CustomLoshuVedicResults';

const MatchLoshu : React.FC = () => {

  const [showResult, setShowResult] = useState(true);
  const [partnersData, setPartnersData] = useState([
    {
      name: 'Rahul Sharma',
      dob: '14 July 1995',
      kingNumber: 8,
      queenNumber: 6,
      loshuGridData: [
        ["", "99", "22"],
        ["", "5", ""],
        ["", "11", "6"],
      ],
    },
    {
      name: 'Priya Mehta',
      dob: '20 March 1993',
      kingNumber: 9,
      queenNumber: 5,
      loshuGridData: [
        ["", "", "7"],
        ["3", "5", ""],
        ["1", "11", "6"],
      ],
    },
  ]);

  const handleSubmit = (formData : LoshuVedicAnalysisFormDTO) =>{
    console.log("Here is form data", formData);
}
  return (

    <div className="relative">
    <div className="relative flex flex-col z-5 w-full h-full items-center justify-center max-w-5xl mx-auto gap-10">
       
          <CustomLoshuVedicAnalysis title="Match Loshu" handleSubmit={handleSubmit}/>
          
          {showResult && (
              <CustomLoshuVedicResults
              title="Match Loshu Report"
              partners={partnersData}
            />
            
          )}
    </div>
  </div>
    
  )
}

export default MatchLoshu 