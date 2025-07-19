// here we will use the new statergy as a passport middeware to handel the cases and then serialise and deserilise the values from the sessions

import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "../../../expressjs/src/models/users.mjs";

export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      if (!username || !password) throw new Error("Credentials not fullfilled");
      const currUser = await User.findOne(username, password);

      if (!currUser) throw new Error("User does not exist");

      done(null, currUser);
    } catch (err) {
      done(err, null);
    }
  })
);
