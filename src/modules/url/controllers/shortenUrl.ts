import * as Yup from "yup";
import md5 from "md5";
import { Context } from "koa";

import Url from "../UrlModel";
import { base62, stringTodecimal } from "../../../utils";

const validationSchema = Yup.object().shape({
  url: Yup.string().required("original URL is required"),
  alias: Yup.string(),
  expiresAt: Yup.date(),
});

export default async (ctx: Context) => {
  try {
    const { url, alias, expiresAt } = ctx.request.body;

    await validationSchema.validate({ url, alias, expiresAt });

    let hash;
    if (!alias) {
      // @ts-ignore
      const hashedLongUrl = md5(`${global.__COUNTER__}${url}`);
      hash = base62(stringTodecimal(hashedLongUrl)).slice(0, 7);
      global.__COUNTER__ -= 1;
    }

    const shortenedUrl = await new Url({
      originalURL: url,
      hash: hash || alias,
      expiresAt,
    }).save();

    ctx.status = 200;
    ctx.body = {
      originalUrl: shortenedUrl.originalURL,
      hash: shortenedUrl.hash,
      expiresAt: shortenedUrl.expiresAt,
    };

    return;
  } catch (error) {
    ctx.status = 422;
    const errorMessage =
      error.code === 11000 ? "Alias is not available" : error.message;

    ctx.body = {
      error: errorMessage,
    };
  }
};
