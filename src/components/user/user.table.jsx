import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table, Popconfirm, notification } from "antd";
import UpdateUserModal from "./update.user";
import { useState } from "react";
import ViewUserDetail from "./view.user.details";
import { deleteUserAPI } from "../../service/api.service";

function UserTable(props) {
  const { dataUser, loadUser,current,pageSize,total, setCurrent, setPagesize } = props;

  const [isModalUpdate, setIsModalUpdate] = useState(false);

  const [dataUpdate, setDataUpdate] = useState("");

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [dataDetail, setDataDetails] = useState("");

  const handleDeleteUser = async (id) => {
    const res = await deleteUserAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete user",
        description: "Xóa user thành công",
      });
      await loadUser();
    } else {
      notification.error({
        message: "Error delete user",
        description: JSON.stringify(res.message),
      });
    }
  };

  const columns = [
    {
      title: "STT",
      render: (_, record, index) => (
        <>
          {(index+1) + (current - 1)*pageSize}
        </>
      ),
    },
    {
      title: "ID",
      dataIndex: "_id",
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setDataDetails(record);
              setIsDetailOpen(true);
            }}
          >
            {record._id}
          </a>
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
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdate(true);
            }}
            style={{ cursor: "pointer", color: "orange" }}
          />
          <Popconfirm
            title="Xóa người dùng"
            description="Bạn chắc chắn xóa user này ?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => { 
    // nếu thay đổi số trang : current
    if(pagination && pagination.current){
      if(+pagination.current !== +current){
        setCurrent(+pagination.current) // thêm dấu cộng trước tên biến sẽ tự động chuyển từ string sang số nguyên 
      }
    }
    // nếu thay đổi tổng số phần tử : pageSize
    if(pagination && pagination.pageSize){
      if(+pagination.pageSize !== +pageSize){
        setPagesize(+pagination.pageSize) // thêm dấu cộng trước tên biến sẽ tự động chuyển từ string sang số nguyên 
      }
    }
   };
  return (
    <>
      <Table columns={columns} dataSource={dataUser} rowKey={"_id"} 
      pagination={
        {
        current: current,
        pageSize: pageSize,
        showSizeChanger: true,
        total: total,
        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
        } }
      onChange={onChange}
      />;
      <UpdateUserModal
        isModalUpdate={isModalUpdate}
        setIsModalUpdate={setIsModalUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
      <ViewUserDetail
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
        dataDetail={dataDetail}
        setDataDetails={setDataDetails}
        loadUser={loadUser}
      />
    </>
  );
}

export default UserTable;
