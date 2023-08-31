// Import the necessary dependencies (modules, components, functions) from different libraries
import axios from "axios";

// Function to collect all courses a user has access to
export const getCourses = async (userId) => {
    let courses = (await axios.get(`/group/getCourses?userId=${userId}`)).data
    return courses;
}