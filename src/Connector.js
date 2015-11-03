import Scope from './Scope'
import { open as openDatabase } from './drivers'

class Connector {

  constructor({ /*dialect,*/ source, logger, database, options }) {
    //this.dialect = dialect
    this.source = source
    this.logger = logger
    this.options = options
    this.database = database

    Object.defineProperty(this.database, 'connector', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: this
    })
  }

  // Alias database
  get db() {
    return this.database
  }

  /**
   * Connects the database
   *
   * @return {Promise}
   */
  connect() {
    return this.db.connect()
  }

  /**
   * Closes the database
   *
   * @return {Promise}
   */
  close() {}

  clone() {
    const c = new Connector(this)
    return c
  }

  createScope() {
    return new Scope()
  }

  // Basic CRUD

  /**
   * Creates record
   *
   * @param {Model} value - A Model Instance
   * @return {Promise}
   */
  create(value) {}

  /**
   * Deletes record
   *
   * @param {Model} value - A Model Instance
   * @return {Promise}
   */
  delete(value) {}

}

function open(dialect, source, options) {

  const connector = new Connector({
    //dialect: createDialect(dialect),
    source: source,
    options: options,
    database: openDatabase(dialect, source)
  })

  return connector
}

export default {

  Connector,

  open

}