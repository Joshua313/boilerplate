const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    res.json({ message: "You are already login dont to it again!" });
    return;
  }
  next();
};
const isAllowed = (req, res, next) => {
  if (!req.session.userId) {
    res.json({ error: "You dont have enough access" });
    return;
  }
  next();
};
export { isAuthenticated, isAllowed };