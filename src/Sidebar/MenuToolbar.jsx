import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { Link } from "react-router-dom";

export default function MenuToolbar(props) {
  const { openMob } = props;

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    setOpen(openMob);
  }, [openMob]);

  const tools = [
    {
      name: "Создание Title",
      link: "/app/seo-title/",
      icon: "/img/icon/free-icon-letter-t-12559033.png",
    },
    {
      name: "Определение типа ключевого запроса",
      link: "/app/commerce-key/",
      icon: "/img/icon/free-icon-faq-5750288.png",
    },
    {
      name: "Проверка частотности запросов",
      link: "/app/wordstat/",
      icon: "/img/icon/free-icon-increase-3621024.png",
    },
    {
      name: "Whois проверка домена",
      link: "/app/whois/",
      icon: "/img/icon/free-icon-domain-name-17009592.png",
    },
  ];

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {tools.map((tools, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton to={tools.link} component={Link}>
              <ListItemIcon>
                <Box sx={{ width: "20px" }} src={tools.icon} component="img" />
              </ListItemIcon>
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
