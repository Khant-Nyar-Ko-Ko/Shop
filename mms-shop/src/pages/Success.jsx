import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className=" flex justify-center">
      <div className=" bg-secondary shadow-lg rounded p-20 mt-20 animate__animated animate__backInDown">
        <h1 className="font-semibold text-4xl tracking-wider my-5 text-info">
          Thank for Purchasing
        </h1>
        <button
          onClick={() => navigate("/")}
          className=" text-primary bg-danger px-5 py-2 shadow-lg uppercase rounded transition hover:scale-105"
        >
          Go shopping
        </button>
      </div>
    </div>
  );
};

export default Success;
