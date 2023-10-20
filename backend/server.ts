import app from "./app";
import 'dotenv/config'

const port = Number(process.env.PORT);
const host = String(process.env.HOST);

app.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});


