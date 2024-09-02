'use client'

import Link from 'next/link'
import { Button } from "./components/ui/button"
import { Users, Briefcase, Coffee, BarChart } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    { title: "Employee Profiles", description: "Comprehensive profiles with skills, achievements, and career paths.", icon: Users },
    { title: "Task Management", description: "Efficient task allocation and progress tracking for teams.", icon: Briefcase },
    { title: "Performance Analytics", description: "In-depth insights into employee and team performance.", icon: BarChart },
    { title: "Entertainment", description:  "Movies and songs .", icon: Coffee }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white relative overflow-hidden" ref={containerRef}>
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15) 0%, rgba(99, 102, 241, 0) 50%)`,
        }}
      >
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-300 opacity-20"
            initial={{ scale: 0, x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
            animate={{ 
              scale: [0, 1, 1, 0],
              opacity: [0, 0.2, 0.2, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
            }}
          />
        ))}
      </motion.div>
      
      <main className="relative z-10">
        {/* Hero Section */}
        <motion.section 
          className="relative bg-gradient-to-r from-indigo-600 to-indigo-900 text-white overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="relative container mx-auto px-6 py-24 lg:py-32 text-center">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{ x: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            ></motion.div>
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 drop-shadow-lg relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Welcome to Maneger
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25 blur-sm"
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              ></motion.span>
            </motion.h1>
            <motion.p 
              className="text-xl mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Revolutionizing employee management with a touch of fun.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button asChild size="lg" className="bg-white text-indigo-900 hover:bg-indigo-100 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group">
                <Link href="/sign-up">
                  Get Started
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 transform -skew-x-12 -translate-x-full transition-transform duration-1000 ease-out group-hover:translate-x-full"></span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-24">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="text-4xl font-bold text-center mb-16 text-indigo-900 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Features
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-25 blur-sm"
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              ></motion.span>
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-indigo-100 group"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"></div>
                  <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-2xl font-semibold mb-4 text-indigo-900">{feature.title}</h3>
                  <p className="text-indigo-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-indigo-100 py-24">
          <div className="container mx-auto px-6 text-center">
            <motion.h2 
              className="text-4xl font-bold mb-12 text-indigo-900 relative inline-block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              What Our Clients Say
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-25 blur-sm"
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              ></motion.span>
            </motion.h2>
            <motion.div 
              className="bg-white p-8 rounded-2xl shadow-lg max-w-2xl mx-auto relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100 to-transparent"
                animate={{ x: ['0%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              ></motion.div>
              <p className="text-lg text-indigo-800 mb-4 relative z-10">
                "Maneger has transformed our workplace. The employee management features are top-notch, and the fun elements have significantly boosted team morale!"
              </p>
              <p className="font-semibold text-indigo-900 relative z-10">- Sarah Johnson, HR Director</p>
            </motion.div>
          </div>
        </section>


      </main>

      <footer className="bg-indigo-950 text-white py-6 text-center relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <p>&copy; {new Date().getFullYear()} Maneger. All rights reserved.</p>
        </div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5"></div>
      </footer>
    </div>
  )
}