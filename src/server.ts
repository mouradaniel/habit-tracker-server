import Fastify from 'fastify';

const app = Fastify();

app.get('/', () => {
  return 'Ok!'
})

app.listen({
  port: 3000
}).then(() => {
  console.log('Server is running on port 3000.')
})