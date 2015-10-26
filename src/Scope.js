import _ from 'lodash'

export default class Scope {

  // The row sql
  sql = ''
  values = null

  constructor(db) {
    //this.db = db
  }

  // Gets dialect
  get dialect() {
    //return this.db.connector.dialect
    //return this.db.dialect
  }

  // Shorthand for the db connection
  get conn() {
    //return this.db.conn
  }

  clone() {
    const s = Object.create(this)
    return s
  }

  row(sql = '') {
    //const reg = new RegExp('\$\$', 'g')
    //this.sql = sql.replace(reg, '?')
    return this
  }

  /*
  build(sql, values) {
    this.sql = sql
    this.values = values
    return this
  }
  */

  select(searcher) {

    var values = []
    const command = 'SELECT'

    const table = searcher._tableName.trim()

    const columns = _.uniq(searcher._selectColumns.map((item) => {
      return item
      //return item.query
    })).join(', ').trim() || '*'

    var where = searcher._whereClauses.map((item) => {
      values = values.concat(item.args)
      return item.query
    }).join(' AND ').trim()
    if (where.length) where = ' WHERE ' + where

    var group = searcher._groupClauses.map(item => {
      return item
    }).join(', ').trim()
    if (group.length) group = ' GROUP BY ' + group

    // TODO: Don't add limit if querying directly on the pk
    const limit = searcher._limit ? ` LIMIT ${searcher._limit}` : ''

    const offset = searcher._skip ? ` OFFSET ${searcher._skip}` : ''

    var order = searcher._sortClauses.map(item => {
      return item
    }).join(', ').trim()
    if (order.length) order = ' ORDER BY ' + order

    this.sql = `${command} ${columns || '*'} FROM ${table}${where}${group}${order}${limit}${offset}`
    this.values = values
  }

  update(searcher) {
    var values = []
    const command = 'UPDATE'

    const table = searcher._tableName.trim()

    var columns = _.uniq(searcher._selectColumns.map((item) => {
      return item
      //return item.query
    })).join(', ').trim()
    if (columns) columns = ' RETURNING ' + columns

    var updates = searcher._updateColumns.map(item => {
      return item
    }).join(', ').trim()

    var where = searcher._whereClauses.map((item) => {
      values = values.concat(item.args)
      return item.query
    }).join(' AND ').trim()
    if (where.length) where = ' WHERE ' + where

    this.sql = `${command} ${table} SET ${updates}${where}${columns}`
    this.values = values
  }

  build(command, searcher) {

    // TODO: need improve

    switch (command) {
      case 'SELECT':
        return this.select(searcher)
      case 'UPDATE':
        return this.update(searcher)
    }

  }

}
