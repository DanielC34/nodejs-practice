import './env.js'
import { fastify } from 'fastify';
import fastifyStatic from '@fastify/static'
import path from 'path'
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();


//ESM specific features
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = fastify()

// Check if MONGO_URL is set and log it
if (process.env.MONGO_URL) {
    console.log('MONGO_URL:', process.env.MONGO_URL);
} else {
    console.error('MONGO_URL environment variable is not set.');
}

async function startApp() {
    try {

        app.register(fastifyStatic, {
            root: path.join(__dirname, "public"),
        });

        //app.get("/", {}, (request, reply) => {
        //    reply.send({
        //        data: "Hello world",
        //   })
        //  })

        await app.listen({ port: 3000 })
        console.log('Server listening at port: 3000')
    } catch (e) {
        console.error(e)
        
    }
}

startApp()