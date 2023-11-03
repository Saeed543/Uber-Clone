const router = require("express").Router();
const passport = require("passport");
const { CLIENT_URL, REACT_APP_URL } = require("../config");

router.get('/login/success', async (req, res, next) => {
    if (req.user) {
        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user,
        });
    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
},
);

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});

router.get('/google',

    passport.authenticate("google", { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate("google", { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect(CLIENT_URL);
    }
);

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(REACT_APP_URL);
});

module.exports = router;