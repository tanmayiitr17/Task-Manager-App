import { useState } from "react";
import { useSelector } from "react-redux";

const CustomSearch = ({
    type = "text",                  // Default type for input
    placeholder = "Enter...",      // Default placeholder for input
    setSearchTask = "",             // Function to set search results
}: {
    setSearchTask?: any;            // Function to set search results
    type?: string;                  // Optional input type
    placeholder?: string;          // Optional input placeholder
}) => {
    const [searchTerm, setSearchTerm] = useState('');    // State to store search term
    const tasks = useSelector((state: any) => state?.task?.tasks); // Assuming tasks are stored in Redux state

    // Function to handle search
    const handleSearch = (newSearchTerm: string) => {
        // Filter tasks based on search term
        const filteredTasks = tasks.filter((task: any) =>
            task?.title?.toLowerCase().includes(newSearchTerm.toLowerCase())
        );
        // Set search results using setSearchTask function
        setSearchTask(filteredTasks);
    };

    return (
        <div className="text-[#000] w-[100%] text-[12px] font-[400] leading-[22px]">
            {/* Input element for search */}
            <input
                type={type}                             // Set input type
                placeholder={placeholder}               // Set input placeholder
                value={searchTerm}                      // Bind input value to searchTerm state
                onChange={(e) => {
                    const newSearchTerm = e.target.value;
                    setSearchTerm(newSearchTerm);        // Update searchTerm state on input change
                    handleSearch(newSearchTerm);        // Call handleSearch function on every input change
                }}
                className="text-[rgba(0,0,0,0.25)] text-[14px] font-[400] leading-[22px] p-[5px_12px] outline-none rounded-[10px] border-[1px] border-[#D9D9D9] w-[100%] mt-[5px] h-[32px] bg-[#D9D9D9]"
            />
        </div>
    );
};

export default CustomSearch;
