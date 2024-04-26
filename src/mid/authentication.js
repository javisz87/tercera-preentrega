import passport from "passport";
import { Strategy } from "passport-local";
import { Strategy as gitStrategy } from "passport-github2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { bcCompare } from "../utils/hasher.js";
import { ErrorAuthothentication } from "../models/error/errors.model.js";
import { CLIENTID_GIT, CLIENTSCR_GIT, CALLBACK_URL_GIT } from "../config/config.js";
import { JWT_PRIVATE_KEY } from "../config/config.js";
import { encriptarJWT } from "../utils/cripto.js";

import { cmg } from "../dao/mongoose/cart.dao.mg.js";
import { userRepository } from "../repositories/users.repository.js";
import { userService } from "../services/users.service.js";

passport.use(
  "local",
  new Strategy({ usernameField: "email" }, async (username, password, done) => {
    try {
      const user = await userRepository.findOne({
        email: username,
      });
      if (!user) return done(new ErrorAuthothentication());
      if (!bcCompare(password, user.password))
        return done(new ErrorAuthothentication());
      await cmg.delAllProductsInCart(user.cart);

      done(null, {
        name: user.first_name + " " + user.last_name,
        email: user.email,
        role: user.role,
        age: user.age,
        cart: user.cart,
      });
    } catch (error) {
      done(error);
    }
  })
);
/*
passport.use(
  "local",
  new Strategy({ usernameField: "email" }, async (username, password, done) => {

    if (username == 'javier@javier.com' && password == 'javier') {
      done(null, {
        name: username,
        role: 'admin',
        age: 87,
      })
    } else if (username == 'adminCoder@coder.com' && password == 'adminCod3r123') {
      done(null, {
        name: username,
        role: 'admin',
      })
    } else if (username == 'admin' && password == 'admin') {
      done(null, {
        name: username,
        role: 'admin',
      })
    } else if (username == 'user' && password == 'user') {
      done(null, {
        name: username,
        email: 'user@user.com',
        role: 'user',
        age: 99,
        // cart: user.cart, // TODO create cart here
      })
    } else {

      const user = await userRepository.findOne({
        email: username,
      });
      if (!user) return done(new ErrorAuth());
      if (!bcCompare(password, user.password)) return done(new ErrorAuth());
      await cmg.delAllProductsInCart(user.cart);

      done(null, {
        name: user.first_name + " " + user.last_name,
        email: user.email,
        role: user.role,
        age: user.age,
        cart: user.cart,
      });
    }
  })
);
*/

passport.use(
  "git",
  // @ts-ignore
  new gitStrategy(
    {
      clientID: CLIENTID_GIT,
      clientSecret: CLIENTSCR_GIT,
      callbackURL: CALLBACK_URL_GIT,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const userinfo = {
          email: `${profile.username}@${profile.username}.com`,
          first_name: profile.displayName,
          last_name: profile.displayName,
          age: 100,
          password: `${profile.displayName}verficated`,
          role:
            profile.email === "adminCoder@coder.com"
              ? "admin"
              : profile.email === "javier@javier.com"
              ? "admin"
              : "user",
        };
        const userCreated = await userService.registrar(userinfo);
        if (userCreated) {
          req.session.user = userCreated;
        } else {
          const user = await userRepository.findOne({
            email: `${profile.username}@${profile.username}.com`,
          });
          await cmg.delAllProductsInCart(user.cart);
          req.session.user = user;
          req.user = user;
        }
      } catch {
        done(new ErrorAuthothentication());
      }
      done(null, {
        name: req.session.user.first_name + " " + req.session.user.last_name,
        email: req.session.user.email,
        role: req.session.user.role,
        age: req.session.user.age,
        cart: req.session.user.cart,
      });
    }
  )
);

passport.use(
  "jwt",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        function (req) {
          let token = null;
          if (req && req.signedCookies) {
            token = req.signedCookies["jwt_authorization"];
          }
          return token;
        },
      ]),
      secretOrKey: JWT_PRIVATE_KEY,
    },
    async (jwt_payload, done) => {
      try {
        done(null, jwt_payload); // payload es el contenido del token, ya descifrado
      } catch (error) {
        done(error);
      }
    }
  )
);

// esto lo tengo que pasar para que pasport maneje las sesiones
passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((user, next) => {
  next(null, user);
});

export const passportInitialize = passport.initialize();
// export const passportSession = passport.session();

//mid a exportar

export const authLocal = passport.authenticate("local", {
  failWithError: true,
});

export const authGithub = passport.authenticate("git", {
  scope: ["user:email", "read:user"],
});
export function anthGithub_CB(req, res, next) {
  passport.authenticate("git", (error, user, info) => {
    if (error || !user) return next(new ErrorAuthothentication());
    res.cookie("jwt_authorization", encriptarJWT(user), {
      signed: true,
      httpOnly: true,
    });
    next();
  })(req, res, next);
}

export function authJwtApi(req, res, next) {
  passport.authenticate("jwt", (error, jwt_payload, info) => {
    if (error || !jwt_payload) return next(new ErrorAuthothentication());
    req.user = jwt_payload;
    next();
  })(req, res, next);
}

export function authJwtView(req, res, next) {
  passport.authenticate("jwt", (error, jwt_payload) => {
    if (error || !jwt_payload) return res.redirect("/login");
    req.user = jwt_payload;
    next();
  })(req, res, next);
}
