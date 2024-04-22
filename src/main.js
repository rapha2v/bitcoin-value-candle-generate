import "dotenv/config.js"
import schedule from "node-schedule"
import { CRON_TIME, CURRENCY } from "./enums.js"
import { producer_candles } from "./amqp/producer-candles.js"
import RabbitMQ from "./amqp/rabbitmq.js"

const get_values_btc = async () => {
  const response = await fetch(process.env.BLOCKCHAIN_VALUES)
  if (response.ok)
    return response.json()
  throw new Error("Erro ao recolher valores bitcoin.")
}

let valuesBTC = null;

const jobRefreshValuesBTC = schedule.scheduleJob(CRON_TIME.SEGUNDO_TRINTA, async () => {
  console.log("-------------------------")
  console.log("Atualizando os valores do Bitcoin.")
  valuesBTC = await get_values_btc();
  console.log("Valores atulizados com sucesso.")
  console.log("-------------------------")
  console.log("\n")
})

let lastValues = new Array(Object.keys(CURRENCY).length).fill(0);
const jobRowUpCandles = schedule.scheduleJob(CRON_TIME.SEGUNDO_CINQUENTA, async () => {
  for (const [i, v] of Object.values(CURRENCY).entries()) {
    console.log(`----------/${v}/----------`)
    console.log(`Enfileirando BTC/${v}.`)
    const rbtmq = await RabbitMQ.init();
    const channel = await rbtmq.create_channel();
    const newValue = await producer_candles(
      v,
      valuesBTC,
      lastValues[i],
      channel
    )
    rbtmq.close_connection();
    lastValues[i] = newValue || 0;
    console.log("Enfileirado com sucesso.")
    console.log("-------------------------")
    console.log("\n")
  }
})
