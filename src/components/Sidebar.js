import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import AvmLogo from "../images/favicon.png";
import { Box } from "@mui/material";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import routes from "../constants/Routes";
import { useNavigate } from "react-router-dom/dist";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Drawer variant="permanent" open={true}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img style={{ height: 72 }} src={AvmLogo} alt={"avm-logo"} />
        </Box>
        <List>
          {Object.keys(routes).map((key, index) => (
            <ListItem
              button
              key={routes[key].route}
              onClick={() => navigate(routes[key].route)}
            >
              <ListItemIcon style={{ marginRight: "-24px" }}>
                <ChevronRightIcon />
              </ListItemIcon>
              <ListItemText primary={routes[key].name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
