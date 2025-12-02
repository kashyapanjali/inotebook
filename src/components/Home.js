import React from "react";
import Notes from "./Notes";

function Home(props) {
	//destructuring showAlert from props
	const { showAlert } = props;
	return (
		<div>
			<Notes showAlert={showAlert} />
		</div>
	);
}

export default Home;
