import { useEffect, useState } from "react";
import { studentList } from "../Services/Allservice";

const usestudent = () => {
    const [studentss, setStudentss] = useState([])
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const fetchstudents = async () => {
            try {
                const response = await studentList(1, 100, "")
                setStudentss(response?.data?.studentlist)
            } catch (err) {
                setError("fail to fetch the students...")
            } finally {

            }
        }
        fetchstudents()
    }, [])
    return { studentss, error }
}

export default usestudent