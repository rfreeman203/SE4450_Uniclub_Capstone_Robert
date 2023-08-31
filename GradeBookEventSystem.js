import  Axios  from "axios";

//gets classes2.json through query over courses
export const getRequiredCourses = async () =>{
    let Courses = await Axios.get('http://localhost:5000/getJSON_INFO?id=courses');
    if(Courses){
     return Courses.data;
    }else {
        return [];
    }
}

//rewrites classes2.json to have updated courses list
export const updateCourse = async (values) =>{
    console.log(values);
   let res = await Axios.post('http://localhost:5000/updateCOURSESJSON',{values});
   if(res){
    console.log(res);
    return true;
   }
   else {
    alert('some error occurred!');
   }
}

//gets instructors.json through query over teachingStaff
export const getAllProfessors = async () =>{
    let profs = await Axios.get('http://localhost:5000/getINSTRUCTORS_INFO?id=teachingStaff');
    if(profs){
     return profs.data;
    }else {
        return [];
    }
}