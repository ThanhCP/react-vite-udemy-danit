import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
function ViewUserDetail(props) {

    const {
        isDetailOpen,
        setIsDetailOpen,
        dataDetail,
        setDataDetails, 
    } = props
    const resetModal = () =>{
        setDataDetails(null);
        setIsDetailOpen(false);
    }

    

  return (
    <>
      <Drawer 
        title="Chi tiết người dùng" 
        onClose={() => {
        resetModal()
        }} 
        open={isDetailOpen}
      >
        {dataDetail ? <>
            <p>ID: {dataDetail._id}</p>
            <br/>
            <p>Full Name: {dataDetail.fullName}</p>
            <br/>
            <p>Email: {dataDetail.email}</p>
            <br/>
            <p>Phone Number: {dataDetail.phone}</p>

        </>
        : 
        <>
            <p>Không có dữ liệu</p>
        </>
        }   
        
      </Drawer>
    </>
  )
}

export default ViewUserDetail;
