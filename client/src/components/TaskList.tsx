import CheckBox from "./CheckBox";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { useState } from "react";
import Popup from "./Popup";
import AddTask from "./AddTask";
import { deleteTask } from "../api/task";
import { showError, showMessage } from "../utils/Notify";
import { formatDate } from "../utils/DateFormat";

interface TaskProps {
    task?: any;
}

const TaskList = ({ task }: TaskProps) => {
    // State to manage the visibility of the edit task popup
    const [add, setAdd] = useState(false);

    // Function to handle toggling of the edit task popup
    const handleEdit = () => {
        setAdd(add => !add);
    }

    // Function to handle task deletion
    const handleDelete = async () => {
        try {
            // Attempt to delete the task
            const res = await deleteTask(task?._id);
            if (res) {
                // Show success message if deletion is successful
                showMessage(`Task-${task?.title} deleted successfully!`)
            }
        } catch (err) {
            // Show error message if deletion fails
            showError("Something went wrong.Try Again!");
        } finally {
            // Reload the page after a delay
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    }

    return (
        <div className="flex flex-row items-center gap-[15px] mx-[10%] mb-[2%] max-sm:mx-[0%] max-sm:gap-[0px] max-sm:mb-[7%]">
            {/* Render the edit task popup if 'add' state is true */}
            {add &&
                <Popup>
                    <AddTask setAdd={setAdd} text="Edit Task" buttonText="edit a task" task={task} />
                </Popup>
            }
            {/* Checkbox to mark task as complete */}
            <div><CheckBox task={task} /></div>
            {/* Display due date */}
            <div className="font-[400] text-[#808080] text-[14px] max-sm:text-[10px] max-sm:mr-[7px]">{formatDate(task?.dueDate)}</div>
            {/* Task details container */}
            <div className={`flex flex-col border-solid rounded-[10px] w-[70%] pl-[20px] py-[5px] font-[400] shadow-lg relative ${task?.status == true ? "bg-[rgb(9,132,253)] text-[#fff]" : ""}`}>
                {/* Title and priority */}
                <div className="flex gap-[20%]">
                    <span className="pl-[10%] max-sm:pl-[7%]">{task?.title}</span>
                    <span
                        className={`font-[400] text-[12px] absolute top-[20%] right-[35%] max-sm:right-[17%]
                        ${task?.priority == "high" && "text-[#00FF00]"}
                        ${task?.priority == "low" && "text-[#FF0000]"}
                        ${task?.priority == "medium" && "text-[rgb(255,214,0)]"}
                        ${task?.status == true ? "!text-[#fff]" : ""}
                    `}>
                        {task?.priority}
                    </span>
                </div>
                {/* Time range */}
                <span className="text-[10px] pl-[10%] max-sm:pl-[7%]">{task?.startTime} - {task?.endTime}</span>
                {/* Edit and delete icons */}
                <EditNoteRoundedIcon className="absolute top-[20%] left-[3%] !h-[20px] !w-[20px] cursor-pointer rounded-[50%]" onClick={handleEdit} />
                <ClearRoundedIcon className="absolute top-[-20%] right-[-1.5%] text-[#fff] !h-[17px] !w-[17px] cursor-pointer text-[#fff] rounded-[50%] !bg-[#FF0000]" onClick={handleDelete} />
            </div>
        </div >
    )
}

export default TaskList;
