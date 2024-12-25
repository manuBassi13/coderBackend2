import { expect } from "chai";
import supertest from "supertest";
import { generateUser } from "../src/utils/utils.js";
import { request } from "express";

const requester = supertest('http://localhost:8080')

describe('Test de user.dao.js', () => {

    describe('Test POST endpoint', () => {

        it('Deberia de crear un usuario correctamente en /api/users [POST]', async () => {
            const user = generateUser()
            
            const {statusCode, ok, _body} = await requester.post('/api/users').send(user) 

            expect(statusCode).to.be.eq(201)
            expect(ok).to.be.eq(true)
            expect(_body.message).to.contain('Usuario creado')
        })

        it('Deberia modificar el nuevo usuario por id en /api/users/:uid [POST]', async () => {

            let {statusCode, ok, _body} = await requester.get('/api/users').send()
            //Obtener el último usuario
            const lastUser = _body.payload[_body.payload.length-1]

            console.log(lastUser);

            ({statusCode, _body} = await requester.get('/api/users/'+lastUser._id).send())
            
            const userUpdated = {
                ..._body.payload,
                email: "nuevoEmailTest@test.com"
            } 
            console.log("userUpdated: ",userUpdated);
            
            ({statusCode, _body} = await requester.post('/api/users/'+lastUser._id).send(userUpdated))        
            expect(statusCode).to.be.eq(200)
            expect(_body.message).to.be.eq('Usuario actualizado.')
            console.log("body post: ",_body);
            
            
            ({statusCode, _body} = await requester.get('/api/users/'+lastUser._id).send())
            console.log("bodyUpdated: ",_body);
            
            expect(statusCode).to.be.eq(200)
            expect(_body.payload.email).to.be.eq('nuevoEmailTest@test.com')
            
        })
    })

    describe('Test GET endpoint', () => {
        it('Deberia traer una lista de usuarios en /api/users [GET]', async () => {
            const {statusCode, ok, _body} = await requester.get('/api/users').send() 
            expect(statusCode).to.be.eq(200)
            expect(ok).to.be.eq(true)
            expect(_body.payload.length).to.not.equal(0)
        })

        it('Deberia traer un usuario por id en /api/users/:uid [GET]', async () => {
            const userId = '66eb5ee549e5733b9066fecd'
            const {statusCode, _body} = await requester.get('/api/users/'+userId).send()
            expect(statusCode).to.be.eq(200)
            expect(_body.payload.first_name).to.be.eq('Manuel')
        })
    })

    describe('Test DELETE endpoint', () => {

        it('Deberia eliminar el nuevo usuario por id en /api/users/:uid [DELETE]', async () => {
            let {statusCode, _body} = await requester.get('/api/users').send()
            //Obtener el último usuario
            const lastUser = _body.payload[_body.payload.length-1]

            ({statusCode, _body} = await requester.delete('/api/users/'+lastUser._id).send())
            expect(statusCode).to.be.eq(200)
            expect(_body.message).to.be.eq('Usuario eliminado.')
            
            
            ({statusCode, _body} = await requester.get('/api/users/'+lastUser._id).send())
            
            expect(statusCode).to.be.eq(500)
            expect(_body.message).to.be.eq('Usuario no encontrado')
        })
    })
})