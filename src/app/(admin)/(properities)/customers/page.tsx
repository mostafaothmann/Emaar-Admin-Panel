"use client"; // required in Next.js App Router

import { Button, Space, Table, Tag } from "antd";
import { useEffect } from "react";
import * as XLSX from "xlsx";
import { Customer, useCustomerDataStore } from "../../../../stores/customersStore/data.store";




export default function CustomersPage() {
  const { dataCustomers, editCustomer, getCustomersData } = useCustomerDataStore();
  //downloadExcel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataCustomers ?? []);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

    XLSX.writeFile(workbook, "Customers.xlsx");
  };
  async function handleActivate(id: number, record: Customer) {
    if (record.isActive == 0 ||record.isActive==null)
      record.isActive = 1
    else if (record.isActive == 1||record.isActive==null)
      record.isActive = 0
    await editCustomer(id, record);
    getCustomersData();
  }
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      sorter: (a: any, b: any) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name ",
      dataIndex: "lastName",
      sorter: (a: any, b: any) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a: any, b: any) => a.age - b.age,
    },
    {
      title: "Status",
      dataIndex: "isActive",
      sorter: (a: any, b: any) => a.isActive - b.isActive,
      render: (value: boolean) => (
        <Tag color={value ? "green" : "red"}>
          {value ? "Active" : "Inactive"}
        </Tag>
      ),
    }
    ,
    , {
      title: "Actions",
      fixed: "right",
      key: "id",
      render: (_: any, record: any) => (
        <Space size="middle">
          {record.isActive ? (
            <Button
              type="primary"
              danger
              onClick={() => handleActivate(record.id, record)}
            >
              Deactivate
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => handleActivate(record.id, record)}
            >
              Activate
            </Button>
          )}
        </Space>
      ),
    }
  ];


  useEffect(() => { getCustomersData(); }, []);
  return <div>
    <Button type="primary" onClick={() => downloadExcel()}>
      Download
    </Button>
    <Table
      scroll={{ x: "max-content" }}
      columns={columns} dataSource={dataCustomers} />
  </div>;
}
