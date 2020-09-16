import { Request, Response, response } from 'express'
import db from '../database/connections'
import Knex from 'knex'


export default class UserController {
    async index(req: Request, res: Response) {

        const user = await db('users')

        const { id } = req.params

        try {
            await db('users')
                .where('id', id)
                .then((value) => {
                    if(value[0] == null) {
                        res.status(400).json({
                            message: "No users in the database yet"
                        })
                    } else {
                        res.status(200).json(user)
                    }
                })
        } catch(err) {
            console.log(err)
            res.status(400).json({
                message: 'something happened'
            })
        }
    }

    async create(req: Request, res: Response) {

        const {
            nome,
            sobreNome,
            dataNascimento,
            genero,
            cpf
        } = req.body

        console.log(req.body)
        
        
        try {

            let achou = false;

            await db('users')
                .select('cpf')
                .then(async (value) => {
                    for (let count = 0; value.length > count; count++) {
                        if (value[count].cpf === cpf) {
                            achou = true;
                            break;
                        }
                    }
                    if (achou == false) {
                        await db('users').insert({
                            nome,
                            sobreNome,
                            dataNascimento,
                            genero,
                            cpf
                        })
                        res.status(201).json({
                            message: "created"
                        })
                    } else {
                        res.status(400).json({
                            error: "cpf duplicado"
                        })
                    }
                })
        } catch (err) {
            
            return res.status(401).json({
                error: "falta coisa"
            })

        }
    }

    async update(req: Request, res: Response) {

        console.log(req.body)
        const {
            id,
            nome,
            sobreNome,
            dataNascimento,
        } = req.body


        try {

            await db('users')
            .where('id', id)
            .select('id')
            .then(async (value)=> {
                
                if(value[0] == null){
                    res.status(400).json({
                        error: "usuario não encontrado"
                    })
                } else {
                    await db('users').where('id', id)
                    .update({
                        nome,
                        sobreNome,
                        dataNascimento,
                    })
                    res.status(200).json({
                        message: "Atualizado com sucesso"
                    })
                }
            })

        } catch(err){
            return res.status(400).json({
                error: "ID não encontrado"
            })
        } 
    }

    async delete(req: Request, res: Response) {
        
        console.log(req.params)

        const { id } = req.params
        

        try {
            await db('users')
            .where('id', id)
            .del()
            .then(() => {
                res.json({ message: "SUCESSO"})
            })

        } catch (err) {
            console.log(err)
            return res.status(400).json({
                error: "ID não encontrado"
            })
        }
    }
}