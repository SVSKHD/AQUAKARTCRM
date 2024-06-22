const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["quasar"],
  lintOnSave: false,
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  devServer: {
    proxy: `${process.env.VUE_APP_BASE_API}`,
  },
});
