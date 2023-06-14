import { NextFunction, Request, Response } from "express";
import express from 'express';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import fs from "fs";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser());

const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies["x-token"];

    if (token) {
        try {
            jwt.verify(token, RSA_PRIVATE_KEY, (err: any, decoded: any) => {
                if (err) {
                    throw err;
                }
                // req.body.user = decoded.subject;

                // console.log(decoded.subject)
                console.log("VALID TOKEN", decoded)
                next();
            });
        } catch (error) {
            return res.status(401).json({
                msg: "Invalid token"
            })
        }

    }


}

app.route('/api/login')
    .post(loginRoute);

app.route('/api/test')
    .get([validateJWT], (req: Request, res: Response) => {
        res.json({
            msg: "Hello World"
        })
    })

const RSA_PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;
// const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

export function loginRoute(req: Request, res: Response) {

    const { email, password } = req.body

    if (validateEmailAndPassword()) {
        const userId = findUserIdForEmail(email);

        const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
            algorithm: 'RS256',
            expiresIn: '5s',
            subject: userId
        })

        // send the JWT back to the user
        res.cookie("x-token", jwtBearerToken, { httpOnly: false, secure: false });
        return res.status(200).json({ msg: "login ok" });
    }
    else {
        // send status 401 Unauthorized
        return res.status(401).json({ msg: "login failed" });
    }
}

app.listen(3000, () => {
    console.log('Server started on port 3000');
});

function validateEmailAndPassword(): boolean {
    return true;
}

function findUserIdForEmail(email: string): string {
    return "987654";
}
