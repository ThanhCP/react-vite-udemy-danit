import axios from "./axios.customize";

const createUserAPI = (fullName, email, password,phoneNumber) =>{
    const URL_BACKEND = '/api/v1/user';
        const data = {
            fullName:fullName,
            email: email,
            password: password,
            phone: phoneNumber
        }
    return axios.post(URL_BACKEND, data)

}

const updateUserAPI = (_id, fullName, phoneNumber) =>{
    const URL_BACKEND = '/api/v1/user';
        const data = {
            _id: _id,
            fullName:fullName,
            phone: phoneNumber
        }
    return axios.put(URL_BACKEND, data)

}

const fetchAllUserAPI = (current, pageSize) =>{
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND)
}

const deleteUserAPI = (id) =>{
    const URL_BACKEND = `/api/v1/user/${id}`;
    return axios.delete(URL_BACKEND)
}

const uploadFileAvatar = (file, folder) => {
    const URL_BACKEND = `/api/v1/file/upload`;
    let config = {
        headers: {
            "upload-type": folder,
            "Content-Type": "multipart/form-data"
        }
    }  
    const bodyFormData = new FormData() 
    bodyFormData.append("fileImg", file)
    return axios.post(URL_BACKEND, bodyFormData, config)
}
const updateUserAvatarAPI = ( avatar, _id, fullName, phone) =>{
    const URL_BACKEND = '/api/v1/user';
        const data = {
            _id: _id,
            fullName: fullName,
            phone: phone,
            avatar:avatar
        }
    return axios.put(URL_BACKEND, data)

}

export {createUserAPI,fetchAllUserAPI,updateUserAPI,updateUserAvatarAPI,uploadFileAvatar, deleteUserAPI};