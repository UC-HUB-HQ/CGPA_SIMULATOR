import {useState} from "react";
import deleteIcon  from '../assets/delete.svg'
const Calculator = () => { 

    const [totalNumberOfUnit, setTotalNumberOfUnit] = useState(null)
    const [totalCoursePoint, setTotalCoursePoint] = useState(null)
    const [cgpaValue, setCgpaValue] = useState(0)

    const rowElement = (index) => (
        <section key={index} className="grid w-full grid-cols-3 gap-2 mobile:grid-cols-2">
            <div className="flex items-center justify-center col-span-1 text-center ">
                <input type="text"  placeholder={`Course Code`} className="pb-2 text-center bg-transparent border-b-2 outline-none border-b-black-400 placeholder:text-center placeholder:text-black-400 mobile:w-[70%] " />
            </div>
            <div className="flex items-center justify-center col-span-2 text-center mobile:col-span-1 ">
                <div className="grid w-full grid-cols-2 gap-2 ">
                    <input type="number" placeholder="3" className="col-span-1 pb-2 text-center bg-transparent border-b-2 outline-none border-b-black-400 courseUnit text-black-300 w-[70%] mx-auto" max={5} /> 
                    <input type="number" placeholder="5" className="col-span-1 pb-2 text-center bg-transparent border-b-2 outline-none border-b-black-400 courseGrade text-black-300 w-[70%] mx-auto" max={5} />
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
        // 
        if(inputValidation()){
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
        
    }


    const inputValidation = () =>{
        const stayLiteInputField =  document.querySelectorAll('.stayliteInfo');
        // 
        const allStayLiteInputField = Array.from(stayLiteInputField).every(input => input.value !== "");
        // 
        const inputErrorMsg1 = document.querySelector('.inputErrorMsg1')
        stayLiteInputField.forEach( (stayLiteGradeInput) => {
            if(stayLiteGradeInput.value === ""){
                stayLiteGradeInput.classList.add('border-2')
                stayLiteGradeInput.classList.add('border-rose-500')
                inputErrorMsg1.innerHTML = 'No valid input given'

                setTimeout( () => {
                    stayLiteGradeInput.classList.remove('border-2')
                    stayLiteGradeInput.classList.remove('border-rose-500')  
                    inputErrorMsg1.innerHTML = ""
                }, 2200)
            }
        })


        const courseGrades = document.querySelectorAll('.courseGrade');
        const callCourseGrades = Array.from(courseGrades).every(input => input.value !== "" && input.value <= 5)

        courseGrades.forEach((courseGrade) => {
            if(courseGrade.value === ""){
                courseGrade.classList.add('border-2')
                courseGrade.classList.add('border-b-rose-500')

                setTimeout( () => {
                    courseGrade.classList.remove('border-2')
                    courseGrade.classList.remove('border-b-rose-500')  
                    inputErrorMsg1.innerHTML = ""
                }, 2200)
            }
            else if(courseGrade.value > 5){
                courseGrade.classList.add('border-2')
                courseGrade.classList.add('border-b-rose-500')

                setTimeout( () => {
                    courseGrade.classList.remove('border-2')
                    courseGrade.classList.remove('border-b-rose-500')  
                }, 2200)
            }
        })


        const courseUnits = document.querySelectorAll('.courseUnit');
        const callCourseUnits = Array.from(courseUnits).every(input => input.value !== "" && input.value <= 5)

        courseUnits.forEach((courseUnit) => {
            if(courseUnit.value === ""){
                courseUnit.classList.add('border-2')
                courseUnit.classList.add('border-b-rose-500')

                setTimeout( () => {
                    courseUnit.classList.remove('border-2')
                    courseUnit.classList.remove('border-b-rose-500')  
                }, 2200)
            }
        })

        return allStayLiteInputField && callCourseGrades && callCourseUnits
        
    }


    return (
        <section className="flex items-center justify-center px-24 py-8 mt-16 rounded-lg shadow-lg mobile:mt-1 md:shadow-none bg-black-calcBgColor md:px-12 mobile:px-5">
            <div className="w-full">
                <div>
                    <section className="additionalInfo">
                        <label className="font-bold inputErrorMsg1 text-rose-500 " htmlFor="CGPA"></label>
                        <div className="flex w-full gap-1 md:flex-col">
                            <input className=" stayliteInfo bg-[#FFFDFD] pl-4 outline-none w-full h-12 rounded-l-xl placeholder:text-primary-300 CGPA md:rounded-tr-xl md:rounded-tl-xl md:rounded-bl-none" id="CGPA" type="number" placeholder="Enter your current CGPA" />
                            <input className=" stayliteInfo bg-[#FFFDFD] pl-4 outline-none w-full h-12 rounded-r-xl placeholder:text-primary-300 TNU md:rounded-br-xl md:rounded-bl-xl md:rounded-tr-none" id="TNU" type="number" placeholder="Enter your total units for previous semesters" />
                        </div>
                        <p className="text-[#022150] text-[11px] ml-3">For fresh students, enter 0 for both.</p>
                    </section>
                    <main className="pt-10 ">
                        <section className="grid grid-cols-3 gap-2 w-[95%] mb-10">
                            <div className="col-span-1"><h2 className="text-xl font-semibold text-center mobile:text-base text-primary-200">Course</h2></div>
                            <div className="col-span-1"><h2 className="text-xl font-semibold text-center mobile:text-base text-primary-200">Course Units</h2></div>
                            <div className="col-span-1"><h2 className="text-xl font-semibold text-center mobile:text-base text-primary-200">Grade</h2></div>
                        </section>

                        <section className="w-full calculatorContainer">
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
                <div className="flex items-center justify-between px-32 py-8 mt-20 bg-white mobile:mt-10 mobile:px-16 rounded-xl">
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