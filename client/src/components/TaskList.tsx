import CheckBox from "./CheckBox"
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import { useState } from "react";
import Popup from "./Popup";
import AddTask from "./AddTask";

interface TaskProps {
    task?: any;
}

const TaskList = ({ task }: TaskProps) => {
    const [add, setAdd] = useState(false);

    const handleEdit = () => {
        setAdd(add => !add);
    }

    const handleDelete = async () => {
        try {

        } catch (err) {

        }
    }

    return (
        <div className="flex flex-row items-center gap-[15px] mx-[10%] my-[2%]">
            {add &&
                <Popup>
                    <AddTask setAdd={setAdd} text="Edit Task" buttonText="edit a task" />
                </Popup>
            }
            <div><CheckBox /></div>
            <div className="font-[400] text-[#808080] text-[14px]">9 May 2024</div>
            <div className={`flex flex-col border-solid rounded-[10px] w-[70%] pl-[20px] py-[5px] font-[400] shadow-lg relative ${task?.status == "done" ? "bg-[rgb(9,132,253)] text - [#fff]" : ""}`}>
                <div className="flex gap-[20%]">
                    <span>Reading Book</span>
                    <span
                        className={`font-[400] text-[#808080] text-[12px]
                        ${task?.priority == "high" && "text-[#013220]"}
                        ${task?.priority == "low" && "text-[#FF0000]"}
                        ${task?.priority == "medium" && "text-[rgb(255,214,0)]"}
                    `}>
                        Priority-{task?.priority}
                    </span>
                </div>
                <span className="text-[10px]">8:00 - 11:00 am</span>
                <EditNoteRoundedIcon className="absolute top-[20%] left-[24%] !h-[20px] !w-[20px] cursor-pointer rounded-[50%]" onClick={handleEdit} />
                <ClearRoundedIcon className="absolute top-[-20%] right-[-1.5%] text-[#fff] !h-[17px] !w-[17px] cursor-pointer text-[#fff] rounded-[50%] !bg-[#FF0000]" onClick={handleDelete} />
            </div>
        </div >
    )
}

export default TaskList