import prisma from "@/lib/prisma";

export default async function Home() {
  const profile = await prisma.profile.findFirst() || {
    name: "M.H. AMAAN AHMED",
    title: "Associate Software Engineer",
    company: "Techcess Business Solutions",
    bio: "Results-driven Software Engineer specialized in Java Spring Boot, Next.js, and Cloud Architecture. High-performing professional with a perfect 4.0 GPA.",
    gpa: "4.0 GPA",
    gpaDesc: "SLIATE Batch Topper. Excellence in Software Engineering & Database Management.",
    cloudTitle: "AWS Cloud",
    cloudDesc: "Hands-on experience with EC2, SQS, and Cloud Architecture."
  };

  const skills = await prisma.skillCategory.findMany({ include: { skills: true } });

  const rawJourneys = await prisma.journey.findMany();

  // Helper to extract the highest year from a date string (or 9999 for "Present")
  const getYear = (dateStr: string | null) => {
    if (!dateStr) return 0;
    if (dateStr.toLowerCase().includes('present')) return 9999;
    const matches = dateStr.match(/\d{4}/g);
    if (!matches) return 0;
    return Math.max(...matches.map(Number));
  };

  const journeys = rawJourneys.sort((a, b) => getYear(b.date) - getYear(a.date));

  const experiences = journeys.filter(j => j.type === 'EXPERIENCE');
  const education = journeys.filter(j => j.type === 'EDUCATION');
  const accolades = journeys.filter(j => j.type === 'ACCOLADE');

  const projects = await prisma.project.findMany();

  return (
    <>
      <div className="mesh-bg">
        <div className="mesh-blob blob-1"></div>
        <div className="mesh-blob blob-2"></div>
      </div>

      <nav className="modern-nav">
        <a href="#home" className="active">Profile</a>
        <a href="#skills">Skills</a>
        <a href="#journey">Journey</a>
        <a href="#work">Projects</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="container">
        {/* Profile / Hero */}
        <section id="home" className="full-height">
          <div className="bento-grid">
            <div className="bento-item span-4 row-2" data-aos="fade-up">
              <div className="d-flex align-items-center gap-4 mb-4 profile-hero-row">
                <img src="/assets/images/profile2.png" alt="Profile" className="rounded-circle profile-image"
                  style={{ width: "120px", border: "3px solid var(--accent-primary)", padding: "5px", flexShrink: 0 }} />
                <div>
                  <h1 className="m-0 text-gradient">{profile.name}</h1>
                  <p className="opacity-60 small m-0" style={{ marginTop: '0.3rem' }}>{profile.title}</p>
                  <p className="indigo small fw-bold" style={{ marginTop: '0.25rem' }}>{profile.company}</p>
                </div>
              </div>
              <p className="opacity-60" style={{ fontSize: '0.95rem', lineHeight: '1.7', textAlign: 'justify' }}>{profile.bio}</p>
              <div className="mt-auto d-flex gap-3 btn-row" style={{ marginTop: '1.5rem' }}>
                <a href="#contact" className="btn-indigo">LET'S CONNECT</a>
                <a href="/assets/cv/cv.pdf" target="_blank" className="btn-glass">DOWNLOAD CV</a>
              </div>
            </div>

            <div className="bento-item span-2" data-aos="fade-up" data-aos-delay="100">
              <div className="card-icon"><i className="las la-award"></i></div>
              <h4 className="m-0">{profile.gpa}</h4>
              <p className="small opacity-60 mt-2">{profile.gpaDesc}</p>
            </div>

            <div className="bento-item span-2" data-aos="fade-up" data-aos-delay="200">
              <div className="card-icon"><i className="las la-cloud"></i></div>
              <h4 className="m-0">{profile.cloudTitle}</h4>
              <p className="small opacity-60 mt-2">{profile.cloudDesc}</p>
            </div>
          </div>
        </section>

        {/* Technical Stack */}
        <section id="skills" className="full-height">
          <h2 className="section-title" data-aos="fade-up">Technical Arsenal</h2>
          <div className="bento-grid">
            {skills.length > 0 ? skills.map((category, idx) => (
              <div key={category.id} className="bento-item span-3" data-aos="fade-up" data-aos-delay={idx * 100}>
                <h5 className="mb-4 indigo"><i className={`las ${category.icon} me-2`}></i>{category.title}</h5>
                <div className="d-flex flex-wrap">
                  {category.skills.map(skill => (
                    <span key={skill.id} className="skill-tag">{skill.name}</span>
                  ))}
                </div>
              </div>
            )) : (
              <p className="opacity-60">Add skills in the admin panel.</p>
            )}
          </div>
        </section>

        {/* Journey Section */}
        <section id="journey" className="full-height">
          <h2 className="section-title" data-aos="fade-up">Professional Journey</h2>
          <div className="bento-grid">
            {/* Employment */}
            <div className="bento-item span-3 row-2" data-aos="fade-up">
              <h5 className="mb-4 opacity-60">EXPERIENCE</h5>
              {experiences.map(exp => (
                <div key={exp.id} className="mb-4">
                  <h4 className="h5 m-0">{exp.title}</h4>
                  <p className="small indigo">{exp.subtitle} {exp.date && `| ${exp.date}`}</p>
                  {exp.points.length > 0 && (
                    <ul className="opacity-60 small timeline-list mt-2">
                      {exp.points.map((point, i) => <li key={i}>{point}</li>)}
                    </ul>
                  )}
                </div>
              ))}
              {experiences.length === 0 && <p className="opacity-60">No experiences listed.</p>}
            </div>

            {/* Education */}
            <div className="bento-item span-3" data-aos="fade-up" data-aos-delay="100">
              <h5 className="mb-2 opacity-60">EDUCATION</h5>
              {education.map(edu => (
                <div key={edu.id} className="mb-3">
                  <h6 className="m-0">{edu.title}</h6>
                  <p className="small opacity-60 mt-1">{edu.subtitle}</p>
                  <p className="small indigo fw-bold">{edu.date}</p>
                </div>
              ))}
            </div>

            {/* Accolades */}
            <div className="bento-item span-3" data-aos="fade-up" data-aos-delay="200">
              <h5 className="mb-2 opacity-60">ACCOLADES</h5>
              {accolades.map(acc => (
                <div key={acc.id} className="mb-3">
                  <h6 className="m-0">{acc.title}</h6>
                  <p className="small opacity-60 mt-1">{acc.subtitle}</p>
                  <p className="small indigo fw-bold">{acc.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="work" className="full-height">
          <h2 className="section-title" data-aos="fade-up">Selected Projects</h2>
          <div className="bento-grid">
            {projects.map((project, idx) => (
              <div key={project.id} className="bento-item span-3" data-aos="fade-up" data-aos-delay={idx * 100}>
                <h4 className="h5">{project.title}</h4>
                <p className="small opacity-60 mt-2">{project.description}</p>
                {project.link && (
                  <a href={project.link} className="indigo small fw-bold mt-auto" target="_blank" rel="noreferrer">
                    VIEW PROJECT <i className="las la-external-link-alt ms-1"></i>
                  </a>
                )}
              </div>
            ))}
            {projects.length === 0 && <p className="opacity-60">Add projects in the admin panel.</p>}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="full-height">
          <div className="bento-grid">
            <div className="bento-item span-6 row-2" data-aos="fade-up">
              <div className="row g-5 align-items-center">
                <div className="col-lg-5">
                  <h2 className="h3 mb-4">Let's <span className="text-gradient">Connect</span></h2>
                  <p className="small opacity-60 mb-4">Open for collaboration on architectural projects and enterprise solutions.</p>
                  <div className="d-flex flex-column gap-3 mb-5">
                    <a href="mailto:amaanhilmy8@gmail.com" className="small white opacity-60"><i className="las la-envelope indigo me-2"></i> amaanhilmy8@gmail.com</a>
                    <a href="tel:+94722176329" className="small white opacity-60"><i className="las la-phone indigo me-2"></i> +94 72 217 6329</a>
                  </div>
                </div>
                <div className="col-lg-7">
                  <form id="contactForm" className="row g-3" action="/api/contact" method="POST">
                    <div className="col-md-6">
                      <input type="text" name="name" className="form-control" placeholder="Name" required />
                    </div>
                    <div className="col-md-6">
                      <input type="email" name="email" className="form-control" placeholder="Email" required />
                    </div>
                    <div className="col-12">
                      <textarea name="message" className="form-control" rows={4} placeholder="Your Message" required></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-indigo w-100 justify-content-center">SEND MESSAGE</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="py-5 text-center">
        <p className="small opacity-40">M.H. AMAAN AHMED | SOFTWARE ENGINEER | © 2026</p>
      </footer>

      {/* Chatbot UI */}
      <button className="chat-fab" id="chatFab">
        <span className="chat-label">Chat with Amaan</span>
        <i className="ph-fill ph-robot"></i>
      </button>

      <div className="chat-window" id="chatWindow">
        <div className="chat-header">
          <img src="/assets/images/profile.png" alt="Amaan Ahmed" />
          <div className="chat-header-info">
            <h6>Amaan's AI Assistant</h6>
            <span><i className="ph-fill ph-circle" style={{ color: '#10b981', fontSize: '0.5rem' }}></i> Online</span>
          </div>
          <button className="chat-close-btn" id="chatClose"><i className="ph-bold ph-x"></i></button>
        </div>
        <div className="chat-messages" id="chatMessages">
          <div className="message ai">Hi! I'm Amaan's AI. Feel free to ask me anything about his experience, education, or projects!</div>
        </div>
        <div className="chat-input-area">
          <input type="text" className="chat-input" id="chatInput" placeholder="Ask about Amaan..." />
          <button className="chat-send-btn" id="chatSend"><i className="ph-fill ph-paper-plane-tilt"></i></button>
        </div>
      </div>
    </>
  );
}
