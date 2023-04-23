import { Knex } from "knex";

export async function up(knex:Knex) {
  return knex.schema.createTable('skills', table => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.integer('nivel').notNullable();
    table.string('link');
    table.string('linguagem');
  });
}
export async function down(knex:Knex) {
  return knex.schema.dropTable('skills');
}