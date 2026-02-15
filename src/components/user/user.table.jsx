import React, { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { fetchAllUserAPI } from '../../services/api.service';

const UserTable = () => {

    const [dataUsers, setDataUsers] = useState([
        {_id: "eric", fullName: 25, email: "hn"},
        {_id: "hoidanit", fullName: 25, email: "hcm"},
        
    ]);

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
    // const data = [
    //     {
    //         key: '1',
    //         name: 'John Brown',
    //         age: 32,
    //         address: 'New York No. 1 Lake Park',
    //         tags: ['nice', 'developer'],
    //     },
    //     {
    //         key: '2',
    //         name: 'Jim Green',
    //         age: 42,
    //         address: 'London No. 1 Lake Park',
    //         tags: ['loser'],
    //     },
    //     {
    //         key: '3',
    //         name: 'Joe Black',
    //         age: 32,
    //         address: 'Sydney No. 1 Lake Park',
    //         tags: ['cool', 'teacher'],
    //     },
    // ];

    const loadUser = async () => {
        console.log("run loadUser START");
        const res = await fetchAllUserAPI();
        console.log("run loadUser END ", res);
    }

    loadUser();

    return (
        <Table columns={columns} dataSource={dataUsers} />
    )
}

export default UserTable;