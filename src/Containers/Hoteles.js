import React, { useState, useReducer } from "react";
import { Link } from "react-router-dom";
import useHoteles from "../hooks/useHoteles";
import { Container } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const API =
	"https://my-json-server.typicode.com/manuelmebm/testing-hotel-api/hotels";

//----------Reducer----------

const initialState = {
	favorites: [],
};

const favoriteReducer = (state, action) => {
	switch (action.type) {
		case "ADD_TO_FAVORITE":
			return {
				favorites: [...state.favorites, action.payload],
			};
		case "REMOVE_FROM_FAVORITE":
			return {
				favorites: state.favorites.filter(
					(favorite) => favorite.id !== action.payload
				),
			};
		default:
			return state;
	}
};

const Hoteles = () => {
	//---------useState---------

	const [flag, setFlag] = useState(false);
	const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

	//---------API Fetch---------

	const hoteles = useHoteles(API);

	//---------useReducer---------

	const addFav = (favorite) => {
		console.log(favorite);
		if (!favorites.favorites.find((fav) => fav.id === favorite.id)) {
			dispatch({
				type: "ADD_TO_FAVORITE",
				payload: { ...favorite, fav: true },
			});
		} else {
			dispatch({
				type: "ADD_TO_FAVORITE",
				payload: { ...favorite },
			});
		}
	};

	const deleteFav = (favorite) => {
		dispatch({
			type: "REMOVE_FROM_FAVORITE",
			payload: favorite.id,
		});
	};

	//---------FlagFunction for favorites---------

	const handleClick = () => {
		setFlag(!flag);
	};

	console.log(favorites);
	return (
		<Container>
			<div className="hotelFav__container">
				<label htmlFor="">Favorite Hotels</label>
				<Switch
					onChange={handleClick}
					inputProps={{ "aria-label": "controlled" }}
				/>
			</div>
			{flag === false
				? hoteles.map((hotel) => (
						<Card sx={{ display: "flex", mb: 5, mt: 5 }}>
							<CardMedia
								component="img"
								sx={{ width: 250, height: 250 }}
								image={hotel.thumbnail}
								alt="hotel"
							/>
							<Box sx={{ display: "flex", flexDirection: "column" }}>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										pl: 2,
										pb: 1,
										pt: 1,
									}}
								>
									<Link
										to={`/description/${hotel.id}`}
										style={{ textDecoration: "none" }}
									>
										<Typography component="div" variant="h5">
											{hotel.title}
										</Typography>
									</Link>

									<Rating
										name="read-only"
										value={hotel.rating}
										readOnly
										sx={{ ml: 2 }}
									/>
									<Checkbox
										icon={<FavoriteBorder />}
										checkedIcon={<Favorite />}
										type="checkbox"
										alt="favorite"
										className="heart"
										onChange={() => addFav(hotel)}
										sx={{ ml: 2 }}
									/>
								</Box>
								<Typography
									sx={{ pl: 2, pr: 2 }}
									variant="subtitle2"
									color="text.secondary"
									component="div"
								>
									{hotel.description}
								</Typography>
							</Box>
						</Card>
				  ))
				: favorites.favorites
						.filter((favorite) => favorite.fav === true)
						.map((favorite) => (
							<Card sx={{ display: "flex", mb: 5, mt: 5 }}>
								<CardMedia
									component="img"
									sx={{ width: 250, height: 250 }}
									image={favorite.thumbnail}
									alt="hotel"
								/>
								<Box sx={{ display: "flex", flexDirection: "column" }}>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											pl: 2,
											pb: 1,
											pt: 1,
										}}
									>
										<Typography component="div" variant="h5">
											{favorite.title}
										</Typography>
										<Rating
											name="read-only"
											value={favorite.rating}
											readOnly
											sx={{ ml: 2 }}
										/>
										<Button
											variant="outlined"
											startIcon={<DeleteIcon />}
											onClick={() => deleteFav(favorite)}
											sx={{ ml: 2 }}
										>
											Delete
										</Button>
									</Box>
									<Typography
										sx={{ pl: 2, pr: 2 }}
										variant="subtitle2"
										color="text.secondary"
										component="div"
									>
										{favorite.description}
									</Typography>
								</Box>
							</Card>
						))}
		</Container>
	);
};

export default Hoteles;
