import React, { useState } from "react";
import { Form, Row, Col, Input, Button, notification } from "antd";
import { ShopOutlined } from "@ant-design/icons";
import { addBranchApi } from "../../../../api/branch";

import './AddBranchForm.scss';

export default function AddBranchForm(props) {
  const { setIsVisibleModal, setReloadBranches } = props;
  const [branchData, setBranchData] = useState({});

  const addBranch = () => {
    if (!branchData.name) {
      notification["info"]({
        message: "Este campo es obligatorio",
      });
    } else {
      addBranchApi(branchData)
        .then((response) => {
          const notificationType =
            response.code === 200 ? "success" : "warning";
          notification[notificationType]({
            message: response.message,
          });
          setIsVisibleModal(false);
          setReloadBranches(true);
          setBranchData({});
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
      <Form className="form-add" onFinish={addBranch}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item>
              <Input
                prefix={<ShopOutlined />}
                placeholder="Nombre de la sucursal"
                value={branchData.name}
                onChange={(e) =>
                  setBranchData({ ...branchData, name: e.target.value })
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn-submit">
            Crear Sucursal
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
