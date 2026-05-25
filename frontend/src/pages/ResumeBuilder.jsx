import React, {
  useState
} from 'react';

import {
  Upload,
  FileText,
  Sparkles,
  Download,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Code2,
  Award,
  User,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

import Button from '../components/Button';


const ResumeBuilder = () => {

  const [resumeData, setResumeData] =
    useState({

      fullName: '',
      email: '',
      phone: '',
      location: '',

      summary: '',

      skills: '',

      education: '',

      experience: '',

      projects: '',

      certifications: ''
    });

  const [jobDescription, setJobDescription] =
    useState('');

  const [loading, setLoading] =
    useState(false);


  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setResumeData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleGenerateResume = async () => {

    setLoading(true);

    setTimeout(() => {

      setLoading(false);

      toast.success(
        'ATS resume generated successfully!',
        {
          icon: '🚀'
        }
      );

    }, 2000);
  };


  return (

    <div className="
      flex-1
      max-w-7xl
      mx-auto
      w-full

      px-4 py-8 md:px-8

      bg-white
      dark:bg-cyber-950

      relative
    ">

      {/* Background Glow */}
      <div className="
        absolute top-1/4 left-1/3

        w-[500px]
        h-[300px]

        rounded-full

        bg-cyber-indigo/5

        blur-[120px]

        pointer-events-none
      "></div>


      <div className="
        relative z-10
      ">

        {/* Header */}
        <div className="
          mb-10
        ">

          <h1 className="
            text-4xl
            font-extrabold
            tracking-tight

            text-slate-900
            dark:text-white

            mb-3
          ">

            AI Resume

            <span className="
              text-gradient-indigo-cyan
            ">
              {' '}Builder
            </span>

          </h1>

          <p className="
            text-sm

            text-slate-600
            dark:text-slate-400

            max-w-2xl
          ">

            Build ATS-optimized resumes tailored
            for modern tech companies and job roles.

          </p>

        </div>


        <div className="
          grid
          grid-cols-1
          xl:grid-cols-2

          gap-8
        ">

          {/* LEFT SIDE */}
          <div className="
            glass-card

            rounded-3xl

            border
            border-slate-300/60
            dark:border-slate-800/80

            p-6 md:p-8

            shadow-glass-lg
          ">

            <div className="
              flex items-center gap-3
              mb-8
            ">

              <div className="
                w-12 h-12

                rounded-2xl

                bg-gradient-cyber

                flex items-center justify-center
              ">

                <Sparkles
                  className="text-white"
                />

              </div>

              <div>

                <h2 className="
                  text-xl
                  font-bold

                  text-slate-900
                  dark:text-white
                ">

                  Resume Details

                </h2>

                <p className="
                  text-sm

                  text-slate-600
                  dark:text-slate-400
                ">

                  Fill in your professional information

                </p>

              </div>

            </div>


            <div className="
              space-y-6
            ">

              {/* PERSONAL INFO */}
              <div>

                <h3 className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-wider

                  text-slate-500
                  dark:text-slate-400

                  mb-4
                ">

                  Personal Information

                </h3>

                <div className="
                  grid grid-cols-1
                  md:grid-cols-2

                  gap-4
                ">

                  <InputField
                    icon={User}
                    name="fullName"
                    placeholder="Full Name"
                    value={resumeData.fullName}
                    onChange={handleChange}
                  />

                  <InputField
                    icon={Mail}
                    name="email"
                    placeholder="Email Address"
                    value={resumeData.email}
                    onChange={handleChange}
                  />

                  <InputField
                    icon={Phone}
                    name="phone"
                    placeholder="Phone Number"
                    value={resumeData.phone}
                    onChange={handleChange}
                  />

                  <InputField
                    icon={MapPin}
                    name="location"
                    placeholder="Location"
                    value={resumeData.location}
                    onChange={handleChange}
                  />

                </div>

              </div>


              {/* SUMMARY */}
              <SectionTextarea
                icon={Briefcase}
                title="Professional Summary"
                name="summary"
                value={resumeData.summary}
                onChange={handleChange}
                placeholder="Write a concise professional summary..."
              />


              {/* SKILLS */}
              <SectionTextarea
                icon={Code2}
                title="Skills"
                name="skills"
                value={resumeData.skills}
                onChange={handleChange}
                placeholder="React, FastAPI, PostgreSQL..."
              />


              {/* EDUCATION */}
              <SectionTextarea
                icon={GraduationCap}
                title="Education"
                name="education"
                value={resumeData.education}
                onChange={handleChange}
                placeholder="B.Tech CSE - LPU..."
              />


              {/* EXPERIENCE */}
              <SectionTextarea
                icon={Briefcase}
                title="Experience"
                name="experience"
                value={resumeData.experience}
                onChange={handleChange}
                placeholder="Internships, roles, responsibilities..."
              />


              {/* PROJECTS */}
              <SectionTextarea
                icon={Code2}
                title="Projects"
                name="projects"
                value={resumeData.projects}
                onChange={handleChange}
                placeholder="CareerForge, Obscura..."
              />


              {/* CERTIFICATIONS */}
              <SectionTextarea
                icon={Award}
                title="Certifications"
                name="certifications"
                value={resumeData.certifications}
                onChange={handleChange}
                placeholder="NPTEL, Udemy Python..."
              />


              {/* JOB DESCRIPTION */}
              <SectionTextarea
                icon={Sparkles}
                title="Target Job Description"
                name="jobDescription"
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(
                    e.target.value
                  )
                }
                placeholder="Paste job description for ATS optimization..."
              />


              {/* ACTIONS */}
              <div className="
                flex flex-col
                sm:flex-row

                gap-4
              ">

                <Button
                  variant="primary"
                  icon={Sparkles}
                  loading={loading}
                  onClick={
                    handleGenerateResume
                  }
                  className="
                    w-full
                  "
                >

                  Generate ATS Resume

                </Button>

                <Button
                  variant="secondary"
                  icon={Download}
                  className="
                    w-full
                  "
                >

                  Export PDF

                </Button>

              </div>

            </div>

          </div>


          {/* RIGHT SIDE PREVIEW */}
          <motion.div
            initial={{
              opacity: 0,
              x: 30
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            className="
              glass-card

              rounded-3xl

              border
              border-slate-300/60
              dark:border-slate-800/80

              p-8

              shadow-glass-lg

              min-h-[900px]
            "
          >

            <div className="
              flex items-center justify-between
              mb-8
            ">

              <div>

                <h2 className="
                  text-2xl
                  font-bold

                  text-slate-900
                  dark:text-white
                ">

                  Live Resume Preview

                </h2>

                <p className="
                  text-sm

                  text-slate-600
                  dark:text-slate-400
                ">

                  ATS optimized modern template

                </p>

              </div>

              <div className="
                px-4 py-2

                rounded-2xl

                bg-emerald-500/10

                border border-emerald-500/20

                text-emerald-500

                text-sm
                font-semibold

                flex items-center gap-2
              ">

                <CheckCircle2
                  size={16}
                />

                ATS Ready

              </div>

            </div>


            {/* RESUME CARD */}
            <div className="
              bg-white

              rounded-2xl

              p-8

              shadow-xl

              min-h-[750px]
            ">

              <h1 className="
                text-3xl
                font-bold

                text-slate-900

                mb-2
              ">

                {
                  resumeData.fullName ||
                  'Your Name'
                }

              </h1>

              <p className="
                text-sm

                text-slate-600

                mb-6
              ">

                {
                  resumeData.email ||
                  'email@example.com'
                }

                {' • '}

                {
                  resumeData.phone ||
                  '+91 XXXXX XXXXX'
                }

                {' • '}

                {
                  resumeData.location ||
                  'Location'
                }

              </p>


              <ResumeSection
                title="Professional Summary"
                content={
                  resumeData.summary
                }
              />

              <ResumeSection
                title="Skills"
                content={
                  resumeData.skills
                }
              />

              <ResumeSection
                title="Education"
                content={
                  resumeData.education
                }
              />

              <ResumeSection
                title="Experience"
                content={
                  resumeData.experience
                }
              />

              <ResumeSection
                title="Projects"
                content={
                  resumeData.projects
                }
              />

              <ResumeSection
                title="Certifications"
                content={
                  resumeData.certifications
                }
              />

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
};


/* INPUT FIELD */
const InputField = ({
  icon: Icon,
  ...props
}) => (

  <div className="
    relative
  ">

    <Icon
      size={18}
      className="
        absolute left-4 top-3.5

        text-slate-400
      "
    />

    <input
      {...props}
      className="
        w-full

        pl-11 pr-4 py-3

        rounded-2xl

        glass-input

        text-slate-900
        dark:text-white

        border
        border-slate-300/60
        dark:border-slate-700/50

        focus:outline-none
        focus:border-cyber-indigo
        focus:ring-1
        focus:ring-cyber-indigo/30
      "
    />

  </div>
);


/* SECTION TEXTAREA */
const SectionTextarea = ({
  icon: Icon,
  title,
  ...props
}) => (

  <div>

    <div className="
      flex items-center gap-2
      mb-3
    ">

      <Icon
        size={16}
        className="
          text-cyber-indigo
        "
      />

      <h3 className="
        text-sm
        font-semibold

        text-slate-700
        dark:text-slate-300
      ">

        {title}

      </h3>

    </div>

    <textarea
      {...props}
      rows="4"
      className="
        w-full

        px-4 py-3

        rounded-2xl

        glass-input

        text-sm

        text-slate-900
        dark:text-white

        border
        border-slate-300/60
        dark:border-slate-700/50

        focus:outline-none
        focus:border-cyber-indigo
        focus:ring-1
        focus:ring-cyber-indigo/30
      "
    />

  </div>
);


/* RESUME SECTION */
const ResumeSection = ({
  title,
  content
}) => (

  <div className="
    mb-6
  ">

    <h2 className="
      text-lg
      font-bold

      text-slate-900

      border-b
      border-slate-300

      pb-1
      mb-2
    ">

      {title}

    </h2>

    <p className="
      text-sm
      text-slate-700
      whitespace-pre-line
    ">

      {
        content ||
        `No ${title.toLowerCase()} added yet.`
      }

    </p>

  </div>
);


export default ResumeBuilder;