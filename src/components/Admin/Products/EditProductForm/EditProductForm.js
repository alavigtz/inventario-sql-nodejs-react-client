import React, {useState, useEffect} from "react";
import { Form, Row, Col, Input, Button, notification } from "antd";
import {
  ShoppingOutlined,
  BarcodeOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { updateProductApi } from "../../../../api/product";

export default function EditProductForm(props) {
  const { product, setIsVisibleModal, setReloadProducts } = props;
  const [productData, setProductData] = useState({});

  useEffect(() => {
    setProductData({
      id: product.Id,
      name: product.Nombre,
      barcode: product.CodBarras,
      price: product.PrecioUnitario
    });
  }, [product]);

  const editProduct = () => {
    if (!productData.name || !productData.barcode || !productData.price) {
      notification["info"]({
        message: "Estos campos son obligatorios",
      });
    } else {
      updateProductApi(productData.id, productData)
        .then((response) => {
          const notificationType =
            response.code === 200 ? "success" : "warning";
          notification[notificationType]({
            message: response.message,
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
      <Form className="form-add" onFinish={editProduct}>
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
