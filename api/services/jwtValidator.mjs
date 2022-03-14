import jwksClient, { JwksClient, SigningKey } from "jwks-rsa";
import jwt, { Algorithm, VerifyOptions } from "jsonwebtoken";
import multimatch from "multimatch";
import { Request, Response, NextFunction } from "express";
import { EngineContext } from "../types/engineContext";
import { AccessControlList, AccessControlRule } from "../types/acl";
import { aclRules } from "../security/aclRules";
import { AccessValidator } from "../services/accessValidator";

const jwksUrl = "https://dev-u68d-m8y.us.auth0.com/.well-known/jwks.json";

const RequestTypeOptions = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const RoleOptions = [
  "*",
  "SYS_ADMIN",
  "SERVICE",
  "CONSUMER",
  "PROVIDER",
  "PAYER",
  "CARE_SUPPORT",
  "PROVIDER_FRONT_DESK",
  "HELP_DESK",
  "SERVICE_DESK",
  "ASSURE",
  "EHR_EMBEDDED_PROVIDER",
];

const keyStoreClient = jwksClient({
  jwksUri: jwksUrl,
  cache: true,
  cacheMaxAge: 600000000,
});

const checkArrayForAnyRoles = (desiredRoles, tokenRoles) => {
  const foundMatch = desiredRoles.some((desiredRole) => {
    return tokenRoles.includes(desiredRole);
  });

  if (!foundMatch) {
    console.log({
      msg: "rejected because token didn't have desired role(s)",
      desiredRoles,
      tokenRoles,
    });
  }
  return foundMatch;
};

export async function validateJwt(req, _res, next) {
  const authHeaderVal = req.headers && req.headers.authorization;

  if (!authHeaderVal) {
    const error = {
      statusCode: 401,
      statusMessage: "No Authorization header",
    };
    return next(error);
  }

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
    const error = {
      statusCode: 401,
      statusMessage: "Failed to decode token",
    };
    return next(error);
  }

  console.log({ msg: "the decoded token claims are", decodedToken });

  if (!(decodedToken && decodedToken.header && decodedToken.header.kid)) {
    const error = {
      statusCode: 401,
      statusMessage: "Failed to decode token",
    };
    return next(error);
  }

  const signingKey = await keyStoreClient.getSigningKey(
    decodedToken.header.kid
  );

  try {
    if (!jwt.verify(token, signingKey.getPublicKey(), options)) {
      const error = {
        statusCode: 403,
        statusMessage: "Invalid JWT",
      };
      return next(error);
    }
  } catch (e) {
    const error = {
      statusCode: 403,
      statusMessage: "Invalid JWT",
    };
    return next(error);
  }

  const engineContext = {
    jwt,
    // userId: decodedToken.payload[
    //   'https://api.project1819.com/userId'
    // ] as string,
    userRoles: decodedToken.payload["https://dev-u68d-m8y.us.auth0.com/roles"],
    // capabilities: decodedToken.payload[
    //   'https://api.project1819.com/capabilities'
    // ] as string[],
    // groups: decodedToken.payload[
    //   'https://api.project1819.com/groups'
    // ] as string[],
  };

  console.log({
    msg: "engine context from valid JWT",
    engineContext: engineContext,
  });

  const err = await validateUsersRoles(
    req.method.toUpperCase(),
    req.path,
    engineContext.userRoles,
    aclRules,
    engineContext.userId
  );

  if (err) {
    return next(err);
  }

  return next();
}

export async function validateUsersRoles(
  operation,
  path,
  tokenRoles,
  acl,
  tokenUserId
) {
  const matchedRules = acl.rules.filter(
    (r) =>
      multimatch(path, r.pathPattern) &&
      r.operations.some((o) => o === operation)
  );

  if (matchedRules.length == 0) {
    return { statusCode: 404, statusMessage: "path not found" };
  }

  if (!tokenRoles) {
    return { statusCode: 403, statusMessage: "No roles claim found" };
  }

  if (!tokenUserId) {
    return { statusCode: 403, statusMessage: "No userId claim found" };
  }

  let allowAll = true;

  for (const rule of matchedRules) {
    // we check if all rules have *
    if (!rule.roles.some((r) => r === "*")) {
      allowAll = false;
    }
  }

  if (allowAll) {
    // so if all rules have * we do not need to check any restrictions, we can go
    return undefined;
  }

  // now we need to check roles
  for (const rule of matchedRules) {
    if (
      !rule.roles.some((r) => r === "*") &&
      !checkArrayForAnyRoles(rule.roles, tokenRoles)
    ) {
      return { statusCode: 403, statusMessage: "Rule check failure" };
    }
  }

  // check userId
  const matcherResult = path.match(
    /^\/(Immunization|AllUserData|Encounter|AllergyIntolerance|Careteam|Condition)\/([\d|\w|-]+)$/i
  );
  if (matcherResult != null) {
    const action = matcherResult[1];
    const pathUserId = matcherResult[2];
    const accessAllowed = await new AccessValidator().accessAllowed(
      tokenUserId,
      pathUserId,
      tokenRoles,
      action
    );
    if (!accessAllowed) {
      return {
        statusCode: 403,
        statusMessage: "Forbidden",
      };
    }
  }

  return undefined;
}

// validate a jwt token for Admin role from Auth0
