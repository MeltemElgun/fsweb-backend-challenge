require("dotenv").config();
const server = require("./api/server");
const { PORT } = require("./secret/secretToken");
server.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
});
