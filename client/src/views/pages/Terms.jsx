import Layout from "../../components/layouts/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-screen-md mx-auto px-4 py-8 flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl font-bold text-center text-red-500 animate-pulse animate-fade-in-down">
            Terms and Conditions
          </h1>
          <div className="max-w-lg">
            <p className="mb-4 text-justify">
              Welcome to Alphonics! These terms and conditions outline the rules
              and regulations for the use of our website.
            </p>
            <p className="mb-4 text-justify">
              By accessing this website we assume you accept these terms and
              conditions. Do not continue to use Alphonics if you do not agree
              to take all of the terms and conditions stated on this page.
            </p>
            <p className="mb-4 text-justify">
              The following terminology applies to these Terms and Conditions,
              Privacy Statement, and Disclaimer Notice, as well as to any
              Agreement: &quot;Client&quot; and &quot;You&quot; refer to you, the person accessing
              this website and accepting our terms and conditions. &quot;Our
              Company,&quot; &quot;Us,&quot; &quot;We,&quot; and &quot;Our&quot; refer to our Company. &quot;Party&quot; or
              &quot;Us&quot; refers to both the Client and ourselves. All terms refer to
              the offer, acceptance, and consideration of payment required to
              successfully complete the process of our providing you, as our
              client, with the services stated above, in compliance with the law
              of the Netherlands.
            </p>
            <p className="mb-4 text-justify">
              For the complete terms and conditions, please refer to the
              official documentation provided by Alphonics.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
