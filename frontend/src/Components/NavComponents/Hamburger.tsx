interface HamburgerMenuProps {
  isHamsymbolOpen: boolean;
  setIsHamSymbolOpen: (isOpen: boolean) => void;
}
const HamburgerMenu = ({isHamsymbolOpen, setIsHamSymbolOpen}:HamburgerMenuProps) => {
//  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsHamSymbolOpen(!isHamsymbolOpen);
  };

  return (
    <div className="relative">
      <button
        className="block lg:hidden p-2 text-gray-700 focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-10 h-10 hover:text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isHamsymbolOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          ) : (
            <>
              <line x1="4" y1="6" x2="20" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="4" y1="18" x2="20" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </>
          )}
        </svg>
      </button>

      {/* <div className={`absolute mt-3 -right-3 flex justify-center items-center ${isOpen?'block':'hidden'}`}>
        <div className="flex flex-col w-screen justify-center items-center bg-white p-4 rounded shadow-lg">
          <span>Home</span>
          <span>Home</span>
          <span>Home</span>
          <span>Home</span>
          <span>Home</span>
          <span>Home</span>
        </div>
      </div> */}
    </div>
  );
};

export default HamburgerMenu;
