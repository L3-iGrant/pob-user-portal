import { useHistory } from "react-router-dom";
import { getAuthTokenFromLocalStorage } from "utils/localStorage";

const Protected = (props: { children: any }) => {
    let history = useHistory();

    if (getAuthTokenFromLocalStorage() === null) {
        history.push("/");
        console.log("Auth token not available")
    } else {
        console.log("Auth token available")
        return props.children;
    }


};
export default Protected;