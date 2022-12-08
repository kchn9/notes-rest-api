import pretty from "pino-pretty";
import pinoHttp, { HttpLogger } from "pino-http";
import { IncomingMessage, ServerResponse } from "http";
import { randomUUID } from "crypto";

const prettyStream: pretty.PrettyStream = pretty({
    colorize: true,
});

function loggingMiddleware(): HttpLogger {
    return pinoHttp(
        {
            genReqId: function (req: IncomingMessage, res: ServerResponse) {
                if (req.id) return req.id;
                let id = req.headers["X-Request-Id"];
                if (id) return id;
                id = randomUUID();
                res.setHeader("X-Request-Id", id);
                return id;
            },

            wrapSerializers: true,

            customLogLevel: function (
                _req: IncomingMessage,
                res: ServerResponse,
                err: Error
            ) {
                if (res.statusCode >= 400 && res.statusCode < 500) {
                    return "warn";
                } else if (res.statusCode >= 500 || err) {
                    return "error";
                } else if (res.statusCode >= 300 && res.statusCode < 400) {
                    return "silent";
                }
                return "info";
            },
        },
        prettyStream
    );
}

export default loggingMiddleware;
