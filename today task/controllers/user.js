const User = require('../models/user');


exports.postUser = async (req, res, next) => {
    try {
        const {name,email,password} = req.body;

        let userExist = await User.findAll({where: {email}});
        if(!userExist.length){
            userExist = await User.findAll({where: {number}});
        }
        
        if(userExist && userExist.length){
            res.status(207).json({ message: 'User already exist, Please Login' });
        } else {
             console.log(err);
               
            };
        }
    };
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: err });
    }


function generateAccess(id,name){
    return sign({id,name});
}

exports.postLogin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const loginPassword = req.body.password;

        const userExist = await User.findOne({ where: { email } });
        
        if (userExist) {
            bcrypt.compare(loginPassword, userExist.dataValues.password, (err, result) => {
                if (err) {
                    throw new Error('Something went wrong');
                }
                if (result) {
                    res.status(200).json({ message: 'User logged in successfully', 
                    success: true, 
                    token: generateAccess(userExist.dataValues.id, userExist.dataValues.name),
                    userId:userExist.dataValues.id
                    })
                } else {
                    res.status(401).json({ error: "User not authorized. Wrong password", success: false });
                }
            })
        } else {
            res.status(404).json({ error: "User doesnot exist. Try with different email", success: false });
        }
    } catch (err) {
        res.status(500).json({ error: err, success: false })
    }
}

