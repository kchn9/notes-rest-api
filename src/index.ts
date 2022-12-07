import "dotenv/config";
import "module-alias/register";
import App from "./app";
import NoteController from "./resources/note/note.controller";
import validateEnv from "@/utils/validateEnv";

validateEnv();

const app = new App([new NoteController()], Number(process.env.PORT));

app.listen();
