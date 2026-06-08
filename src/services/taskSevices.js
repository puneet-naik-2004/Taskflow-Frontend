import API from "./api";

export const getTasks=async()=>{
 const response = await API.get("/task")
 return response.data;
}

export const createTasks=async(taskData)=>{
const response = await API.post("/task",taskData)
return response.data;
}

export const updateTasks =async(id,taskData)=>{
    const response = await API.put(`/task/${id}`,taskData);
    return response.data
}

export const deleteTasks = async(id)=>{
const response = await API.delete(`/task/${id}`)
return response.data;
}
 export const toggleTaskStatus = async(id)=>{
    const response = await API.patch(`/task/${id}/status`);
    return response.data;
 }