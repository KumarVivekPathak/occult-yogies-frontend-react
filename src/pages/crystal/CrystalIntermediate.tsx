import React, { useState, useEffect } from 'react';
import CrystalAnalysis from './CrystalAnalysis';
import CrystalIntermediateResults from './CrystalIntermediateResults';

const CrystalIntermediate: React.FC = () => {
  const [showResult, setShowResult] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState();


  // Example: Load existing data for update mode
  useEffect(() => {
    // const loadExistingData = async () => {
    //   try {
    //     // Replace with your actual API call
    //     // const response = await fetch('/api/crystal-analysis/existing-data');
    //     // const data = await response.json();
        
    //     // Example initial data for demonstration
    //     const existingData: any= {
    //       firstName: "John",
    //       lastName: "Doe",
    //       email: "john.doe@example.com",
    //       dateOfBirth: "15/05/1990",
    //       gender: "Male",
    //       mobileNumber: "1234567890",
    //       majorArea: "1",
    //       minorArea: "2"
    //     };
        
    //     setInitialData(existingData);
    //   } catch (error) {
    //     console.error('Failed to load existing data:', error);
    //   }
    // };

    // Uncomment to load existing data
    // loadExistingData();
  }, []);

  // Custom handler for form submission
  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    try {
      console.log('Submitting form data:', formData);
      // const data = {
      //   firstName: formData.firstName,
      //   lastName: formData.lastName,
      //   emailId: formData.email,
      //   dateOFBirth: formData.dateOfBirth.split('/').reverse().join('-'),
      //   gender: formData.gender.toLowerCase(),
      //   mobileNo: formData.mobileNumber,
      //   majorArea: formData.majorArea,
      //   minorArea: formData.minorArea
      // }
      // const response = await createCrystalAnalysisIntermediate(data);
      // console.log('Form submission response:', response);
      setShowResult(true);
      
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Custom handler for form reset
  const handleReset = () => {
    setShowResult(false);
    console.log('Form reset');
  };

  // Custom major area options (optional - will use defaults if not provided)
  const customMajorAreas = [
    { id: 1, name: "Physical Health" },
    { id: 2, name: "Emotional Wellbeing" },
    { id: 3, name: "Relationship Issues" },
    { id: 4, name: "Financial Concerns" },
    { id: 5, name: "Career Growth" },
  ];

  // Custom minor area options (optional)
  const customMinorAreas = [
    { id: 1, value: "Love & Romance" },
    { id: 2, value: "Physical Attraction" },
    { id: 3, value: "Family Relations" },
    { id: 4, value: "Money Management" },
    { id: 5, value: "Life Partner" },
  ];

  return (
    <div className="relative w-full">
      <div className="relative flex flex-col z-5 w-full h-full items-center justify-center max-w-full sm:max-w-4xl mx-auto gap-10">
        <CrystalAnalysis 
          title="Crystal Analysis Intermediate"
          initialData={initialData}
          onSubmit={handleSubmit}
          onReset={handleReset}
          majorAreaOptions={customMajorAreas}
          minorAreaOptions={customMinorAreas}
          submitButtonText="Analyze Crystal"
          showResetButton={true}
          isLoading={isLoading}
          mode="create" // or "update"
        />

        {showResult && <CrystalIntermediateResults />}
      </div>
    </div>
  );
};

export default CrystalIntermediate;