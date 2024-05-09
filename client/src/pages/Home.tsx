import CustomSearch from "../components/CustomSearch";
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
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

    useEffect(() => {
        setLoading(true);
        const getTasks = async () => {
            try {
                const res = await getAllTasks(userId);
                if (res) {
                    dispatch(addTask(res));
                }
            } catch (err) {

            } finally {
                setLoading(false);
            }
        }
        getTasks();
    }, [])

    let finalTasks: any;

    if (searchTask && filterTask) {
        finalTasks = searchTask.concat(filterTask);
        // Filter out duplicate tasks
        finalTasks = finalTasks.filter((task: any, index: any) => finalTasks.indexOf(task) === index);
    } else {
        finalTasks = searchTask || filterTask || tasks;
    }



    const handleAddTask = () => {
        userId ? setAdd(add => !add) : navigate("/login");
    }

    const handleFilter = () => {
        userId ? setFilter(filter => !filter) : navigate("/login");
    }

    return (
        <div className="flex flex-col mx-[1%]">
            {loading &&
                <Popup>
                    <h5>Hold on, loading your tasks!</h5>
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
                <span className="text-[20px] font-[600] leading-1 max-sm:text-[18px]">HELLO {username ? username.toUpperCase() : "XYZ"}</span>
                <span className="font-[400] text-[#808080] text-[14px] leading-none max-sm:text-[12px]">{formatDate(todayDate)}</span>
            </div>
            <form className="flex flex-row gap-[2%] w-[70%] justify-center items-center mx-[15%] max-sm:w-[90%] max-sm:mx-[5%] max-sm:gap-[7%]">
                <CustomSearch placeholder="Find your task" setSearchTask={setSearchTask} />
                <SortRoundedIcon
                    className="!w-[5vw] !h-[5vh] cursor-pointer max-sm:!h-[7vh] !w-[8vw]"
                    onClick={handleFilter}
                />
            </form>
            <div className="flex flex-col justify-center mx-[15%] mt-[3%] max-sm:mx-[5%] max-sm:mt-[5%]">
                <div className="flex justify-between mb-[2%] text-[17px] font-[500] max-sm:text-[15px] max-sm:mb-[7%]">
                    <div >My Tasks <span className="text-[#808080] font-[600] text-[15px]">({quantity})</span></div>
                    <div className="flex justify-center">Add Task
                        <AddCircleRoundedIcon
                            className="!mx-[5px] !text-[rgb(9,132,253)] rounded-[50%] cursor-pointer !h-[19px] !w-[19px] mt-[3px] max-sm:!h-[17px] !w-[17px]"
                            onClick={handleAddTask}
                        /></div>
                </div>
                {finalTasks && finalTasks?.map((task: any, index: any) => (
                    <TaskList task={task} key={index} />
                ))}
            </div>
        </div >
    )
}

export default Home