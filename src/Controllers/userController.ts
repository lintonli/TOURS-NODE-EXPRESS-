import { RegisterSchema } from "../Helpers/validation";
import Bcrypt from "bcrypt";
import mssql from "mssql";
import { Request, Response, RequestHandler } from "express";
import { v4 as uid } from "uuid";
import dotenv from "dotenv";
import path from "path";
import { sqlConfig } from "../config";
import { DbHelper } from "../Helpers/databaseHelper";
import { IUser, Payload } from "../Models/UserModel";
import  Jwt  from "jsonwebtoken";

const databaseInstance = new DbHelper();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const id = uid();
    const { NAME, EMAIL, PASSWORD, ROLE} = req.body;
    const { error } = RegisterSchema.validate(req.body);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    const hashedPassword = await Bcrypt.hash(PASSWORD, 10);
    await databaseInstance.exec("addUser", {
      ID: id,
      NAME: NAME,
      EMAIL: EMAIL,
      PASSWORD: hashedPassword,
      ROLE:ROLE
    });
    return res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const loginUser= async (req:Request, res:Response)=>{
    try {
        const {EMAIL, PASSWORD}=req.body
        let user = (await databaseInstance.exec('getUser',{EMAIL})).recordset as IUser[]
        if(user.length!==0){
            const isValid = await Bcrypt.compare(PASSWORD, user[0].UPASSWORD)
            if(isValid){
                const payload:Payload={
                    SUB:user[0].ID,
                    UNAME:user[0].UNAME,
                    ROLE:user[0].ROLE
                }
                const token = Jwt.sign(payload, process.env.SECRET as string,{expiresIn:"1h"})
                return res.status(200).json({message:"Login successfull", token})
            }
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}
