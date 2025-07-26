import * as path from 'node:path';
import AutoLoad from '@fastify/autoload';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {};
const app = async (fastify, opts) => {
    void fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: opts,
        forceESM: true
    });
    void fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: opts,
        forceESM: true
    });
};
export default app;
export { app, options };
//# sourceMappingURL=app.js.map