import Hoteles from "./Containers/Hoteles";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Reviews from "./Containers/Reviews";
import NavBar from "./Components/NavBar";
import { Container } from "@mui/material";

import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<Container>
				<NavBar />
				<Switch>
					<Route exact path="/" component={Hoteles} />
					<Route path="/description/:id" component={Reviews} />
				</Switch>
			</Container>
		</BrowserRouter>
	);
}

export default App;
