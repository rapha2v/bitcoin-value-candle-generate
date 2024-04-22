import { connect } from "amqplib"

class RabbitMQ {
  constructor(connection) {
    this.connection = connection;
    this.channel = null;
  }

  /**
   * @returns {Promise<new () => RabbitMQ>}
   **/
  static async init() {
    try {
      const connection = await connect(process.env.AMQP_SERVER);
      console.log("Conexão com o RabbitMQ estabelecida.");
      return new RabbitMQ(connection)
    } catch (e) {
      console.log(err);
      throw new Error("Erro ao tentar se conectar com o RabbitMQ.")
    }
  }

  async create_channel(q = null) {
    const queue = q || process.env.QUEUE_NAME;
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(queue || process.env.QUEUE_NAME);
    console.log(`Canal criado para o canal ${queue}.`)
    return this.channel;
  }

  /**
   * @return {void}
   **/
  async close_connection() {
    await this.channel.close();
    await this.connection.close();
  }
}

export default RabbitMQ;
