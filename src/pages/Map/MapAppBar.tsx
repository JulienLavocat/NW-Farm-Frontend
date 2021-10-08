import React, { useState } from "react";
import {
	AppBar,
	Button,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function MapAppBar() {
	const history = useHistory();
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						onClick={() => setOpen(true)}
						className={classes.menuButton}
						color="inherit"
						aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						className={classes.title}
						onClick={() => history.push("/")}>
						New World Tools
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer open={open} onClose={() => setOpen(false)}>
				<List>
					{["Iron", "Starred", "Send email", "Drafts"].map(
						(text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>
									{/* {index % 2 === 0 ? (
										<InboxIcon />
									) : (
										<MailIcon />
									)} */}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						)
					)}
				</List>
			</Drawer>
		</div>
	);
}
