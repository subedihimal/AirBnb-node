//For Adding Coorelationn ID  to the Background Operations that may not go through
//The routers.. and middlewares 

import { AsyncLocalStorage } from "async_hooks";

type AsyncLocalStorageType = {
    correlationId: string;
}
//Create a instance of AsyncLocalStorage
export const asyncLocalStorage = new AsyncLocalStorage<AsyncLocalStorageType>(); 

export const getCorrelationId =  () =>{
    const asyncStore = asyncLocalStorage.getStore();
    return asyncStore?.correlationId || 'error-while-creating-correlation-id';
}
