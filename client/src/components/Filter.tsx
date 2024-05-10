import { CustomButton } from './CustomButton';
import ErrorText from './ErrorText';
import CustomInput from './CustomInput';
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useSelector } from "react-redux";
import { useState } from 'react';

// Define the type for filter data
type FilterData = {
    title?: string;
    dueDate?: string;
    priority?: string;
};

// Define the props for Filter component
interface FilterProps {
    setFilter?: any;        // Function to handle filter state
    setFilterTask?: any;    // Function to set filtered tasks
}

// Define schema for form validation
const schema = yup.object({
    title: yup.string().nullable(),
    dueDate: yup.string().nullable(),
    priority: yup.string().nullable(),
});

// Filter component to filter tasks based on user input
const Filter = ({ setFilter, setFilterTask }: FilterProps) => {
    const [loading, setLoading] = useState(false);    // State to manage loading state
    const tasks = useSelector((state: any) => state?.task?.tasks); // Assuming tasks are stored in Redux state 

    // Form hook for managing form state and validation
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        resolver: yupResolver(schema),
    });

    // Function to handle form submission
    const onSubmit: SubmitHandler<FilterData> = async (data) => {
        setLoading(true);

        // Convert filter data to lowercase
        const filterTitle = data.title?.toLowerCase();
        const filterDueDate = data.dueDate?.toLowerCase();
        const filterPriority = data.priority?.toLowerCase();

        // Filter tasks based on the provided filters
        const filtered = tasks.filter((task: any) => {
            // Convert task properties to lowercase for comparison
            const taskTitle = task.title?.toLowerCase();
            const taskDueDate = task.dueDate?.toLowerCase();
            const taskPriority = task.priority?.toLowerCase();

            // Check if filter data is present and matches the task properties
            if (filterTitle && !taskTitle.includes(filterTitle)) return false;
            if (filterDueDate && taskDueDate !== filterDueDate) return false;
            if (filterPriority && taskPriority !== filterPriority) return false;
            return true;
        });

        // Set filtered tasks and update loading state
        setFilterTask(filtered);
        setLoading(false);
        // Toggle filter state
        setFilter((filter: any) => !filter)
    };


    return (
        <div className="flex flex-col justify-center w-[100%] px-[5%] my-[5%]">
            {/* Filter task header */}
            <h2 className="font-[500] text-center text-[25px] border-b-[3px] border-b-solid border-b-[rgb(9,132,253)] w-[40%]  max-sm:w-[30%] max-sm:text-[20px] mx-auto">Filter Task</h2>
            {/* Filter task form */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-[15px] relative">
                <div>
                    {/* Title input field */}
                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange } }) => (
                            <CustomInput
                                type="string"
                                placeholder="Enter Title"
                                fieldName="Title"
                                onChange={onChange}
                            />
                        )}
                    />
                    {/* Error message for title field */}
                    <ErrorText text={errors?.title?.message || ""} />
                </div>
                <div className='flex flex-row justify-between gap-[5%]'>
                    <div>
                        {/* Due date input field */}
                        <Controller
                            control={control}
                            name="dueDate"
                            render={({ field: { onChange } }) => (
                                <CustomInput
                                    type="date"
                                    placeholder="Enter Due Date"
                                    fieldName={"Due Date"}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {/* Error message for due date field */}
                        <ErrorText text={errors?.dueDate?.message || ""} />
                    </div>
                    <div>
                        {/* Priority input field */}
                        <Controller
                            control={control}
                            name="priority"
                            render={({ field: { onChange } }) => (
                                <CustomInput
                                    type="text"
                                    placeholder="Enter Priority Level"
                                    fieldName={"Priority Level"}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {/* Error message for priority field */}
                        <ErrorText text={errors?.priority?.message || ""} />
                    </div>
                </div>
                {/* Filter button */}
                <CustomButton loading={loading} text="Filter task" className="!mt-[2%]" />
                {/* Clear filter button */}
                <ClearRoundedIcon className="absolute top-[-39.5%] right-[-8.5%] text-[#fff] !h-[20px] !w-[20px] cursor-pointer text-[#fff] rounded-[50%] !bg-[#FF0000]" onClick={() => setFilter((filter: any) => !filter)} />
            </form>
        </div>
    );
}

export default Filter;
