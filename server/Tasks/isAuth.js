const jwt=require('jsonwebtoken')

exports.isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies
    if (!token) {
        return res.status(401).json({ sucess: false, message: "please login to access detail" })
    }
    const data = jwt.verify(token, process.env.JWT_KEY)
    req.id = data.id;

    next()


}