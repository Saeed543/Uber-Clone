const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const { CLIENT_ID, CLIENT_SECRET } = require("./config/index")
const { User } = require("./database")

passport.use(
    new GoogleStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            try {
                if (existingUser) {
                    done(null, existingUser)
                } else {
                    const user = await User.create({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        picture: profile._json['picture']
                        // Add other fields as needed
                    });
                    done(null, user);
                }

            } catch (e) {
                console.error("Error occured:", e)
            }

        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});