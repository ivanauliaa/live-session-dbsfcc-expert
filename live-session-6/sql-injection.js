require('dotenv').config();
const { Pool } = require('pg');
const { Sequelize } = require('sequelize');
const UserModel = require('./models/user');
const ProductModel = require('./models/product');

const pool = new Pool();

const sequelize = new Sequelize({
    database: process.env.PGDATABASE,
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
});

const Product = ProductModel(sequelize);

// const username = 'user';
// const password = 'user';
const username = '';
const password = '\' OR 1=1 --';

const loginV1 = async (username, password) => {
    try {
        const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}' LIMIT 1;`;
        console.log(query);
        const { rows } = await pool.query(query);
        console.log('result: ', rows);
    } catch (error) {
        console.log(error);
    }
}

const loginV2 = async (username, password) => {
    try {
        const query = {
            text: 'SELECT * FROM users WHERE username = $1 AND password = $2 LIMIT 1;',
            values: [username, password],
        };
        console.log(query);
        const { rows } = await pool.query(query);
        console.log('result: ', rows);
    } catch (error) {
        console.log(error);
    }
}

// const category = 'food'
const category = 'food\'; DELETE FROM users; --';

const productV1 = async (category) => {
    try {
        const query = `SELECT * FROM product WHERE category = '${category}';`;
        console.log(query);
        const { rows } = await pool.query(query);
        console.log('result: ', rows);
    } catch (error) {
        console.log(error);
    }
}

const productV2 = async (category) => {
    try {
        const products = await Product.findAll({
            where: {
                category,
            }
        });
        console.log('result: ', products);
    } catch (error) {
        console.log(error);
    }
}

// loginV1(username, password);
// loginV2(username, password);
// productV1(category);
productV2(category);
