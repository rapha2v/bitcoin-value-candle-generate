import "dotenv/config.js"
import Candle from "./models/candle.js"
import { CURRENCY } from "./enums.js"

const getValueBTC = async (region) => {
  const response = await fetch(process.env.BLOCKCHAIN_VALUES)
  if (response.ok) {
    if (region) {
      const json = await response.json()
      return json[region]
    }
    return response.json()
  }
  throw new Error("Erro ao recolher valores bitcoin.")
}


const generateCandle = async () => {

}


