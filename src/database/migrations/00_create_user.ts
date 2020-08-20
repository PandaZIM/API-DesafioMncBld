import Knex = require('knex')

export async function up(knex: Knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.string('sobreNome').notNullable();
        table.date('dataNascimento').notNullable();
        table.enum('genero', ['masculino', 'feminino']);
        table.string('cpf');
        table.unique(['cpf']);
    })
}

export async function down (knex: Knex){
    return knex.schema.dropTable('users');
}