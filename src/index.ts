import express from 'express'
import {sequelize} from './config/db'

const app = express();
const tasks = require("./routes/tasks");
const ratios = require("./routes/ratios");

app.use(express.json());
app.use("/api/tasks", tasks);
app.use("/api/ratios", ratios);

sequelize.sync().catch((err : Error) => {
  console.log(err);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
