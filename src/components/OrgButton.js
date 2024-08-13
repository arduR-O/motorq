"use client"
import { animate, motion } from "framer-motion";

const OrgButton = ({content}) => {
    return ( 
        <motion.button
                className={`text-grey text-xl rounded-full border-2 border-grey w-56 py-3  hover:bg-[#de4c2c] hover:border-4 hover:text-black hover:font-bold bg-[#0d0d0d] hover:border-[#de4c2c]`}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                {content}
              </motion.button>
     );
}
 
export default OrgButton;