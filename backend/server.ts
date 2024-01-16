// import app from './app';
// import 'dotenv/config';

// app.listen(process.env.PORT, () => {
//   console.log('Server running');
// });

import app from './app';
import 'dotenv/config';

const port = Number(process.env.PORT);
const host = String(process.env.HOST);

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});
