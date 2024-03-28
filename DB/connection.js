import PG from 'pg'

const DBConn = () => {
  const config = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  }
  const client = new PG.Client(config)
  client.connect().then(() => { 
    console.log('Connected to PostgreSQL database!') 
  }).catch(err => console.error(`err : ${err}`))
};

const Pool = () => {
  const config = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
  }
  const poolConfig = {
    max: 100,
    min: 0,
    idleTimeoutMillis: 30000
  }
  return new PG.Pool({...config, pool:poolConfig})
}

export{ DBConn, Pool };
