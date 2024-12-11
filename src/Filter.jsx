import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Button, DatePicker, Form } from "antd";

const Filter = ({ filterDate, handleClose }) => {
  const [form] = Form.useForm();
  const handleSubmit = (value) => {
    const startDate = value.Start_Date.format("DD-MMM-YYYY");
    const endDate = value.End_Date.format("DD-MMM-YYYY");
    filterDate(startDate, endDate);
    handleClose();
  };
  return (
    <>
      <Form
        form={form}
        layout="horizontal"
        onFinish={handleSubmit}
        title="Filter"
      >
        <Form.Item label="Start Date" name="Start_Date" layout="horizontal">
          <DatePicker format="DD-MMM-YYYY" />
        </Form.Item>
        <Form.Item label="End Date" name="End_Date">
          <DatePicker format="DD-MMM-YYYY" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Filter;
