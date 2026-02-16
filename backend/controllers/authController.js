import pool from "../db.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";


// REGISTER
export const register = async (req,res)=>{
  try {
    const {name,email,password,role} = req.body;

    const hashed = await bcrypt.hash(password,10);

    const user = await pool.query(
      "INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,$4) RETURNING id,name,email,role",
      [name,email,hashed,role || "user"]
    );

    const token = generateToken(user.rows[0]);

    res.json({
      token,
      user:user.rows[0]
    });

  } catch(err){
    res.status(500).json(err.message);
  }
};


// LOGIN ⭐ FIXED
export const login = async (req,res)=>{
  try {
    const {email,password} = req.body;

    console.log("LOGIN BODY:", req.body);

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if(user.rows.length === 0){
      return res.status(400).json("User not found");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if(!validPassword){
      return res.status(400).json("Wrong password");
    }

    const token = generateToken(user.rows[0]);

    res.json({
      token,
      user:{
        id:user.rows[0].id,
        name:user.rows[0].name,
        email:user.rows[0].email,
        role:user.rows[0].role
      }
    });

  } catch(err){
    res.status(500).json(err.message);
  }
};
