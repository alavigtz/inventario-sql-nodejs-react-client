import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { HomeOutlined, ReconciliationOutlined, ShopOutlined, ShoppingOutlined } from "@ant-design/icons";

import "./MenuSider.scss";

function MenuSider(props) {
  //De withRouter se obtiene la props location; entre sus props contiene el pathname que se utilizara
  //cuando se recargue la pagina y se pinte el Menu.Item indicado 
  const { menuCollapsed, location } = props;
  const { Sider } = Layout;
  return (
    <Sider className="admin-sider" collapsed = {menuCollapsed}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
        <Menu.Item key="/admin">
          <Link to={"/admin"}>
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/users">
          <Link to={"/admin/inventory"}>
            <ReconciliationOutlined />
            <span className="nav-text">Inventario</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/branches">
          <Link to={"/admin/branches"}>
            <ShopOutlined />
            <span className="nav-text">Sucursales</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/products">
          <Link to={"/admin/products"}>
            <ShoppingOutlined />
            <span className="nav-text">Productos</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

//Se envuelve MenuSider con withRouter para identificar el path en el que se localiza la app
export default withRouter(MenuSider);
