import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { createBookAPI, handleUploadFile } from "../../services/api.service";
import { useState } from "react";


const CreateBookUncontrol = (props) => {
    const { isCreateOpen, setIsCreateOpen, loadBook } = props;

    const [form] = Form.useForm();

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
        if (!selectedFile) {
            notification.error({
                message: "create book",
                description: "Vui lòng upload ảnh thumbnail"
            });
            return;
        }
        const { mainText, author, price, quantity, category } = values;
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            const newThumbnail = resUpload.data.fileUploaded;
            const res = await createBookAPI(
                mainText,
                author,
                +price,
                +quantity,
                category,
                newThumbnail
            );
            if (res.data) {
                notification.success({
                    message: "create book",
                    description: "Tạo book thành công"
                })
                resetAndCloseModal();
                await loadBook();
            } else {
                notification.error({
                    message: "create book",
                    description: JSON.stringify(res.message)
                })
            }
        } else {
            notification.error({
                message: "create book",
                description: JSON.stringify(resUpload.message)
            })
        }
    }

    const resetAndCloseModal = () => {
        setIsCreateOpen(false);
        form.resetFields();
        setSelectedFile(null);
        setPreview(null);
    }

    return (
        <Modal
            title="Create book (Uncontrol component)"
            open={isCreateOpen}
            onOk={() => form.submit()}
            onCancel={() => resetAndCloseModal()}
            maskClosable={false}
            okText={"Create"}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmitBtn}
            >

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

export default CreateBookUncontrol;