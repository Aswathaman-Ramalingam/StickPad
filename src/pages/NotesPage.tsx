import { fakeData as notes } from "../fakedata";
import NoteCard from "./NoteCard";

const NotesPage = () => {
    return (
        <div>
            {notes.map(note => (
                <NoteCard text={note} key={note.$id} />
            ))}
        </div>
    )
}

export default NotesPage