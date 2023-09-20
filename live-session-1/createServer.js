const Hapi = require('@hapi/hapi');

const createServer = () => {
    const server = Hapi.server({
        host: 'localhost',
        port: 6000,
    });

    server.route([
        {
            method: 'GET',
            path: '/add/{a}/{b}',
            handler: (request) => {
                const { a, b } = request.params;
                const value = Number(a) + Number(b);
                return { value };
            },
        },
    ]);

    return server;
};

module.exports = createServer;
