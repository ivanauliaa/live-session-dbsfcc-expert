const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

const plugin = {
  name: 'authentications',
  register: async (server, { container }) => {
    const authenticationsHandler = new AuthenticationsHandler(container);
    server.route(routes(authenticationsHandler));
  },
};

module.exports = plugin;
