import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import httpErrors from 'http-errors';

import Accounts from '../models/account.js';

class AccountServices {
    async login(email, password) {
        
        const account = await Accounts.findOne({ email: email });

        if (!account) {
            return { err: httpErrors.Unauthorized(`Aucun compte existant avec le courriel ${email}`) };
        } else {
            if (this.validatePassword(password, account)) {
                return { account: account };
            } else {
                return { err: httpErrors.Unauthorized("Erreur d'authentification") };
            }
        }
    }

    validatePassword(password, account) {
        //TODO: Validate de password with hash
    }

    create(account) {

        //TODO: Generate salt
        //TODO: Generate hash

        return Accounts.create(account);
    }

    generateJWT(account, needNewRefresh = true) {
        let refreshToken = '';
        const accessToken = ''; //TODO: Generate the token
        
        if (needNewRefresh) {
            //TODO: Genere refreshToken
        }

        return { accessToken, refreshToken };
    }

    async validateRefreshToken(email, refreshToken) {
        return await Accounts.findOne({ email: email, refreshToken: refreshToken });
    }

    logout(email) {
        return Accounts.findOneAndUpdate({ email: email }, { refreshToken: '' }, { new: true });
    }

    transform(account) {
        //TODO: Do some logic cleanup
        
        delete account._id;
        delete account.__v;

        return account;
    }
}

export default new AccountServices();
