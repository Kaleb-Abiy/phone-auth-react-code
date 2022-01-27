export const initialState = {
    user: null,
    user_info: ""
 };

 const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user,
            }; 
            
        case "SET_USER_INFO":
            return {
                ...state,
                user_info: action.user_info,
            };    
        default:
          return state;
        }
    }

  
export default reducer; 