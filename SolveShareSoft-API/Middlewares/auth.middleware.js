const jwt = require("jsonwebtoken");

const authMiddleware = {
    verifyToken : (req, res, next) => {
        //jwt token header format : Bearer <token>
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) {
            return res.status(401).json({code : 401, message: `Token not present in the headers`});
        }

        //synchronous verification
        const secret = process.env.JWT_SECRET || undefined;
        jwt.verify(token, secret, (error, payload) => {
            if (error) {
                if (error instanceof jwt.TokenExpiredError || error instanceof jwt.JsonWebTokenError) {
                    return res.status(403).json({ code: 403, message: error.message });
                }
                else {
                    console.error(error);
                    return res.sendStatus(500);
                }
            }
            else {
                //add payload into the request, easily access
                req.payload = payload;
                next();
            }
        });
    }
};

module.exports = authMiddleware;