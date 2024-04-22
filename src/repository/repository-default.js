import db from "../entities/knex.js"

class RepositoryDefault {
  /**
   * @param {string} table
   **/
  constructor(table) {
    this.table = table
  }

  async get_all_data() {
    try {
      return db(this.table).select("*")
    } catch (e) {
      throw new Error(`Error ao retornar todos os dados da tabela ${this.table}.`)
    }
  }

  async insert_data(data) {
    try {
      await db(this.table).insert(data)
    } catch (e) {
      throw new Error(`Erro ao inserir dado na tabela ${this.table}`)
    }
  }

  async last_insert_data() {
    try {
      return await db(this.table).select("*").orderBy("id", "desc").limit(1)
    } catch (e) {
      throw new Error(`Erro ao pegar o último valor da tabela ${this.table}`)
    }
  }
}

export default RepositoryDefault;
