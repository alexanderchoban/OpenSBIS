import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface InventoryLocationsState {
    inventoryLocations: InventoryLocation[];
    isLoading: boolean;
    companyId?: number;
}

export interface InventoryLocation {
    id: number;
    name: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

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
type KnownAction = RequestInventoryLocationsAction | ReceiveInventoryLocationsAction | DeleteInventoryLocationAction | AddInventoryLocationAction | UpdateInventoryLocationAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestInventoryLocations: (companyId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        if (companyId !== getState().inventoryLocations.companyId) {
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
        var companyId = Number(getState().inventoryLocations.companyId);
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

        dispatch({ type: 'REQUEST_INVENTORYLOCATIONS', companyId: Number(getState().inventoryLocations.companyId) });
    },

    updateInventoryLocation: (compayToUpdate: InventoryLocation): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var companyId = Number(getState().inventoryLocations.companyId);
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

        dispatch({ type: 'REQUEST_INVENTORYLOCATIONS', companyId: Number(getState().inventoryLocations.companyId) });
    },

    deleteInventoryLocation: (inventoryLocationId: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        var companyId = Number(getState().inventoryLocations.companyId);
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

        dispatch({ type: 'REQUEST_INVENTORYLOCATIONS', companyId: Number(getState().inventoryLocations.companyId) });
    },
};


// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: InventoryLocationsState = { inventoryLocations: [], isLoading: false };

export const reducer: Reducer<InventoryLocationsState> = (state: InventoryLocationsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_INVENTORYLOCATIONS':
            return {
                companyId: action.companyId,
                inventoryLocations: state.inventoryLocations,
                isLoading: true
            };
        case 'RECEIVE_INVENTORYLOCATIONS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.companyId === state.companyId) {
                return {
                    companyId: action.companyId,
                    inventoryLocations: action.inventoryLocations,
                    isLoading: false
                };
            }
            break;
        case 'DELETE_INVENTORYLOCATION':
            return {
                companyId: state.companyId,
                inventoryLocations: state.inventoryLocations.filter(function (comp) { return comp.id != action.inventoryLocationId }),
                isLoading: false
            };
        case 'ADD_INVENTORYLOCATION':
            var data = state.inventoryLocations;
            data.push(action.inventoryLocation);
            return {
                companyId: state.companyId,
                inventoryLocations: data,
                isLoading: false
            };
        case 'UPDATE_INVENTORYLOCATION':
            var data = state.inventoryLocations.filter(function (comp) { return comp.id != action.inventoryLocation.id });
            data.push(action.inventoryLocation);
            return {
                companyId: state.companyId,
                inventoryLocations: data,
                isLoading: false
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
