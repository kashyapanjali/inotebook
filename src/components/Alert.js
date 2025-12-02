import React from "react";

function Alert({ alert }) {
	if (!alert) return null;
	let word = alert.type;
	if (word === "danger") {
		word = "error";
	}

	return (
		<div
			className={`alert alert-${alert.type} alert-dismissible fade show`}
			role='alert'>
			<strong>{alert.type.toUpperCase()}:</strong> {alert.message}
		</div>
	);
}

export default Alert;
