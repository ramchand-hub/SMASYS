import { useEffect, useState } from "react";
import { classsList } from "../Services/Allservice";

const useclass = () => {
    const [classes, setClasses] = useState([])
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const fetchclasses = async () => {
            try{
                const response = await classsList(1,100,"")
                setClasses(response?.data?.classeslist)
            }catch(err){
                setError("fail to fetch the classes...")
            }finally{

            }
        }
        fetchclasses()
    }, [])
    return {classes,error}
}

export default useclass