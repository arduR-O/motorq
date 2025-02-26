"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const BackButton = ({ className = "" }) => {
  const router = useRouter();
  
  return (
    <div className={`absolute top-4 right-4 flex items-center justify-center ${className}`}>
      <motion.button
        className={`text-grey rounded-full border-2 border-grey w-10 h-10 flex items-center justify-center hover:bg-[#de4c2c] hover:border-4 hover:text-black hover:font-bold bg-[#0d0d0d] hover:border-[#de4c2c]`}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => router.back()}
        style={{ transformOrigin: 'center', transformStyle: 'preserve-3d' }}
        aria-label="Go back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </motion.button>
    </div>
  );
};

export default BackButton;