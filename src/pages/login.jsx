import { ArrowRightOutlined } from "@ant-design/icons";
import { Col, Row, Form, Input, Button, Divider } from "antd";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log(">>> check values: ", values);

        //call api 
        // const res = await registerUserAPI(
        //     values.fullName,
        //     values.email,
        //     values.password,
        //     values.phone);
        // if (res.data) {
        //     notification.success({
        //         message: "Register user",
        //         description: "Đăng ký user thành công"
        //     });
        //     navigate("/login");
        // } else {
        //     notification.error({
        //         message: "Register user error",
        //         description: JSON.stringify(res.message)
        //     });
        // }
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
                            rules={[{ required: true, message: 'Please input your email!' }]}
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