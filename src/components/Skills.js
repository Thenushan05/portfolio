import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // For animations
import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import arrow1 from "../assets/img/arrow1.svg";
import arrow2 from "../assets/img/arrow2.svg";
import colorSharp from "../assets/img/color-sharp.png";

export const Skills = () => {
  const skills = [
    { name: "React", percentage: 85, image: meter1 },
    { name: "Angular", percentage: 80, image: meter2 },
    { name: "Logo Design", percentage: 85, image: meter3 },
    { name: "Web Development", percentage: 92, image: meter1 },
    { name: "React", percentage: 88, image: meter2 },
    { name: "UI/UX Design", percentage: 91, image: meter3 },
    { name: "Node.js", percentage: 80, image: meter1 },
    { name: "TypeScript", percentage: 85, image: meter2 },
    { name: "CSS", percentage: 75, image: meter3 },
  ];

  const skillsPerPage = 3;
  const totalPages = Math.ceil(skills.length / skillsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const ProgressCircle = ({ targetPercentage, trigger }) => {
    const [percentage, setPercentage] = useState(0);
    const circleRef = useRef(null);

    useEffect(() => {
      if (trigger) {
        let currentPercentage = 0;
        const duration = 2; // Duration of the animation in seconds
        const steps = 100; // Number of steps for smoother increment
        const increment = targetPercentage / steps;

        const animate = () => {
          currentPercentage += increment;
          setPercentage(Math.min(currentPercentage, targetPercentage));

          if (currentPercentage < targetPercentage) {
            requestAnimationFrame(animate);
          }
        };

        animate();
      }
    }, [trigger, targetPercentage]);

    return (
      <motion.div
        className="skill-circle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }} // Faster fade-in
        style={{
          position: "relative",
          width: "180px",
          height: "180px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          margin: "0 auto",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
        }}
        whileHover={{
          scale: 1.2, // Increased scale for more pronounced hover effect
          boxShadow: "0 30px 60px rgba(0, 0, 0, 0.2)",
          rotate: 15, // Slight rotation for added hover effect
          transition: { duration: 0.3 }, // Faster hover transition
        }}
      >
        <svg
          style={{ position: "absolute", transform: "rotate(-90deg)" }}
          width="180"
          height="180"
        >
          <circle
            cx="90"
            cy="90"
            r="80"
            stroke="lightgray"
            strokeWidth="6"
            fill="none"
          />
          <motion.circle
            ref={circleRef}
            cx="90"
            cy="90"
            r="80"
            stroke="#9b4dca"
            strokeWidth="6"
            fill="none"
            strokeDasharray="504"
            strokeDashoffset={(1 - percentage / 100) * 504}
            style={{
              transition: "stroke-dashoffset 1s ease-in-out", // Adding easing for stroke animation
            }}
            whileHover={{
              scale: 1.1, // Pulse effect when hovered
              boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
              transition: { type: "spring", stiffness: 300 },
            }}
            animate={{
              scale: [1, 1.1, 1], // Pulse animation for the circle
              transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" },
            }}
          />
        </svg>
        <motion.div
          style={{
            position: "absolute",
            fontSize: "24px",
            fontWeight: "bold",
            color: "#9b4dca",
            zIndex: 10,
            opacity: 1,
            transition: "all 0.3s ease-out",
          }}
          animate={{
            opacity: 1,
            scale: 1.3, // Slight increase in scale for visibility
            transition: { type: "spring", stiffness: 300 },
          }}
        >
          {Math.round(percentage)}% {/* Rounding to make the percentage clean */}
        </motion.div>
      </motion.div>
    );
  };

  return (
    <section
      className="skill bg-gradient-to-r from-purple-500 to-blue-600 text-white py-16"
      id="skills"
    >
      <div className="container mx-auto">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2 className="text-center text-4xl font-bold mb-8">Skills</h2>
              <p className="text-center text-lg mb-10">
              I specialize in building dynamic and responsive web applications <br />
              using modern front-end technologies.
              </p>
              <div className="skills-list flex justify-center items-center flex-wrap gap-12">
                {skills
                  .slice((currentPage - 1) * skillsPerPage, currentPage * skillsPerPage)
                  .map((skill, index) => (
                    <motion.div
                      key={index}
                      className="skill-item text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }} // Faster entrance
                      style={{
                        maxWidth: "240px",
                      }}
                    >
                      <ProgressCircle targetPercentage={skill.percentage} trigger={true} />
                      <h5 className="mt-4 text-xl font-semibold">{skill.name}</h5>
                    </motion.div>
                  ))}
              </div>

              {/* Arrow Navigation Buttons */}
              <div className="arrow-navigation flex justify-center items-center gap-16 mt-8">
                {/* Left Arrow */}
                <motion.button
                  onClick={handlePrev}
                  className={`arrow-btn ${currentPage === 1 ? "disabled" : ""} 
                              bg-gradient-to-r from-purple-500 to-blue-600 
                              text-white p-3 rounded-full shadow-lg`}
                  disabled={currentPage === 1}
                  whileHover={{
                    x: -15,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  transition={{ duration: 0.2 }} // Faster arrow button hover
                >
                  <img src={arrow1} alt="Previous" className="w-8 h-8" />
                </motion.button>

                {/* Circular Page Number */}
                <div className="page-number-container flex justify-center items-center gap-6">
                  {[...Array(totalPages)].map((_, index) => (
                    <motion.div
                      key={index}
                      className={`page-number-circle p-3 rounded-full 
                                  ${currentPage === index + 1 ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' : 'bg-gray-300 text-black'}
                                  cursor-pointer transform transition-all duration-100 hover:scale-125`} // Faster hover effect and larger scale
                      whileHover={{
                        y: -10, // More pronounced movement on hover
                        scale: 1.3, // Increased scale for visibility
                        transition: { type: "spring", stiffness: 200 },
                      }}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      <span>{index + 1}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Right Arrow */}
                <motion.button
                  onClick={handleNext}
                  className={`arrow-btn ${currentPage === totalPages ? "disabled" : ""} 
                              bg-gradient-to-r from-purple-500 to-blue-600 
                              text-white p-3 rounded-full shadow-lg`}
                  disabled={currentPage === totalPages}
                  whileHover={{
                    x: 15,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  transition={{ duration: 0.2 }} // Faster arrow button hover
                >
                  <img src={arrow2} alt="Next" className="w-8 h-8" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
