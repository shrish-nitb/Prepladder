const { verifyToken } = require("../utils/firebase");
const { getUser } = require("../utils/database");
const Report = require("../model/report");

async function firebaseTokenVerifier(req, res, next) {
    try {
        let token = req.header("Authorization");
        if (token && token.startsWith("Bearer ")) {
            token = token.slice(7);
        } else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        } else if (req.body && req.body.token) {
            token = req.body.token;
        }
        decodedToken = await verifyToken(token);
        req.decodedToken = decodedToken; 
        req.decodedToken.phone = req.body.phone;
        next();
    } catch (error) {
        res.status(401).json({ message: `Unauthorized, ${error}` });
    }
}

async function userAuthLookup(req, res, next) {
    try {
        req.user = await getUser(req.decodedToken.uid);
        if (!req.user) {
            throw new Error("User not exist")
        }
        next();
    } catch (error) {
        res.status(401).json({ message: `Unauthorized, ${error}` });
    }
}

function authorizationProvider(service) {
    return async function (req, res, next) {
        try {
            if (service == 'TEST') {
                let purchased = false;
                const { test } = req.body;
                if (!test) {
                    //throw error
                }
                const plans = req.user.plans;
                for (let i = 0; i < plans.length; i++) {
                    const planObj = plans[i];
                    let currentTime = (new Date()).getTime();
                    let expiryDate = (new Date(planObj.expiryDate)).getTime();
                    let isExpired = currentTime > expiryDate;
                    if (planObj.plan.test.includes(test) && !isExpired) {
                        purchased = true;
                        break;
                    }
                }
                if (!purchased) {
                    throw new Error("Out of Plan");
                }
            } else if (service == 'REPORT') {
                const reportID = req.params.report || req.body.report;
                if (!reportID) {
                    //throw error
                }
                const owner = await Report.findOne({ _id: reportID })
                if (req.decodedToken.uid != owner.user) {
                    throw new Error("Insufficient rights");
                }
            } else if (service == 'PRACTICE') {
                let purchased = false;
                const plans = req.user.plans;
                for (let i = 0; i < plans.length; i++) {
                    const planObj = plans[i];
                    let currentTime = (new Date()).getTime();
                    let expiryDate = (new Date(planObj.expiryDate)).getTime();
                    let isExpired = currentTime > expiryDate;
                    if (planObj.plan.practice && !isExpired) {
                        purchased = true;
                        break;
                    }
                }
                if (!purchased) {
                    throw new Error("Out of Plan");
                }
            }

            next();
        } catch (error) {
            res.status(401).json({ message: `Unauthorized, ${error}` });
        }
    }
}

module.exports = { firebaseTokenVerifier, userAuthLookup, authorizationProvider }
