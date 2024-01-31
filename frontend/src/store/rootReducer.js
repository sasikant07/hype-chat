import authReducer from "./reducers/authReducer";
import messengerReducer from "./reducers/messengerReducer";

const rootReducer = {
  auth: authReducer,
  messenger: messengerReducer,
};

export default rootReducer;
