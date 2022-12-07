import NoteModel from "@/resources/note/note.model";
import Note from "@/resources/note/note.interface";

class NoteService {
    /**
     * Create a new note
     */
    public async create(title: string, body: string): Promise<Note> {
        try {
            const note = await NoteModel.create({ title, body });
            return note;
        } catch (e) {
            throw new Error("Unable to create note");
        }
    }
}

export default NoteService;
