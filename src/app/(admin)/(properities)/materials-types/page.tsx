"use client"; // required in Next.js App Router


import { Button, Input, Modal, Space, Table } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useMaterialesDataStore } from "../../../../stores/materialesStore/data.store";




export default function TypesOfMaterialsPage() {
  const { dataTypeOfMaterials, getTypeOfMaterial, addTypeOfMaterial, deleteTypeOfMaterial, editTypeOfMaterial } = useMaterialesDataStore();
  //Add Modal
  const [name1, setName1] = useState("");
  const [description1, setDescription1] = useState("");
  const [open1, setOpen1] = useState(false);
  const [loading1, setLoading1] = useState(false);
  //Edit Modal
  const { TextArea } = Input;
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
    await editTypeOfMaterial(editedId, { name: name1, description: description1 });
    setLoading1(false);
    setOpen1(false);
    getTypeOfMaterial();
  }
  const openEditModal = (id: number) => {
    setEditedId(id);
    const material = dataTypeOfMaterials?.find(
      item => item.id === id
    );
    setName1(material?.name || "");
    setDescription1(material?.description || "");
    setOpen1(true);
  }

  const openDeleteModal = (id: number) => {
    setDelitedID(id);
    setOpen2(true);
  }
  const columns = [
    {
      title: "Type",
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
  //delete Type
  async function handleDelete(id: number) {
    setLoading2(true);
    await deleteTypeOfMaterial(id);
    getTypeOfMaterial();
    setLoading2(false);
    setOpen2(false);
  }

  //downloadExcel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataTypeOfMaterials ?? []);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Types-Of-Materials");

    XLSX.writeFile(workbook, "Types-Of-Materials.xlsx");
  };
  //modal Functions
  async function addType() {
    setLoading(true);
    await addTypeOfMaterial({ name, description });
    setLoading(false);
    getTypeOfMaterial();
    setName("")
    setDescription("")
    setOpen(false)
  }
  const emptyFields = () => {
    setName("")
    setDescription("")
    setOpen(false)
  }
  useEffect(() => { getTypeOfMaterial(); }, []);
  return <div>
    <Button type="primary" onClick={() => setOpen(true)}>
      Add
    </Button>
    <Button type="primary" onClick={() => downloadExcel()}>
      Download
    </Button>

    <Modal
      title="Adding New Type OF Material"
      open={open}
      onOk={() => addType()}
      onCancel={() => emptyFields()}
      confirmLoading={loading}   // ✅ spinner on OK button
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

    <Table rowKey="id"
      scroll={{ x: "max-content" }}
      columns={columns} dataSource={dataTypeOfMaterials} />
  </div>;
}
