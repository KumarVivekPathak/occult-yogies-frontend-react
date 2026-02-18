import React, { useState } from 'react'
import CrystalAnalysis from './CrystalAnalysis'
import CrystalIntermediateResults from './CrystalIntermediateResults'

const CrystalAdvance : React.FC = () => {
    const [showResult, setShowResult] = useState(false);

    const handleSubmit = () => {
      setShowResult(true);
    };

  return (
    <div className="relative w-full">
      <div
        className="relative flex flex-col z-5 w-full h-full items-center justify-center max-w-full sm:max-w-4xl mx-auto gap-10">
        <CrystalAnalysis title="Crystal Analysis Advance" onSubmit={handleSubmit}/>

        {showResult && <CrystalIntermediateResults />}
      </div>
    </div>
  )
}

export default CrystalAdvance