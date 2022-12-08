import { Schema, model } from "mongoose";
import INote from "@/resources/note/note.interface";

const NoteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default model<INote>("note", NoteSchema);
