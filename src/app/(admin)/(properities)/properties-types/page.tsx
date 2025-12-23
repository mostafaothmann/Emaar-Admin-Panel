"use client"; // required in Next.js App Router

"use client"; // required in Next.js App Router

import { Table, Button, Modal, Input, Space } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { usePropertiesDataStore } from "../../../../stores/propertiesStore/data.store";


export default function TypesOfPropertiesPage() {
  const { dataTypeOfProperties,editTypeOfProperty, deleteTypeOfProperty, addTypeOfProperty, getTypeOfPropertiesData } = usePropertiesDataStore();
  async function handleDelete(id: number) {
    setLoading2(true);
    console.log(id);
    await deleteTypeOfProperty(id);
    getTypeOfPropertiesData();
    setLoading2(false);
    setOpen2(false);
  }


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name.localeCompare(b.name),
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Action",
      key: "id",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => openEditModal(record.id)}>
            Edit
          </Button>
          <Button type="default" danger onClick={() => openDeleteModal(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    }
  ];
  //Add Modal
  const { TextArea } = Input;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  //downloadExcel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataTypeOfProperties ?? []);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Types-Of-Properties");

    XLSX.writeFile(workbook, "Types-Of-Properties.xlsx");
  };
  //Delete Modal 
  const [delitedID, setDelitedID] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [loading2, setLoading2] = useState(false);
  //Edit Modal
  const [name1, setName1] = useState("");
  const [editedId, setEditedId] = useState(0)
  const [description1, setDescription1] = useState("");
  const [open1, setOpen1] = useState(false);
  const [loading1, setLoading1] = useState(false);

  //handleEdit
  async function handleEdit() {
    setLoading1(true);
    await editTypeOfProperty(editedId, { name: name1, description: description1 });
    setLoading1(false);
    setOpen1(false);
    getTypeOfPropertiesData();
  }
  const openEditModal = (id: number) => {
    setEditedId(id);
    const typeOfProperty = dataTypeOfProperties?.find(
      item => item.id === id
    );
    setName1(typeOfProperty?.name || "");
    setDescription1(typeOfProperty?.description || "");
    setOpen1(true);
  }
  //openDeleteModal
  const openDeleteModal = (id: number) => {
    setDelitedID(id);
    setOpen2(true);
  }
  async function addType() {
    await addTypeOfProperty({ name, description })
    getTypeOfPropertiesData();
    setName("")
    setDescription("")
    setOpen(false)
  }
  const emptyFields = () => {
    setName("")
    setDescription("")
    setOpen(false)
  }
  useEffect(() => { getTypeOfPropertiesData(); }, []);
  return <div>
    <Button type="primary" onClick={() => setOpen(true)}>
      Add
    </Button>
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
    <Modal
      title="Adding New Type Of Property"
      open={open}
      onOk={() => addType()}
      onCancel={() => emptyFields()}
      mask={false}
    >
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <TextArea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        placeholder="Description"
      />
    </Modal>

    <Modal
      title="Editing Type"
      open={open1}
      onOk={() => handleEdit()}
      onCancel={() => setOpen1(false)}
      confirmLoading={loading1}   // ✅ spinner on OK button
      mask={false}
    >
      <Input
        value={name1}
        onChange={(e) => setName1(e.target.value)}
        placeholder="Name"
      />

      <TextArea
        value={description1}
        onChange={(e) => setDescription1(e.target.value)}
        rows={4}
        placeholder="Description"
      />
    </Modal>
    <Table rowKey="id"
      columns={columns} dataSource={dataTypeOfProperties} />

  </div>

}
