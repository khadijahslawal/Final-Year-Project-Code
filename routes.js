const { route } = require("next/dist/next-server/server/router");

const routes = require("next-routes")();

routes.add("/", "/index");
routes.add("/signup",  "/signup/index");
routes.add("/signup/developer", "/signup/developer");
routes.add("/signup/investor", "/signup/investor");

module.exports = routes;