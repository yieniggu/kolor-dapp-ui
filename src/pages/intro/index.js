import Layout from "../../layout";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const IntroPage = () => {
  const { uid } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    !!uid && navigate("/marketplace");
  }, []);

  return (
    <>
      <Layout title="Kolor | dAPP landing">
        <div className="flex flex-col bg-intro min-h-screen justify-center items-center px-4">
          <div className="text-gradient text-xl">Valuable land</div>
          <div className="text-white text-xl">into digital assets</div>
        </div>
      </Layout>
    </>
  );
};

export default IntroPage;
