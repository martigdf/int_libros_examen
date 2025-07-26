import { query } from '../../../services/database.js';
import bcrypt from 'bcryptjs';
const authRoute = async (fastify, opts) => {
    fastify.post('/', {
        schema: {
            tags: ['auth'],
            summary: "Ruta para loguearse",
            description: "Permite a un usuario autenticarse y obtener un token de acceso",
            body: {
                type: 'object',
                required: ["email", "password"],
                properties: {
                    email: { type: "string" },
                    password: { type: "string" },
                },
            },
        },
        handler: async (request, reply) => {
            const { email, password } = request.body;
            const res = await query(`SELECT * FROM users WHERE email = '${email}'`);
            if (res.rows.length === 0) {
                reply.code(404).send({ message: "Usuario no encontrado" });
                return;
            }
            const user = res.rows[0];
            if (!(await bcrypt.compare(password, user.password))) {
                reply.code(401).send({ message: "Contraseña incorrecta" });
                return;
            }
            const token = fastify.jwt.sign({ id: user.id }, { expiresIn: "3h" });
            reply.send({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    lastname: user.lastname,
                    role: user.role,
                },
            });
        }
    });
};
export default authRoute;
//# sourceMappingURL=login.js.map