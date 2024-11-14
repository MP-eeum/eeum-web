const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://openapi.naver.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    })
  );
  app.use(
    "/api2",
    createProxyMiddleware({
      target: "https://naveropenapi.apigw.ntruss.com/map-direction",
      changeOrigin: true,
      pathRewrite: {
        "^/api2": "",
      },
    })
  );
  app.use(
    "/api3",
    createProxyMiddleware({
      target: "https://www.safetydata.go.kr",
      changeOrigin: true,
      pathRewrite: {
        "^/api3": "",
      },
    })
  );
};
