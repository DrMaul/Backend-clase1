import passport from 'passport'
import passportJWT from 'passport-jwt'
import { SECRET } from '../utils.js'

const buscaToken= (req) => {
    let token = null

    if(req.cookies["codercookie"]){
        token = req.cookies["codercookie"]
    } 


    return token
}

//1
export const initPassport = ()=> {
    passport.use(
        "jwt",
        new passportJWT.Strategy(
            {
                secretOrKey: SECRET,
                jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([buscaToken])
            },
            async (contentToken,done) => { //usuario, el token suele tener datos del user
                try {
                    //return done(null, false, {message:"hola"})
                    if(contentToken.nombre==="Juan"){
                        return done(null,false,{message:"El usuario Juan ha sido bloqueado"})
                    }
                    return done(null, contentToken)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )


    //1' solo si uso session, con jwt para autenticacion no se configura

}