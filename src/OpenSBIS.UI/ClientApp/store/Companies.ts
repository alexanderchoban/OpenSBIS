import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CompaniesState {
    companies: Company[];
    inventoryLocations: InventoryLocation[];
    isLoading: boolean;
    userId?: number;
    companyId?: number;
}

export interface Company {
    id: number;
    name: string;
}

export interface InventoryLocation {
    id: number;
    name: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.


// COMPANIES

interface RequestCompaniesAction {
    type: 'REQUEST_COMPANIES';
    userId: number;
}

interface ReceiveCompaniesAction {
    type: 'RECEIVE_COMPANIES';
    companies: Company[];
    userId: number;
}

interface DeleteCompanyAction {
    type: 'DELETE_COMPANY';
    companyId: number;
}

interface AddCompanyAction {
    type: 'ADD_COMPANY';
    company: Company;
}

interface UpdateCompanyAction {
    type: 'UPDATE_COMPANY';
    company: Company;
}

// INVENTORIES

interface RequestInventoryLocationsAction {
    type: 'REQUEST_INVENTORYLOCATIONS';
    companyId: number;
}

interface ReceiveInventoryLocationsAction {
    type: 'RECEIVE_INVENTORYLOCATIONS';
    inventoryLocations: InventoryLocation[];
    companyId: number;
}

interface DeleteInventoryLocationAction {
    type: 'DELETE_INVENTORYLOCATION';
    inventoryLocationId: number;
}

interface AddInventoryLocationAction {
    type: 'ADD_INVENTORYLOCATION';
    inventoryLocation: InventoryLocation;
}

interface UpdateInventoryLocationAction {
    type: 'UPDATE_INVENTORYLOCATION';
    inventoryLocation: InventoryLocation;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = 
    RequestCompaniesAction | ReceiveCompaniesAction | DeleteCompanyAction | AddCompanyAction | UpdateCompanyAction |
    RequestInventoryLocationsAction | ReceiveInventoryLocationsAction | DeleteInventoryLocationAction | AddInventoryLocationAction | UpdateInventoryLocationAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestCompanies: (userId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (userId !== getState().companies.userId) {
            let fetchTask = fetch(`http://localhost:5001/api/company?userId=${userId}`)
                .then(response => response.json() as Promise<Company[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_COMPANIES', userId: userId, companies: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_COMPANIES', userId: userId });
        }
    },

    addCompany: (companyName: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var userId = Number(getState().companies.userId);
        fetch(`http://localhost:5001/api/company`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: companyName
            })
        })
            .then(response => response.json() as Promise<Company>)
            .then(data => {
                dispatch({ type: 'ADD_COMPANY', company: data });
            });

        dispatch({ type: 'REQUEST_COMPANIES', userId: Number(getState().companies.userId) });
    },

    updateCompany: (compayToUpdate: Company): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var userId = Number(getState().companies.userId);
        fetch(`http://localhost:5001/api/company/` + compayToUpdate.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(compayToUpdate)
        })
            .then(data => {
                dispatch({ type: 'UPDATE_COMPANY', company: compayToUpdate });
            });

        dispatch({ type: 'REQUEST_COMPANIES', userId: Number(getState().companies.userId) });
    },

    deleteCompany: (companyId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var userId = Number(getState().companies.userId);
        fetch(`http://localhost:5001/api/company/` + companyId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(data => {
                dispatch({ type: 'DELETE_COMPANY', companyId: companyId });
            });

        dispatch({ type: 'REQUEST_COMPANIES', userId: Number(getState().companies.userId) });
    },

    // INVENTORIES

    requestInventoryLocations: (companyId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (companyId !== getState().companies.companyId) {
            let fetchTask = fetch(`http://localhost:5001/api/inventoryLocation?companyId=${companyId}`)
                .then(response => response.json() as Promise<InventoryLocation[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_INVENTORYLOCATIONS', companyId: companyId, inventoryLocations: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_INVENTORYLOCATIONS', companyId: companyId });
        }
    },

    addInventoryLocation: (inventoryLocationName: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var companyId = Number(getState().companies.companyId);
        fetch(`http://localhost:5001/api/inventoryLocation`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: inventoryLocationName
            })
        })
            .then(response => response.json() as Promise<InventoryLocation>)
            .then(data => {
                dispatch({ type: 'ADD_INVENTORYLOCATION', inventoryLocation: data });
            });

        dispatch({ type: 'REQUEST_INVENTORYLOCATIONS', companyId: Number(getState().companies.companyId) });
    },

    updateInventoryLocation: (compayToUpdate: InventoryLocation): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var companyId = Number(getState().companies.companyId);
        fetch(`http://localhost:5001/api/inventoryLocation/` + compayToUpdate.id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(compayToUpdate)
        })
            .then(data => {
                dispatch({ type: 'UPDATE_INVENTORYLOCATION', inventoryLocation: compayToUpdate });
            });

        dispatch({ type: 'REQUEST_INVENTORYLOCATIONS', companyId: Number(getState().companies.companyId) });
    },

    deleteInventoryLocation: (inventoryLocationId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var companyId = Number(getState().companies.companyId);
        fetch(`http://localhost:5001/api/inventoryLocation/` + inventoryLocationId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(data => {
                dispatch({ type: 'DELETE_INVENTORYLOCATION', inventoryLocationId: inventoryLocationId });
            });

        dispatch({ type: 'REQUEST_INVENTORYLOCATIONS', companyId: Number(getState().companies.companyId) });
    },
};


// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: CompaniesState = { companies: [], inventoryLocations: [], isLoading: false };

export const reducer: Reducer<CompaniesState> = (state: CompaniesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_COMPANIES':
            return {
                userId: action.userId,
                companies: state.companies,
                inventoryLocations: state.inventoryLocations,
                companyId: state.companyId,
                isLoading: true
            };
        case 'RECEIVE_COMPANIES':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.userId === state.userId) {
                return {
                    userId: action.userId,
                    companies: action.companies,
                    isLoading: false,
                    inventoryLocations: state.inventoryLocations,
                    companyId: state.companyId,
                };
            }
            break;
        case 'DELETE_COMPANY':
            return {
                userId: state.userId,
                companies: state.companies.filter(function (comp) { return comp.id != action.companyId }),
                isLoading: false,
                inventoryLocations: state.inventoryLocations,
                companyId: state.companyId
            };
        case 'ADD_COMPANY':
            var data = state.companies;
            data.push(action.company);
            return {
                userId: state.userId,
                companies: data,
                isLoading: false,
                inventoryLocations: state.inventoryLocations,
                companyId: state.companyId
            };
        case 'UPDATE_COMPANY':
            var data = state.companies.filter(function (comp) { return comp.id != action.company.id });
            data.push(action.company);
            return {
                userId: state.userId,
                companies: data,
                isLoading: false,
                inventoryLocations: state.inventoryLocations,
                companyId: state.companyId
            };
            case 'REQUEST_INVENTORYLOCATIONS':
            return {
                companyId: action.companyId,
                inventoryLocations: state.inventoryLocations,
                isLoading: true,
                userId: state.userId,
                companies: state.companies
            };
        case 'RECEIVE_INVENTORYLOCATIONS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.companyId === state.companyId) {
                return {
                    companyId: action.companyId,
                    inventoryLocations: action.inventoryLocations,
                    isLoading: false,
                    userId: state.userId,
                    companies: state.companies
                };
            }
            break;
        case 'DELETE_INVENTORYLOCATION':
            return {
                companyId: state.companyId,
                inventoryLocations: state.inventoryLocations.filter(function (comp) { return comp.id != action.inventoryLocationId }),
                isLoading: false,
                userId: state.userId,
                companies: state.companies
            };
        case 'ADD_INVENTORYLOCATION':
            var data = state.inventoryLocations;
            data.push(action.inventoryLocation);
            return {
                companyId: state.companyId,
                inventoryLocations: data,
                isLoading: false,
                userId: state.userId,
                companies: state.companies
            };
        case 'UPDATE_INVENTORYLOCATION':
            var data = state.inventoryLocations.filter(function (comp) { return comp.id != action.inventoryLocation.id });
            data.push(action.inventoryLocation);
            return {
                companyId: state.companyId,
                inventoryLocations: data,
                isLoading: false,
                userId: state.userId,
                companies: state.companies
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
