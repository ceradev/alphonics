import Layout from "../../components/layouts/Layout";
const Privacy = () => {
  return (
    <Layout>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-5xl font-bold text-center tracking-tight animate-pulse animate-fade-in-down text-red-500">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-center">
            This privacy policy has been created with the help of the{" "}
            <a href="https://www.termsfeed.com/privacy-policy-generator/">
              Privacy Policy Generator
            </a>
            .
          </p>
        </div>
    </Layout>
  );
};

export default Privacy;
