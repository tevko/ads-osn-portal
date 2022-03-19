import jwksClient from "jwks-rsa";
import jwt from "jsonwebtoken";

const jwksUrl = "https://dev-u68d-m8y.us.auth0.com/.well-known/jwks.json";

const keyStoreClient = jwksClient({
  jwksUri: jwksUrl,
  cache: true,
  cacheMaxAge: 600000000,
});

export async function getRoleFromJwt(authHeaderVal) {
  const jwtAlgorithm = "RS256";

  const options = {
    algorithms: [jwtAlgorithm],
    issuer: "https://dev-u68d-m8y.us.auth0.com/",
    audience: "https://mzfweb2.adssglobal.net/api/",
  };

  const token = authHeaderVal.split(/\s+/)[1];

  let decodedToken;
  try {
    decodedToken = jwt.decode(token, {
      complete: true,
    });
  } catch (e) {
    throw new Error("Invalid token");
  }

  console.log({ msg: "the decoded token claims are", decodedToken });

  if (!(decodedToken && decodedToken.header && decodedToken.header.kid)) {
    throw new Error("Invalid token");
  }

  const signingKey = await keyStoreClient.getSigningKey(
    decodedToken.header.kid
  );

  try {
    if (!jwt.verify(token, signingKey.getPublicKey(), options)) {
      throw new Error("Invalid token");
    }
  } catch (e) {
    throw new Error("Invalid token");
  }

  const engineContext = {
    jwt,
    userRoles: decodedToken.payload["https://mzfweb2.adssglobal.net/api/roles"],
  };

  console.log({
    msg: "engine context from valid JWT",
    engineContext: engineContext,
  });

  return {
    role: engineContext.userRoles,
  };
}
