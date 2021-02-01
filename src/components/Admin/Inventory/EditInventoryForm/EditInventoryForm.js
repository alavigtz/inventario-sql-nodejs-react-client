import React, { useState, useEffect } from "react";
import { Form, Row, Col, Input, Button, notification } from "antd";
import { ShopOutlined, AppstoreAddOutlined} from "@ant-design/icons";
import { updateInventoryApi } from "../../../../api/inventory";

export default function EditInventoryForm(props) {
  const { inventoryItem, setIsVisibleModal, setReloadInventories } = props;
  const [inventoryData, setInventoryData] = useState({});

  useEffect(() => {
    setInventoryData({
      id: inventoryItem.Id,
      name: inventoryItem.Nombre,
      barcode: inventoryItem.CodBarras,
      quantity: inventoryItem.Cantidad,
      price: inventoryItem.PrecioUnitario,
    });
  }, [inventoryItem]);

  const editInventary = () => {
    if (!inventoryData.quantity) {
      notification["info"]({
        message: "Este campo es obligatorio",
      });
    } else {
      updateInventoryApi(inventoryData.id, inventoryData)
        .then((response) => {
          const notificationType =
            response.code === 200 ? "success" : "warning";
          notification[notificationType]({
            message: response.message,
          });
          setIsVisibleModal(false);
          setReloadInventories(true);
          setInventoryData({});
        })
        .catch((err) => {
          notification["error"]({
            message: err.message,
          });
        });
    }
  };

  return (
    <div className="add-branch-form">
      <Form className="form-add" onFinish={editInventary}>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<ShopOutlined />}
                placeholder="Nombre del producto"
                value={inventoryData.name}
                onChange={(e) =>
                  setInventoryData({ ...inventoryData, name: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<AppstoreAddOutlined />}
                placeholder="Cantidad"
                value={inventoryData.quantity}
                onChange={(e) =>
                  setInventoryData({ ...inventoryData, quantity: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Editar Elemento
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
