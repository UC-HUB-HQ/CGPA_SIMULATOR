import { faculties } from "./constant"

export const extractLasuCourseApiPayload = (argData) => {

    const facultyInfo = Object.entries(faculties).find(([_, data]) => {
        return argData.faculty === data.facultyName;
    });

    const facultyCode = facultyInfo[0] ?? null;
        
    if(!facultyCode){
      throw new Error("Your faculty isn't available, please proceed to enter your courses manually.")
    };
    
    const departments = facultyInfo[1].departments ?? null;
        
    const departmentCode = Object.entries(departments).find(
      ([_, department]) => department === argData.department
    )
    
    if (!departmentCode) {
      throw new Error(
        "Your department isn't available, please proceed to enter your courses manually."
      );
    };
    
    const response = {
      facultyCode,
      departmentCode: departmentCode[0],
      level: argData.inferred_current_level,
    };

    return response;
};

