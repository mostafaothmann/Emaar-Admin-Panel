
"use client"; // required in Next.js App Router

import { Button, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { usePropertiesDataStore } from "../../../../stores/propertiesStore/data.store";



export default function TypesOfOwneringsPage() {
  const { addTypeOfWork, editTypeOfWork, deleteTypeOfWork, dataTypeOfWork, getTypeOfWorkData } = usePropertiesDataStore();
  //downloadExcel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataTypeOfWork ?? []);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Types-Of-Works");

    XLSX.writeFile(workbook, "Types-Of-Works.xlsx");
  };
  const { TextArea } = Input;
  //Add Modal
  const [name1, setName1] = useState("");
  const [description1, setDescription1] = useState("");
  const [open1, setOpen1] = useState(false);
  const [loading1, setLoading1] = useState(false);
  //Edit Modal
  const [name, setName] = useState("");
  const [editedId, setEditedId] = useState(0)
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  //Delete Modal 
  const [delitedID, setDelitedID] = useState(0);
  const [open2, setOpen2] = useState(false);
  const [loading2, setLoading2] = useState(false);

  //handleEdit
  async function handleEdit() {
    setLoading1(true);
    await editTypeOfWork(editedId, { name: name1, description: description1 });
    setLoading1(false);
    setOpen1(false);
    getTypeOfWorkData();
  }
  const openEditModal = (id: number) => {
    setEditedId(id);
    const typeOfWork = dataTypeOfWork?.find(
      item => item.id === id
    );
    setName1(typeOfWork?.name || "");
    setDescription1(typeOfWork?.description || "");
    setOpen1(true);
  }

  const openDeleteModal = (id: number) => {
    setDelitedID(id);
    setOpen2(true);
  }

  //delete Type
  async function handleDelete(id: number) {
    setLoading2(true);
    await deleteTypeOfWork(id);
    getTypeOfWorkData();
    setLoading2(false);
    setOpen2(false);
  }


  async function addType() {
    await addTypeOfWork({ name, description })
    getTypeOfWorkData();
    setName("")
    setDescription("")
    setOpen(false)
  }
  const emptyFields = () => {
    setName("")
    setDescription("")
    setOpen(false)
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
      title: "Actions",
      fixed: "right",
      key: "id",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button
            type="default"
            danger
            onClick={() => openDeleteModal(record.id)}
          >
            Delete
          </Button>

          <Button
            type="default"

            onClick={() => openEditModal(record.id)}
          >
            Edit
          </Button>
        </Space>
      ),
    }

  ];


  useEffect(() => { getTypeOfWorkData(); }, []);
  return <div>

    <Button type="primary" onClick={() => setOpen(true)}>
      Add
    </Button>
    <Button type="primary" onClick={() => downloadExcel()}>
      Download
    </Button>
    <Modal
      title="Adding New Type Of Ownering"
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
    <Table columns={columns} dataSource={dataTypeOfWork} />;

  </div>
    ;
}
