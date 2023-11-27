const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./src/i18n.js"
);

module.exports = withNextIntl({
  async rewrites() {
    return [
      {
        source: "/dashboard/über-uns",
        destination: "/dashboard/about",
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"],
  }
});

