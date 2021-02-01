import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { getBranchesApi } from "../../../api/branch";
import { getInventoryApi } from "../../../api/inventory";
import InventoryList from "../../../components/Admin/Inventory/InventoryList/InventoryList";
import Item from "antd/lib/list/Item";

const { Option } = Select;

export default function Inventory() {
  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState(null);

  useEffect(() => {
    getBranchesApi().then((response) => {
      setBranches(response.branches[0]);
    }).catch(() => console.log("Error"))

    /*
    getInventoryApi(branchId).then((response) => {
      //console.log(response);
      setInventories(response.inventory);
    });
    */
  }, [branchId]);

  function onChange(value) {
    //console.log(`selected ${value}`);
    setBranchId(value);
  }

  return (
    <div className="inventory">
      <Select
        className="inventory__select"
        style={{ width: 200 }}
        placeholder="Seleccione una sucursal"
        onChange={onChange}
      >
        {branches.map((item) => {
          return <Option value={item.Id}>{item.Nombre}</Option>;
        })}
      </Select>
      <InventoryList branchId={branchId} />
    </div>
  );
}
