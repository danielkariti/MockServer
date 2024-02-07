import App from './app';

const port = process.env.PORT ? parseInt(process?.env?.PORT) : 8000;

const app = new App(port);

app.listen();
