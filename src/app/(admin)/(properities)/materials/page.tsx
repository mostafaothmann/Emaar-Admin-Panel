"use client"; // required in Next.js App Router


import { Button, Table } from "antd";
import { useEffect } from "react";
import * as XLSX from "xlsx";
import { useMaterialesDataStore } from "../../../../stores/materialesStore/data.store";

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
];



export default function MaterialsPage() {
  const { dataMaterials, getMaterialsData } = useMaterialesDataStore();
  //downloadExcel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataMaterials ?? []);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Materials");

    XLSX.writeFile(workbook, "Materials.xlsx");
  };
  useEffect(() => { getMaterialsData(); }, []);
  return<div>
    <Button type="primary" onClick={() => downloadExcel()}>
      Download
    </Button> 
    <Table columns={columns} dataSource={dataMaterials} />
    </div>;
}
