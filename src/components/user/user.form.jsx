import { Input, Button } from "antd";
import { useState } from "react";
import axios from "axios";
function UserForm() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    
    const handleClick = () =>{
        const URL_BACKEND = 'http://localhost:8080/api/v1/user';
        const data = {
            fullName:fullName,
            email: email,
            password: password,
            phone: phoneNumber
        }
        axios.post(URL_BACKEND, data)

        console.log(">>> check state: ", { fullName, email, password, phoneNumber })
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