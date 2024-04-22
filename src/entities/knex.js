import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
  },
  useNullAsDefault: true
})

console.log("Testando conexão com o banco de dados Postgres.")
db.raw("SELECT 1").then(() => {
  console.log("Banco conectado com sucesso.")
}).catch((e) => {
  console.log(e)
  throw new Error("Erro ao se conectar com o banco de dados.")
})

export default db;
