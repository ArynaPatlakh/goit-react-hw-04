import { ThreeCircles } from "react-loader-spinner";
import s from "./Load.module.css"
const Load = () => {
  return (
    <ThreeCircles
      visible={true}
      height="50"
      width="50"
      color="#4fa94d"
      ariaLabel="three-circles-loading"
      wrapperStyle={{}}
      wrapperClass={s.load}
    />
  );
};
export default Load;
