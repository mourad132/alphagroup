const ensureAuthenticated = (req, res, next) => {
    if(req.user){
        next()
    } else {
        res.redirect('/')
    }
}

const isAuthenticated = (req, res, next) => {
    if(req.user){
        res.redirect('/home')
    } else {
        next()
    }
}

module.exports = { ensureAuthenticated, isAuthenticated };