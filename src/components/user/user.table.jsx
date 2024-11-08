import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from "antd";
import UpdateUserModal from "./update.user";
import { useState } from "react";

function UserTable(props) {
  const { dataUser,loadUser } = props;

  const [isModalUpdate, setIsModalUpdate] = useState(false);

  const [dataUpdate, setDataUpdate] = useState('')

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => (
        <>
          <a href="#">Invite {record._id}</a>
          <a>Delete</a>
        </>
      ),
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div style={{display:"flex", gap: "20px"}}>
          <EditOutlined 
            onClick={() =>{
              setDataUpdate(record);
              setIsModalUpdate(true)
            }}
          style={{cursor: "pointer", color: "orange"}} /> 
          <DeleteOutlined style={{cursor: "pointer", color: "red"}} />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />;
      <UpdateUserModal
        isModalUpdate={isModalUpdate}
        setIsModalUpdate = {setIsModalUpdate}
        dataUpdate = {dataUpdate}
        setDataUpdate = {setDataUpdate}
        loadUser={loadUser}
      />
    </>
  )
}

export default UserTable;
