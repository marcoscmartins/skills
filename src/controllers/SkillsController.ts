import { Request, Response } from 'express';
import knex from '../database/connection';

class SkillsController {
  async index(request: Request, response: Response) {
    const { nome, linguagem, nivel, link } = request.query;

    const skills = await knex('skills')
      .distinct()
      .select('skills.*');

    return response.json(skills);
  }

  async show(request: Request, response: Response) {

    const { id } = request.params;
    const skill = await knex('skills').where('id', id).first();
    if (!skill) return response.status(400).json({ message: 'Skill not found.' });
    return response.json({ skill });
  }

  async create(request: Request, response: Response) {

    const { nome, nivel, link, linguagem } = request.body;
    console.log( nome, nivel, link, linguagem);
    const trx = await knex.transaction();

    const skill = { nome, nivel, link, linguagem };
    const insertedIds = await trx('skills').insert(skill);
    const id = insertedIds[0];

    await trx.commit();

    return response.json({ id, ...skill });
  }
  async update(request: Request, response: Response) {

    const { nome, nivel, link, linguagem } = request.body;
    const { id } = request.params;
    
    let obUpdate = {};
    if (nome)      obUpdate = { ...obUpdate, nome };
    if (nivel)     obUpdate = { ...obUpdate, nivel };
    if (link)      obUpdate = { ...obUpdate, link };
    if (linguagem) obUpdate = { ...obUpdate, linguagem };

    const trx = await knex.transaction();
    const skill = await trx('skills').where('id', id).update(obUpdate);
    await trx.commit();

    // console.log( nome, nivel, link, linguagem);

    return response.json({ id, ...obUpdate });
  }
  async delete(request: Request, response: Response) {

    const { id } = request.params;
    const trx = await knex.transaction();
    const skill = await trx('skills').where('id', id).del();
    console.log(skill);
    await trx.commit();

    return response.json({ id, skill });
  }
}

export default SkillsController;