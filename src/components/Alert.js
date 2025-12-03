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
			role='alert'
			style={{
				position: 'fixed',
				top: '80px',
				right: '20px',
				zIndex: 9999,
				minWidth: '300px',
				maxWidth: '500px',
				animation: 'slideDown 0.3s ease-out'
			}}>
			<strong style={{ textTransform: 'capitalize' }}>
				{alert.type === 'danger' ? '⚠️ Error' : 
				 alert.type === 'success' ? '✅ Success' :
				 alert.type === 'warning' ? '⚠️ Warning' : 'ℹ️ Info'}:
			</strong> {alert.message}
		</div>
	);
}

export default Alert;
