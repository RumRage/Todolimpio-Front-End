import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const initialForm = {
    name: "",
    category_id: "",
    price: "",
  };
  const [formValues, setFormValues] = useState(initialForm);

  const onChange = (e) => {
    const { name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    }

  const [services, setServices] = useState([]);
  const [service, setService] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  
  const getServices = async () => {
    const apiServices = await axios.get("services");
    setServices(apiServices.data.data);
    };

  const getService = async (id) => {
    const response = await axios.get("services/" + id);
    const apiService = response.data.data
    setService(apiService);
    setFormValues({
    name: apiService.name,
    category_name: apiService.category_name,
    price: apiService.price,
    });
  };

  const storeService = async (e) => {
    e.preventDefault();
    try{
      await axios.post("services", formValues);
      setFormValues(initialForm);
      navigate("/services");
    } catch(e){
      if(e.response.status === 422){
      setErrors(e.response.data.errors);
      }
    }
  }

  const updateService = async (e) => {
    e.preventDefault();
        try{
            await axios.put("services/" + service.id, formValues);
            setFormValues(initialForm);
            navigate("/services");
        } catch(e){
            setErrors(e.response.data.errors);
            if(e.response.status === 422){
        }
    }
}

  const deleteService = async (id) => {
    if(!window.confirm("Estás seguro?")){
      return;
    }
    await axios.delete("services/" + id);
    getServices();
    }
  

  return <ServiceContext.Provider value={{ service, services, getService, getServices, onChange, formValues, storeService, errors, updateService, deleteService, setErrors }}>{children}</ServiceContext.Provider>
}

export default ServiceContext;
