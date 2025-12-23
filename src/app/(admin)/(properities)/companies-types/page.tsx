"use client"; // required in Next.js App Router

import { Button, Input, Modal, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useCompanyDataStore } from "../../../../stores/companiesStore/data.store";


export default function CompaniesTypesPage() {
    const { dataTypesOfCompanies, deleteTypeOfCompany, editTypeOfCompany, addTypeOfCompany, getTypesOfCompaniesData } = useCompanyDataStore();
    /*  async function handleActivate(id: number, record: Company) {
         if (record.isActive == 0 || record.isActive == null)
             record.isActive = 1
         else if (record.isActive == 1 || record.isActive == null)
             record.isActive = 0
         await editTypeOfCompany(id, record);
         getTypesOfCompaniesData();
     } */
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            sorter: (a: any, b: any) => a.firstName.localeCompare(b.firstName),
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

    //downloadExcel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(dataTypesOfCompanies ?? []);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

        XLSX.writeFile(workbook, "Types-Of-Companies.xlsx");
    };
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
    //modal Functions
    async function addType() {
        setLoading(true);
        await addTypeOfCompany({ name, description });
        setLoading(false);
        getTypesOfCompaniesData();
        setName("")
        setDescription("")
        setOpen(false)
    }
    const emptyFields = () => {
        setName("")
        setDescription("")
        setOpen(false)
    }
    //delete Type
    async function handleDelete(id: number) {
        setLoading2(true);
        await deleteTypeOfCompany(id);
        getTypesOfCompaniesData();
        setLoading2(false);
        setOpen2(false);
    }

    //handleEdit
    async function handleEdit() {
        setLoading1(true);
        await editTypeOfCompany(editedId, { name: name1, description: description1 });
        setLoading1(false);
        setOpen1(false);
        getTypesOfCompaniesData();
    }
    const openEditModal = (id: number) => {
        setEditedId(id);
        const material = dataTypesOfCompanies?.find(
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
    useEffect(() => { getTypesOfCompaniesData(); }, []);
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
        <Table columns={columns} dataSource={dataTypesOfCompanies} />;
    </div>
}
