import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
	Checkbox,
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	ListSubheader,
	Paper,
} from "@mui/material";
import React, { useState } from "react";
import { LayersMenu, resourcesMenu } from "../../utils/resources";

export default function LayersSelector({
	onChange,
}: {
	onChange: (menu: LayersMenu) => void;
}) {
	const [menu, setMenu] = useState<LayersMenu>(resourcesMenu);

	const updateMenu = (menu: LayersMenu) => {
		setMenu(menu);
		onChange(menu);
	};

	return (
		// <Paper>
		<List
			style={{ maxHeight: "100vh", overflow: "auto" }}
			component="nav"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					Select visible resources
				</ListSubheader>
			}>
			{Object.entries(menu).map(([category, categoryData]) => {
				const open = categoryData.open;
				return (
					<>
						<ListItemButton
							onClick={() =>
								updateMenu({
									...menu,
									[category]: {
										...categoryData,
										open: !open,
									},
								})
							}>
							<ListItemText primary={category} />
							{open ? <ExpandLess /> : <ExpandMore />}
						</ListItemButton>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<List component="div" disablePadding>
								{Object.entries(categoryData.resources).map(
									([name, checked]) => {
										return (
											<ListItemButton
												onClick={() =>
													updateMenu({
														...menu,
														[category]: {
															open: categoryData.open,
															resources: {
																...categoryData.resources,
																[name]: !checked,
															},
														},
													})
												}
												sx={{ pl: 4 }}>
												<ListItemIcon>
													<Checkbox
														edge="start"
														checked={checked}
														tabIndex={-1}
														disableRipple
													/>
												</ListItemIcon>
												<ListItemText primary={name} />
											</ListItemButton>
										);
									}
								)}
							</List>
						</Collapse>
					</>
				);
			})}
		</List>
		// </Paper>
	);
}
