
export function registerValidation(req, res, next){
    try {
        const {username, password, passwordConfirm} = req.body;
        if(username && password && passwordConfirm){
            const digitRegex = /\d/;
            const lettersRegex = /[a-zA-Z]/g;
            const unameLettersCount = (username.match(lettersRegex) || []).length;
            if(username.length < 4 || username.length > 20){
                return res.status(400).json({message: 'Username length must be between 4 and 20 symbols.'});
            }
            if(unameLettersCount < 3){
                return res.status(400).json({message: 'Username must contain at least 3 letters.'});
            }

            if(password.length < 5 || password.length > 16){
                return res.status(400).json({message: 'Password length must be between 5 and 16 symbols.'});
            }

            if(password !== passwordConfirm){
                return res.status(400).json({message: 'Passwords does not match.'});
            }
            const passLettersCount = (password.match(lettersRegex) || []).length;
            const passDigitCount = (password.match(digitRegex) || []).length;
            if(passDigitCount < 1 || passLettersCount < 4){
                return res.status(400).json({message: 'Password must contain at least one digit and at least four letters.'});
            }

            return next();
        } else {
            return res.status(400).json({message: 'Credentials not provided.'});
        }
    } catch (err) {
        console.log(`Validation error: ${err.message}`);
        return res.status(500).json({message: 'Server error.'});
    }
}

export function loginValidation(req, res, next){
    try {
        const {username, password} = req.body;
        if(username && password){
            return next();
        } else {
            return res.status(400).json({message: 'Credentials not provided.'});
        }
    } catch (err) {
        console.log(`Validation error: ${err.message}`);
        return res.status(500).json({message: 'Server error.'});   
    }
}