const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const Keys = require('./keys');
const User = require('../models/user');
const Product = require('../models/product');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Keys.secretOrKey
};

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
        return done(null, user);
        }
        else{
            return done(null, false);
        }
    });
}));

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    Product.findById(jwt_payload.id, (err, product) => {
        if (err) {
            return done(err, false);
        }
        if (product) {
        return done(null, product);
        }
        else{
            return done(null, false);
        }
    });
}));

module.exports = passport;