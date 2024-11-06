import { Input, Button, notification } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../service/api.service";

function UserForm() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    
    const handleClick = async () =>{
        const res = await createUserAPI(fullName, email, password,phoneNumber)
        if(res.data ){
            notification.success({
                message: "create user",
                description: "Tạo user thành công"
            })
        }
        else{
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }
        
        console.log(">>> check state: ", res.data)
    }
    return ( 
        <div className="user-form" style={{margin: "20px 0"}}>
            <div style={{display: "flex", gap: "10px", flexDirection: "column"}}>
                <div>
                    <span>FullName</span>
                    <Input
                    value={fullName}
                    onChange={(event)=>{
                        setFullName(event.target.value)
                    }}
                    />
               </div>
               <div>
                    <span>Email</span>
                    <Input
                    value={email}
                    onChange={(event)=>{
                        setEmail(event.target.value)
                    }}
                    />
               </div>
               <div>
                    <span>Password</span>
                    <Input.Password placeholder="Password" 
                    value={password}
                    onChange={(event)=>{
                        setPassword(event.target.value)
                    }}
                    />
               </div>
               <div>
                    <span>Phone number</span>
                    <Input
                    value={phoneNumber}
                    onChange={(event)=>{
                        setPhoneNumber(event.target.value)
                    }}
                    />
               </div>
               <div>
               <Button 
               onClick={handleClick}
               type="primary">Create User</Button>
               </div>
            </div>
        </div>
     );
}

export default UserForm;