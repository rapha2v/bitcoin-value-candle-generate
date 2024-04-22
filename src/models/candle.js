import { CANDLE_COLOR } from "../enums.js";

export default class Candle {
  constructor(currency, value, lastValue) {
    this.lastValue = lastValue;
    this.value = value;
    this.color = CANDLE_COLOR.GRAY;
    this.dateTime = (new Date()).toISOString();
    this.currency = currency;
  }

  /**
   * @description Gera a candle para ser enfileirada
   **/
  generate_candle() {
    if (this.lastValue > this.value) {
      this.color = CANDLE_COLOR.RED;
    } else {
      this.color = CANDLE_COLOR.GREEN;
    }
    return this.simple_object();
  }

  /**
   * @description Retorna um objeto com os valores da classe;
   **/
  simple_object() {
    const { lastValue, ...obj } = this;
    return obj;
  }
}
