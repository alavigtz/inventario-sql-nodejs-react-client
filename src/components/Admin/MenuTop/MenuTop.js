import React from "react";
import { Button } from "antd";
import { PoweroffOutlined, MenuUnfoldOutlined, MenuFoldOutlined  } from "@ant-design/icons";
import HDLogo from "../../../assets/img/png/logo-white.png";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const {menuCollapsed, setMenuCollapsed} = props;
  
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={HDLogo} alt="EmpresaX Logo" />
        <Button type="link" onClick = {() => setMenuCollapsed(!menuCollapsed)}>
          {menuCollapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        </Button>
      </div>
    </div>
  );
}
