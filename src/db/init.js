const Database = require("./config")

const initDB = {
  async init() {

    //Iniciando conexão com o banco de dados
    const db = await Database()

    //Criando as TABELAS
    const profileTable = `CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT, 
    avatar TEXT, 
    monthly_budget INT, 
    days_per_week INT, 
    hours_per_day INT, 
    vacation_per_year INT, 
    value_hour INT
    )`

    const jobTable = `CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name TEXT, 
    daily_hours INT,
    total_hours INT,
    createdAt DATETIME
)`

  //Dados na TABELA
    const profileInsert = `INSERT INTO profile (
  name, 
  avatar, 
  monthly_budget, 
  days_per_week, 
  hours_per_day, 
  vacation_per_year
  ) VALUES (
    "Jonata Santos",
    "https://github.com/jonatafsa.png",
    3500,
    5,
    8,
    4
  )`

    const jobInsert = `INSERT INTO jobs (
  name,
  daily_hours,
  total_hours,
  createdAt
  ) VALUES (
    "Pizzaria Formosa",
    2,
    100,
    1617912835875
)`

    await db.exec(profileTable)
    await db.exec(jobTable)

    await db.run(profileInsert)
    await db.run(jobInsert)

    //Fechando a conex]ao com o bando de dados
    await db.close()
  }
}

initDB.init()