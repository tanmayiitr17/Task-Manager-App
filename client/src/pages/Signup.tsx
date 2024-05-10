import { Controller, useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorText from '../components/ErrorText';
import CustomInput from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useState } from 'react';
import { signup } from '../api/authentication';
import { showError, showMessage } from '../utils/Notify';
import { useNavigate } from 'react-router-dom';

type LoginData = {
    username: string;
    password: string;
};

// Validation schema using Yup
const schema = yup
    .object({
        username: yup
            .string()
            .required("Username is required!"),
        password: yup
            .string()
            .required("Password is required!")
            .min(6, "Password must be at least 6 characters"),
    })
    .required();

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // React Hook Form setup
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: yupResolver(schema),
    });

    // Form submission handler
    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        setLoading(true);
        try {
            const res = await signup(data);
            if (res) {
                setLoading(false);
                showMessage("User Registered Successfully!")
                navigate("/login");
            }
        } catch (err) {
            showError("Something went wrong. Try Again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="shadow-[0px_7px_21px_rgba(0,0,0,0.4)] rounded-[10px] bg-[#fff] my-[7vw] mx-[5vw] w-[70vw]  max-sm:w-[90vw]">
                <div className="py-[25px] px-[30px] flex flex-col justify-center items-center">
                    {/* Application Title */}
                    <h1 className="text-center text-[30px] font-bold relative w-[max-content]
                         before:absolute before:inset-0 before:bg-white before:animate-typewriter  max-sm:text-[20px]">
                        <span className='text-center'>Welcome to <span className="text-[rgb(255,214,0)]">Task</span>-मैनेजर!</span>
                    </h1>
                    {/* Form Section */}
                    <div className="flex w-[100%] gap-[7%] max-sm:flex-col max-sm:gap-[15%]">
                        {/* Image Section */}
                        <div className="w-[100%]">
                            <img src="https://timeclock365.com/wp-content/uploads/2020/08/TASKS-TRACKING.jpg" alt="pic"
                                className="rounded-[10px] mt-[3vh] w-[35vw] h-[45vh] max-sm:w-full max-sm:h-[25vh]"
                            />
                        </div>
                        {/* Form Content */}
                        <div className="flex flex-col justify-center w-[100%]">
                            {/* Form Title */}
                            <h2 className="font-[500] text-[25px] border-b-[3px] border-b-solid border-b-[rgb(9,132,253)] w-[13%]  max-sm:w-[16%] max-sm:text-[20px]">Signup</h2>
                            {/* Signup Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-[15px]">
                                {/* Username Input */}
                                <div>
                                    <Controller
                                        control={control}
                                        name="username"
                                        render={({ field: { onChange } }) => (
                                            <CustomInput
                                                type="string"
                                                placeholder="Enter Username"
                                                fieldName="Username"
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    <ErrorText text={errors?.username?.message || ""} />
                                </div>
                                {/* Password Input */}
                                <div>
                                    <Controller
                                        control={control}
                                        name="password"
                                        render={({ field: { onChange } }) => (
                                            <CustomInput
                                                placeholder="Enter Password"
                                                fieldName={"Password"}
                                                onChange={onChange}
                                            />
                                        )}
                                    />
                                    <ErrorText text={errors?.password?.message || ""} />
                                </div>
                                {/* Signup Button */}
                                <CustomButton loading={loading} text="Sign up" className="!mt-[2%]" />
                            </form>
                            {/* Additional Links */}
                            <div className="flex justify-between mt-[15px] text-[rgb(9,132,253)] max-sm:text-[15px] max-sm:font-[400]">
                                <span>Already Have an Account?</span>
                                {/* Link to Login Page */}
                                <span className="cursor-pointer hover:text-yellow-400" onClick={() => navigate("/login")}>Login Here</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;
