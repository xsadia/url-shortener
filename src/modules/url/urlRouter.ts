import Router from "@koa/router";
import shortenUrl from "./controllers/shortenUrl";
import redirectUrl from "./controllers/redirectUrl";

const router = new Router({ prefix: "/url" });

router.get("/:hash", redirectUrl);

router.post("/", shortenUrl);

export default router;
