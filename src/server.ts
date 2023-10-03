import makeApp from "./app";
import { PORT } from "./config";
import { AppDataSource, initDB } from "./db";
import { logMessage } from "./utils/logs";

const port = PORT || 5000;

const app = makeApp(AppDataSource);

app.listen(port, () => {
  initDB();
  logMessage(`Server is listening on port ${port}`);
});
