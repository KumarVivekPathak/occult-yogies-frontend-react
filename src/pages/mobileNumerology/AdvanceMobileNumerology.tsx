import { useState } from "react";
import MobileAnalysis from "./MobileAnalysis";
import AdvanceMobileNumerologyResults from "./AdvanceMobileNumerologyResults";
import type {
  Dasha,
  DashaData,
  MobileNumerologyReportDataDTO,
} from "../../service/types";
import { useLocation } from "react-router-dom";

const AdvanceMobileNumerology: React.FC = () => {
  const [showReport, setShowReport] = useState<boolean>(false);
  const [reportData, setReportData] = useState<MobileNumerologyReportDataDTO>();
  const location = useLocation();
  const reportId = location.state?.id || null;
  console.log("report id i m getitng is : ", reportId);

  const convertToArr = (data: Object) => {
    const values = Object.values(data);
    const gridArr: string[][] = [];
    for (let i = 0; i < values.length; i += 3) {
      gridArr.push(values.slice(i, i + 3));
    }
    return gridArr;
  };

  const handleReportResponse = (reportData: any) => {
    const personalInfo = reportData.personal_info;
    const mobileAnalysis = reportData.mobile_analysis;
    const charts = reportData.charts;
    const wallpapers = reportData.wallpapers;
    const loshuGrid = convertToArr(charts.loshu_grid.loshuGrid);
    const vedicGrid = convertToArr(charts.vedic_grid.vedicGrid);
    const missingNumber = reportData.missing_elements.missing_numbers;
    const dashaChart = parseDashaData(charts.dasha_chart);
    const mobileNumerDetails = {
      dateOfBirth: personalInfo.date_of_birth,
      mobileNumber: mobileAnalysis.mobile_number,
      mobileNumberCompound: mobileAnalysis.compound_number,
      mobileNumberTotal: mobileAnalysis.total_number,
      recommendedMobileNumber: mobileAnalysis.message,
      luckyColor: mobileAnalysis.lucky_color.split(","),
      unluckyColor: mobileAnalysis.unlucky_color.split(","),
      luckyNumber: mobileAnalysis.lucky_numbers,
      unluckyNumber: mobileAnalysis.unlucky_numbers,
      neutralNumber: mobileAnalysis.neutral_numbers,
      missingNumber: missingNumber,
      mobileCombination: mobileAnalysis?.combinations?.combinations,
      recomendation: "It is not recomended to use",
      prediction: [
        "You are a lucky person",
        "You can use it.",
        "Nice to meet you",
      ],
      recommendedWallpaper: wallpapers.king_number_wallpaper,
      areaWallpaper: wallpapers.area_wallpapers,
    };
    setReportData({ loshuGrid, vedicGrid, mobileNumerDetails, dashaChart });
  };

  const parseDashaData = (rawData: string): DashaData => {
    const periods: string[] = rawData.split("<hr/>");
    let rulingPlanet: string = "";
    const dashas: Dasha[] = [];

    periods.forEach((period: string) => {
      const lines: string[] = period.split("\n").filter((line) => line.trim());

      let currentDasha: Dasha = {
        period: "",
        sequence: "",
        description: "",
      };

      const descriptions: string[] = [];

      lines.forEach((line: string) => {
        const cleanLine: string = line.trim();

        if (cleanLine.includes("Ruling Planet Is:")) {
          rulingPlanet = cleanLine
            .replace("Ruling Planet Is:", "")
            .replace(/<\/?b>/g, "")
            .trim();
        } else if (cleanLine.includes("Dasha is:")) {
          const dashaInfo: string = cleanLine.replace("Dasha is:", "").trim();
          const parts: string[] = dashaInfo.split("=>");
          if (parts.length === 2) {
            currentDasha.period = parts[0].trim().replace(/\s-\s/g, " to ");
            currentDasha.sequence = parts[1].trim();
          }
        } else if (cleanLine.match(/^\d+\./)) {
          const point: string = cleanLine.replace(/^\d+\.\s*/, "");
          descriptions.push(point);
        }
      });

      if (currentDasha.period && descriptions.length > 0) {
        currentDasha.description = descriptions.join(" ");
        dashas.push(currentDasha);
      }
    });

    console.log("\n\n\n\n\n dashas : ", dashas);
    return { rulingPlanet, dashas };
  };

  const handleGenerateReport = (data: any) => {
    console.log("Advanced numerology report data:", data);
    handleReportResponse(data);
    setShowReport(true);
  };

  return (
    <div className="relative w-full">
      {/* Main content */}
      <div className="elative flex flex-col z-5 w-full h-full items-center justify-center max-w-full sm:max-w-4xl mx-auto gap-10">
        <MobileAnalysis
          mode="advanced"
          onGenerateSuggestions={handleGenerateReport}
          reportId={reportId}
        />

        {showReport && (
          <AdvanceMobileNumerologyResults reportData={reportData} />
        )}
      </div>
    </div>
  );
};

export default AdvanceMobileNumerology;
