import { Input, Button, notification, Modal } from "antd";
import { useEffect, useState } from "react";
import { createUserAPI, updateUserAPI } from "../../service/api.service";

function UpdateUserModal(props) {
  const [fullName, setFullName] = useState("");
  const [id, setId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    isModalUpdate,
    setIsModalUpdate,
    dataUpdate,
    setDataUpdate,
    loadUser,
  } = props;

  useEffect(() => {
    if (dataUpdate) {
      setFullName(dataUpdate.fullName),
        setId(dataUpdate._id),
        setPhoneNumber(dataUpdate.phone);
    }
  }, [dataUpdate]);

  const handleSubmit = async () => {
    const res = await updateUserAPI(id, fullName, phoneNumber);
    if (res.data) {
      notification.success({
        message: "update  user",
        description: "Cập nhật user thành công",
      });
      resetModal();
      await loadUser();
    } else {
      notification.error({
        message: "Error update user",
        description: JSON.stringify(res.message),
      });
    }
  };

  const resetModal = () => {
    setIsModalUpdate(false);
    setFullName(""), setId(""), setPhoneNumber("");
    setDataUpdate(null);
  };

  return (
    <Modal
      title="Update user"
      open={isModalUpdate}
      onOk={() => handleSubmit()}
      onCancel={() => resetModal()}
      //maskClosable={false} // click ra ngoài màn k đóng đc modal
      okText={"Save"}
    >
      <div>
        <span>Id</span>
        <Input value={id} disabled />
      </div>
      <div>
        <span>FullName</span>
        <Input
          value={fullName}
          onChange={(event) => {
            setFullName(event.target.value);
          }}
        />
      </div>
      <div>
        <span>Phone number</span>
        <Input
          value={phoneNumber}
          onChange={(event) => {
            setPhoneNumber(event.target.value);
          }}
        />
      </div>
    </Modal>
  );
}

export default UpdateUserModal;
