import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import urlRouter from "./modules/url/urlRouter";

const app = new Koa();

app.use(cors({ origin: "*" }));
app.use(bodyParser());

app.use(urlRouter.routes()).use(urlRouter.allowedMethods());

export default app;
