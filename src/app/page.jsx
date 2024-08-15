// pages/index.js
import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>My Startup</title>
        <meta name="description" content="Welcome to My Startup" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-blue-900 text-white">
          <div className="absolute inset-0">
            <img src="https://cdn.pixabay.com/photo/2021/08/04/13/06/software-developer-6521720_640.jpg" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative container mx-auto px-6 py-16 lg:py-32 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Welcome to My Startup</h1>
            <p className="text-lg mb-8">Innovating the future with cutting-edge solutions.</p>
            <a href="/signin" className="bg-yellow-500 text-black py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-400">Get Started</a>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
            <div className="flex flex-wrap -mx-4">
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Feature One</h3>
                  <p className="text-gray-600">Description of feature one. Explain how it benefits the user and solves their problems.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Feature Two</h3>
                  <p className="text-gray-600">Description of feature two. Highlight the key aspects and advantages of this feature.</p>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Feature Three</h3>
                  <p className="text-gray-600">Description of feature three. Emphasize what makes it unique and valuable.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
            <p className="text-lg mb-8">We'd love to hear from you! Reach out to us for any inquiries or feedback.</p>
            <a href="/contact" className="bg-yellow-500 text-black py-2 px-6 rounded-full text-lg font-semibold hover:bg-yellow-400">Email Us</a>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} My Startup. All rights reserved.</p>
      </footer>
    </div>  
  )
}
