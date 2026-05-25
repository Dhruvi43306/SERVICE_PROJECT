import { listServiceRequestType, getServiceRequestTypeDetails, createServiceRequestType, updateServiceRequestType, removeServiceRequestType } from "../services/ServiceRequestType.service"
import { Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
export async function getAllServiceRequestType(req:Request,res:Response){
    try{
    const data = await listServiceRequestType()
        res.status(200).json({
            error:false,
            data,
            message:"All ServiceRequest Type are SuccesFully Feached!"
        })
    }
    catch(err){
        res.status(500).json({
            error:true,
            message:"All ServiceRequest Type are Not Feached!"
        })
    } 
}

export async function getServiceRequestTypeById(req:Request,res:Response){
    try{
        const typeid = Number(req.params.id)
    const data = await getServiceRequestTypeDetails(typeid)
        res.status(200).json({
            error:false,
            data,
            message:"ServiceRequest Type are SuccesFully Feached By Id!"
        })
    }
    catch(err){
        res.status(500).json({
            error:true,
            message:"ServiceRequest Type are Not Feached By Id!"
        })
    }
}

export async function InsertedServiceRequestType(req:AuthRequest,res:Response){
    try{
        if (!req.user) {
            return res.status(401).send("Unauthorized");
        }
      const data = await createServiceRequestType(req.body,req.user)
        res.status(200).json({
            error:false,
            data,
            message:"All ServiceRequest Type are SuccesFully Inserted!"
        })
    }
    catch(err){
        res.status(500).json({
            error:true,
            message:"All ServiceRequest Type are Not Inserted!"
        })
    }  
    
}


export async function UpdatedServiceRequestType(req:AuthRequest,res:Response){
    try{
        const typeid = Number(req.params.id)
        if (!req.user) {
            return res.status(401).send("Unauthorized");
        }
       const data = await updateServiceRequestType(req.body,typeid,req.user)
        res.status(200).json({
            error:false,
            data,
            message:"ServiceRequest Type are SuccesFully Updated!"
        })
    }
    catch(err){
        res.status(500).json({
            error:true,
            message:"ServiceRequest Type are Not Updated!"
        })
    }  
    
}

export async function DeletedServiceRequestType(req:AuthRequest,res:Response){
    try{
        const typeid = Number(req.params.id)
        if (!req.user) {
            return res.status(401).send("Unauthorized");
        }
        const data = await removeServiceRequestType(typeid,req.user)
        res.status(200).json({
            error:false,
            data,
            message:"ServiceRequest Type are SuccesFully Deleted!"
        })
    }
    catch(err){
        res.status(500).json({
            error:true,
            message:"ServiceRequest Type are Not Deleted!"
        })
    } 
    
}


