import express from "express";
import request from "request";
import dotenv from "dotenv";
import { checkIfServiceFoundOrNot } from "./utils/helpers.js";
import { jsonError, jsonOK } from "./utils/responer.js";

/**
 * Init Configuration
 */
dotenv.config();
const app = express();
app.use(express.json());

/**
 * Recieve request
 */
app.use("/", (req, res, next) => {
  /**
   * Get URI
   */
  const uri = req.url.trim();

  /**
   * Split URI
   */
  const uriSplit = uri.split("/");

  /**
   * Check is service found
   */
  const service = checkIfServiceFoundOrNot(uriSplit[1]);
  if (!service) {
    jsonError(res, "API not found.", 404);
    return;
  }

  /**
   * Full url
   */
  const fullUrl = service.url + uri;

  /**
   * Get Headers
   */
  const headers = JSON.stringify(req.headers);

  /**
   * Call service
   */
  request(
    {
      url: fullUrl,
      json: true,
      headers: headers,
      method: req.method,
      body: req.body,
    },
    (err, result, body) => {
      if (err) {
        jsonError(res, err.message, 400);
        return;
      }

      if ([200, 201, 202].includes(result.statusCode)) {
        jsonOK(res, result.body, "", result.statusCode);
      } else {
        jsonError(res, result.body, result.statusCode);
      }
      return;
    }
  );
});

app.listen(process.env.PORT, () => {
  console.log("server running...");
});
