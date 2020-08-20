import { Request, Response, response } from 'express'
import db from '../database/connections'


export default class UserController {
    async index(req: Response, res: Response) {
        const users = await db('users')

        return res.json(users)
    }

    async create(req: Request, res: Response) {

        const {
            nome,
            sobreNome,
            dataNascimento,
            genero,
            cpf
        } = req.body

        
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
}