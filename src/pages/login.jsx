import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, Row, Form, Input, Button, Divider, notification, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.service";
import { useContext, useState } from "react";
import { AuthContext } from "../components/context/auth.context";

const LoginPage = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);

    const onFinish = async (values) => {
        setLoading(true);
        console.log(">>> check values: ", values);

        // call api 
        const res = await loginAPI(
            values.email,
            values.password);
        if (res.data) {
            message.success("Đăng nhập thành công");
            localStorage.setItem("access_token", res.data.access_token);
            setUser(res.data.user);
            navigate("/");
        } else {
            notification.error({
                message: "Register user error",
                description: JSON.stringify(res.message)
            });
        }
        setLoading(false);
    }


    return (

        <Row justify="center" style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    border: "1px solid #ccc",
                    padding: "15px",
                    borderRadius: "5px",
                }}>
                    <legend>Đăng nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    // style={{ margin: "10px" }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { 
                                    required: true, 
                                    message: 'Please input your email!' 
                                },
                                {
                                    type: "email",
                                    message: "Email không đúng định dạng!"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Row justify="space-between" align="middle">
                            <Col>
                                <Button
                                    loading={loading}
                                    onClick={() => form.submit()}
                                    type="primary"
                                >
                                    Login
                                </Button>
                            </Col>
                            <Col>
                                <Link to={"/"}>Go to homepage <ArrowRightOutlined /></Link>
                            </Col>
                        </Row>
                        <Divider />
                        <div style={{
                            textAlign: "center"
                        }}>
                            Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
                        </div>
                    </Form>
                </fieldset>
            </Col>
        </Row>
    )
}

export default LoginPage;