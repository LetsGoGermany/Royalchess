import { useContext,} from "react";
import { AuthContext } from "../context/AuthContext";

export default function useLogin() {
    const context = useContext(AuthContext)
    
    if(!context) {
        throw new Error('Using Context outside Providewe')
    }
    return context
}