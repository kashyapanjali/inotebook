import React, { useContext, useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import NoteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

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

	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			getNotes();
		} else {
			props.showAlert("Please login to access your notes", "warning");
			navigate("/login");
		}
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
			<div className='notes-container'>
				<div className='notes-header'>
					<h2>📝 Your Notes</h2>
					<p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
						{notes.length === 0 
							? "Start by adding your first note above!" 
							: `You have ${notes.length} ${notes.length === 1 ? 'note' : 'notes'}`}
					</p>
				</div>
				{notes.length === 0 ? (
					<div className='empty-notes'>
						<p style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>📭</p>
						<p>No notes to display. Create your first note above!</p>
					</div>
				) : (
					<div className='notes-grid'>
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
				)}
			</div>
		</>
	);
}

export default Notes;
