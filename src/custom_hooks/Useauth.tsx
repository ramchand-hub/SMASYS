import { UserContext } from "../pages/context/Contextapi";
import { useContext } from "react";
export const useAuth = ()=>{

    const context = useContext(UserContext);

      if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context
} 