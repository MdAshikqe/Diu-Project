import { Helmet } from "react-helmet";

const AboutUs = () => {
    return (
        
        <div data-aos="fade-down" data-aos-delay="50"
        data-aos-duration="1000" className="p-8 bg-gray-100 rounded-lg">
            <Helmet>
                <title>E-shopAbout-us</title>
            </Helmet>
            <header className="text-center mb-8 my-28">
                <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
            </header>
            <section className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Values</h2>
                    <p className="text-gray-600">We are a team of dedicated professionals committed to providing top-notch services and products to our customers.I can interpret and understand text input in natural language, making it easy to have a conversation with me.I have been trained on diverse datasets, which means I can provide information on a broad range of topics, from science and history to entertainment and technology.I can engage in interactive conversations, maintaining context and providing relevant responses. I can also handle multi-turn dialogues, where the conversation involves multiple exchanges.I can generate coherent and contextually appropriate text, which is useful for writing assistance, storytelling, and content creation.I can understand and generate text in multiple languages, making me accessible to users worldwide.</p>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Mission</h2>
                    <p className="text-gray-600">Our mission is to innovate and lead the industry with our groundbreaking solutions and customer-centric approach.Detail the products, services, or solutions your organization provides. Highlight key offerings and their benefits to your customers or stakeholders.</p>
                </div>
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Impact</h2>
                    <p className="text-gray-600">Illustrate the positive impact your organization aims to achieve. This can include:Environmental sustainability Social responsibility Economic empowerment</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Meet the Team</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center">
                            <img className="w-16 h-16 rounded-full mr-4" src="team-member1.jpg" alt="Team Member 1"/>
                            <div>
                                <h3 className="text-xl font-medium text-gray-800">Ashikuzzaman</h3>
                                <p className="text-gray-600">Full-Stack Developer</p>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <img className="w-16 h-16 rounded-full mr-4" src="team-member2.jpg" alt="Team Member 2"/>
                            <div>
                                <h3 className="text-xl font-medium text-gray-800">Joynto Roy</h3>
                                <p className="text-gray-600">Backend Developer</p>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <img className="w-16 h-16 rounded-full mr-4" src="team-member2.jpg" alt="Team Member 2"/>
                            <div>
                                <h3 className="text-xl font-medium text-gray-800">Md Elias Hossin</h3>
                                <p className="text-gray-600">Supported</p>
                            </div>
                        </li>
                        <li className="flex items-center">
                            <img className="w-16 h-16 rounded-full mr-4" src="team-member2.jpg" alt="Team Member 2"/>
                            <div>
                                <h3 className="text-xl font-medium text-gray-800">Mst Maria</h3>
                                <p className="text-gray-600">Supported</p>
                            </div>
                        </li>
                        {/* Add more team members as needed */}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;