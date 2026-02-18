import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Table } from "antd";
import { useState } from "react";
import BookDetail from "./book.detail";
import CreateBookControl from "./create.book.control";

const BookTable = (props) => {

    const { 
        dataBooks, 
        loadBook,
        current,
        pageSize,
        total,
        setCurrent,
        setPageSize
    } = props;

    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState(null);

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [dataDetail, setDataDetail] = useState(null);

    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const handleDeleteBook = async (id) => {
        // const res = await deleteUserAPI(id);
        // if (res.data) {
        //     notification.success({
        //         message: "Delete user",
        //         description: "Xoá user thành công"
        //     })
        //     await loadUser();
        // } else {
        //     notification.error({
        //         message: "Delete user",
        //         description: JSON.stringify(res.message)
        //     })
        // }
    }

    const onChange = (pagination, filters, sorter, extra) => { 
        // setCurrent, setPageSize
        // nếu thay đổi trang : current
        if(pagination && pagination.current) {
            if(+pagination.current !== +current) {
                setCurrent(+pagination.current); // "5" => 5
            }
        }

        // nếu thay đổi tổng số phần tử : current
        if(pagination && pagination.pageSize) {
            if(+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize); // "5" => 5
            }
        }
    };

    const columns = [
        {
            title: "STT",
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                )
            }
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => {
                return (
                    <>
                        <a href='#'
                            onClick={(event) => {
                                event.preventDefault();
                                setDataDetail(record);
                                setIsDetailOpen(true);
                            }}
                        >{record._id}</a>
                    </>
                )
            },
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text, record, index, action) => {
                if (text) {
                    return new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' }
                    ).format(text);
                }
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        onClick={() => {
                            setDataUpdate(record);
                            setIsModalUpdateOpen(true);
                        }}
                        style={{ cursor: "pointer", color: "orange" }} />
                    <Popconfirm
                        title="Xóa sách"
                        description="Bạn chắc chắn xóa sách này?"
                        onConfirm={() => handleDeleteBook(record._id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined
                            style={{ cursor: "pointer", color: "red" }}

                        />
                    </Popconfirm>
                </div>
            ),
        },
    ];


    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Book</h3>
                <Button
                    onClick={() => setIsCreateOpen(true)}
                    type="primary"
                >
                    Create Book
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={dataBooks}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true,
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                    }
                }
                onChange={onChange}
            />
            <BookDetail
                dataDetail={dataDetail}
                setDataDetail={setDataDetail}
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                loadBook={loadBook}
            />
            <CreateBookControl 
                isCreateOpen={isCreateOpen}
                setIsCreateOpen={setIsCreateOpen}
                loadBook={loadBook} />
        </>
    )

}

export default BookTable;