import React, { useState } from "react";
import LoshuGridAnalysis from "./LoshuGridAnalysis";
import LoshuGridAnalysisResult from "./LoshuGridAnalysisResult";

const LoshuGridMastery: React.FC = () => {
  const [showResult, setShowResult] = useState(true);

  const handleGenerateReport = (data: any) => {
    console.log("Basic numerology report data:", data);
    setShowResult(true);
  };

  return (
    <div className="relative w-full">
     <div className="relative flex flex-col z-5 w-full h-full items-center justify-center max-w-5xl mx-auto gap-10">
       
        <LoshuGridAnalysis />

        {showResult && <LoshuGridAnalysisResult />}
        
      </div>
    </div>
  );
};

export default LoshuGridMastery;
