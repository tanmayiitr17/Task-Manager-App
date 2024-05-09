
const About = () => {
    return (
        <div className="mx-[15%] ">
            <h2 className="font-[600] text-[25px] mx-auto my-[3%] border-b-[3px] border-b-solid border-b-[rgb(9,132,253)] w-[10%]  max-sm:w-[17%] max-sm:text-[20px]">About Us</h2>
            <div className="flex justify-between">
                <div className="w-[45%]">
                    <img src="https://tanmayiitr.netlify.app/photo.jpeg" className="!w-[28vw] !h-[75vh] rounded-[10px]" />
                </div>
                <div className="w-[45%] my-[5%]">
                    <h2 className="font-[500] text-[20px] mx-auto my-[5%] border-b-[3px] border-b-solid border-b-[rgb(9,132,253)] w-[20%]  max-sm:w-[17%] max-sm:text-[15px]">Task-मैनेजर</h2>
                    <b>Task-मैनेजर</b> is a web application empowering users to efficiently manage tasks based on priority.<br /> With capabilities to create, read, edit, and delete tasks, users can seamlessly organize their schedules.<br /> Each task can be assigned a date, priority level, and time slot, optimizing productivity.<br /> Leveraging the MERN stack with Redux Toolkit, Task-मैनेजर offers a robust and intuitive interface.<br /> Developed by <b>Tanmay Pandey</b>, an undergraduate at <b>IIT Roorkee</b>, this application amalgamates cutting-edge technology with user-centric design, providing a seamless task management experience for individuals striving for enhanced productivity and organization.
                </div>
            </div>
        </div>
    )
}

export default About