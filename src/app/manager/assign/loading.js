export default function Loading() {
  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-center items-center gap-4 bg-[#0d0d0d]">
      <div className="flex flex-col items-center animate-fade-in">
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-[#de4c2c] border-b-[#de4c2c] border-l-grey border-r-grey mb-8"></div>
        
        <p className="text-center uppercase text-[16px] md:text-[12px] text-[#B7AB98] mt-2 mb-3 tracking-[7px] animate-fade-in-delayed">
          Loading
        </p>
      </div>
    </div>
  );
}