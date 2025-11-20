import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

function NoteItem(props) {
	const { deleteNote } = useContext(NoteContext);
	const { note } = props;

	return (
		<div className='col-md-3'>
			<div className='card my-3'>
				<div className='card-body'>
					<div className='d-flex justify-content-between align-items-center'>
						<h5 className='card-title'>{note.title}</h5>
						<div>
							<i className='fa-regular fa-pen-to-square mx-2'></i>
							<i
								className='fa-regular fa-trash-can mx-2'
								onClick={() => deleteNote(note._id)}
								style={{ cursor: "pointer" }}></i>
						</div>
					</div>
					<p className='card-text'>{note.description}</p>
				</div>
			</div>
		</div>
	);
}

export default NoteItem;
