import { Space, Table, Tag } from "antd";
import { fetchAllUserAPI } from "../../service/api.service";
import { useEffect, useState } from "react";

function UserTable() {
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    loadUser();
  },[])

  

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
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
  ];

  const loadUser = async () => {
    const res = await fetchAllUserAPI();
    setDataUser(res.data)
  };

  
  return <Table columns={columns} dataSource={dataUser} rowKey={"_id"} />;
}

export default UserTable;
