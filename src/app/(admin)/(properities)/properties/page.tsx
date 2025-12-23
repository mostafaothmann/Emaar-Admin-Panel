"use client"; // required in Next.js App Router

import { Badge, Button, Modal, Space, Table, Tag } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { usePropertiesDataStore } from "../../../../stores/propertiesStore/data.store";
import { useCustomerDataStore } from "../../../../stores/customersStore/data.store";

export default function PropertiesPage() {
  const { dataProperties, deleteProperty, dataTypeOfWork, getTypeOfWorkData, editProperty
    , dataTypeOfOwnerings, getTypeOfOwneringsData, getTypeOfPropertiesData,
    dataTypeOfProperties, getPropertiesData } = usePropertiesDataStore();

  const { dataCustomers, getCustomersData } = useCustomerDataStore();
  //downloadExcel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataProperties ?? []);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Properties");

    XLSX.writeFile(workbook, "Properties.xlsx");
  };
  //Delete Modal 
  const [delitedID, setDelitedID] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [loading2, setLoading2] = useState(false);
  //openDeleteModal
  const openDeleteModal = (id: number) => {
    setDelitedID(id);
    setOpen2(true);
  }
  async function handleDelete(id: number) {
    setLoading2(true);
    await deleteProperty(id);
    setLoading2(false);
    setOpen2(false);
    getPropertiesData();
  }
  async function handleActivate(id: number, record: Property) {
    if (record.isActive == 0)
      record.isActive = 1
    else if (record.isActive == 1)
      record.isActive = 0
    await editProperty(id, record);
    getPropertiesData();
  }
  const handleEdit = (id: number, record: Property) => {
    console.log(id)
  }
  const columns = [
    {
      title: "Direction",
      dataIndex: "direction",
      sorter: (a: any, b: any) => a.direction.localeCompare(b.direction),
    },
    {
      title: "Height",
      dataIndex: "height",
      sorter: (a: any, b: any) => Number(a.height) - Number(b.height)
    },
    {
      title: "Location",
      dataIndex: "location",
      sorter: (a: any, b: any) => a.location.localeCompare(b.location),
    },
    {
      title: "Property Status",
      dataIndex: "pstatusId",
      sorter: (a: any, b: any) => a.pstatusId - b.pstatusId
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: (a: any, b: any) => a.age - b.age
    },
    {
      title: "Minimum Budget",
      dataIndex: "minimum_budget",
      sorter: (a: any, b: any) => Number(a.minimum_budget) - Number(b.minimum_budget),
    },
    {
      title: "Maximum Time",
      dataIndex: "maximum_time",
      sorter: (a: any, b: any) => a.maximum_time.localeCompare(b.maximum_time),
    },
    {
      title: "Type Of Property",
      dataIndex: "typeOfPropertyId",
      sorter: (a: any, b: any) => a.typeOfPropertyId - b.typeOfPropertyId,
      render: (value: number) => {
        return dataTypeOfProperties?.[Number(value)]?.name ?? "-";
      }
    },
    {
      title: "Type Of Work",
      dataIndex: "typeOfWorkId",
      sorter: (a: any, b: any) => a.typeOfWorkId - b.typeOfWorkId,
      render: (value: number) => {
        return dataTypeOfWork?.[Number(value)]?.name ?? "-";
      }
    },
    {
      title: "Type Of Ownering",
      dataIndex: "typeOfOwneringId",
      sorter: (a: any, b: any) => a.typeOfOwneringId - b.typeOfOwneringId,
      render: (value: number) => {
        return dataTypeOfOwnerings?.[Number(value)]?.name ?? "-";
      }
    },
    {
      title: "Description",
      dataIndex: "description",
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
    {
      title: "Owner",
      dataIndex: "customerId",
      sorter: (a: any, b: any) => a.customerId - b.customerId,
      render: (value: number) => {
        return dataCustomers?.[Number(value)]?.firstName ?? "-";
      }
    }
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

          <Button
            type="default"
            danger
            onClick={() => openDeleteModal(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    }
  ];

  useEffect(() => { getPropertiesData(); }, []);
  useEffect(() => { getTypeOfPropertiesData(); }, []);
  useEffect(() => { getTypeOfWorkData(); }, []);
  useEffect(() => { getTypeOfOwneringsData(); }, []);
  useEffect(() => { getCustomersData(); }, []);

  return <div>
    <Button type="primary" onClick={() => downloadExcel()}>
      Download
    </Button>
    <Modal
      title="Confirm Deleting"
      open={open2}
      onOk={() => handleDelete(delitedID)}
      onCancel={() => setOpen2(false)}
      confirmLoading={loading2}
      mask={false}
      okType="danger"
      okButtonProps={{ type: "primary" }} // 🔥 bold & strong
    >
    </Modal>
    <Table rowKey="id"
      scroll={{ x: "max-content" }}
      columns={columns} dataSource={dataProperties} />
  </div>
}
