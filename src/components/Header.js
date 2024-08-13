const Header = ({ content }) => {
  return (
    <>
      <h1 className="text-6xl font-bold text-[#B7AB98] ">{content}</h1>

      <div className="w-1/3 flex items-center justify-center">
        <div className="flex-grow h-0.5 bg-gray-300 dark:bg-gray-700"></div>
        <div className="mx-4 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v14m-7-7h14"
            />
          </svg>
        </div>
        <div className="flex-grow h-0.5 bg-gray-300 dark:bg-gray-700"></div>
      </div>
    </>
  );
};

export default Header;
