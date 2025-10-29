const redis = require('redis');
const client = redis.createClient({ url: 'redis://cache:6379' });

client.connect().then(() => {
  console.log('Worker conectado a Redis');
  // Simulación de tarea asíncrona
  setInterval(async () => {
    const pending = await client.lPop('tasks');
    if (pending) console.log('Procesando tarea:', pending);
  }, 5000);
});