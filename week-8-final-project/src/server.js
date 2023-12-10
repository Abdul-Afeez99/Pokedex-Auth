import { createServer, Response } from 'miragejs';

const registeredUsers = [
  { name: 'User One', email: 'userone@example.com', password: 'password1' },
  { name: 'User Two', email: 'usertwo@example.com', password: 'password2' },
];

export default function() {
  createServer({
    routes() {
      this.post('/api/authenticate', (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);
        const user = registeredUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          const token = Math.random().toString(36).slice(2);
          user.token = token;
          return { token, user: { name: user.name, email: user.email } };
        } else {
          return new Response(401, {}, { error: 'Unauthorized' });
        }
      });

      this.get('/api/user', (schema, request) => {
        const authHeader = request.requestHeaders.Authorization;
        const token = authHeader ? authHeader.split(' ')[1] : null;
        const user = registeredUsers.find((u) => u.token === token);
        if (user) {
          return { user: { name: user.name, email: user.email } };
        } else {
          return new Response(401, {}, { error: 'Unauthorized' });
        }
      });
      this.passthrough("https://pokeapi.co/**");
    },
  });
}
