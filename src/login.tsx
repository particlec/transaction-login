import React from "react";
import DivStyled from "./loginStyle";
import { Form, Button, Input } from "antd";

const SignIn = () => {
  const [form] = Form.useForm();

  const jumpConsole = () => {
    console.log(1);
  };

  // 前后端的登陆认证

  return (
    <DivStyled>
      <div className={"login-box"}>
        <div className={"login-title"}>
          <h3>Sign In</h3>
        </div>
        <Form form={form} layout="vertical">
          <Form.Item label="请输入账号" required>
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="请输入密码" required>
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onChange={jumpConsole}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </DivStyled>
  );
};
export default SignIn;
