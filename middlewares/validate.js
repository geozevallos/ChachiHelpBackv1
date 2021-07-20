const jwt = require('jsonwebtoken')

function validateToken(req, res){
    const headerAuth = req.headers['authorization']

    if (headerAuth == null) return res.sendStatus(401)

    const token = headerAuth.split(' ')[1]

    jwt.verify(token, process.env.TOKEN_SECRET, function(err, payload){
        if(err){
            res.sendStatus(401);
        } else {
            res.status(200).send(payload);
        }
    })

}

module.exports = validateToken