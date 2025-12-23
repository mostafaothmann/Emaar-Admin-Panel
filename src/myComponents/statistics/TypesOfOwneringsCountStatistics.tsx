"use client";
import React, { useEffect } from "react";
import {  ArrowUpIcon, ChartColumnIcon } from "../../icons";
import { usePropertiesDataStore } from "../../stores/propertiesStore/data.store";
import { Badge } from "antd";

export default  function  TypesOfOwneringsCountStatistics (){
  const {dataTypeOfOwnerings,getTypeOfOwneringsData}=usePropertiesDataStore();
  useEffect(()=>{getTypeOfOwneringsData()},[])
  return (
<div className="w-full  grid grid-cols-4 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="w-full col-span-full rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <ChartColumnIcon className="text-gray-800 size-6 dark:text-white/90"/>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Types Of Ownerings
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {dataTypeOfOwnerings?.length}
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

    </div>
  );
};
