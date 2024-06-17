import React, { useEffect } from "react";
import AOS from "aos";
interface BenefitsOfStoreProps {
  icon: React.ReactNode;
  benefit: string;
}
function Benifits({ icon, benefit }: BenefitsOfStoreProps) {
  useEffect(() => {
    AOS.init({
      duration: 600, // Animation duration in milliseconds // Whether animation should happen only once - while scrolling down
    });
  }, []);
  return (
    <div
      className="flex flex-col flex-wrap space-y-5 justify-center w-full mx-3 items-center border-2 p-10 rounded-xl md:w-96 aos-init aos-animate"
      data-aos="zoom-in-up"
      data-aos-anchor-placement="top-bottom"
    >
      <div className="text-5xl bg-gray-200 p-3 rounded-full">{icon}</div>
      <div className="text-lg text-center font-sans font-semibold">
        {benefit}
      </div>
    </div>
  );
}

export default Benifits;
