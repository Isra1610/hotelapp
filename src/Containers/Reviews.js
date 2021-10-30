import React, { useState } from "react";
import { useParams } from "react-router";
import useHoteles from "../hooks/useHoteles";
import InputReview from "../Components/InputReview";
import { Container } from "@mui/material";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

//--------API Fetch--------

const hotelApi =
	"https://my-json-server.typicode.com/manuelmebm/testing-hotel-api/hotels";

const reviewApi =
	"https://my-json-server.typicode.com/manuelmebm/testing-hotel-api/reviews";

const Reviews = () => {
	//--------State--------

	const [newReview, setNewReview] = useState("");
	const params = useParams();

	//--------API Fetch consts--------

	const hoteles = useHoteles(hotelApi);
	const reviews = useHoteles(reviewApi);

	//--------Sending new review--------

	const addReview = (newReviews, titelReview, rating) => {
		setNewReview([
			...newReview,
			{ name: newReviews, title: titelReview, rating: rating },
		]);
	};

	return (
		<Container>
			{hoteles[params.id - 1] && reviews ? (
				<Card sx={{ display: "flex", mb: 5, mt: 5 }}>
					<CardMedia
						component="img"
						sx={{ width: 250, height: 250 }}
						image={hoteles[params.id - 1].thumbnail}
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
								{hoteles[params.id - 1].title}
							</Typography>

							<Rating
								name="read-only"
								value={hoteles[params.id - 1].rating}
								readOnly
								sx={{ ml: 2 }}
							/>
						</Box>
						<Typography
							sx={{ pl: 2, pr: 2 }}
							variant="subtitle2"
							color="text.secondary"
							component="div"
						>
							{hoteles[params.id - 1].description}
						</Typography>
					</Box>
				</Card>
			) : (
				<div>
					<h1>No hay hoteles</h1>
				</div>
			)}
			{reviews ? (
				reviews
					.filter((r) => r.hotelId == params.id)
					.map((review) => (
						<Card sx={{ display: "flex", mb: 5, mt: 5 }}>
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
										{review.title}
									</Typography>

									<Rating
										name="read-only"
										value={review.rating}
										readOnly
										sx={{ ml: 2 }}
									/>
								</Box>
								<Typography
									sx={{ pl: 2, pr: 2, pb: 2 }}
									variant="subtitle2"
									color="text.secondary"
									component="div"
								>
									{review.description}
								</Typography>
							</Box>
						</Card>
					))
			) : (
				<div>
					<h1>No hay hoteles</h1>
				</div>
			)}
			{newReview ? (
				newReview.map((newReviews) => (
					<Card sx={{ display: "flex", mb: 5, mt: 5 }}>
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
									{newReviews.title}
								</Typography>

								<Rating name="read-only" value={newReviews.rating} readOnly />
							</Box>
							<Typography
								sx={{ pl: 2, pr: 2, pb: 2 }}
								variant="subtitle2"
								color="text.secondary"
								component="div"
							>
								{newReviews.name}
							</Typography>
						</Box>
					</Card>
				))
			) : (
				<div>
					<h1>No hay reviews nuevas</h1>
				</div>
			)}

			<InputReview addReview={addReview} />
		</Container>
	);
};

export default Reviews;
