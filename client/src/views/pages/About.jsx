import Layout from "../../components/layouts/Layout";

const About = () => {
    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-5xl font-bold text-center tracking-tight animate-pulse animate-fade-in-down text-red-500">
                    About Us
                </h1>
                <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-justify">
                    Alphonics is a revolutionary music streaming platform that aims to redefine the way people discover, listen to, and share music. Our mission is to connect music lovers with their favorite artists and introduce them to new sounds from around the world.
                </p>
                <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-justify">
                    With a vast library of songs spanning various genres and decades, Alphonics offers a personalized listening experience tailored to each user's unique tastes. Whether you're into rock, pop, hip-hop, or classical music, you'll find something to love on Alphonics.
                </p>
                <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-justify">
                    Our team of music enthusiasts is dedicated to curating the perfect playlists for every occasion, whether you're working out at the gym, hosting a dinner party, or simply unwinding after a long day. We believe that music has the power to inspire, uplift, and unite people from all walks of life.
                </p>
                <p className="mt-4 max-w-2xl text-xl animate-fade-in-up text-justify">
                    Join us on Alphonics and embark on a musical journey like no other. Discover new artists, revisit old favorites, and immerse yourself in the world of music like never before.
                </p>
            </div>
        </Layout>
    );
};

export default About;