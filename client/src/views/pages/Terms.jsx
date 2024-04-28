import Layout from "../../components/layouts/Layout";

const Terms = () => {
  return (
    <Layout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-5xl font-bold text-center tracking-tight animate-pulse animate-fade-in-down text-red-500">
            Terms and Conditions
          </h1>
          <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-center"></p>
        </div>
    </Layout>
  );
};

export default Terms;