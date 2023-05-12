import { createContext } from "react";


const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {

    

    
    return (
        <ServiceContext.Provider value={{ }}>{children}</ServiceContext.Provider>
    )
}

export default ServiceContext;