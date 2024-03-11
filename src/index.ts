import createServer from "../utils/server";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3000;
export const app = createServer();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
