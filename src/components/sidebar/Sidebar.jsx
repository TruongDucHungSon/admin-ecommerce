import {
  Category as CategoryIcon,
  ChevronRight as ChevronRightIcon,
  ExpandMore as ExpandMoreIcon,
  Person as PersonIcon,
  ShoppingBasket as ShoppingBasketIcon,
} from "@mui/icons-material";
import { Collapse, List, ListItem, ListItemText } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [submenuStates, setSubmenuStates] = useState({
    user: false,
    product: false,
    category: false,
  });

  const handleToggle = (option) => {
    setSubmenuStates((prevStates) => ({
      ...prevStates,
      [option]: !prevStates[option],
    }));
  };

  const submenuData = [
    {
      title: "Home",
      key: "home",
      icon: <PersonIcon />,
      items: [{ label: "Statistics", to: "/" }],
    },
    {
      title: "User",
      key: "user",
      icon: <PersonIcon />,
      items: [
        { label: "List", to: "/user" },
        { label: "Create User", to: "/user/create" },
      ],
    },
    {
      title: "Product",
      key: "product",
      icon: <ShoppingBasketIcon />,
      items: [
        { label: "List", to: "/product" },
        { label: "Create Product", to: "/product/create" },
      ],
    },
    {
      title: "Category",
      key: "category",
      icon: <CategoryIcon />,
      items: [
        { label: "List category", to: "/category" },
        { label: "Create Category", to: "/create-category" },
      ],
    },
    {
      title: "Order",
      key: "order",
      icon: <CategoryIcon />,
      items: [{ label: "List Order", to: "/order" }],
    },
  ];

  return (
    <div className="h-screen p-6 text-white bg-gray-800 w-[360px] sidebar">
      <h2 className="mb-6 text-xl font-bold text-center">Admin Panel</h2>
      <List component="nav">
        {submenuData.map((submenu) => (
          <div key={submenu.key}>
            <ListItem
              button
              onClick={() => handleToggle(submenu.key)}
              className="flex gap-4 px-4 py-2 rounded cursor-pointer hover:bg-gray-700"
            >
              {submenu.icon}
              <ListItemText primary={submenu.title} />
              {submenuStates[submenu.key] ? (
                <ExpandMoreIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </ListItem>
            <Collapse
              in={submenuStates[submenu.key]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {submenu.items.map((item) => (
                  <ListItem
                    key={item.label}
                    button
                    component={Link}
                    to={item.to}
                    className="py-2 px-3 pl-8 list-disc rounded hover:bg-gray-700"
                  >
                    <ListItemText primary={item.label} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
