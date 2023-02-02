import Fastify from 'fastify';

import { appRoutes } from './routes';

const app = Fastify();

app.register(appRoutes);

app.listen({
  port: 3000
}).then(() => {
  console.log('Server is running on port 3000.')
})