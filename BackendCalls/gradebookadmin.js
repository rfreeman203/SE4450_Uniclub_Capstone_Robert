//Import all dependenceis (modules, components, functions) from different libraries
import axios from "axios";

// Function to fetch and return department data
export const getDepartments = async () => {
    // Fetch department data from the server
    let depData = (await axios.get('/group/getDepartments')).data
    // Extract relevant data and format it as an array of objects
    let out = depData.map(d => ({name:d.name, id:d._id}));
    // Log the formatted data to the console
    console.log(out)
    //return formatted data
    return out;
}

// Function to fetch and return professor data for a given department
export const getProfessors = async (departmentId) => {
    let profData = (await axios.get(`/subscription/getProfessors?groupId=${departmentId}`)).data;
    console.log(profData);
    let out = profData.map(p => ({name:p.userId.lastName + ", " + p.userId.firstName + " [" + p.userId._id + "]"}))
    console.log(out)
    return out;
}

// Function to fetch and return course data for a given department
export const getCourses = async (departmentId) => {
    console.log(departmentId)
    let courseData = (await axios.get(`/group/getDepartmentCourses?parentId=${departmentId}`)).data;
    console.log(courseData)
    let out = courseData.map(d => ({code:d.code, mainProf: d.mainProf, name:d.name, term:d.term, sec:d.sec, tut: d.tut, lab: d.lab, id:d.courseId}));
    return out;
}

// Function to delete a course based on its courseId
export const deleteCourse = async (courseId) => {
    // Send a DELETE request to delete the course with the provided courseId
    return (await axios.delete(`/group/deleteCourse?courseId=${courseId}`)).data
}

// Function to create a new course using provided course data
export const createCourse = async (courseData) => {
    console.log(courseData);
    // Send a POST request to create a new course with the provided data
    return (await axios.post('/group/createCourse', {...courseData})).data
}

