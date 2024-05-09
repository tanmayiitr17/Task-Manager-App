
const Popup = ({ children }: { children: any }) => {
    return (
        <div className={`fixed top-0 left-0 right-0 bottom-0 h-[100vh] w-[100vw] flex items-center justify-center bg-[#12111191] !z-[100]`}>
            <div className="flex flex-col items-center justify-center min-h-[35vh] w-[340px] text-[#454545] font-[500] bg-[#fff] rounded-[6px] !z-50 shadow-lg">
                {children}
            </div>
        </div>
    );
};

export default Popup;
