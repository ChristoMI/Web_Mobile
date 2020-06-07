export const defaultState = {
    font: {
        isLoaded: false
    },
    properties: {
        isLoading: true,
        errors: null,
        items: []
    },
    property: {
        isLoading: true,
        errors: null,
        item: null,
        added : false,
        reserved: false
    },
    comments: {
        isAdding: false,
        isLoading: true,
        errors: null,
        items: []
    },
    user: {
        type: null,
        isLoading: false,
        errors: null,
        profile: null,
        token: null,
        reservations : []
    }
};
