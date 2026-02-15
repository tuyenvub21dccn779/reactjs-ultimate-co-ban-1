import { useState } from 'react';

import { Drawer } from 'antd';

const ViewUserDetail = (props) => {

    const {
        dataDetail,
        setDataDetail,
        isDetailOpen,
        setIsDetailOpen
    } = props;
    
    return (
        <Drawer
            title="Chi tiết User"
            closable={{ 'aria-label': 'Close Button' }}
            onClose={() => {
                setDataDetail(null);
                setIsDetailOpen(false);
            }}
            open={isDetailOpen}
            maskClosable={false}
        >
            {dataDetail && 
                <div>
                    <p>Id: {dataDetail._id}</p> <br />
                    <p>Full Name: {dataDetail.fullName}</p> <br />
                    <p>Email: {dataDetail.email}</p> <br />
                    <p>Phone number: {dataDetail.phone}</p> <br />
                </div>
            }
        </Drawer>
    )
}

export default ViewUserDetail;