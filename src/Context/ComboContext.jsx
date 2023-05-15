import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const ComboContext = createContext();

export const ComboProvider = ({ children }) => {
  const initialForm = {
    name: "",
    service_id: "",
    price: "",
    discount: "",
    total_price: ""
  };
  const [formValues, setFormValues] = useState(initialForm);

  const onChange = (e) => {
    const { name, value} = e.target;
    setFormValues({...formValues, [name]: value});
    }

  const [combos, setCombos] = useState([]);
  const [combo, setCombo] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  
  const getCombos = async () => {
    const response = await axios.get("combos?with=services"); // Eager Loading
    setCombos(response.data.data);
};

  const getCombo = async (id) => {
    const response = await axios.get("combos/" + id);
    const apiCombo = response.data.data;
  
    // Obtén el objeto de la categoría seleccionada por su nombre
    const selectedService = services.find(service => service.name === apiCombo.service_name);
  
    setCombo(apiCombo);
    setFormValues({
      name: apiCombo.name,
      services_id: selectedService ? selectedService.id : "", // Asigna category_id en lugar de category_name
      price: apiCombo.price,
      discount: apiCombo.discount,
      total_price: apiCombo.total_price,
    });
  };
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('/services');
        setServices(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchServices();
  }, []);

  const storeCombo = async (e) => {
    e.preventDefault();
    try{
      await axios.post("combos", formValues);
      setFormValues(initialForm);
      navigate("/combos");
    } catch(e){
      if(e.response.status === 422){
      setErrors(e.response.data.errors);
      }
    }
  }



  const updateCombo = async (e) => {
    e.preventDefault();
        try{
            await axios.put("combos/" + combo.id, formValues);
            setFormValues(initialForm);
            navigate("/combos");
        } catch(e){
            setErrors(e.response.data.errors);
            if(e.response.status === 422){
        }
    }
}

  const deleteCombo = async (id) => {
    if(!window.confirm("Estás seguro?")){
      return;
    }
    await axios.delete("combos/" + id);
    getCombos();
    }
  

  return <ComboContext.Provider value={{ combo, combos, getCombo, getCombos, onChange, formValues, storeCombo, errors, updateCombo, deleteCombo, setErrors, services, setServices }}>{children}</ComboContext.Provider>
}

export default ComboContext;
