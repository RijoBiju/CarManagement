const express = require("express");
const router = express.Router();
const passport = require("passport");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, admin, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!admin) return res.status(401).json({ error: info.message });

    req.logIn(admin, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.json({
        message: "Login successful",
        admin: { id: admin._id, email: admin.email },
      });
    });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
  res.clearCookie("connect.sid");
  res.json({ message: "Logged out successfully" });
});

router.get("/me", (req, res) => {
  if (!req.isAuthenticated())
    return res.status(401).json({ error: "Not authenticated" });
  res.json({ admin: { id: req.user._id, email: req.user.email } });
});

module.exports = router;
