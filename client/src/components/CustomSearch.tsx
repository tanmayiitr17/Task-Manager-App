import { useState } from "react";
import { useSelector } from "react-redux";

const CustomSearch = ({
    type = "text",
    placeholder = "Enter...",
    setSearchTask = "",
}: {
    setSearchTask?: any;
    type?: string;
    placeholder?: string;
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const tasks = useSelector((state: any) => state?.task?.tasks); // Assuming tasks are stored in Redux state

    const handleSearch = (newSearchTerm: string) => {
        // Filter tasks based on search term
        const filteredTasks = tasks.filter((task: any) =>
            task?.title?.toLowerCase().includes(newSearchTerm.toLowerCase())
        );
        // Do something with the filtered tasks
        setSearchTask(filteredTasks); 
    };

    return (
        <div className="text-[#000] w-[100%] text-[12px] font-[400] leading-[22px]">
            <input
                type={type}
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => {
                    const newSearchTerm = e.target.value;
                    setSearchTerm(newSearchTerm);
                    handleSearch(newSearchTerm); // Call handleSearch function on every input change
                }}
                className="text-[rgba(0,0,0,0.25)] text-[14px] font-[400] leading-[22px] p-[5px_12px] outline-none rounded-[10px] border-[1px] border-[#D9D9D9] w-[100%] mt-[5px] h-[32px] bg-[#D9D9D9]"
            />
        </div>
    );
};

export default CustomSearch;
