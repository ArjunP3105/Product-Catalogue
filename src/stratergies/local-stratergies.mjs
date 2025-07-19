// here we will use the new statergy as a passport middeware to handel the cases and then serialise and deserilise the values from the sessions

import passport from "passport";
import { Strategy } from "passport-local";

passport.use(
  new Strategy((username, password, done) => {
    try {
      if (!username || password) throw new Error("Credentials not fullfilled");
    } catch (err) {}
  })
);
