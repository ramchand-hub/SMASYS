import jwt from "jsonwebtoken";
import config from "../../../webconfig.json";

export const verifyToken = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token is required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      config.JWT_SECRET
    ) as { user_id: string };

    console.log(decoded);

    req.user_id = decoded.user_id;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};