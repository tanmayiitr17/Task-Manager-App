import { CustomButton } from './CustomButton'
import ErrorText from './ErrorText'
import CustomInput from './CustomInput';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { showError, showMessage } from '../utils/Notify';
import { login } from '../api/authentication';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

type AddTaskData = {
    title: string;
    dueDate: string;
    priority: string;
    startTime: string;
    endTime: string;
    description: string;
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
        description: yup
            .string()
            .required("Description is required!"),
    })
    .required();

const AddTask = ({ setAdd, text, task, buttonText }: AddTaskProps) => {

    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<AddTaskData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<AddTaskData> = async (data) => {
        setLoading(true);
        try {
            const res = await login(data);
            if (res) {
                setLoading(false);
                showMessage("Task created Successfully!")
            }
        } catch (err) {
            showError("Something went wrong.Try Again!");

        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex flex-col justify-center w-[100%] px-[5%] my-[5%]">
            <h2 className="font-[500] text-center text-[25px] border-b-[3px] border-b-solid border-b-[rgb(9,132,253)] w-[40%]  max-sm:w-[30%] max-sm:text-[20px] mx-auto">{text}</h2>
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
                <div className='flex flex-row justify-between'>
                    <div>
                        <Controller
                            control={control}
                            name="startTime"
                            render={({ field: { onChange } }) => (
                                <CustomInput
                                    type="time"
                                    placeholder="Enter Start Time"
                                    fieldName={"Start Time"}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <ErrorText text={errors?.startTime?.message || ""} />
                    </div>
                    <div>
                        <Controller
                            control={control}
                            name="endTime"
                            render={({ field: { onChange } }) => (
                                <CustomInput
                                    type="time"
                                    placeholder="Enter End Time"
                                    fieldName={"End Time"}
                                    onChange={onChange}
                                />
                            )}
                        />
                        <ErrorText text={errors?.endTime?.message || ""} />
                    </div>
                </div>
                <div>
                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange } }) => (
                            <CustomInput
                                placeholder="Enter Description"
                                fieldName={"Description"}
                                onChange={onChange}
                            />
                        )}
                    />
                    <ErrorText text={errors?.description?.message || ""} />
                </div>
                <CustomButton loading={loading} text={buttonText} className="!mt-[2%]" />
                <ClearRoundedIcon className="absolute top-[-22%] right-[-9%] text-[#fff] !h-[20px] !w-[20px] cursor-pointer text-[#fff] rounded-[50%] !bg-[#FF0000]" onClick={() => setAdd((add: any) => !add)} />
            </form>
        </div>
    )
}

export default AddTask