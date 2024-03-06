// Import necessary React and Material UI components
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

// Import the logo and the routes configuration
import AvmLogo from "../images/favicon.png";
import routes from "../constants/Routes";

// Customize the Drawer component using MUI's styled API, adjusting based on the 'open' state
const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  "& > *": {
    position: "unset",
    height: "100vh", // Full height
    ...(!open && { border: "none" }), // Remove border when not expanded
  },
}));

// Sidebar component definition
const Sidebar = () => {
  // Hook to navigate programmatically with React Router
  const navigate = useNavigate();

  // State to control the expansion of the sidebar
  const [isExpanded, setIsExpanded] = useState(true);

  // Toggle sidebar expansion state
  const handleMenuIconClick = () => {
    setIsExpanded((prev) => !prev);
  };

  // Helper function to determine if a route is active
  const isActive = (route) => window.location.pathname === route;

  // Render the sidebar
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
        {/* Toggle button to expand/collapse the sidebar */}
        <IconButton
          sx={{ height: "fit-content" }}
          onClick={handleMenuIconClick}
        >
          {isExpanded ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        {/* Logo */}
        <img style={{ height: 72 }} src={AvmLogo} alt={"avm-logo"} />
        {/* Spacer */}
        <div style={{ width: "24px" }} />
      </Box>

      {/* Conditionally render the list of navigation items if the sidebar is expanded */}
      {isExpanded && (
        <List>
          {Object.keys(routes).map((key, index) => (
            <ListItem
              button
              key={routes[key].route}
              selected={isActive(routes[key].route)} // Highlights the active route
              onClick={() => navigate(routes[key].route)} // Navigate on click
            >
              {/* Icon to the left of the text */}
              <ListItemIcon style={{ marginRight: "-24px" }}>
                <ChevronRightIcon />
              </ListItemIcon>
              {/* Text label of the route */}
              <ListItemText primary={routes[key].name} />
            </ListItem>
          ))}
        </List>
      )}
    </StyledDrawer>
  );
};

// Export the Sidebar component for use in other parts of the application
export default Sidebar;
