import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm = ({ getData }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-500/20 p-8">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <span className="text-white font-bold text-2xl">N</span>
        </div>
        <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
        <p className="mt-2 text-sm text-purple-200">Sign in to your account</p>
      </div>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={getData}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="mt-8 space-y-6"
        layout="vertical"
      >
        <Form.Item
          label={<span className="text-purple-200 font-medium">Email</span>}
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
          className="mb-4"
        >
          <Input
            className="w-full px-4 py-3 bg-gray-700/50 border border-purple-500/30 rounded-lg font-semibold placeholder-purple-300/60 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item
          label={<span className="text-purple-200 font-medium">Password</span>}
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          className="mb-4"
        >
          <Input.Password
            className="w-full px-4 py-3 bg-gray-700/50 border border-purple-500/30 rounded-lg font-semibold placeholder-purple-300/60 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" className="mb-4">
          <Checkbox className="text-purple-400 focus:ring-purple-500 [&>.ant-checkbox-inner]:bg-gray-700 [&>.ant-checkbox-inner]:border-purple-400">
            <span className="text-purple-200">Remember me</span>
          </Checkbox>
        </Form.Item>

        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200"
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center mt-4">
        <p className="text-sm text-purple-200">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-purple-300 hover:text-purple-200 transition duration-200"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div>
);
export default LoginForm;
