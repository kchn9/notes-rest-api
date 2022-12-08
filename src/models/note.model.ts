import { model, Schema, Document } from "mongoose";

export interface INote extends Document {
    title: string;
    body: string;
}

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
