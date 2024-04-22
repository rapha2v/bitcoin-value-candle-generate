import RepositoryDefault from "./repository-default.js";

class BitcoinValueRepository extends RepositoryDefault {
  constructor() {
    super("bitcoin_value");
  }

  async get_all_bitcoin_values() {
    return this.get_all_data();
  }

  async insert_bitcoin_value(data) {
    await this.insert_data(data);
  }

  async get_last_bitcoin_value() {
    return await this.last_insert_data();
  }
}

export default BitcoinValueRepository;
