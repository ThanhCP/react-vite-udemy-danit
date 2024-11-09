import { Button, Drawer,Image, notification  } from "antd";
import { useState } from "react";
import { updateUserAvatarAPI, uploadFileAvatar } from "../../service/api.service";
function ViewUserDetail(props) {
  const { isDetailOpen, setIsDetailOpen, dataDetail, setDataDetails,loadUser } = props;
  const resetModal = () => {
    setDataDetails(null);
    setIsDetailOpen(false);
  };

  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleOnChangeFile = e =>{
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null)
      setPreview(null)
      return;
    }

  // I've kept this example simple by using the first image instead of multiple
    const file = e.target.files[0]
  
    if(file){
      setSelectedFile(file);
      setPreview( URL.createObjectURL(file))
    }
  }

  const handleUpdateAvatar = async () =>{
    // step 1: Upload file to folder
    const resUpload = await uploadFileAvatar(selectedFile, "avatar")
    if(resUpload.data){
      const newAvatar = resUpload.data.fileUploaded;
      // step 2: Update User Avatar
      const resUpdateAvatar = await updateUserAvatarAPI(
        newAvatar,dataDetail._id,dataDetail.fullName, dataDetail.phone)
      if(resUpdateAvatar){
        setIsDetailOpen(false)
        setSelectedFile(null)
        setPreview(null)
        await loadUser()
        notification.success(
          {
            message: "Update Upload file",
            description: "Cập nhật thành công"
          }
        )
      }else{
        notification.error(
          {
            message: "Error Upload file",
            description: JSON.stringify(resUpdateAvatar.message)
          }
        )
      }
    }else{
      notification.error(
        {
          message: "Error Upload file",
          description: JSON.stringify(resUpload.message)
        }
      )
      
    }
    
  }

  return (
    <>
      <Drawer
        width={"40vw"}
        title="Chi tiết người dùng"
        onClose={() => {
          resetModal();
        }}
        open={isDetailOpen}
      >
        {dataDetail ? (
          <>
            <p>ID: {dataDetail._id}</p>
            <br />
            <p>Full Name: {dataDetail.fullName}</p>
            <br />
            <p>Email: {dataDetail.email}</p>
            <br />
            <p>Phone Number: {dataDetail.phone}</p>
            <br/>
            <div>
              <Image
                width={200}
                //src={`http://localhost:8080/images/avatar/${dataDetail.avatar}`}
                src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`}
              />
            </div>
            
            <div>
              <label htmlFor="btnUpload" style={{
                display: "block",
                width: "fit-content",
                marginTop: "15px",
                padding: "5px 10px",
                background: "orange",
                borderRadius: "5px",
                cursor: "pointer"
              }}>
                Preview Avatar
              </label>
              <input type="file" hidden id="btnUpload"
              onChange={(e) => handleOnChangeFile(e)}
              />
            </div>
            {/* <Button type="primary">Upload Avatar</Button> */}
            {preview && 
            <>
              <div>
                <Image
                style={{marginTop: "15px"}}
                  width={200}
                  //src={`http://localhost:8080/images/avatar/${dataDetail.avatar}`}
                  src={preview}
                />
              <Button 
              onClick={() => handleUpdateAvatar()}
              style={{marginTop: "15px"}} type="primary">Upload Avatar</Button>
              </div>
            </>
            }
          </>
        ) : (
          <>
            <p>Không có dữ liệu</p>
          </>
        )}
      </Drawer>
    </>
  );
}

export default ViewUserDetail;
