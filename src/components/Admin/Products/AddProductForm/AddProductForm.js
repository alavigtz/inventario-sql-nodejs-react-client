import React, { useState } from "react";
import { Form, Row, Col, Input, Button, notification } from "antd";
import {
  ShoppingOutlined,
  BarcodeOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { addProductApi } from "../../../../api/product";
import { getBranchesIdApi } from "../../../../api/branch";
import { addInventoryApi } from "../../../../api/inventory";

export default function AddProductForm(props) {
  const { setIsVisibleModal, setReloadProducts } = props;
  const [productData, setProductData] = useState({});

  const addProduct = () => {
    if (!productData.name || !productData.barcode || !productData.price) {
      notification["info"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      addProductApi(productData)
        .then((response) => {
          const notificationType =
            response.code === 200 ? "success" : "warning";
          notification[notificationType]({
            message: response.message,
          });

          const productId = response.product.Id;
          //console.log(response.product.Id);
          getBranchesIdApi()
            .then((response) => {
              response.branchesId[0].map((branchId) => {
                //return console.log(branchId.Id);
                let inventoryData = {
                  branchId: branchId.Id,
                  productId: productId,
                  quantity: 0,
                };
                return addInventoryApi(inventoryData)
                  .then(() => {
                    
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
              //console.log(response.branchesId[0][0].Id);
            })
            .catch((err) => {
              console.log(err);
            });

          setIsVisibleModal(false);
          setReloadProducts(true);
          setProductData({});
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
      <Form className="form-add" onFinish={addProduct}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<ShoppingOutlined />}
                placeholder="Nombre del producto"
                value={productData.name}
                onChange={(e) =>
                  setProductData({ ...productData, name: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<BarcodeOutlined />}
                placeholder="Codigo de barras"
                value={productData.barcode}
                onChange={(e) =>
                  setProductData({ ...productData, barcode: e.target.value })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Input
                prefix={<DollarOutlined />}
                placeholder="Precio Unitario"
                value={productData.price}
                onChange={(e) =>
                  setProductData({ ...productData, price: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Crear Producto
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
