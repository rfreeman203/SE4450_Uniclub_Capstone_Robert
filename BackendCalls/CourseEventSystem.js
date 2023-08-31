import Axios from "axios";

// Function to fetch required course information
export const getRequiredCourse = async (courseID) => {
  console.log(courseID);
  // Make a GET request to retrieve course information using courseID
  let course = await Axios.get('http://localhost:5000/getCOURSE_INFO?id=' + courseID);
  console.log(course);
  if (course) {
    return course.data; // Return the fetched course data
  } else {
    return []; // Return an empty array if course data is not available
  }
}

// Function to set drawer pages for a course
export const setDrawerPages = async (courseID, activePages, unactivePages) => {
  console.log(courseID, activePages, unactivePages);
  // Make a POST request to update drawer pages with provided data
  let res = await Axios.post('http://localhost:5000/setDrawerPages', { courseID, activePages, unactivePages });
}

// Function to add course assessments
export const addCourseAssestments = async (courseID, assi, quiz, labs, exam) => {
  console.log(courseID, assi, quiz, labs, exam);
  // Make a POST request to add course assessments with provided data
  let res = await Axios.post('http://localhost:5000/addCourseAssestments', { courseID, assi, quiz, labs, exam });
}
