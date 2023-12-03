import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export default async function checkAuth(req, res, next){
    const token = (req.headers.authorization || '').replace(/Bearer\s/, '');
    if(token){
        try {
            const token_data = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = token_data._id;
            return next();
        } catch (err) {
            console.log(err);
            return res.status(403).json({message: 'Not authenticated.'});
        }
    } else {
        return res.status(403).json({message: 'Not authenticated.'});
    }
}