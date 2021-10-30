import React, { useState } from "react";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { FormControl, TextField } from "@mui/material";

const InputReview = ({ addReview }) => {
	//-------State-------

	const [currentValue, setCurrentValue] = useState(2);
	const [titelReview, setTitleReview] = useState("");
	const [review, setReview] = useState("");

	//-------Functions-------

	const handleChange = (e) => {
		const { value } = e.target;
		setReview(value);
	};

	const handleChangeB = (e) => {
		const { value } = e.target;
		setTitleReview(value);
	};

	const handleSave = () => {
		addReview(review, titelReview, currentValue);
		setReview("");
		setTitleReview("");
		setCurrentValue(0);
	};

	return (
		<FormControl sx={{ mb: 10 }}>
			<h2> Add Review </h2>
			<Rating
				name="simple-controlled"
				value={currentValue}
				onChange={(event, newValue) => {
					setCurrentValue(newValue);
				}}
				sx={{ mb: 2 }}
			/>
			<TextField
				placeholder="Add review title"
				value={titelReview}
				onChange={handleChangeB}
			/>
			<TextField
				placeholder="Add review"
				value={review}
				onChange={handleChange}
			/>

			<Button variant="contained" onClick={handleSave}>
				Add
			</Button>
		</FormControl>
	);
};

export default InputReview;
