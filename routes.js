// const { route } = require("next/dist/next-server/server/router");

const routes = require("next-routes")();

routes.add("/", "/index");
routes.add("/signup",  "/signup/index");
routes.add("/signup/developer", "/signup/developer");
routes.add("/signup/investor", "/signup/investor");
routes.add("/signup/welcome", "/signup/welcome");
routes.add("/home/:address", "/home/index");
routes.add("/profile", "/profile/index");
routes.add("/discover", "/discover/index");
routes.add("/deployed/:address", "/deployed/index");
routes.add("/deployed/invest/:address", "/deployed/invest");
routes.add("/dashboard", "/dashboard/index");
module.exports = routes;