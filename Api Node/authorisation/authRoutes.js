module.exports =  (router, expressApp, authRoutesMethods) => {

    //route for registering new users
    router.post('/registerUser', authRoutesMethods.registerUser)


    //route for registering new users
    router.post('/registerUserByCode', authRoutesMethods.registerUserByCode)


    //route for allowing existing users to login
    router.post('/login', expressApp.oauth.grant(), authRoutesMethods.login)


    //POUR APPLI WEB EN ATTENDANT
    router.post('/loginWeb', authRoutesMethods.loginWeb)


    return router
}



