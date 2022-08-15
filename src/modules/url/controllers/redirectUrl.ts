import { Context } from "koa";

import { isExpired } from "../../../utils";

import Url from "../UrlModel";

export default async (ctx: Context) => {
  try {
    const { hash } = ctx.params;

    const shortenedUrl = await Url.findOne({ hash }).lean();

    if (!shortenedUrl) throw new Error("URL not found");

    if (shortenedUrl.expiresAt) {
      // @ts-ignore
      if (isExpired(shortenedUrl.expiresAt))
        throw new Error("Short link expired");
    }

    ctx.status = 301;
    ctx.redirect(shortenedUrl.originalURL);
    return;
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: error.message,
    };

    return;
  }
};
