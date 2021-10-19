import "reflect-metadata";
import express from 'express'
import {sequelize} from './db/config'
import { queryParser } from 'express-query-parser'

const app = express();
import {router} from './routes'

app.use(express.json());
app.use(
  queryParser({
    parseNull: true,
    parseBoolean: true,
    parseNumber: true
  })
)
app.use("/api", router);

sequelize.sync().catch((err : Error) => {
  console.log(err);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
