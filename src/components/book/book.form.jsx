import { Button, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import axios from "axios";
import { createBookAPI, createUserAPI, handleUploadFile } from "../../services/api.service";

const BookForm = (props) => {

    const { loadBook } = props;

    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [category, setCategory] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleSubmitBtn = async () => {
        if (selectedFile == null || selectedFile == '') {
            notification.error({
                message: "create book",
                description: "Vui lòng upload ảnh thumbnail"
            });
            return;
        }
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            console.log({mainText, author, price, quantity, category})
            const res = await createBookAPI(
                mainText,
                author,
                +price,
                +quantity,
                category,
                resUpload.data.fileUploaded
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
        setIsModalOpen(false);
        setMainText("");
        setAuthor("");
        setPrice(null);
        setQuantity(null);
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
    }

    return (
        <div className="user-form" style={{ margin: "10px 0" }}>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Book</h3>
                <Button
                    onClick={() => setIsModalOpen(true)}
                    type="primary"
                >
                    Create Book
                </Button>
            </div>
            <Modal
                title="Create book"
                open={isModalOpen}
                onOk={() => handleSubmitBtn()}
                onCancel={() => resetAndCloseModal()}
                maskClosable={false}
                okText={"Create"}
            >
                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Tiêu đề</span>
                        <Input
                            value={mainText}
                            onChange={(event) => setMainText(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Tác giả</span>
                        <Input
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                        />
                    </div>
                    <div>
                        <p>Password</p>
                        <InputNumber
                            style={{ width: '100%' }}
                            suffix="đ"
                            value={price}
                            onChange={(value) => setPrice(value)}
                        />
                    </div>
                    <div>
                        <p>Số lượng</p>
                        <InputNumber
                            style={{ width: '100%' }}
                            value={quantity}
                            onChange={(value) => setQuantity(value)}
                        />
                    </div>
                    <div>
                        <p>Thể loại</p>
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
                            onChange={(value) => {setCategory(value);}}
                        />
                    </div>
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
                </div>
            </Modal>

        </div>
    )
}

export default BookForm;