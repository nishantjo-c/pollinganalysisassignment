# Polling system and trend analysis

## Description: This is a polling system where a user can add a poll choice and based on this data the graph is plotted.

## Dependencies/Libraries Required:

#### Client Side

1. react.js
2. chart.js v4
3. react-chartjs-2 v5
4. react-router-dom v6
5. sass v1.66

#### Server Side

1. express v4
2. pg v8

##### _Dev Dependencies_

3. cors
4. nodemon

#### Database

1. Postgres SQL

## Setting Up the Project

1. Clone into https://github.com/nishantjo-c/pollinganalysisassignment.git
2. ### Setup Client

```
  cd app
  yarn
```

_This will initialize the client with necessary dependencies for react_
install the required dependencies mentioned above for client side

3. ### Setup Server

```
  cd server
  npm
```

_This will initialize the server with necessary dependencs for node and express_
install teh required dependencied mentioned above for server side

4. ### Setup Database
   _Setup postgres_
   Replace the password and databasename with your configurations in `db.js file`

```
{
  user: "postgres",
  password: DB_PASSWORD,
  database: DB_NAME,
  host: "localhost",
  port: 5432,
}
```

5. ### Running the project
   _Run separate servers for both app and server_

```
  cd app
  yarn start
```

```
  cd server
  npm start
```
