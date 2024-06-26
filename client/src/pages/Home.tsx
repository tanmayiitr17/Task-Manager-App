import CustomSearch from "../components/CustomSearch";
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { CircularProgress } from "@mui/material";
import { formatDate } from "../utils/DateFormat";
import TaskList from "../components/TaskList";
import { useEffect, useState } from "react";
import Popup from "../components/Popup";
import AddTask from "../components/AddTask";
import Filter from "../components/Filter";
import { getAllTasks } from "../api/task";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/taskSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [searchTask, setSearchTask] = useState<any>();
    const [filterTask, setFilterTask] = useState<any>();
    const todayDate = new Date();
    const [add, setAdd] = useState(false);
    const [filter, setFilter] = useState(false);
    const userId = useSelector((state: any) => state?.user?.currentUser?._id)
    const username = useSelector((state: any) => state?.user?.currentUser?.username)
    const tasks = useSelector((state: any) => state?.task?.tasks)
    const quantity = useSelector((state: any) => state?.task?.tasks.length) || 0;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch tasks on component mount
    useEffect(() => {
        setLoading(true);
        const getTasks = async () => {
            try {
                const res = await getAllTasks(userId);
                if (res) {
                    dispatch(addTask(res));
                }
            } catch (err) {
                // Handle error
            } finally {
                setLoading(false);
            }
        }
        getTasks();
    }, [])

    let finalTasks: any;

    // Merge search and filter results, removing duplicates
    if (searchTask && filterTask) {
        finalTasks = searchTask.concat(filterTask);
        finalTasks = finalTasks.filter((task: any, index: any) => finalTasks.indexOf(task) === index);
    } else {
        finalTasks = searchTask || filterTask || tasks;
    }

    // Toggle add task popup
    const handleAddTask = () => {
        userId ? setAdd(add => !add) : navigate("/login");
    }

    // Toggle filter popup
    const handleFilter = () => {
        userId ? setFilter(filter => !filter) : navigate("/login");
    }

    return (
        <div className="flex flex-col mx-[1%]">
            {loading &&
                <Popup>
                    <CircularProgress className="!w-[30px] !h-[30px] !mb-[12px] !text-[rgb(255,214,0)]" />
                    <h5>Hold on, loading your tasks...</h5>
                </Popup>
            }
            {add &&
                <Popup>
                    <AddTask setAdd={setAdd} text="New Task" buttonText="Create a new task" />
                </Popup>
            }
            {filter &&
                <Popup>
                    <Filter setFilter={setFilter} setFilterTask={setFilterTask} />
                </Popup>
            }
            <div className="flex flex-col ml-[15%] my-[20px] max-sm:ml-[5%] ">
                {/* User Greeting */}
                <span className="text-[20px] font-[600] leading-1 max-sm:text-[18px]">HELLO {username ? username.toUpperCase() : "XYZ"}</span>
                <span className="font-[400] text-[#808080] text-[14px] leading-none max-sm:text-[12px]">{formatDate(todayDate)}</span>
            </div>
            {/* Search and Sort Section */}
            <form className="flex flex-row gap-[2%] w-[70%] justify-center items-center mx-[15%] max-sm:w-[90%] max-sm:mx-[5%] max-sm:gap-[7%]">
                <CustomSearch placeholder="Find your task" setSearchTask={setSearchTask} />
                <SortRoundedIcon
                    className="!w-[5vw] !h-[5vh] cursor-pointer max-sm:!h-[7vh] !w-[8vw]"
                    onClick={handleFilter}
                />
            </form>
            <div className="flex flex-col justify-center mx-[15%] mt-[3%] max-sm:mx-[5%] max-sm:mt-[5%]">
                {/* My Tasks Section */}
                <div className="flex justify-between mb-[2%] text-[17px] font-[500] max-sm:text-[15px] max-sm:mb-[7%]">
                    <div >My Tasks <span className="text-[#808080] font-[600] text-[15px]">({quantity})</span></div>
                    <div className="flex justify-center">Add Task
                        <AddCircleRoundedIcon
                            className="!mx-[5px] !text-[rgb(9,132,253)] rounded-[50%] cursor-pointer !h-[22px] !w-[22px] mt-[2px] max-sm:mt-[0px]"
                            onClick={handleAddTask}
                        /></div>
                </div>
                {/* Task List */}
                {finalTasks && finalTasks?.map((task: any, index: any) => (
                    <TaskList task={task} key={index} />
                ))}
            </div>
        </div >
    )
}

export default Home;
