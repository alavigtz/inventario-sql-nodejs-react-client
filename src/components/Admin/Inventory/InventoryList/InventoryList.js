import React, { useState, useEffect } from "react";
import { Button, Table, Modal as ModalAntd, notification, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Modal from "../../../../components/Modal/Modal";
import {getInventoryApi} from '../../../../api/inventory';
import EditInventoryForm from '../../Inventory/EditInventoryForm/EditInventoryForm';

const { Column } = Table;
const { confirm } = ModalAntd;

export default function InventoryList(props) {
  const { branchId } = props;
  const [inventories, setInventories] = useState([]); 
  const [reloadInventories, setReloadInventories] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    getInventoryApi(branchId).then((response) => {
      //console.log(response);
      setInventories(response.inventory[0]);
    });
    setReloadInventories(false);
  }, [reloadInventories, branchId]);
  
  const editInventoryModal = (inventoryItem) => {
    setIsVisibleModal(true);
    setModalTitle(`Editando producto ${inventoryItem.Nombre}`);
    setModalContent(
      <EditInventoryForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadInventories={setReloadInventories}
        inventoryItem={inventoryItem}
      />
    );
  };


  return (
    <div className="products-list">
      <Table dataSource={inventories}>
        <Column title="Id" dataIndex="Id" key="Id" />
        <Column title="Nombre" dataIndex="Nombre" key="Nombre" />
        <Column
          title="Codigo de Barras"
          dataIndex="CodBarras"
          key="CodBarras"
        />
        <Column title="Cantidad" dataIndex="Cantidad" key="Cantidad" />
        <Column
          title="Precio Unitario"
          dataIndex="PrecioUnitario"
          key="PrecioUnitario"
        />
        <Column
          title="Editar"
          key="Id"
          render={(inventoryItem) => (
            <InventoryActions
              inventoryItem={inventoryItem}
              setReloadInventories={setReloadInventories}
              editInventoryModal={editInventoryModal}
            />
          )}
        />
      </Table>
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function InventoryActions(props) {
  const { inventoryItem, setReloadInventories, editInventoryModal} = props;
  
  return (
    <Space size="middle">
      <Button type="primary" onClick={() => editInventoryModal(inventoryItem)}>
        <EditOutlined />
      </Button>
    </Space>
  );
}
