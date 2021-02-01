import React, { useState } from "react";
import { Button, Table, Modal as ModalAntd, notification, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Modal from "../../../../components/Modal/Modal";
import AddProductForm from "../AddProductForm/AddProductForm";
import EditProductForm from "../EditProductForm/EditProductForm";
import { deleteProductApi } from "../../../../api/product";

import "./ProductsList.scss";

const { Column } = Table;
const { confirm } = ModalAntd;

export default function ProductsList(props) {
  const { products, setReloadProducts } = props;
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addProductModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo producto");
    setModalContent(
      <AddProductForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadProducts={setReloadProducts}
      />
    );
  };

  const editProductModal = (product) => {
    setIsVisibleModal(true);
    setModalTitle(`Editando producto ${product.Nombre}`);
    setModalContent(
      <EditProductForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadProducts={setReloadProducts}
        product={product}
      />
    );
  };

  return (
    <div className="products-list">
      <div className="products-list__header">
        <Button type="primary" onClick={addProductModal}>
          Nuevo producto
        </Button>
      </div>
      <Table dataSource={products}>
        <Column title="Id" dataIndex="Id" key="Id" />
        <Column title="Nombre" dataIndex="Nombre" key="Nombre" />
        <Column
          title="Codigo de Barras"
          dataIndex="CodBarras"
          key="CodBarras"
        />
        <Column
          title="Precio Unitario"
          dataIndex="PrecioUnitario"
          key="PrecioUnitario"
        />
        <Column
          title="Acciones"
          key="Id"
          render={(product) => (
            <Product
              product={product}
              editProductModal={editProductModal}
              setReloadProducts={setReloadProducts}
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

function Product(props) {
  const { product, setReloadProducts, editProductModal } = props;

  const showDeleteConfirm = () => {
    confirm({
      title: "Eliminando Producto",
      content: `¿Estas seguro que quieres eliminar el producto ${product.Nombre}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteProductApi(product.Id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            setReloadProducts(true);
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
    <Space size="middle">
      <Button type="primary" onClick={() => editProductModal(product)}>
        <EditOutlined />
      </Button>
      <Button type="danger" onClick={showDeleteConfirm}>
        <DeleteOutlined />
      </Button>
    </Space>
  );
}
