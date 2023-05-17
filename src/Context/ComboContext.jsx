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

//VARIABLES INICIALIZADAS
const [formValues, setFormValues] = useState(initialForm);
const [combos, setCombos] = useState([]);
const [combo, setCombo] = useState([]);
const [errors, setErrors] = useState({});
const navigate = useNavigate();
const [services, setServices] = useState([]);
const [selectedServices, setSelectedServices] = useState([]);

const [totalPrice, setTotalPrice] = useState(0);
const [discount, setDiscount] = useState(0);
const [discountedPrice, setDiscountedPrice] = useState(0);

//SELECT MATERIAL UI PARA CREATE Y EDIT
const MenuProps = {
PaperProps: {
style: {
maxHeight: 224,
width: 250,
},
},
};

//FUNCION QUE USA EL SELECT MATERIAL UI
const handleChange = (event) => {
  const selectedServices = event.target.value || [];
  setSelectedServices(selectedServices);
};

//SERVICIOS
useEffect(() => {
  const fetchData = async () => {
  try {
  const response = await axios.get('/services');
  setServices(response.data.data);
  
  setFormValues(prevFormValues => ({
  ...prevFormValues,
  service_id: selectedServices
  }));
  } catch (error) {
  console.log(error);
  }
  };
  
  fetchData();
  }, [selectedServices]);

//FUNCIÓN QUE TIENE QUE MANEJAR TODOS LOS CAMBIOS DEL FORMULARIO
const onChange = (e) => {
const { name, value} = e.target;
setFormValues({...formValues, [name]: value});
}

//FUNCIÓN QUE TRAE TODOS LOS COMBOS AL INDEX
const getCombos = async () => {
const apiCombos = await axios.get("combos");
setCombos(apiCombos.data.data);
};
//FUNCIÓN QUE TRAE UN ID ESPECÍFICO PARA EDITAR
const getCombo = async (id) => {
  const response = await axios.get("combos/" + id);
  const apiCombo = response.data.data;
  setSelectedServices(apiCombo.services);
  setFormValues({
    ...apiCombo,
    service_id: apiCombo.services.map((service) => service.id).filter(Boolean)
  });
};


//FUNCIÓN QUE GUARDA UN NUEVO COMBO
const storeCombo = async (e) => {
e.preventDefault();
const combo = {
name: formValues.name,
services: selectedServices.map((service) => service.id),
price: formValues.priceTotal,
discount: formValues.discount,
total_price: formValues.discountedPrice
};
try{
await axios.post("combos", formValues);
setFormValues(initialForm);
navigate("/combos");
} catch(e){
if(e.response.status === 422){
setErrors(e.response.data.errors);
}
}
setFormValues(initialForm);
setSelectedServices([]);
setDiscount(0);
setDiscountedPrice(0);
setTotalPrice(0);
setErrors({});
}
//FUNCIÓN QUE ACTUALIZA UN COMBO
const updateCombo = async (e) => {
e.preventDefault();
const updatedCombo = {
...formValues,
services: selectedServices.map((service) => service.id),
price: totalPrice,
discount: formValues.discount,
total_price: discountedPrice,
};
try {
await axios.put("combos/" + combo.id, updatedCombo);
setFormValues(initialForm);
navigate("/combos");
} catch (e) {
setErrors(e.response.data.errors);
if (e.response.status === 422) {
// Manejar el error de validación si es necesario
}
}
};

//FUNCIÓN PARA BORRAR UN COMBO
const deleteCombo = async (id) => {
if(!window.confirm("Estás seguro?")){
return;
}
await axios.delete("combos/" + id);
getCombos();
}


const calculateDiscountedPrice = () => {
if (selectedServices.length > 0) {
const selectedPrices = selectedServices.map(service => parseFloat(service.price));
const totalPrice = selectedPrices.reduce((acc, curr) => acc + curr);
setTotalPrice(totalPrice);
const discount = parseFloat(formValues["discount"]) || 0;
const discountedPrice = totalPrice * (1 - discount / 100);
setDiscountedPrice(discountedPrice);
} else {
setTotalPrice(0);
setDiscountedPrice(0);
}
};
useEffect(calculateDiscountedPrice, [selectedServices, formValues]);



//EXPORTANDO LAS FUNCIONES

return <ComboContext.Provider value={{
combo,
combos, 
getCombo, 
getCombos, 
onChange, 
formValues, 
storeCombo, 
errors, 
updateCombo, 
deleteCombo, 
setErrors, 
services, 
setServices, 
setCombos,
setCombo,
selectedServices,
setSelectedServices,
handleChange,
MenuProps,
discount,
setDiscount,
discountedPrice,
setDiscountedPrice,
totalPrice,
setTotalPrice, 
setFormValues
}}>{children}
</ComboContext.Provider>
}

export default ComboContext;
