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

const RSA_PRIVATE_KEY = fs.readFileSync('./src/demos/private.key');



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
