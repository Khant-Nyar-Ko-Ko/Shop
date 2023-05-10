import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getData } from "../api";

const StateContext = createContext();

// eslint-disable-next-line react/prop-types
export const StateContextProvider = ({ children }) => {
  const [productList, setProductList] = useState([]);
  const [search, setSearch] = useState("");

  const initialState = {
    products: [],
    cart: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "GET_PRODUCTS":
        return { ...state, products: action.payload };
      case "ADD_TO_CART" :
        // eslint-disable-next-line no-case-declarations
        const item = action.payload;
        // eslint-disable-next-line no-case-declarations
        const isExisted = state.cart.find(c => c.id === item.id);
        if(isExisted){
            return{
                ...state, cart: state.cart.map( c=> c.id === item.id ? {...item} : {...c})
            }
        }else{
            return{
                ...state, cart: [...state.cart, {...item}]
            }
        }     
      case "REMOVE_FROM_CART" :
        return {...state, cart: state.cart.filter(item => item.id !== action.payload.id)}
       case "CART_EMPTY":
        return {...state, cart: (state.cart = [])}    
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async () => {
    const data = await getData("/products");
    setProductList(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_PRODUCTS", payload: productList });
    const filterProducts = productList.filter((product) =>
      product.title.toLowerCase().includes(search.toLocaleLowerCase())
    );
    dispatch({ type: "GET_PRODUCTS", payload: filterProducts });
  }, [productList, search]);

  const data = { state, search, setSearch, dispatch };
  return <StateContext.Provider value={data}>{children}</StateContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);
