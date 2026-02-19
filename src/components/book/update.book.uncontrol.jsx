import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFile, updateBookAPI } from "../../services/api.service";

const UpdateBookUncontrol = (props) => {

    const {
        isModalUpdateOpen,
        setIsModalUpdateOpen,
        dataUpdate,
        setDataUpdate,
        loadBook
    } = props;

    const [form] = Form.useForm();

    useEffect(() => {
        if (dataUpdate && dataUpdate._id) {
            form.setFieldsValue(dataUpdate);
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataUpdate.thumbnail}`);
        }
    }, [dataUpdate]);

    const [selectedFile, setSelectedFile] = useState(null)
    const [preview, setPreview] = useState(null)


    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));

        }

    }

    const handleSubmitBtn = async (values) => {
        if (!selectedFile && !preview) {
            notification.error({
                message: "create book",
                description: "Vui lòng upload ảnh thumbnail"
            });
            return;
        }

        let newThumbnail = ""
        if (!selectedFile && preview) {
            newThumbnail = dataUpdate.thumbnail;
        } else {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                newThumbnail = resUpload.data.fileUploaded;
            } else {
                notification.error({
                    message: "Error upload file",
                    description: JSON.stringify(resUpload.message)
                })
                return;
            }
        }

        await updateBook(newThumbnail, values);


    }

    const updateBook = async (newThumbnail, values) => {
        const { _id, mainText, author, price, quantity, category } = values;
        const res = await updateBookAPI(
            _id,
            mainText,
            author,
            +price,
            +quantity,
            category,
            newThumbnail
        );
        if (res.data) {
            notification.success({
                message: "update book",
                description: "Cập nhật book thành công"
            })
            resetAndCloseModal();
            await loadBook();
        } else {
            notification.error({
                message: "update book",
                description: JSON.stringify(res.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsModalUpdateOpen(false);
        form.resetFields();
        setPreview(null);
        setSelectedFile(null)
        setDataUpdate(null);
    }



    return (
        <Modal
            title="Update a user"
            open={isModalUpdateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Save"}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmitBtn}
            >

                <Form.Item
                    label="Id"
                    name="_id"
                    
                >
                    <Input disabled />
                </Form.Item>
                <Form.Item
                    label="Tiêu đề"
                    name="mainText"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your main text!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tác giả"
                    name="author"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your author!'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Giá tiền"
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your price!'
                        }
                    ]}
                >
                    <InputNumber 
                        min={0}
                        style={{ width: '100%' }} 
                        addonAfter={"đ"} 
                        />
                </Form.Item>
                <Form.Item
                    label="Số lượng"
                    name="quantity"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your quantity!'
                        }
                    ]}
                >
                    <InputNumber 
                        min={0}
                        style={{ width: '100%' }} 
                        />
                </Form.Item>
                <Form.Item
                    label="Thể loại"
                    name="category"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your main text!'
                        }
                    ]}
                >
                    <Select
                            style={{ width: '100%' }}
                            allowClear
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                </Form.Item>

                <div>
                    <label htmlFor='btnUpload'
                        style={{
                            display: "block",
                            width: "fit-content",
                            marginTop: "15px",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >Upload</label>
                    <input
                        style={{ display: "none" }}
                        onChange={handleOnChangeFile}
                        onClick={(event) => {
                            event.target.value = null;
                        }}
                        id='btnUpload' type="file" hidden />
                </div>
                {preview &&
                    <>
                        <div style={{
                            marginTop: "10px",
                            marginBottom: "15px",
                            height: "100px", width: "150px",
                            border: "1px solid #ccc"
                        }}>
                            <img
                                style={{ height: "100%", width: "100%", objectFit: "contain" }}
                                src={preview} />
                        </div>
                    </>
                }
            </Form>
        </Modal>
    )
}

export default UpdateBookUncontrol;