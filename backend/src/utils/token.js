import crypto from "crypto";
import env from "../config/env.js";

function encodeBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function sign(value) {
  return crypto
    .createHmac("sha256", env.authTokenSecret)
    .update(value)
    .digest("base64url");
}

export function createAuthToken(user) {
  const payload = {
    sub: String(user._id),
    email: user.email,
    iat: Date.now()
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(payload));

  return `${encodedPayload}.${sign(encodedPayload)}`;
}
