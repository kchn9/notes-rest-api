import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/note/note.validation";
import NoteService from "@/resources/note/note.service";

class NoteController implements Controller {
    public path = "/notes";
    public router = Router();
    private NoteService = new NoteService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            this.path,
            validationMiddleware(validate.create),
            this.create
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const post = await this.NoteService.create(title, body);
            res.status(201).json({
                post,
            });
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    };
}

export default NoteController;
