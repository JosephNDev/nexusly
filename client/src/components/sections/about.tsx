import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";
import { LightNetworkAnimation } from "@/components/ui/floating-elements";
import { Linkedin, Twitter, Github, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Lead Designer",
    specialty: "UI/UX & Brand Strategy",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
    bio: "Creative visionary with 8+ years crafting user-centered designs for Fortune 500 companies.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "sarah@nexulsly.com",
    },
  },
  {
    name: "Marcus Rodriguez",
    role: "Technical Director",
    specialty: "Full-Stack Development",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    bio: "Engineering excellence advocate who transforms complex problems into elegant solutions.",
    social: {
      linkedin: "#",
      github: "#",
      email: "marcus@nexulsly.com",
    },
  },
  {
    name: "Elena Kowalski",
    role: "Strategy Lead",
    specialty: "Digital Transformation",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
    bio: "Strategic mastermind who bridges business objectives with innovative technology solutions.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "elena@nexulsly.com",
    },
  },
];

export function AboutSection() {
  const { ref, hasIntersected } = useIntersectionObserver();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <LightNetworkAnimation nodeCount={4} connectionDistance={200} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
          }
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Meet the Visionaries
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Behind Nexulsly
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our diverse team of experts brings together decades of experience in
            design, development, and digital strategy to deliver transformative
            solutions.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="group relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-lg border border-white/50 hover:shadow-2xl transition-all duration-500"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={
                hasIntersected
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 50, scale: 0.9 }
              }
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Profile Image */}
              <motion.div
                className="relative mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-white/50 shadow-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Online indicator */}
                <div className="absolute bottom-2 right-1/2 translate-x-12 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </motion.div>

              {/* Member Info */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {member.name}
                </h3>
                <div className="text-lg font-semibold text-blue-600 mb-1">
                  {member.role}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {member.specialty}
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {member.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                {member.social.linkedin && (
                  <motion.a
                    href={member.social.linkedin}
                    className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Linkedin className="w-5 h-5 text-blue-600" />
                  </motion.a>
                )}
                {member.social.twitter && (
                  <motion.a
                    href={member.social.twitter}
                    className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter className="w-5 h-5 text-blue-600" />
                  </motion.a>
                )}
                {member.social.github && (
                  <motion.a
                    href={member.social.github}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Github className="w-5 h-5 text-gray-600" />
                  </motion.a>
                )}
                <motion.a
                  href={`mailto:${member.social.email}`}
                  className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-5 h-5 text-green-600" />
                </motion.a>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={
            hasIntersected ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
          }
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/50 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Work Together?
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Let's discuss how our team can help transform your digital
              presence and achieve your business goals.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg px-8 py-4 rounded-full font-semibold shadow-lg"
              onClick={() => scrollToSection("contact")}
            >
              Start Your Project
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
