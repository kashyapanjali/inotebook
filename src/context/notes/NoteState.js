import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
	const url = "http://localhost:3000/api";

	const initialNotes = [];
	const [notes, setNotes] = useState(initialNotes);

	//get all Notes
	const getNotes = async () => {
		const response = await fetch(`${url}/v1/notes/fetchallnote`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkwZjFkOGI5OGZmYjVjZjY0YjM1YjA5In0sImlhdCI6MTc2MjYwMjA4NH0.ju1WBTnSjRWF_K5NM1WZq1bWQURhSp1UBTsBavV4IFU",
			},
		});

		const json = await response.json();
		setNotes(json);
	};
	//Add a Note
	const addNote = async (title, description, tag) => {
		const response = await fetch(`${url}/v1/notes/createnote`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkwZjFkOGI5OGZmYjVjZjY0YjM1YjA5In0sImlhdCI6MTc2MjYwMjA4NH0.ju1WBTnSjRWF_K5NM1WZq1bWQURhSp1UBTsBavV4IFU",
			},
			body: JSON.stringify({ title, description, tag }),
		});

		const json = await response.json();
		setNotes((prevNotes) => [...prevNotes, json]);
	};
	//Delete a Note
	const deleteNote = async (id) => {
		const response = await fetch(`${url}/v1/notes/deletenote/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"auth-token":
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjkwZjFkOGI5OGZmYjVjZjY0YjM1YjA5In0sImlhdCI6MTc2MjYwMjA4NH0.ju1WBTnSjRWF_K5NM1WZq1bWQURhSp1UBTsBavV4IFU",
			},
		});

		const json = await response.json();
		const newNotes = notes.filter((note) => {
			return note._id !== id;
		});
		setNotes(newNotes);
	};

	//Edit a Note
	const editNote = async (id, title, description, tag) => {
		try {
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

			if (!response.ok) {
				console.error("Error updating note:", json);
				return;
			}
			const newNotes = notes.map((note) => {
				if (note._id === id) {
					return json;
				}
				return note;
			});
			setNotes(newNotes);
		} catch (error) {
			console.error("Error updating note:", error);
		}
	};

	return (
		<NoteContext.Provider
			value={{ notes, addNote, setNotes, deleteNote, getNotes, editNote }}>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteState;
