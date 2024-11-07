import { Input, Button, notification,Modal } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../service/api.service";

function UserForm(props) {
    const {loadUser} = props

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    
    const[isModalOpen, setIsModelOpen] = useState(false);

    const handleSubmit = async () =>{
        const res = await createUserAPI(fullName, email, password,phoneNumber)
        if(res.data ){
            notification.success({
                message: "create user",
                description: "Tạo user thành công"
            })
            resetModal();
            await loadUser()
        }
        else{
            notification.error({
                message: "Error create user",
                description: JSON.stringify(res.message)
            })
        }
       
    }

    const resetModal = () =>{
        setIsModelOpen(false)
        setFullName(''),
        setEmail(''),
        setPassword('')
        setPhoneNumber("")
    }

    
    return ( 
        <div className="user-form" style={{margin: "20px 0"}}>
            <div style={{display: "flex", gap: "10px", flexDirection: "column"}}>
                
               <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h3>Table Users</h3>
                    <Button 
                    onClick={() => setIsModelOpen(true)}
                    type="primary">Create User</Button>

               </div>
               <Modal 
                    title="Create user" 
                    open={isModalOpen} 
                    onOk={() =>handleSubmit()} 
                    onCancel={() =>resetModal()}
                    //maskClosable={false} // click ra ngoài màn k đóng đc modal
                    okText={"Create"}
                >
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
                </Modal>
            </div>
        </div>
     );
}

export default UserForm;