import React, { useState } from "react";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Modal from "../../../../components/Modal/Modal";
import AddBranchForm from "../AddBranchForm/AddBranchForm";
import EditBranchForm from "../EditBranchForm/EditBranchForm";
import { deleteBranchApi } from "../../../../api/branch";

import "./BranchesList.scss";

const { confirm } = ModalAntd;

export default function BranchesList(props) {
  const { branches, setReloadBranches } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addBranchModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nueva sucursal");
    setModalContent(
      <AddBranchForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadBranches={setReloadBranches}
      />
    );
  };

  const editBranchModal = (branch) => {
    setIsVisibleModal(true);
    setModalTitle(`Editando sucursal ${branch.Nombre}`);
    setModalContent(
      <EditBranchForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadBranches={setReloadBranches}
        branch={branch}
      />
    );
  };

  return (
    <div className="branches-list">
      <div className="branches-list__header">
        <Button type="primary" onClick={addBranchModal}>
          Nueva sucursal
        </Button>
      </div>
      <List
        className="branches-list__content"
        itemLayout="horizontal"
        dataSource={branches}
        renderItem={(branch) => (
          <Branch
            branch={branch}
            editBranchModal={editBranchModal}
            setReloadBranches={setReloadBranches}
          />
        )}
      />
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

function Branch(props) {
  const { branch, editBranchModal, setReloadBranches } = props;

  const showDeleteConfirm = () => {
    confirm({
      title: "Eliminando Sucursal",
      content: `¿Estas seguro que quieres eliminar la sucursal ${branch.Nombre}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteBranchApi(branch.Id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadBranches(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editBranchModal(branch)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={showDeleteConfirm}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta title={branch.Nombre} />
    </List.Item>
  );
}
