const adminAuth = (req, res, next) => {
  console.log("admin authoriztion is getting checked");
  const token = "xyz";
  const isAuthorized = token === "xyz";
  if (!isAuthorized) {
    res.status(401).send("Unauthorized");
  } else {
    next();
  }
};



module.exports = {
  adminAuth,
};
