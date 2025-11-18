import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const LoginForm = ({getData}) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Welcome Back</h2>
        <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
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
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
          className="mb-4"
        >
          <Input 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="Enter your email"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          className="mb-4"
        >
          <Input.Password 
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
            placeholder="Enter your password"
          />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked" className="mb-4">
          <Checkbox className="text-indigo-600 focus:ring-indigo-500">
            Remember me
          </Checkbox>
        </Form.Item>

        <Form.Item className="mb-0">
          <Button 
            type="primary" 
            htmlType="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200">
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div>
);
export default LoginForm;