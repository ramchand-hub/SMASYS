import { Request, Response, NextFunction } from "express";
import Role from "../models/Role";
import User from "../models/User";
import { successResponse, errorResponse } from "../utils/messages";

export const createRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { role_name, description } = req.body;

    // Basic manual validation (you can replace with express-validator / Zod later)
    if (
      !role_name ||
      typeof role_name !== "string" ||
      role_name.trim() === ""
    ) {
      return res
        .status(400)
        .json(
          errorResponse("Role name is required and must be a non-empty string"),
        );
    }

    // Optional: trim here too (though schema does it)
    const normalizedName = role_name.trim().toLowerCase();

    // Check for existing role (case-insensitive because of lowercase in schema)
    const existing = await Role.findOne({ name: normalizedName });
    if (existing) {
      return res
        .status(409)
        .json(errorResponse(`Role '${role_name}' already exists`));
    } else {
      const role = await Role.create({
        name: normalizedName, // stored in lowercase
        description: description?.trim() || undefined,
      });

      return res.json(successResponse("Role created successfully", role));
    }
  } catch (err: any) {
    // For other errors (validation, db connection, etc.)
    console.error("Error creating role:", err);
    return next(err); // or res.status(500).json(errorResponse('Server error'));
  }
};

export const getRoles = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roles = await Role.find();
    if (roles.length > 0) {
      return res.json(successResponse("Roles retrieved successfully", roles));
    } else {
      return res.json(successResponse("No roles found", []));
    }
  } catch (err) {
    next(err);
  }
};

export const getRoleById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) return res.status(404).json(errorResponse("Role not found"));
    res.json(successResponse("Role retrieved", role));
  } catch (err) {
    next(err);
  }
};

export const updateRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { role_name, description } = req.body;
    const updates: any = {};
    if (role_name) updates.name = role_name.trim().toLowerCase();
    if (description) updates.description = description.trim();
    const role = await Role.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!role) return res.status(404).json(errorResponse("Role not found"));
    res.json(successResponse("Role updated", role));
  } catch (err) {
    next(err);
  }
};

export const deleteRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roleId = req.params.id;
    // prevent deleting a role that is assigned to users
    const usersWithRole = await User.countDocuments({ role: roleId });
    if (usersWithRole > 0)
      return res
        .status(400)
        .json(
          errorResponse("Cannot delete role: users are assigned to this role"),
        );
    const role = await Role.findByIdAndDelete(roleId);
    if (!role) return res.status(404).json(errorResponse("Role not found"));
    res.json(successResponse("Role deleted", null));
  } catch (err) {
    next(err);
  }
};

export default {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
