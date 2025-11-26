import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const url = "http://localhost:3000/api";

	const initialNotes = [];
	const [notes, setNotes] = useState(initialNotes);

	//get all Notes
	const getNotes = async () => {
		const response = await fetch(`${url}/v1/notes/fetchallnotes`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkwZjFkOGI5OGZmYjVjZjY0YjM1YjA5In0sImlhdCI6MTc2MjYwMjA4NH0.ju1WBTnSjRWF_K5NM1WZq1bWQURhSp1UBTsBavV4IFU",
			},
		});

		const json = await response.json();
		setNotes(json);
		console.log(json);
	};
	//Add a Note
	const addNote = async (id, title, description, tag) => {
		const response = await fetch(`${url}/v1/notes/createnote/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkwZjFkOGI5OGZmYjVjZjY0YjM1YjA5In0sImlhdCI6MTc2MjYwMjA4NH0.ju1WBTnSjRWF_K5NM1WZq1bWQURhSp1UBTsBavV4IFU",
			},
			body: JSON.stringify({ title, description, tag }),
		});

		const json = await response.json();

		console.log("Adding a new note", json);
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
	const deleteNote = async (id) => {
		const response = await fetch(`${url}/v1/notes/deletenote/${id}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkwZjFkOGI5OGZmYjVjZjY0YjM1YjA5In0sImlhdCI6MTc2MjYwMjA4NH0.ju1WBTnSjRWF_K5NM1WZq1bWQURhSp1UBTsBavV4IFU",
			},
		});

		const json = await response.json();
		console.log(json);
		const newNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
	};

	//Edit a Note
	const editNote = async (id, title, description, tag) => {
		const response = await fetch(`${url}/v1/notes/updatenote/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkwZjFkOGI5OGZmYjVjZjY0YjM1YjA5In0sImlhdCI6MTc2MjYwMjA4NH0.ju1WBTnSjRWF_K5NM1WZq1bWQURhSp1UBTsBavV4IFU",
			},
			body: JSON.stringify({ title, description, tag }),
		});

		const json = await response.json();

		console.log(json);

		for (let i = 0; i < notes.length; i++) {
			const element = notes[i];
			if (element._id === id) {
				element.title = title;
				element.description = description;
				element.tag = tag;
			}
			console.log("edit a note");
		}
		return (
			<NoteContext.Provider
				value={{ notes, addNote, setNotes, deleteNote, getNotes, editNote }}>
				{props.children}
			</NoteContext.Provider>
		);
	};
};

export default NoteState;
