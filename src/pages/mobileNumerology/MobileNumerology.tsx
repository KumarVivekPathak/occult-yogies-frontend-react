import React, { useState } from "react";
import MobileAnalysis from "./MobileAnalysis";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import MobileNumerologyResults from "./MobileNumerologyResults";

const MobileNumerology = () => {
  const navigate = useNavigate();
  const token = Cookies.get("authToken");
  console.log("Token : ", token);

  const [showReport, setShowReport] = useState(false);

  const handleGenerateReport = (data: any) => {
    console.log("Basic numerology report data:", data);
    setShowReport(true);
    // You can process the data further if needed
  };

  return (
    <div className="relative w-full">
      <div className="relative flex flex-col z-5 w-full h-full items-center justify-center max-w-4xl mx-auto gap-10">
        <MobileAnalysis
          mode="basic"
          onGenerateSuggestions={handleGenerateReport}
        />
        {showReport && <MobileNumerologyResults />}
      </div>
    </div>
  );
};

export default MobileNumerology;
