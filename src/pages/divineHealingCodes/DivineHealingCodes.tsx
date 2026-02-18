import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import DivineHealingCodesAnalysis from "./DivineHealingCodesAnalysis";
import DivineHealingCodesResults from "./DivineHealingCodesResults";

const DivineHealingCodes: React.FC = () => {
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    setShowResult(true);
  };

  return (
    <div className="relative w-full">
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className="relative flex flex-col z-5 w-full h-full items-center justify-center max-w-full sm:max-w-4xl mx-auto gap-10">
        <DivineHealingCodesAnalysis handleSubmit={handleSubmit}/>

        {showResult && <DivineHealingCodesResults />}
      </div>
    </div>
  );
};

export default DivineHealingCodes;
