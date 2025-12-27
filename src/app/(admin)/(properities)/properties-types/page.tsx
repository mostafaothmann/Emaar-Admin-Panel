"use client"; // required in Next.js App Router

"use client"; // required in Next.js App Router

import { Table, Button, Modal, Input, Space, Upload } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import * as XLSX from "xlsx";
import { usePropertiesDataStore } from "../../../../stores/propertiesStore/data.store";
import { PlusOutlined } from "@ant-design/icons";
import { apiTypeOfPropertyImage } from "../../../../stores/api";


export default function TypesOfPropertiesPage() {
  const { dataTypeOfProperties, editTypeOfProperty, deleteTypeOfProperty, addTypeOfProperty, getTypeOfPropertiesData } = usePropertiesDataStore();
  async function handleDelete(id: number) {
    setLoading2(true);
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

  //Edit Modal Constants
  const [name1, setName1] = useState("");
  const [editedId, setEditedId] = useState(0)
  const [fileList1, setFileList1] = useState([]);
  const [description1, setDescription1] = useState("");
  const [open1, setOpen1] = useState(false);
  const [loading1, setLoading1] = useState(false);

  //Add Image List Constants
  const [fileList, setFileList] = useState([]);

  //handleEdit function
  async function handleEdit() {
    setLoading1(true);
    const formData = new FormData();
    formData.append("image", fileList1[0]?.originFileObj);
    formData.append("folderName", "TypesOfProperties");
    const res = await apiTypeOfPropertyImage.post('', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    const image = res.data
    await editTypeOfProperty(editedId, { name: name1, description: description1, image: image });
    setLoading1(false);
    setOpen1(false);
    getTypeOfPropertiesData();
  }

  //openEditModal function
  const openEditModal = (id: number) => {
    setEditedId(id);
    const typeOfProperty = dataTypeOfProperties?.find(
      item => item.id === id
    );
    setFileList1([{
      uid: "-1",
      name: "image.png",
      status: "done",
      url: typeOfProperty?.image || "",
    },])
    setName1(typeOfProperty?.name || "");
    setDescription1(typeOfProperty?.description || "");
    setOpen1(true);
  }

  //openDeleteModal function
  const openDeleteModal = (id: number) => {
    setDelitedID(id);
    setOpen2(true);
  }

  //addType function
  async function addType() {
    const formData = new FormData();
    formData.append("image", fileList[0]?.originFileObj);
    formData.append("folderName", "TypesOfProperties");
    const res = await apiTypeOfPropertyImage.post('', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    const image = res.data
    await addTypeOfProperty({ name, description, image })
    getTypeOfPropertiesData();
    setFileList([])
    setName("")
    setDescription("")
    setOpen(false)
  }

  //emptyFields function
  const emptyFields = () => {
    setName("")
    setFileList([])
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
      <div className="grid grid-cols-12 gap-2">
        <div className="sm:col-span-4  space-y-6 xl:col-span-6 col-span-12 ">
          {/*Drop Image*/}
          <Upload
            style={{ width: "200px", height: "150px", maxWidth: "200px", maxHeight: "130px" }}
            listType="picture-card"
            fileList={fileList}
            beforeUpload={() => false} // 🚫 prevent upload
            onChange={({ fileList }) => setFileList(fileList)}
            maxCount={1}
            accept="image/*"
          >
            {fileList.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </div>
        <div className="grid grid-cols-12 sm:col-span-8  col-span-12 gap-1">
          <div className="col-span-12">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="col-span-12">
            <TextArea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Description"
            />
          </div>
        </div>
      </div>
    </Modal>

    <Modal
      title="Editing Type"
      open={open1}
      onOk={() => handleEdit()}
      onCancel={() => setOpen1(false)}
      confirmLoading={loading1}   // ✅ spinner on OK button
      mask={false}
    >
      <div className="grid grid-cols-12 gap-2">
        <div className="sm:col-span-4  space-y-6 xl:col-span-6 col-span-12 ">
          <Upload
            style={{ width: "200px", height: "150px", maxWidth: "200px", maxHeight: "130px" }}
            listType="picture-card"
            fileList={fileList1}
            beforeUpload={() => false} // 🚫 prevent upload
            onChange={({ fileList }) => setFileList1(fileList)}
            maxCount={1}
            accept="image/*"
          >
            {fileList1.length >= 1 ? null : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </div>
        <div className="grid grid-cols-12 sm:col-span-8  col-span-12 gap-1">
          <div className="col-span-12">
            <Input
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="col-span-12">
            <TextArea
              value={description1}
              onChange={(e) => setDescription1(e.target.value)}
              rows={4}
              placeholder="Description"
            />
          </div>
        </div>
      </div>
    </Modal>
    <Table rowKey="id"
      columns={columns} dataSource={dataTypeOfProperties} />

  </div >

}
