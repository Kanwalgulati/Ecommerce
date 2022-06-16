import React from "react";
import "./Sidebar.css";
import { TreeView, TreeItem } from "@material-ui/lab";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { GiPostStamp } from "react-icons/gi";
import { CgAdd } from "react-icons/cg";
import { MdExpandMore, MdImportExport, MdRateReview } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { BsPeople } from "react-icons/bs";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>Dashboard</p>
      </Link>
      <Link to="#">
        <TreeView
          defaultCollapseIcon={<MdExpandMore />}
          defaultExpandIcon={<MdImportExport />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem
                nodeId="2"
                label="All"
                icon={<GiPostStamp />}
              ></TreeItem>
            </Link>
            <Link to="/admin/product">
              <TreeItem nodeId="3" label="create" icon={<CgAdd />}></TreeItem>
            </Link>
          </TreeItem>
        </TreeView>
      </Link>

      <Link to="/admin/orders">
        <p>
          <FaListAlt /> Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <BsPeople /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <MdRateReview /> Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
