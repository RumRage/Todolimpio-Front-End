import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8000/api/v1/";

const ComboContext = createContext();

export const ComboProvider = ({ children }) => {
const initialForm = {
name: "",
service_id: [],
price: "",
discount: "",
total_price: ""
};
const [formValues, setFormValues] = useState(initialForm);

const [combos, setCombos] = useState([]);
const [combo, setCombo] = useState([]);
const [errors, setErrors] = useState({});
const navigate = useNavigate();
const [services, setServices] = useState([]);

const getCombos = async () => {
const response = await axios.get("combos?with=services"); // Eager Loading
setCombos(response.data.data);
};

const onChange = (event) => {
  const { name, value } = event.target;
  
  if (name === 'service_id') {
    const selectedServiceIds = Array.isArray(value) ? value.map(serviceId => Number(serviceId)) : [];
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: selectedServiceIds,
    }));
  } else {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }
};

const getCombo = async (id) => {
  const response = await axios.get("combos/" + id);
  const apiCombo = response.data.data;

  // Obtener todos los service_id del combo actual
  const selectedServiceIds = apiCombo.services.map(service => service.id);

  setCombo(apiCombo);
  setFormValues((prevValues) => ({
    ...prevValues,
    name: apiCombo.name,
    service_id: selectedServiceIds, // Actualizar el nombre del campo
    price: apiCombo.price,
    discount: apiCombo.discount,
    total_price: apiCombo.total_price,
  }));
};

useEffect(() => {
  const fetchServices = async () => {
    try {
      const response = await axios.get('/services');
      const fetchedServices = response.data.data;
      // Combinar los nuevos servicios con los existentes
      const mergedServices = [...services, ...fetchedServices];
      setServices(mergedServices);
    } catch (error) {
      console.log(error);
    }
  };

  fetchServices();
}, []);

const storeCombo = async (e) => {
e.preventDefault();
try {
await axios.post("combos", {
name: formValues.name,
price: formValues.price,
discount: formValues.discount,
total_price: formValues.total_price,
service_id: formValues.service_id // Cambio en el nombre del campo
});
setFormValues(initialForm);
navigate("/combos");
} catch (e) {
if (e.response.status === 422) {
setErrors(e.response.data.errors);
}
}
};

const updateCombo = async (e) => {
e.preventDefault();
try {
await axios.put("combos/" + combo.id, formValues);
setFormValues(initialForm);
navigate("/combos");
} catch (e) {
setErrors(e.response.data.errors);
if (e.response.status === 422) {
// Lógica adicional para manejar errores de validación si es necesario
}
}
};

const deleteCombo = async (id) => {
if (!window.confirm("Estás seguro?")) {
return;
}
await axios.delete("combos/" + id);
getCombos();
};

return (
<ComboContext.Provider value={{ combo, combos, getCombo, getCombos, onChange, formValues, storeCombo, errors, updateCombo, deleteCombo, setErrors, services, setServices }}>{children}</ComboContext.Provider>
);
};

export default ComboContext;
