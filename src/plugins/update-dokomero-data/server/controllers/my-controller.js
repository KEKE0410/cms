'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('update-dokomero-data')
      .service('myService')
      .getWelcomeMessage();
  },
});
