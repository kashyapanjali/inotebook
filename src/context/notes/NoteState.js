import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const initialNotes = [
		{
			_id: "69196804b91986924dabe5aa3",
			user: "690f1d8b98ffb5cf64b35b09",
			title: "title1",
			description: "This biography based about anjali kashyap",
			tag: "#mynbiography",
			date: "2025-11-16T05:58:28.768Z",
			__v: 0,
		},
		{
			_id: "69196804b9198694dabe15aa8",
			user: "690f1d8b98ffb5cf64b35b09",
			title: "title2",
			description: "This biography based about anjali kashyapp",
			tag: "#mynbiography1",
			date: "2025-11-16T05:58:28.768Z",
			__v: 1,
		},
		{
			_id: "69196804b9198694dabe25aa8",
			user: "690f1d8b98ffb5cf64b35b09",
			title: "title2",
			description: "This biography based about anjali kashyapp",
			tag: "#mynbiography1",
			date: "2025-11-16T05:58:28.768Z",
			__v: 1,
		},
		{
			_id: "69196804b9198694dabe5aa8",
			user: "690f1d8b98ffb5cf64b35b09",
			title: "title2",
			description: "This biography based about anjali kashyapp",
			tag: "#mynbiography1",
			date: "2025-11-16T05:58:28.768Z",
			__v: 1,
		},
		{
			_id: "69196804b9198694dabe5aa2",
			user: "690f1d8b98ffb5cf64b35b09",
			title: "title2",
			description: "This biography based about anjali kashyapp",
			tag: "#mynbiography1",
			date: "2025-11-16T05:58:28.768Z",
			__v: 1,
		},
	];
	const [notes, setNotes] = useState(initialNotes);

	//Add a Note
	const addNote = (title, description, tag) => {
		console.log("Adding a new note");
		const note = {
			_id: "69196804b9198694dabe5aa2",
			user: "690f1d8b98ffb5cf64b35b09",
			title: title,
			description: description,
			tag: tag,
			date: "2025-11-16T05:58:28.768Z",
			__v: 1,
		};

		setNotes((prevNotes) => prevNotes.concat(note));
	};
	//Delete a Note
	const deleteNote = () => {
		console.log("Deleting the note" + id);
		const newNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
	};

	//Edit a Note
	const editNote = (id, title, description, tag) => {

		for(let i=0; i<notes.length; i++){
		  const element = notes[i];	
		  if(element._id===id){
			element.title=title;
			element.description=description;
			element.tag=tag;
		  }
		console.log("edit a note");
	};
	return (
		<NoteContext.Provider value={{ notes, addNote, setNotes }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
