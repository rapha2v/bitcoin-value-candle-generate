import Candle from "../models/candle.js";


/**
 * @returns {Promise<number | null>}
 **/
export const producer_candles = async (currency, value, lastValue, channel) => {
  if (value) {
    const candle = new Candle(
      currency,
      value[currency].last,
      lastValue
    );
    const simpCandle = candle.generate_candle();
    console.log(simpCandle)
    const candleJSON = JSON.stringify(simpCandle)
    await channel.sendToQueue(process.env.QUEUE_NAME, Buffer.from(candleJSON))
    return value;
  }
  return null;
}

