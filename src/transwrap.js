import Database from './Database'

const drivers = Object.create(null)

function register(name, driver) {
  if (!driver) {
    throw new Error(`db: Register driver is null`)
  }
  if (drivers[name]) {
    throw new Error(`db: Register called twice for driver ${name}`)
  }
  drivers[name] = driver
}

function open(name, dataSourceName) {
  var driver = drivers[name]
  if (!driver) {
    throw new Error(`db: unknown driver ${name} (forgotten import?)`)
  }

  const db = new Database({
    driver: driver,
    dsn: dataSourceName
  })

  return db
}

export default {

  open,

  register,

  drivers

}
