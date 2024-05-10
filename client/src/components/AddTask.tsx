import { CustomButton } from './CustomButton'
import ErrorText from './ErrorText'
import CustomInput from './CustomInput';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { showError, showMessage } from '../utils/Notify';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { updateTask, uploadTask } from '../api/task';
import { useSelector } from 'react-redux';

type AddTaskData = {
    title: string;
    dueDate: string;
    priority: string;
    startTime: string;
    endTime: string;
};

interface AddTaskProps {
    setAdd?: any;
    text?: string;
    task?: any;
    buttonText?: string;
}

const schema = yup
    .object({
        title: yup
            .string()
            .required("Title is required!"),
        dueDate: yup
            .string()
            .required("Due date is required!"),
        priority: yup
            .string()
            .required("Priority is required!"),
        startTime: yup
            .string()
            .required("Start time is required!"),
        endTime: yup
            .string()
            .required("End time is required!"),
    })
    .required();

const AddTask = ({ setAdd, text, task, buttonText }: AddTaskProps) => {
    // Get the current user's ID from Redux state
    const userId = useSelector((state: any) => state?.user?.currentUser?._id)
    const id = task?._id;
    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AddTaskData>({
        resolver: yupResolver(schema),
    });

    // Function to handle form submission
    const onSubmit: SubmitHandler<AddTaskData> = async (data) => {
        setLoading(true);
        // Check if the button text indicates creating a new task
        if (buttonText == "Create a new task") {
            try {
                // Add the user ID to the data
                const result = { ...data, userId };
                // Upload the task
                const res = await uploadTask(result);
                if (res) {
                    showMessage("Task created Successfully!")
                }
            } catch (err) {
                showError("Something went wrong.Try Again!");
            } finally {
                setLoading(false);
                // Toggle the state to close the form
                setAdd((add: any) => !add)
                // Reload the window after 2 seconds
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } else {
            try {
                // Add the task ID to the data
                const result = { ...data, id };
                // Update the task
                const res = await updateTask(result);
                if (res) {
                    showMessage("Task updated Successfully!")
                }
            } catch (err) {
                showError("Something went wrong.Try Again!");
            } finally {
                setLoading(false);
                // Toggle the state to close the form
                setAdd((add: any) => !add);
                // Reload the window after 2 seconds
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        }
    };

    return (
        <div className="flex flex-col justify-center w-[100%] px-[5%] my-[5%]">
            {/* Display the form title */}
            <h2 className="font-[500] text-center text-[25px] border-b-[3px] border-b-solid border-b-[rgb(9,132,253)] w-[40%]  max-sm:w-[30%] max-sm:text-[20px] mx-auto">{text}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-[15px] relative">
                <div>
                    {/* Input field for task title */}
                    <Controller
                        control={control}
                        name="title"
                        render={({ field: { onChange } }) => (
                            <CustomInput
                                type="string"
                                placeholder={`${task?.title || "Enter Title"}`}
                                fieldName="Title"
                                onChange={onChange}
                            />
                        )}
                    />
                    {/* Display error message for title field */}
                    <ErrorText text={errors?.title?.message || ""} />
                </div>
                <div className='flex flex-row justify-between gap-[5%]'>
                    <div>
                        {/* Input field for due date */}
                        <Controller
                            control={control}
                            name="dueDate"
                            render={({ field: { onChange } }) => (
                                <CustomInput
                                    type="date"
                                    placeholder={`${task?.dueDate || "Enter Due Date"}`}
                                    fieldName={"Due Date"}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {/* Display error message for due date field */}
                        <ErrorText text={errors?.dueDate?.message || ""} />
                    </div>
                    <div>
                        {/* Input field for priority level */}
                        <Controller
                            control={control}
                            name="priority"
                            render={({ field: { onChange } }) => (
                                <CustomInput
                                    type="text"
                                    placeholder={`${task?.priority || "Enter Priority Level"}`}
                                    fieldName={"Priority Level"}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {/* Display error message for priority field */}
                        <ErrorText text={errors?.priority?.message || ""} />
                    </div>
                </div>
                <div className='flex flex-row justify-between'>
                    <div>
                        {/* Input field for start time */}
                        <Controller
                            control={control}
                            name="startTime"
                            render={({ field: { onChange } }) => (
                                <CustomInput
                                    type="time"
                                    placeholder={`${task?.startTime}`}
                                    fieldName={"Start Time"}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {/* Display error message for start time field */}
                        <ErrorText text={errors?.startTime?.message || ""} />
                    </div>
                    <div>
                        {/* Input field for end time */}
                        <Controller
                            control={control}
                            name="endTime"
                            render={({ field: { onChange } }) => (
                                <CustomInput
                                    type="time"
                                    placeholder={`${task?.endTime}`}
                                    fieldName={"End Time"}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {/* Display error message for end time field */}
                        <ErrorText text={errors?.endTime?.message || ""} />
                    </div>
                </div>
                {/* Submit button */}
                <CustomButton loading={loading} text={buttonText} className="!mt-[2%]" />
                {/* Clear button */}
                <ClearRoundedIcon className="absolute top-[-29%] right-[-9%] text-[#fff] !h-[20px] !w-[20px] cursor-pointer text-[#fff] rounded-[50%] !bg-[#FF0000] max-sm:top-[-26.5%]" onClick={() => setAdd((add: any) => !add)} />
            </form>
        </div>
    )
}

export default AddTask
