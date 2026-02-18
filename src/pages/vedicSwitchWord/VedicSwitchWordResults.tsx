import React, { useState } from "react";

const VedicSwitchWordResults = () => {
  const [switchWordData, setSwitchWordData] = useState({
    category: "Relationship",
    switchWordPurpose: "To attract Love",
    colorOfPen: "Red",
    association: "Radha Krishan",
    switchWord: "राधा कृष्ण",
    numerOfChant: 108,
  });

  return (
    <div className="flex flex-col bg-grey font-roboto w-full h-full px-2 sm:px-4 md:px-10 py-10 rounded-xl outline-12 outline-textYellow">
      <h1 className="text-purple text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase">
        Vedic Switch Word Prediction
      </h1>
      <hr className="my-3 w-full mx-auto border-darkPurple border-1" />

      <section className="grid grid-cols-1 sm:grid-cols-2 w-full">
        {/* Category */}
        <div className="flex flex-row items-center gap-2">
          <h2 className="text-darkPurple font-bold text-sm sm:text-base md:text-base lg:text-lg">
            Category :
          </h2>
          <span className="text-black font-medium text-sm sm:text-base md:text-base lg:text-lg">
            {switchWordData.category}
          </span>
        </div>

        {/* Switch Word Purpose */}
        <div className="flex flex-row items-center gap-2">
          <h2 className="text-darkPurple font-bold text-sm sm:text-base md:text-base lg:text-lg">
            Switch Word Purpose :
          </h2>
          <span className="text-black font-medium text-sm sm:text-base md:text-base lg:text-lg">
            {switchWordData.switchWordPurpose}
          </span>
        </div>

        {/* Color of Pen */}
        <div className="flex flex-row items-center gap-2">
          <h2 className="text-darkPurple font-bold text-sm sm:text-base md:text-base lg:text-lg">
            Color of Pen :
          </h2>
          <span className="text-black font-medium text-sm sm:text-base md:text-base lg:text-lg">
            {switchWordData.colorOfPen}
          </span>
        </div>

        {/* Association */}
        <div className="flex flex-row items-center gap-2">
          <h2 className="text-darkPurple font-bold text-sm sm:text-base md:text-base lg:text-lg">
            Association :
          </h2>
          <span className="text-black font-medium text-sm sm:text-base md:text-base lg:text-lg">
            {switchWordData.association}
          </span>
        </div>

        {/* Switch Word to Chant */}
        <div className="flex flex-row items-center gap-2 sm:col-span-2">
          <h2 className="text-darkPurple font-bold text-sm sm:text-base md:text-base lg:text-lg">
            Switch Word to chant :
          </h2>
          <span className="text-black font-medium text-sm sm:text-base md:text-base lg:text-lg">
            {switchWordData.switchWord}
          </span>
          <p className="text-sm">
            ({switchWordData.numerOfChant} times daily as per need)
          </p>
        </div>
      </section>

      <article className="flex flex-col justify-center items-center gap-2 md:gap-4 lg:gap-6 text-grey text-3xl sm:text-5xl md:text-7xl font-extrabold capitalize text-center bg-purple my-2 py-2 px-4 rounded-xl self-center outline-4 outline-textYellow">
        <h1 className="">{switchWordData.switchWord}</h1>
        <h1 className="">Radha Krishan</h1>
      </article>

      <section className="flex flex-col justify-start items-start gap-2">
        <p className="text-black text-start text-sm md:text-base">
          Above any of this switch word can be chanted for this particular
          purpose
        </p>
        <p className="text-black text-start text-sm md:text-base">
          This Vedic Switchword has to be chanted with strong Faith , Surrender
          and Belief so that it can be manifested.
        </p>
      </section>
    </div>
  );
};

export default VedicSwitchWordResults;
