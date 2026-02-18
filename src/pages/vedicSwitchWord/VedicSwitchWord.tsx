import React, { useState } from "react";
import VedicSwitchWordAnalysis from "./VedicSwitchWordAnalysis";
import VedicSwitchWordResults from "./VedicSwitchWordResults";
import { Toaster } from "react-hot-toast";

const VedicSwitchWord: React.FC = () => {
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    setShowResult(true);
  };

  return (
    <div className="relative w-full">
      <Toaster position="top-right" reverseOrder={false} />
      <div
        className="relative flex flex-col z-5 w-full h-full items-center justify-center max-w-full sm:max-w-4xl mx-auto gap-10">
        <VedicSwitchWordAnalysis handleSubmit={handleSubmit} />

        {showResult && <VedicSwitchWordResults />}
      </div>
    </div>
  );
};

export default VedicSwitchWord;
