import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

function NoteItem(props) {
	const { deleteNote } = useContext(NoteContext);
	const { note, handleEditClick, showAlert } = props;

	return (
		<div className='note-item'>
			<div className='card'>
				<div className='card-body'>
					<div className='d-flex justify-content-between align-items-start mb-3'>
						<h5 className='card-title' style={{ flex: 1, marginRight: '1rem' }}>
							{note.title}
						</h5>
						<div className='note-actions'>
							<i
								className='fa-regular fa-pen-to-square note-action-icon edit'
								onClick={() => handleEditClick(note)}
								title='Edit note'></i>
							<i
								className='fa-regular fa-trash-can note-action-icon delete'
								onClick={() => {
									deleteNote(note._id);
									showAlert("Note deleted successfully", "success");
								}}
								title='Delete note'></i>
						</div>
					</div>
					<p className='card-text' style={{ marginBottom: '1rem', minHeight: '3rem' }}>
						{note.description}
					</p>
					{note.tag && (
						<span className='note-tag'>
							🏷️ {note.tag}
						</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default NoteItem;
