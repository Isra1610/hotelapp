import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { AppBar, Toolbar } from "@mui/material";

const NavBar = () => {
	return (
		<AppBar position="sticky">
			<Toolbar>
				<h2>The Best Hotels</h2>
				<Button variant="contained" component={Link} to="/">
					Home
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default NavBar;
