import React, { useContext, useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";

function Notes(props) {
	const context = useContext(NoteContext);
	const { notes, getNotes, editNote } = context;
	const [showModal, setShowModal] = useState(false);
	const [note, setNote] = useState({
		id: "",
		title: "",
		description: "",
		tag: "",
	});

	useEffect(() => {
		getNotes();
		// eslint-disable-next-line
	}, []);

	const handleEditClick = (currentNote) => {
		setNote({
			id: currentNote._id,
			title: currentNote.title,
			description: currentNote.description,
			tag: currentNote.tag || "",
		});
		setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
		setNote({ id: "", title: "", description: "", tag: "" });
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		editNote(note.id, note.title, note.description, note.tag);
		props.showAlert("Note updated successfully", "success");
		handleClose();
	};

	return (
		<>
			<AddNote showAlert={props.showAlert} />
			{/* Edit Note Modal */}
			<div
				className={`modal fade ${showModal ? "show" : ""}`}
				style={{ display: showModal ? "block" : "none" }}
				tabIndex='-1'
				role='dialog'>
				<div
					className='modal-dialog'
					role='document'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title'>Edit Note</h5>
							<button
								type='button'
								className='btn-close'
								onClick={handleClose}
								aria-label='Close'></button>
						</div>
						<div className='modal-body'>
							<form onSubmit={handleUpdate}>
								<div className='mb-3'>
									<label
										htmlFor='etitle'
										className='form-label'>
										Title
									</label>
									<input
										type='text'
										className='form-control'
										id='etitle'
										name='title'
										value={note.title}
										aria-describedby='titleHelp'
										onChange={onChange}
										required
									/>
								</div>
								<div className='mb-3'>
									<label
										htmlFor='edescription'
										className='form-label'>
										Description
									</label>
									<input
										type='text'
										className='form-control'
										id='edescription'
										name='description'
										value={note.description}
										aria-describedby='descHelp'
										onChange={onChange}
										required
									/>
								</div>
								<div className='mb-3'>
									<label
										htmlFor='etag'
										className='form-label'>
										Tag
									</label>
									<input
										type='text'
										className='form-control'
										id='etag'
										name='tag'
										value={note.tag}
										aria-describedby='descHelp'
										onChange={onChange}
									/>
								</div>
								<div className='modal-footer'>
									<button
										type='button'
										className='btn btn-secondary'
										onClick={handleClose}>
										Close
									</button>
									<button
										type='submit'
										className='btn btn-primary'>
										Save changes
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			{showModal && (
				<div
					className='modal-backdrop fade show'
					onClick={handleClose}></div>
			)}
			<div className='row my-3'>
				<h2>Your Notes</h2>
				<div className='container mx-2'>
					{notes.length === 0 && "No notes to display"}
				</div>
				{notes.map((note) => {
					return (
						<NoteItem
							key={note._id}
							note={note}
							handleEditClick={handleEditClick}
							showAlert={props.showAlert}
						/>
					);
				})}
			</div>
		</>
	);
}

export default Notes;
