import { Metadata } from "next";
import CustomerCountStatistics from "../../myComponents/statistics/CustomersCountStatistics";
import PropertiesCountStatistics from "../../myComponents/statistics/PropertiesCountStatistics";
import MaterialsCountStatistics from "../../myComponents/statistics/MaterialsCountStatistics";
import CompaniesCountStatistics from "../../myComponents/statistics/CompaniesCountStatistics";
import TypesOfPropertiesCountStatistics from "../../myComponents/statistics/TypesOfPropertiesCountStatistics";
import TypesOfWorksCountStatistics from "../../myComponents/statistics/TypesOfWorksCountStatistics";
import TypesOfOwneringsCountStatistics from "../../myComponents/statistics/TypesOfOwneringsCountStatistics";
import TypesOfMaterialsCountStatistics from "../../myComponents/statistics/TypesOfMaterialsCountStatistics";


export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | EmaarAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for EmaarAdmin Dashboard Template",
};

export default function GlobalStatistics() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* <!-- Statistics --> */}
      <div className="col-span-6 space-y-6 xl:col-span-6">
        <CustomerCountStatistics />
      </div>
      <div className="col-span-6 space-y-6 xl:col-span-6">
        <PropertiesCountStatistics />
      </div>
      <div className="col-span-6 space-y-6 xl:col-span-6">
        <MaterialsCountStatistics />
      </div>
      <div className="col-span-6 space-y-6 xl:col-span-6">
        <CompaniesCountStatistics />
      </div>
       <div className="col-span-6 space-y-6 xl:col-span-6">
        <TypesOfPropertiesCountStatistics />
      </div>
       <div className="col-span-6 space-y-6 xl:col-span-6">
        <TypesOfWorksCountStatistics />
      </div>
       <div className="col-span-6 space-y-6 xl:col-span-6">
        <TypesOfOwneringsCountStatistics />
      </div>
       <div className="col-span-6 space-y-6 xl:col-span-6">
        <TypesOfMaterialsCountStatistics />
      </div>
    </div>
  );
}
