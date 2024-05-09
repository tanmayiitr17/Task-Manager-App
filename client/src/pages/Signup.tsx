import { Controller, useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorText from '../components/ErrorText';
import CustomInput from '../components/CustomInput';
import { CustomButton } from '../components/CustomButton';
import { useState } from 'react';
import { signup } from '../api/authentication';
import { showError, showMessage } from '../utils/Notify';
import CheckBox from '../components/CheckBox';
import { useNavigate } from 'react-router-dom';

type LoginData = {
    username: string;
    password: string;
};

const schema = yup
    .object({
        username: yup
            .string()
            .required("Username is required!"),
        password: yup
            .string()
            .required("Password is required!")
            .min(6, "Password must be of 6 letters"),
    })
    .required();

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<LoginData> = async (data) => {
        setLoading(true);
        try {
            const res = await signup(data);
            if (res) {
                setLoading(false);
                showMessage("Registered in Successfully!")
            }
        } catch (err) {
            showError("Something went wrong.Try Again!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center ">
            <div className="shadow-[0px_7px_21px_rgba(0,0,0,0.4)] rounded-[10px] bg-[#fff] my-[7vw] mx-[5vw] w-[70vw]  max-sm:w-[90vw]">
                <div className="py-[25px] px-[30px] flex flex-col justify-center items-center">
                    <h1 className="text-center text-[30px] font-bold relative w-[max-content]
                         before:absolute before:inset-0 before:bg-white before:animate-typewriter  max-sm:text-[20px]">
                        <span className='text-center'>Welcome to <span className="text-[rgb(255,214,0)]">Task</span>-मैनेजर!</span>
                    </h1>
                    <div className="flex w-[100%] gap-[7%] max-sm:flex-col max-sm:gap-[15%]">
                        <div className="w-[100%]">
                            {/* <img src="https://nom.mathmaterate.com/static/media/loginillustration.761bdb873abee02c0aa0.png" alt="pic"
                                    className="w-[40vw] h-[50vh] max-sm:w-full max-sm:h-full"
                                /> */}
                        </div>
                        <div className="flex flex-col justify-center w-[100%]">
                            <h2 className="font-[500] text-[25px] border-b-[3px] border-b-solid border-b-[rgb(9,132,253)] w-[13%]  max-sm:w-[16%] max-sm:text-[20px]">Signup</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-[15px]">
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
                                <CustomButton loading={loading} text="Sign up"
                                    className="!mt-[2%]"
                                />
                            </form>
                            <div className="flex justify-between mt-[15px] text-[rgb(9,132,253)] max-sm:text-[15px] max-sm:font-[400]">
                                <span>Already Have Account?</span>
                                <span className="cursor-pointer hover:text-yellow-400" onClick={() => navigate("/login")}>Login Here</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup