import { createContext, ReactNode,  useState } from "react";

interface usercontextType {
    userdata :string
}
interface AuthContextType {
    user_details: usercontextType | null;
userlogin:(userdata:usercontextType)=>Promise<void>;
    logout:()=> void
}
interface Props {
    children: ReactNode;
}
export const UserContext = createContext<AuthContextType | "">("");

export const Authprovider = ({children}:Props) => {

    const [user_details, setUserDetails] = useState<usercontextType | null>(null)
    const userlogin = async (userdata:usercontextType) => {
       setUserDetails(userdata)
    }

    const logout = () => {

    }

    return(

        <UserContext.Provider value={{user_details, userlogin, logout() {
            
        },}}>
{children}
        </UserContext.Provider>
    )
}


