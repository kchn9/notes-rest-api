import "module-alias/register";
import App from "./app";
import NoteController from "./resources/note/note.controller";
import config from "@/config/config";

const app = new App([new NoteController()], Number(config.server.port));

app.listen();
