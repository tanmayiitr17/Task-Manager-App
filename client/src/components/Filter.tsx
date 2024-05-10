import { CustomButton } from './CustomButton';
import ErrorText from './ErrorText';
import CustomInput from './CustomInput';
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useSelector } from "react-redux";
import { useState } from 'react';

type FilterData = {
    title?: string;
    dueDate?: string;
    priority?: string;
};

interface FilterProps {
    setFilter?: any;
    setFilterTask?: any;
}

const schema = yup.object({
    title: yup.string().nullable(),
    dueDate: yup.string().nullable(),
    priority: yup.string().nullable(),
});

const Filter = ({ setFilter, setFilterTask }: FilterProps) => {
    const [loading, setLoading] = useState(false);
    const tasks = useSelector((state: any) => state?.task?.tasks); // Assuming tasks are stored in Redux state 

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        resolver: yupResolver(schema),
    });

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

        setFilterTask(filtered);
        setLoading(false);
        setFilter((filter: any) => !filter)
    };


    return (
        <div className="flex flex-col justify-center w-[100%] px-[5%] my-[5%]">
            <h2 className="font-[500] text-center text-[25px] border-b-[3px] border-b-solid border-b-[rgb(9,132,253)] w-[40%]  max-sm:w-[30%] max-sm:text-[20px] mx-auto">Filter Task</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-[15px] relative">
                <div>
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
                    <ErrorText text={errors?.title?.message || ""} />
                </div>
                <div className='flex flex-row justify-between gap-[5%]'>
                    <div>
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
                        <ErrorText text={errors?.dueDate?.message || ""} />
                    </div>
                    <div>
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
                        <ErrorText text={errors?.priority?.message || ""} />
                    </div>
                </div>
                <CustomButton loading={loading} text="Filter task" className="!mt-[2%]" />
                <ClearRoundedIcon className="absolute top-[-39.5%] right-[-8.5%] text-[#fff] !h-[20px] !w-[20px] cursor-pointer text-[#fff] rounded-[50%] !bg-[#FF0000]" onClick={() => setFilter((filter: any) => !filter)} />
            </form>
        </div>
    );
}

export default Filter;
