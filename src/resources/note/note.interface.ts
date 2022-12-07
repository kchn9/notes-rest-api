import { Document } from "mongoose";

export default interface Note extends Document {
    title: string;
    body: string;
}
