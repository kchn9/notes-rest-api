import validationMiddleware from "@/middleware/validation.middleware";
import NoteService from "@/resources/note/note.service";
import validate from "@/resources/note/note.validation";
import HttpException from "@/utils/exceptions/http.exception";
import Controller from "@/utils/interfaces/controller.interface";
import { NextFunction, Request, Response, Router } from "express";
import { UpdateQuery } from "mongoose";
import INote from "./note.interface";

class NoteController implements Controller {
    public path = "/notes";
    public router = Router();
    private NoteService = new NoteService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        /**
         * @route GET /api/notes
         */
        this.router.get(this.path, this.findAll);

        /**
         * @route GET /api/notes/:id
         */
        this.router.get(`${this.path}/:id`, this.findOne);

        /**
         * @route POST /api/notes
         */
        this.router.post(
            this.path,
            validationMiddleware(validate.create),
            this.create
        );

        /**
         * @route PATCH /api/notes
         */
        this.router.patch(
            `${this.path}/:id`,
            validationMiddleware(validate.update),
            this.update
        );

        /**
         * @route DELETE /api/notes/:id
         */
        this.router.delete(`${this.path}/:id`, this.deleteOne);
    }

    private findAll = async (
        _req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const notes = await this.NoteService.findAll();
            res.status(200).json({
                notes,
            });
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    };

    private findOne = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Request | void> => {
        try {
            const noteId: string = req.params.id;
            const note = await this.NoteService.findOne(noteId);
            if (!note) {
                next(new HttpException(404, "Note not found"));
            }
            res.status(200).json({
                note,
            });
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    };

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const note = await this.NoteService.create(title, body);
            res.status(201).json({
                note,
            });
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    };

    private update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const noteId: string = req.params.id;
            const updateQuery: UpdateQuery<INote> | undefined = req.body;
            const note = await this.NoteService.update(noteId, updateQuery);
            if (!note) {
                next(new HttpException(404, "Note not found"));
            }
            res.status(200).json({
                note,
            });
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    };

    private deleteOne = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const noteId: string = req.params.id;
            const note = await this.NoteService.deleteOne(noteId);
            if (!note) {
                next(new HttpException(404, "Note not found"));
            }
            res.status(200).json;
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    };
}

export default NoteController;
