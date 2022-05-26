import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { defaultState } from "../../redux/slices/AuthSlice";

const HomePage = () => {
  const { name } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signout = () => {
    localStorage.removeItem("token");
    navigate("/signin" , {replace: true});
    dispatch(defaultState());
    window.location.reload();
  };

  return (
    <div>
      User Name - {name}
      <Button onClick={signout}>Signout</Button>
    </div>
  );
};

export default HomePage;
