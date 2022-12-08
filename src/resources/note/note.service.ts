import NoteModel from "@/resources/note/note.model";
import INote from "@/resources/note/note.interface";
import { UpdateQuery } from "mongoose";

class NoteService {
    /**
     * Finds all notes
     */
    public async findAll(): Promise<INote[]> {
        try {
            const notes = await NoteModel.find({});
            return notes;
        } catch (e) {
            throw new Error("Unable to find notes");
        }
    }

    /**
     * Finds one specific note
     * @param {string} noteId
     */
    public async findOne(noteId: string): Promise<INote | null> {
        try {
            const note = await NoteModel.findById(noteId);
            return note;
        } catch (e) {
            throw new Error("Unable to find note");
        }
    }

    /**
     * Create a new note
     * @param {string} title
     * @param {string} body
     */
    public async create(title: string, body: string): Promise<INote> {
        try {
            const note = await NoteModel.create({ title, body });
            return note;
        } catch (e) {
            throw new Error("Unable to create note");
        }
    }

    /**
     * Updates one specific note
     * @param {string} noteId
     * @param {UpdateQuery<INote> | undefined} updateQuery
     */
    public async update(
        noteId: string,
        updateQuery: UpdateQuery<INote> | undefined
    ): Promise<INote | null> {
        try {
            const note = await NoteModel.findByIdAndUpdate(
                noteId,
                updateQuery,
                { new: true }
            );
            return note;
        } catch (e) {
            throw new Error("Unable to update note");
        }
    }

    /**
     * Deletes one specific note
     * @param {string} noteId
     */
    public async deleteOne(noteId: string): Promise<INote | null> {
        try {
            const note = await NoteModel.findByIdAndDelete(noteId);
            return note;
        } catch (e) {
            throw new Error("Unable to delete note");
        }
    }
}

export default NoteService;
