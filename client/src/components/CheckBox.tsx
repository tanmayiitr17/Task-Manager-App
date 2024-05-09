import { Checkbox } from "@mui/material";
import { updateTask } from "../api/task";
import { showError, showMessage } from "../utils/Notify";
import { useState } from "react";

const CheckBox = ({
    fieldName = "",
    task = ""
}: {
    fieldName?: string;
    task?: any;
}) => {

    const status = !task?.status;
    const id = task?._id;
    const handleClick = async () => {
        try {
            const result = { status, id };
            const res = await updateTask(result);
            if (res) {
                showMessage("Task updated Successfully!")
            }
        } catch (err) {
            showError("Something went wrong.Try Again!");

        } finally {
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }
    
    return (
        <div className="ml-[-10px] text-[#000] w-[100%] text-[12px] font-[400] leading-[22px]">
            <Checkbox className="!mb-[4px]" onClick={handleClick} defaultChecked={task?.status} /><span className="text-[#000] text-[14px] font-[500] leading-[22px]">{fieldName}</span>
        </div>
    );
};

export default CheckBox;
