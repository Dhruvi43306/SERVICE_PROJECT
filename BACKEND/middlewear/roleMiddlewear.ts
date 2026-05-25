import { Response } from "express";
import { AuthRequest } from "../type/authRequest.type";

export function allowRole(permissionMap: any) {
  return (req: AuthRequest, res: Response, next: any) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
    const userRole = req.user.Role;
    console.log("USER ROLE:", userRole);
    console.log("USER FROM TOKEN:", req.user);
    console.log("PERMISSION MAP:", permissionMap);

    const method = req.method;
    console.log("METHOD:", method);

    const rolePermission = permissionMap[method];

    if (!rolePermission) {
      return res.status(403).json({ message: "Method not allowed" });
    }

    if (!rolePermission.includes(userRole)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
}

// module.exports = {allowRole}
