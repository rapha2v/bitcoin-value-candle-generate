import { CANDLE_COLOR } from "../enums.js";
import BitcoinValueRepository from "../repository/bitcoin-value-repository.js"

export default class Candle {
  constructor(currency, value) {
    this.repositoryBitcoinValue = new BitcoinValueRepository();
    this.value = value;
    this.color = CANDLE_COLOR.GRAY;
    this.dateTime = (new Date()).toISOString();
    this.currency = currency;
  }

  /**
   * @param {number} value
   **/
  async add_values() {
    const ret = await this.repositoryBitcoinValue.get_last_bitcoin_value();
    const lastValue = ret.at(0)

    if (lastValue > this.value) {
      this.color = CANDLE_COLOR.RED;
    } else {
      this.color = CANDLE_COLOR.GREEN;
    }

    await this.saveCandle();
  }

  simpleObject() {
    const { repositoryBitcoinValue, ...obj } = this;
    return obj;
  }

  async saveCandle() {
    this.repositoryBitcoinValue.insert_bitcoin_value(this.simpleObject());
  }
}
