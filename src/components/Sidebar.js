import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Box, IconButton } from "@mui/material";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
import { useNavigate } from "react-router-dom/dist";
import { styled } from "@mui/material/styles";

import AvmLogo from "../images/favicon.png";
import routes from "../constants/Routes";

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  "& > *": {
    position: "unset",
    height: "100vh",
    ...(!open && { border: "none" }),
  },
}));

const Sidebar = () => {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(true);

  const handleMenuIconClick = () => {
    setIsExpanded((prev) => !prev);
  };

  const isActive = (route) => window.location.pathname === route;

  return (
    <StyledDrawer
      variant="permanent"
      open={isExpanded}
      onClose={() => setIsExpanded(false)}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          sx={{ height: "fit-content" }}
          onClick={handleMenuIconClick}
        >
          {isExpanded ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <img style={{ height: 72 }} src={AvmLogo} alt={"avm-logo"} />
        <div style={{ width: "24px" }} />
      </Box>

      {isExpanded && (
        <List>
          {Object.keys(routes).map((key, index) => (
            <ListItem
              button
              key={routes[key].route}
              selected={isActive(routes[key].route)} // This marks the item as active based on the current route
              onClick={() => navigate(routes[key].route)}
            >
              <ListItemIcon style={{ marginRight: "-24px" }}>
                <ChevronRightIcon />
              </ListItemIcon>
              <ListItemText primary={routes[key].name} />
            </ListItem>
          ))}
        </List>
      )}
    </StyledDrawer>
  );
};

export default Sidebar;
