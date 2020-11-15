import express from 'express';
import expressJWT from 'express-jwt';
import httpErrors from 'http-errors';

import accountServices from '../services/accountServices.js';

const router = express.Router();

//TODO: JWT middleware
//TODO: Refresh JWT middleware

class AccountsRoutes {
    constructor() {
        router.post('/', this.post);
        router.post('/login', this.login);
        router.post('/refresh', this.refreshToken);
        router.get('/secure', this.secure);
        router.delete('/logout', this.logout);
    }

    async post(req, res, next) {
        try {
            let account = await accountServices.create(req.body);
            //TODO: Generate Access Token (JWT)

            account = account.toObject({ getters: false, virtuals: false });
            account = accountServices.transform(account);
            account.accessToken = accessToken;

            res.status(201).json(account);
        } catch (err) {
            return next(httpErrors.InternalServerError(err));
        }
    }

    secure(req, res, next) {
        //TODO: Retrieve user from request
    }

    async login(req, res, next) {
        const { username, password } = req.body;

        const result = await accountServices.login(username, password);

        if (result.account) {
            //TODO: Generate Access Token (JWT) and response
        } else {
            return next(result.err);
        }
    }

    async refreshToken(req, res, next) {
        //TODO: Retrieve account
        const account = {};

        if (account) {
            //TODO: Generate Access Token (JWT) and response
        } else {
            return next(httpErrors.Unauthorized('Cannot refresh token'));
        }
    }

    async logout(req, res, next) {
        try {
            //TODO: Call service for logout
            res.status(204).end();
        } catch (err) {
            return next(httpErrors.InternalServerError());
        }
    }
}

new AccountsRoutes();

export default router;
