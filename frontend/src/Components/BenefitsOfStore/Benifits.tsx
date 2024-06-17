import React from 'react'
interface BenefitsOfStoreProps {
    icon:React.ReactNode,
    benefit:string
}
function Benifits({icon, benefit}:BenefitsOfStoreProps) {
  return (
    <div className="flex flex-col flex-wrap space-y-5 justify-center w-full mx-3 items-center border-2 p-10 rounded-xl md:w-96">
    <div className="text-5xl bg-gray-200 p-3 rounded-full">
      {icon}
    </div>
    <div className="text-lg text-center font-sans font-semibold">
      {benefit}
    </div>
  </div>
  )
}

export default Benifits