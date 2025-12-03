import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

function AddNote(props) {
	const context = useContext(NoteContext);
	const { addNote } = context;

	const [note, setNote] = useState({
		title: "",
		description: "",
		tag: "",
	});

	const handleClick = (e) => {
		e.preventDefault();
		addNote(note.title, note.description, note.tag);
		setNote({ title: "", description: "", tag: "" });
		props.showAlert("Note added successfully", "success");
	};

	const onChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};
	return (
		<div className='add-note-container'>
			<h2>➕ Add a Note</h2>
			<form onSubmit={handleClick}>
				<div className='mb-3'>
					<label
						htmlFor='title'
						className='form-label'>
						Title
					</label>
					<input
						type='text'
						className='form-control'
						id='title'
						name='title'
						minLength={5}
						value={note.title}
						placeholder='Enter note title (min. 5 characters)'
						aria-describedby='titleHelp'
						onChange={onChange}
						required
					/>
				</div>
				<div className='mb-3'>
					<label
						htmlFor='description'
						className='form-label'>
						Description
					</label>
					<textarea
						className='form-control'
						id='description'
						name='description'
						rows='4'
						minLength={5}
						value={note.description}
						placeholder='Enter note description (min. 5 characters)'
						aria-describedby='descHelp'
						onChange={onChange}
						required
					/>
				</div>
				<div className='mb-3'>
					<label
						htmlFor='tag'
						className='form-label'>
						Tag
					</label>
					<input
						type='text'
						className='form-control'
						id='tag'
						name='tag'
						value={note.tag}
						placeholder='e.g., Personal, Work, Ideas (optional)'
						aria-describedby='tagHelp'
						onChange={onChange}
					/>
				</div>
				<button
					type='submit'
					className='btn btn-primary w-100'
					onClick={handleClick}>
					✨ Add Note
				</button>
			</form>
		</div>
	);
}

export default AddNote;
