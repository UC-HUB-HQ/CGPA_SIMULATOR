import {useState, useEffect} from "react";
import deleteIcon from '../assets/delete.svg';
import Modal from "./Modal";
import FileUpload from "./FileUpload";
import StudentInfoForm from "./StudentInfoForm";

const Calculator = ({handleScore}) => { 

    const [totalNumberOfUnit, setTotalNumberOfUnit] = useState(null);

    const [totalCoursePoint, setTotalCoursePoint] = useState(null);

    const [cgpaValue, setCgpaValue] = useState(0);

    const [studentCourses, setStudentCourse] = useState([]);

    const [getStudentInfo, setGetStudentInfo] = useState(false);

    const [displayFileUpload, setDisplayFileUpload] = useState(false)
    
    const [result, setResult] = useState({
      cgpa: 0,
      confidence: 0,
      department: "",
      faculty: "",
      inferred_current_level: "",
      total_units_registered_ctnu: 0,
    });
  
    const rowElement = (index, courseCode, Unit) => (
      <section
        key={index}
        className="grid w-full grid-cols-3 gap-2 mobile:grid-cols-3"
      >
        <div className="flex items-center justify-center col-span-1 text-center mobile:col-span-1 ">
          <input
            type="text"
            value={courseCode ? courseCode : undefined}
            placeholder={`GNS 101`}
            className="pb-2 text-center bg-transparent border-b-2 border-transparent outline-none border-b-black-400 placeholder:text-center placeholder:text-black-400 mobile:w-full placeholder:text-xs"
          />
        </div>
        <div className="flex items-center justify-center col-span-2 text-center mobile:col-span-2 ">
          <div className="grid w-full grid-cols-2 gap-0 mobile:grid-cols-3 ">
            <input
              type="number"
              value={Unit ? Unit : undefined}
              placeholder="3"
              className="col-span-1 mobile:col-span-2 pb-2 text-center bg-transparent border-b-2 outline-none border-transparent border-b-black-400 courseUnit text-black-300 w-[70%] mobile:w-[70%] mx-auto placeholder:text-center placeholder:text-xs"
              min={0}
            />
            <input
              type="number"
              placeholder="5"
              className="col-span-1 mobile:col-span-1 pb-2 text-center bg-transparent border-b-2 outline-none border-transparent border-b-black-400 courseGrade text-black-300 w-[70%] mobile:w-[70%] mx-auto placeholder:text-center placeholder:text-xs"
              max={5}
              min={0}
            />
          </div>
        </div>
      </section>
    );

    const [rows, setRows] = useState([])

    useEffect(() => {
        if (studentCourses.length >= 1) {
            const rowCourses = []
            studentCourses.forEach((course) => {
                rowCourses.push(
                  rowElement(
                    Math.random(),
                    course.course_code,
                    course.course_unit
                  )
                );
            })

            setRows((rows) => {
                return [...rows, ...rowCourses];
            })
        }
    }, [studentCourses])

    useEffect(() => {
      setDisplayFileUpload(true);
    }, [])

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
                handleScore((newTCP/ newTNU).toFixed(2))
            }

            window.location.href = "#scoreDisplaySection"
        }
        
    }

    const inputValidation = () =>{
        const stayLiteInputField =  document.querySelectorAll('.stayliteInfo');
        // 
        const allStayLiteInputField = Array.from(stayLiteInputField).every(input => input.value !== "" && input.value >= 0);
        // 
        const inputErrorMsg1 = document.querySelector('.inputErrorMsg1')
        stayLiteInputField.forEach( (stayLiteGradeInput) => {
            if(stayLiteGradeInput.value === "" || stayLiteGradeInput.value < 0){
                stayLiteGradeInput.classList.add('border-2')
                stayLiteGradeInput.classList.add('border-rose-500')
                inputErrorMsg1.innerHTML = 'No valid input given'
                window.location.href = "#inputErrorMsg1"

                setTimeout( () => {
                    stayLiteGradeInput.classList.remove('border-2')
                    stayLiteGradeInput.classList.remove('border-rose-500')  
                    inputErrorMsg1.innerHTML = ""
                }, 2200)
            }
        })


        const courseGrades = document.querySelectorAll('.courseGrade');

        const callCourseGrades = Array.from(courseGrades).every(input => input.value !== "" && input.value <= 5 && input.value >= 0)

        courseGrades.forEach((courseGrade) => {
            if(courseGrade.value === "" || courseGrade.value > 5 || courseGrade.value < 0){
                courseGrade.classList.add('border-2')
                courseGrade.classList.add('border-b-rose-500')

                setTimeout( () => {
                    courseGrade.classList.remove('border-2')
                    courseGrade.classList.remove('border-b-rose-500')  
                }, 2200)
            }
        })


        const courseUnits = document.querySelectorAll('.courseUnit');
        const callCourseUnits = Array.from(courseUnits).every(input => input.value !== "")

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
    
    const closeModal = () => {
      setGetStudentInfo(false);
      setDisplayFileUpload(false)
    }

    const displayStudentInfoForm = () => {
      setGetStudentInfo(true);
      setDisplayFileUpload(false);
    };

    return (
      <section className="flex items-center justify-center px-24 py-8 mt-16 rounded-lg shadow-lg mobile:mt-1 md:shadow-none bg-black-calcBgColor md:px-12 mobile:px-5 ">
        <div className="w-full">
          <div>
            <section id="inputErrorMsg1" className="additionalInfo">
              <label
                className="font-bold inputErrorMsg1 text-rose-600"
                htmlFor="CGPA"
              ></label>
              <div className="flex w-full gap-1 md:flex-col">
                <input
                  className=" stayliteInfo bg-[#FFFDFD] pl-4 outline-none w-full h-12 rounded-l-xl placeholder:text-primary-300 CGPA md:rounded-tr-xl md:rounded-tl-xl md:rounded-bl-none mobile:placeholder:text-xs"
                  id="CGPA"
                  type="number"
                  placeholder="Enter your current CGPA"
                  min={0}
                  max={5}
                  value={result.cgpa}
                  onChange={(e) =>
                    setResult((prev) => ({
                      ...prev,
                      ...{ cgpa: e.target.value },
                    }))
                  }
                />
                <input
                  className=" stayliteInfo bg-[#FFFDFD] pl-4 outline-none w-full h-12 rounded-r-xl placeholder:text-primary-300 TNU md:rounded-br-xl md:rounded-bl-xl md:rounded-tr-none mobile:placeholder:text-xs"
                  id="TNU"
                  type="number"
                  placeholder="Enter your total units for previous semesters"
                  min={0}
                  value={result.total_units_registered_ctnu}
                  onChange={(e) =>
                    setResult((prev) => ({
                      ...prev,
                      ...{ total_units_registered_ctnu: e.target.value },
                    }))
                  }
                />
              </div>
              <p className="text-[#022150] text-[11px] ml-3">
                For fresh students, enter 0 for both.
              </p>
            </section>
            <main className="pt-10 ">
              <section className="grid grid-cols-3 gap-2 w-[95%] mb-10">
                <div className="col-span-1">
                  <h2 className="text-xl font-semibold text-center mobile:text-sm text-primary-200">
                    Course
                  </h2>
                </div>
                <div className="col-span-1">
                  <h2 className="text-xl font-semibold text-center mobile:text-sm text-primary-200">
                    Course Units
                  </h2>
                </div>
                <div className="col-span-1">
                  <h2 className="text-xl font-semibold text-center mobile:text-sm text-primary-200">
                    Grade
                  </h2>
                </div>
              </section>

              <section
                id="calculatorContainer"
                className="w-full calculatorContainer"
              >
                {rows?.map((row, index) => (
                  <div
                    key={row.key}
                    className={`courseRows flex justify-center items-center gap-2 mb-10 w-full`}
                    id={`courseRow${index}`}
                  >
                    <div className="w-[95%]">{row}</div>
                    <div className="flex items-center justify-center col-span-1 text-center cursor-pointer ">
                      <img
                        onClick={() => removeRow(row.key)}
                        data-id={row.key}
                        className="w-6 h-6"
                        src={deleteIcon}
                        alt="Uc hub course delete icon"
                      />
                    </div>
                  </div>
                ))}
              </section>

              <button
                className="w-full py-2 font-semibold text-center outline-none bg-primary-500 text-primary-400 rounded-xl"
                onClick={addRow}
              >
                +Add Course
              </button>
              <button
                className="w-full py-2 mt-8 font-semibold text-center text-white outline-none bg-primary-100 rounded-xl"
                onClick={getGpa}
              >
                Get Score
              </button>
            </main>
          </div>

          <div
            id="scoreDisplaySection"
            className="flex items-center justify-between px-32 py-8 mt-20 bg-white mobile:mt-10 mobile:px-4 rounded-xl mobile:justify-center mobile:gap-20"
          >
            <h2 className="flex flex-col text-center text-black-200 ">
              <span className="text-sm ">GPA</span>
              <span className="text-5xl mobile:text-4xl ">
                {totalCoursePoint
                  ? (totalCoursePoint / totalNumberOfUnit).toFixed(2)
                  : 0}
              </span>
            </h2>
            <h2 className="flex flex-col text-center text-primary-600 ">
              <span className="text-sm">CGPA</span>
              <span className="text-5xl mobile:text-4xl">
                {cgpaValue ? cgpaValue : 0}
              </span>
            </h2>
          </div>
        </div>

        <div>
          <Modal
            isOpen={getStudentInfo || displayFileUpload}
            onClose={() => closeModal()}
          >
            {getStudentInfo && (
              <StudentInfoForm
                setStudentCourse={setStudentCourse}
                onClose={() => closeModal()}
              />
            )}

            {displayFileUpload && (
              <FileUpload
                setResult={setResult}
                onClose={() => closeModal()}
                setStudentCourse={setStudentCourse}
                displayStudentInfoForm={displayStudentInfoForm}
              />
            )}
          </Modal>
        </div>
      </section>
    );


}

export default Calculator