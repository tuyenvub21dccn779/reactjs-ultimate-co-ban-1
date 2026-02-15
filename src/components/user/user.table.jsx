import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';

const UserTable = () => {

    const [dataUsers, setDataUsers] = useState([
        {_id: "eric", fullName: 25, email: "hn"},
        {_id: "hoidanit", fullName: 25, email: "hcm"},
        
    ]);

    useEffect(() => {
        console.log(">>> run useEffect 111")
        loadUser();
    },[]);

    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        
    ];

    const loadUser = async () => {
        const res = await fetchAllUserAPI();
        setDataUsers(res.data);
    }

    
    console.log(">>> run render 000")

    return (
        <Table columns={columns} dataSource={dataUsers} rowKey={"_id"}/>
    )
}

export default UserTable;