import passport from 'passport'
import github from 'passport-github2'
import { UsuariosManagerMongo as UsuariosManager } from '../dao/UsuariosManagerMONGO.js'


const usuariosManager = new UsuariosManager()

//paso 1
export const initPassport =()=>{

    passport.use(
        "github",
        new github.Strategy(
            {
                clientID:"Iv23liPRCJzxkr5KfDmE",
                clientSecret:"0bad4a444de0170d99691529e038ca2493f0fcc6",
                callbackURL:"http://localhost:3000/api/sessions/callbackGithub"
            },
            async(tokenAcceso, tokenRefresh, profile, done)=> {
                try {
                    //console.log(profile)

                    let email = profile._json.email
                    let nombre = profile._json.name
                    if(!nombre || !email){
                        return done(null, false)
                    }
                    let usuario = await usuariosManager.getBy({email})
                    if(!usuario){
                        usuario = await usuariosManager.create({
                            nombre, email, profile
                        })
                    }

                    return done(null, usuario)
                   
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    
    
    //paso 1 bis
    passport.serializeUser((usuario, done)=>{
        return done(null, usuario._id)
    })

    passport.deserializeUser(async (id,done)=>{
        let usuario = await usuariosManager.getBy({_id:id})
        return done(null, usuario)
    })
}