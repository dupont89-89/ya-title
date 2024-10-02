import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { Link } from "react-router-dom";

export default function MenuToolbar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const tools = [
    {
      name: "Создание Title",
      link: "/app/seo-title/",
      icon: <CreditCardIcon ontSize="small" />,
    },
    {
      name: "Определение типа ключевого запроса",
      link: "/app/commerce-key/",
      icon: <CreditCardIcon ontSize="small" />,
    },
    {
      name: "Проверка частотности запросов",
      link: "/app/wordstat/",
      icon: <CreditCardIcon ontSize="small" />,
    },
    {
      name: "Whois проверка домена",
      link: "/app/whois/",
      icon: <CreditCardIcon ontSize="small" />,
    },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {tools.map((tools, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton to={tools.link} component={Link}>
              <ListItemIcon>{tools.icon}</ListItemIcon>
              <ListItemText primary={tools.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Button
        sx={{ my: 2, color: "white" }}
        onClick={toggleDrawer(true)}
        startIcon={<MenuOpenIcon />}
        variant="outlined"
        color="white"
      >
        Инструменты
      </Button>
      <Drawer
        disableScrollLock={true}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
