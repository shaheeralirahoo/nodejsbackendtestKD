function checkAuthTokenMiddleware(req, res, next) {
    if (req.headers && req.headers.authorization) {
        let token;
        const parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            const [scheme, credentials] = parts;

            if (/^Bearer$/i.test(scheme)) { // or any other scheme you are using
                token = credentials;
            }

            if (token === undefined) {
                // access token - missing
                return next(new AuthorizationError(
                    "Invalid access token.", // error_description
                    "invalid_token" // error
                ));
            }
            // add something here to ensure the token is valid
            return next();
        }
    } else {
        // No authorization header => invalid credentials
        return next(new AuthorizationError(
            "Authorization header required.", // error_description
            "invalid_request" // error
        ));
    }

}