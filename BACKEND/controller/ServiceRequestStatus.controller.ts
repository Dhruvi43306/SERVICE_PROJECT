import { listServiceRequestStatus, getServiceRequestStatusDetail, crateServiceRequestStatus, updateServiceRequestStatus, removeServiceRequestStatus, ServiceRequeststatusByTechService } from "../services/ServiceRequestStatus.service"
import { Request, Response } from "express";
import { AuthRequest } from "../type/authRequest.type";
import { db } from "../db/mysql";
export async function getAllServiceRequestStatus(req:AuthRequest,res:Response){
    try{
     const data = await listServiceRequestStatus()
        res.status(200).json({
            error:false,
            data,
            message:"User Fetched All ServiceRequestStatus"
        })
    }
    catch(err:any){
        console.error("GET ERROR:", err);
        res.status(500).json({
        error: true,
        message: err.message
    });
}  
    
}

export async function getServiceRequestStatusById(req:AuthRequest,res:Response){
    try{
        const statusid = Number(req.params.id)
        const data = await getServiceRequestStatusDetail(statusid)
         res.status(200).json({
            error:false,
            data,
            message:"User Fetched ServiceRequestStatus By ID"
        })
    }
    catch(err:any){
        console.error("GETBYID ERROR:", err);
        res.status(500).json({
        error: true,
        message: err.message
    });
}
}

export async function InsertedServiceRequestStatus(req:AuthRequest,res:Response){
    try{
        if (!req.user) {
            return res.status(401).send("Unauthorized");
        }
    const data = await crateServiceRequestStatus(req.body,req.user)
        res.status(200).json({
            error:false,
            data,
            message:"User Fetched All ServiceRequestStatus Inserted"
        })
    }
    catch (err: any) {
    console.error("INSERT ERROR:", err);

    res.status(500).json({
        error: true,
        message: err.message
    });
}
}

export async function UpdatedServiceRequestStatus(req:AuthRequest,res:Response){
    try{
        const statusid = Number(req.params.id)
        // get statusId from body

        if (!statusid) return res.status(400).send("statusId is required");

        if (!req.user) {
            return res.status(401).send("Unauthorized");
        }
        const data = await updateServiceRequestStatus(req.body,statusid,req.user)
        res.status(200).json({
            error:false,
            data,
            message:"User Fetched Updated ServiceRequestStatus"
        })
    }
    catch(err:any){
        console.error("UPDATE ERROR:", err);
        res.status(500).json({
        error: true,
        message: err.message
    });
    }    
    
}

export async function DeletedServiceRequestStatus(req:AuthRequest,res:Response){
    try{
        const statusid = Number(req.params.id)
        if (!req.user) {
            return res.status(401).send("Unauthorized");
        }
      const data = await removeServiceRequestStatus(statusid,req.user)
        res.status(200).json({
            error:false,
            data,
            message:"User Deleted ServiceRequestStatus are SuccesFully"
        })
    }
    catch(err:any){
        console.error("DELETE ERROR:", err);
        res.status(500).json({
        error: true,
        message: err.message
    });
    }
}

export async function ServiceRequestStatusTechByController(req:AuthRequest,res:Response,statusId:number){
    try{
        const requestId = Number(req.params.id);
        const statusId = Number(req.body.statusId);
        if (!statusId) return res.status(400).send("statusId is required");
        if (!requestId) return res.status(400).send("requestId is required");
         const data = await ServiceRequeststatusByTechService(requestId,statusId)
        res.status(200).json({
            error:false,
            data,
            message:"User Fetched Updated ServiceRequestStatusByTech"
        })
    }
    catch(err:any){
        console.error("DELETE ERROR:", err);
        res.status(500).json({
        error: true,
        message: err.message
    })
}
}