import { useRef, useState} from "react";
import deleteIcon  from '../assets/delete.svg'
const Calculator = () => {

    const [totalNumberOfUnit, setTotalNumberOfUnit] = useState(null)
    const [totalCoursePoint, setTotalCoursePoint] = useState(null)
    const [cgpaValue, setCgpaValue] = useState(null)
    const rowContainerRef = useRef(null);

    const rowElement = (index) => (
        <section key={index} className="grid w-full grid-cols-3 ">
            <div className="flex items-center justify-center col-span-1 text-center ">
                <input type="text"  placeholder={`Course Code`} className="pb-2 text-center bg-transparent border-b-2 outline-none border-b-black-400 placeholder:text-center placeholder:text-black-400" />
            </div>
            <div className="flex items-center justify-center col-span-2 text-center ">
                <div className="grid w-full grid-cols-2 gap-2 ">
                    <input type="number" placeholder="3" className="col-span-1 pb-2 text-center bg-transparent border-b-2 outline-none border-b-black-400 courseGrade text-black-300 w-[70%] mx-auto" max={5} /> 
                    <input type="number" placeholder="5" className="col-span-1 pb-2 text-center bg-transparent border-b-2 outline-none border-b-black-400 courseUnit text-black-300 w-[70%] mx-auto" max={5} />
                </div>
            </div>
        </section>
    );

    const [rows, setRows] = useState([])

    const addRow = () => {
        setRows([...rows, rowElement(Math.random())])
    };

    const removeRow = (selectedRowKey) => {
        setRows(rows.filter(row => row.key !== selectedRowKey));
    };
      
    const getGpa = () => {
        var tnuCounter = 0;
        var tcpCounter = 0;
        document.querySelectorAll('.courseRows').forEach(courseRow => {
            tnuCounter = tnuCounter + parseInt(courseRow.firstChild.firstChild.lastChild.firstChild.firstChild.value);
            tcpCounter = tcpCounter + (parseInt(courseRow.firstChild.firstChild.lastChild.firstChild.firstChild.value) * parseInt(courseRow.firstChild.firstChild.lastChild.firstChild.lastElementChild.value))
        }) 
        
        setTotalNumberOfUnit(tnuCounter)
        setTotalCoursePoint(tcpCounter)

        const cgpa = document.querySelector('.CGPA');
        const totalNumberOfUnit = document.querySelector('.TNU');
        if(cgpa.value === 0){
            setCgpaValue((tcpCounter  / tnuCounter).toFixed(2))
        }
        else{
            const prevTNU = totalNumberOfUnit.value;
            const newTNU = parseInt(prevTNU) + tnuCounter
            const prevTCP = parseInt(prevTNU) * cgpa.value
            const newTCP = prevTCP + tcpCounter
            setCgpaValue((newTCP/ newTNU).toFixed(2))
        }
    }

    return (
        <section className="flex items-center justify-center px-24 py-8 mt-16 rounded-lg shadow-lg bg-black-calcBgColor">
            <div className="w-full ">
                <div>
                    <section className="additionalInfo">
                        <div className="flex w-full gap-1">
                            <input className=" bg-[#FFFDFD] pl-4 outline-none w-full h-12 rounded-l-xl placeholder:text-primary-300 CGPA" id="CGPA" type="number" placeholder="Enter your current CGPA" />
                            <input className=" bg-[#FFFDFD] pl-4 outline-none w-full h-12 rounded-r-xl placeholder:text-primary-300 TNU" id="TNU" type="number" placeholder="Enter your total units for previous semesters" />
                        </div>
                        <p className="text-[#022150] text-[11px] ml-3">For fresh students, enter 0 for both.</p>
                    </section>
                    <main className="pt-10 ">
                        <section className="grid grid-cols-3 gap-2 w-[95%] mb-10">
                            <div className="col-span-1"><h2 className="text-xl font-semibold text-center text-primary-200">Course</h2></div>
                            <div className="col-span-1"><h2 className="text-xl font-semibold text-center text-primary-200">Course Units</h2></div>
                            <div className="col-span-1"><h2 className="text-xl font-semibold text-center text-primary-200">Grade</h2></div>
                        </section>

                        <section className="w-full calculatorContainer" ref={rowContainerRef}>
                            {rows?.map( (row, index) => (
                                <div key={row.key} className={`courseRows flex justify-center items-center gap-2 mb-10 w-full`} id={`courseRow${index}`}>
                                    <div className="w-[95%] ">
                                        {row}
                                    </div>
                                    <div className="flex items-center justify-center col-span-1 text-center cursor-pointer ">
                                        <img onClick={() => removeRow(row.key)} data-id={row.key} className="w-6 h-6" src={deleteIcon} alt="Uc hub course delete icon" />
                                    </div>
                                </div>
                            ))}
                        </section>

                        <button className="w-full py-2 font-semibold text-center bg-primary-500 text-primary-400 rounded-xl" onClick={addRow}>+Add Course</button>
                        <button className="w-full py-2 mt-8 font-semibold text-center text-white bg-primary-100 rounded-xl" onClick={getGpa}>Get Score</button>
                    </main>
                </div>
                <div className="flex items-center justify-between px-32 py-8 mt-20 bg-white rounded-xl">
                    <h2 className="flex flex-col text-center text-black-200">
                        <span className="text-sm ">GPA</span>
                        <span className="text-5xl ">{totalCoursePoint ? (totalCoursePoint  / totalNumberOfUnit).toFixed(2): 0 }</span>
                    </h2>
                    <h2 className="flex flex-col text-center text-primary-600">
                        <span className="text-sm">CGPA</span>
                        <span className="text-5xl">{cgpaValue? cgpaValue : 0}</span>
                    </h2>
                </div>
            </div>
        </section>
    )
}

export default Calculator