import { Checkbox } from "@mui/material";
import { updateTask } from "../api/task";
import { showError, showMessage } from "../utils/Notify";

// CheckBox component with optional fieldName and task props
const CheckBox = ({
    fieldName = "",
    task = ""
}: {
    fieldName?: string;
    task?: any;
}) => {

    // Toggle the status of the task
    const status = !task?.status;
    // Get the task ID
    const id = task?._id;

    // Function to handle checkbox click
    const handleClick = async () => {
        try {
            // Prepare data to update task status
            const result = { status, id };
            // Update the task status
            const res = await updateTask(result);
            if (res) {
                showMessage("Task updated Successfully!")
            }
        } catch (err) {
            showError("Something went wrong.Try Again!");

        } finally {
            // Reload the window after 1.5 seconds
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        }
    }

    return (
        <div className="ml-[-10px] text-[#000] w-[100%] text-[12px] font-[400] leading-[22px]">
            {/* Checkbox to toggle task status */}
            <Checkbox className="!mb-[4px]" onClick={handleClick} defaultChecked={task?.status} /><span className="text-[#000] text-[14px] font-[500] leading-[22px]">{fieldName}</span>
        </div>
    );
};

export default CheckBox;
