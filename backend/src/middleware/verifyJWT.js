import jwt from 'jsonwebtoken'

const verifyJWT = (req, res, next) => {
  const authHeader =  req.headers.authorization || req.headers.Authorization
  if(!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({message: "Unauthorized"})
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err) {
      return res.status(403).json({message: "Forbidden access. Token expired"})
    }
    
    req.user = {
      id: decoded.UserInfo.id,
      username: decoded.UserInfo.username,
      role: decoded.UserInfo.role
    }

    next()
  })
}

export default verifyJWT;