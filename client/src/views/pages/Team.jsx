import Layout from "../../components/layouts/Layout";

const Teams = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="lg:text-center max-w-xl">
          <h2 className="text-base text-red-500 font-semibold tracking-wide uppercase">
            OUR TEAM
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Known for our people
          </p>
          <p className="mt-2 text-lg leading-7 text-gray-500">
            Our team of engineers and developers has been working on this project since 2024 and
            we are here to innovate the world with our skills.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0">
          <div className="group relative">
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75 lg:aspect-none">
              <img
                src="https://images.unsplash.com/photo-1519345133179-802c2d1a1e82?ixlib=rb-4.0.3&ixid=eyJhcHBfaWQiOjE3Nzg7&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                alt="team 1"
                className="w-full h-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <h3 className="mt-2 text-sm text-gray-700">Minghai Chen</h3>
            <p className="text-sm text-gray-500">Web App Developer</p>
          </div>

          <div className="group relative">
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75 lg:aspect-none">
              <img
                src="https://images.unsplash.com/photo-1520785643438-5bf4c59d5af1?ixlib=rb-4.0.3&ixid=eyJhcHBfaWQiOjE3Nzg7&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                alt="team 2"
                className="w-full h-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <h3 className="mt-2 text-sm text-gray-700">
              Cesar A. Suarez Orizondo
            </h3>
            <p className="text-sm text-gray-500">Full Stack Developer</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
