import notFoundPng from "../assets/not.png";
function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center space-y-5">
      <img className="w-44 h-44 opacity-85" src={notFoundPng} alt="not found" />
      <span className="text-neutral-500">
        No Items found in your List start adding them now!
      </span>
    </div>
  );
}

export default NotFound;
