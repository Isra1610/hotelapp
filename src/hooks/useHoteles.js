import { useState, useEffect } from "react";

const useHoteles = (url) => {
	const [hoteles, setHoteles] = useState([]);
	useEffect(() => {
		fetch(url)
			.then((response) => response.json())
			.then((data) => setHoteles(data));
	}, [url]);
	return hoteles;
};

export default useHoteles;
