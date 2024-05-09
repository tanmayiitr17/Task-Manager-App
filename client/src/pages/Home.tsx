import CustomInput from "../components/CustomInput";
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { formatDate } from "../utils/DateFormat";
import TaskList from "../components/TaskList";
import { useState } from "react";
import Popup from "../components/Popup";
import AddTask from "../components/AddTask";
import Filter from "../components/Filter";



const Home = () => {
    const todayDate = new Date();
    const [add, setAdd] = useState(false);
    const [filter, setFilter] = useState(false);

    const handleAddTask = () => {
        setAdd(add => !add);
    }

    const handleFilter = () => {
        setFilter(filter => !filter);
    }

    return (
        <div className="flex flex-col mx-[1%]">
            {add &&
                <Popup>
                    <AddTask setAdd={setAdd} text="New Task" buttonText="Create a new task" />
                </Popup>
            }
            {filter &&
                <Popup>
                    <Filter setFilter={setFilter} />
                </Popup>
            }
            <div className="flex flex-col ml-[15%] my-[20px]">
                <span className="text-[20px] font-[600] leading-1">Hello Tanmay</span>
                <span className="font-[400] text-[#808080] text-[14px] leading-none">{formatDate(todayDate)}</span>
            </div>
            <form className="flex flex-row gap-[2%] w-[70%] justify-center items-center mx-[15%]">
                <CustomInput placeholder="Find your task" />
                <SortRoundedIcon
                    className="!w-[5vw] !h-[5vh] cursor-pointer"
                    onClick={handleFilter}
                />
            </form>
            <div className="flex flex-col justify-center mx-[15%] mt-[3%]">
                <div className="flex justify-between mb-[2%] text-[17px] font-[500]">
                    <div >My Tasks <span className="text-[#808080] font-[600] text-[15px]">(5)</span></div>
                    <div className="flex justify-center">Add Task
                        <AddCircleRoundedIcon
                            className="!mx-[5px] !text-[rgb(9,132,253)] rounded-[50%] cursor-pointer !h-[19px] !w-[19px] mt-[3px]"
                            onClick={handleAddTask}
                        /></div>
                </div>
                <TaskList />
                <TaskList />
                <TaskList />
                <TaskList />
            </div>
        </div >
    )
}

export default Home