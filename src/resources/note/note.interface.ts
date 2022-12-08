import { Document } from "mongoose";

export default interface INote extends Document {
    title: string;
    body: string;
}
