import Layout from "../../components/layouts/Layout";

const Teams = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="lg:text-center max-w-xl">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Nuestro equipo
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Conoce a nuestro equipo
          </p>
          <p className="mt-2 text-lg leading-7 text-gray-500">
            Somos un equipo de trabajo dedicado a brindar soluciones innovadoras
            para tus necesidades.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          <div className="group relative">
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75 lg:aspect-none">
              <img
                src="https://images.unsplash.com/photo-1519345133179-802c2d1a1e82?ixlib=rb-4.0.3&ixid=eyJhcHBfaWQiOjE3Nzg7&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                alt="team 1"
                className="w-full h-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <h3 className="mt-2 text-sm text-gray-700">Sol Codigo</h3>
            <p className="text-sm text-gray-500">Full Stack Developer</p>
          </div>

          <div className="group relative">
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75 lg:aspect-none">
              <img
                src="https://images.unsplash.com/photo-1520785643438-5bf4c59d5af1?ixlib=rb-4.0.3&ixid=eyJhcHBfaWQiOjE3Nzg7&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                alt="team 2"
                className="w-full h-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <h3 className="mt-2 text-sm text-gray-700">Juan Perez</h3>
            <p className="text-sm text-gray-500">Full Stack Developer</p>
          </div>

          <div className="group relative">
            <div className="w-full aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden group-hover:opacity-75 lg:aspect-none">
              <img
                src="https://images.unsplash.com/photo-1522075469751-3a6694bc0624?ixlib=rb-4.0.3&ixid=eyJhcHBfaWQiOjE3Nzg7&auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                alt="team 3"
                className="w-full h-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <h3 className="mt-2 text-sm text-gray-700">Ana López</h3>
            <p className="text-sm text-gray-500">Full Stack Developer</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
