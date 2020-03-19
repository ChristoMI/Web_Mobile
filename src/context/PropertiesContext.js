import React, {useEffect} from 'react';
import useApi from "../hooks/useApi";
import Error from "../components/Common/Error";
import Loading from "../components/Common/Loading";
import store from "../../src/store";

const PropertiesContext = React.createContext([]);

export const PropertiesProvider = ({children}) => {
    const [loading, properties, error, get] = useApi();
    useEffect(() => {
        async function fetchData(){
            const response = await get('/properties');
        }
        fetchData();
    }, []);
    if(error) return <Error/>;
    if(loading) return <Loading/>;
    return (
        <PropertiesContext.Provider value={properties} store={store}>
            {children}
        </PropertiesContext.Provider>
    );
};
export default PropertiesContext;
