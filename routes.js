const { route } = require("next/dist/next-server/server/router");

const routes = require("next-routes")();

routes.add("/", "/index");
routes.add("/signup",  "/signup");

module.exports = routes;