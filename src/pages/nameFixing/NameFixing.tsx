import React, { useState } from "react";
import NameAnalysis from "./NameAnalysis";
import NameSuggestions from "./NameSuggestions";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const NameFixing : React.FC = () => {
  const navigate = useNavigate();
  const token = Cookies.get("authToken");
  console.log("Token : ", token);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [reportID, setReportID] = useState<number | null>(null);

  return (
    <div className="relative w-full">
      
      {/* Main content in center */}

      <div className="relative flex flex-col z-5 w-full h-full items-center justify-center max-w-full sm:max-w-4xl mx-auto gap-10">
        {showSuggestions && reportID ? (
          <NameSuggestions reportID={reportID} />
        ) : (
          <NameAnalysis
            onGenerateSuggestions={(id: number) => {
              console.log("here got id : ", id);
              setReportID(id);
              setShowSuggestions(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default NameFixing;
