const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.serializeUser((user , done) => {
	done(null , user);
})
passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(new GoogleStrategy({
	clientID:"949673200369-d4euf4msko9rvole58d4buta0ecj77k6.apps.googleusercontent.com",
	clientSecret:"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",
	// callbackURL:"http://localhost:8080/auth/callback",
	callbackURL:"https://freecodeapp.onrender.com/auth/callback",
	passReqToCallback:true
},
function(request, accessToken, refreshToken, profile, done) {
	return done(null, profile);
}
));
