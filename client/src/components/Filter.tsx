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

type FilterData = {
    title: string;
    dueDate: string;
    priority: string;
    description: string;
};

interface FilterProps {
    setFilter?: any;
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
        description: yup
            .string()
            .required("Description is required!"),
    })
    .required();

const Filter = ({ setFilter }: FilterProps) => {

    const [loading, setLoading] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FilterData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FilterData> = async (data) => {
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
                <CustomButton loading={loading} text="Filter task" className="!mt-[2%]" />
                <ClearRoundedIcon className="absolute top-[-28.5%] right-[-8.5%] text-[#fff] !h-[20px] !w-[20px] cursor-pointer text-[#fff] rounded-[50%] !bg-[#FF0000]" onClick={() => setFilter((filter: any) => !filter)} />
            </form>
        </div>
    )
}

export default Filter