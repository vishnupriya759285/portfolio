import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
<<<<<<< HEAD
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
=======
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def build_pdf(filename="public/resume.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
<<<<<<< HEAD
        leftMargin=0.5 * inch,
        rightMargin=0.5 * inch,
=======
        leftMargin=0.45 * inch,
        rightMargin=0.45 * inch,
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)
        topMargin=0.4 * inch,
        bottomMargin=0.4 * inch,
    )

    styles = getSampleStyleSheet()

<<<<<<< HEAD
    # Custom styles
=======
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
<<<<<<< HEAD
        fontSize=20,
        leading=22,
        alignment=1, # Center
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=4
=======
        fontSize=18,
        leading=20,
        alignment=1,
        textColor=colors.HexColor("#0f172a"),
        spaceAfter=3
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)
    )

    contact_style = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Helvetica',
<<<<<<< HEAD
        fontSize=9.5,
        leading=13,
        alignment=1, # Center
        textColor=colors.HexColor("#475569"),
        spaceAfter=6
=======
        fontSize=9,
        leading=12,
        alignment=1,
        textColor=colors.HexColor("#334155"),
        spaceAfter=5
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)
    )

    summary_style = ParagraphStyle(
        'DocSummary',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
<<<<<<< HEAD
        fontSize=9,
        leading=12.5,
        alignment=1, # Center
        textColor=colors.HexColor("#334155"),
        spaceAfter=10
=======
        fontSize=8.5,
        leading=11.5,
        alignment=1,
        textColor=colors.HexColor("#475569"),
        spaceAfter=8
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
<<<<<<< HEAD
        fontSize=11,
        leading=14,
        textColor=colors.HexColor("#0f172a"),
        spaceBefore=8,
        spaceAfter=2
=======
        fontSize=10.5,
        leading=13,
        textColor=colors.HexColor("#1e3a8a"),
        spaceBefore=7,
        spaceAfter=1
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)
    )

    item_title = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
<<<<<<< HEAD
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#1e293b")
=======
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor("#0f172a")
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)
    )

    item_subtitle = ParagraphStyle(
        'ItemSub',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
<<<<<<< HEAD
        fontSize=9,
        leading=12,
        textColor=colors.HexColor("#475569"),
        spaceAfter=3
=======
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#475569"),
        spaceAfter=2
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
<<<<<<< HEAD
        fontSize=9,
        leading=12.5,
        textColor=colors.HexColor("#1e293b"),
        leftIndent=12,
        firstLineIndent=-8,
        spaceAfter=3
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12.5,
        textColor=colors.HexColor("#1e293b"),
        spaceAfter=3
=======
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#1e293b"),
        leftIndent=10,
        firstLineIndent=-6,
        spaceAfter=2
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)
    )

    story = []

    # Header
    story.append(Paragraph("VISHNUPRIYA M V", title_style))
    story.append(Paragraph("Thrissur, Kerala, India &nbsp;|&nbsp; v74641001@gmail.com<br/>github.com/vishnupriya759285 &nbsp;|&nbsp; linkedin.com/in/vishnupriya-m-v", contact_style))
    story.append(Paragraph("Computer Science Engineering student specializing in AI Automation, Frontend Development, and E-Commerce Workflows. Skilled in Python, JavaScript, React.js, Flutter, LLM Integration, AI Agents, Chatbot Development, REST APIs, and Data-Driven Problem Solving.", summary_style))

<<<<<<< HEAD
    # Helper for section headers
    def add_section(title):
        story.append(Paragraph(title.upper(), section_heading))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#2563eb"), spaceBefore=2, spaceAfter=6))
=======
    def add_section(title):
        story.append(Paragraph(title.upper(), section_heading))
        story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#1e3a8a"), spaceBefore=2, spaceAfter=4))
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)

    # EDUCATION
    add_section("Education")
    story.append(Paragraph("<b>Bachelor of Technology in Computer Science Engineering</b> &nbsp;&nbsp;(2024 - 2028)", item_title))
    story.append(Paragraph("Sahrdaya College of Engineering and Technology, Thrissur, Kerala &nbsp;|&nbsp; <b>CGPA: 9.66 / 10</b><br/><i>Minor:</i> Bioinformatics &nbsp;|&nbsp; <i>Honours:</i> Mathematics for Machine Learning &nbsp;|&nbsp; <i>Elective:</i> Web Technologies", item_subtitle))

    # INTERNSHIP EXPERIENCE
    add_section("Internship Experience")
    story.append(Paragraph("<b>E-Commerce Intern - AI Automation and Operations</b> &nbsp;&nbsp;(Jul 2026 - Present)", item_title))
    story.append(Paragraph("<i>Karv Devices Private Limited (Pamjoy E-Commerce Program), Online Internship</i>", item_subtitle))
    story.append(Paragraph("&bull; Build AI agents, chatbots, and automated workflows using n8n, Make, Zapier, and LLMs (GPT, Claude, Gemini) for customer support, email marketing, and business operations.", bullet_style))
    story.append(Paragraph("&bull; Automate product listings, SEO metadata, and Shopify/CRM integrations, and generate AI-driven sales reports and analytics to support revenue growth.", bullet_style))
<<<<<<< HEAD
    story.append(Spacer(1, 4))
=======
    story.append(Spacer(1, 3))
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)

    story.append(Paragraph("<b>Intern - AI and Machine Learning / Data Science and Analytics</b> &nbsp;&nbsp;(Jun 2026 - Jul 2026)", item_title))
    story.append(Paragraph("<i>InternPe, Remote Internship</i>", item_subtitle))
    story.append(Paragraph("&bull; Applied Python-based machine learning and data analysis techniques to real-world tasks across AI/ML and Data Science domains.", bullet_style))
<<<<<<< HEAD
    story.append(Spacer(1, 4))
=======
    story.append(Spacer(1, 3))
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)

    story.append(Paragraph("<b>AI Automation and Intelligent Solutions Intern</b> &nbsp;&nbsp;(Jun 2026)", item_title))
    story.append(Paragraph("<i>AICTE | IBM SkillsBuild (BharatCares), Self-paced Virtual Internship</i>", item_subtitle))
    story.append(Paragraph("&bull; Applied core AI/ML concepts to real-world automation use cases as part of a structured AICTE-IBM SkillsBuild program.", bullet_style))

    # TECHNICAL SKILLS
    add_section("Technical Skills")
    skills = [
        ("AI and Automation", "LLM Integration (GPT, Claude, Gemini), AI Agents, Chatbot Development, n8n, Make, Zapier, Prompt Engineering"),
        ("Frontend Development", "React.js, Flutter, HTML5, CSS3, Responsive Design, Component-based Architecture"),
        ("Programming Languages", "Python, JavaScript, Dart, Java, C"),
        ("E-Commerce", "Shopify, CRM Integration, Inventory and Shipping Systems, SEO Metadata Automation"),
        ("UI/UX Design", "Figma, Wireframing, Prototyping, User Research, Design Systems, Interaction Design"),
        ("Backend Development", "Flask, REST APIs, JWT Authentication, Encryption, Object-Oriented Programming (OOP)"),
        ("Database", "PostgreSQL (IIT Bombay certified, 97.50%)"),
        ("Cloud Computing", "AWS Cloud Practitioner Essentials"),
        ("Testing and QA", "Selenium (Automated Web Testing)"),
        ("Developer Tools", "Git, GitHub, VS Code, Android Studio, Chrome DevTools"),
    ]
    for cat, items in skills:
        story.append(Paragraph(f"&bull; <b>{cat}:</b> {items}", bullet_style))

    # PROJECTS
    add_section("Projects")
    story.append(Paragraph("<b>Bus Tracking App</b> &nbsp;&nbsp;(<i>Flutter, Firebase, Google Maps API, GPS, Dart</i>)", item_title))
    story.append(Paragraph("&bull; Developed a real-time bus tracking app using Flutter and GPS, letting users monitor live bus locations on an interactive Google Maps interface.", bullet_style))
    story.append(Paragraph("&bull; Implemented Firebase Authentication and Firestore for secure, real-time sync of location and route data, with ETA tracking and route visualization improving the commuting experience.", bullet_style))
<<<<<<< HEAD
    story.append(Spacer(1, 4))
=======
    story.append(Spacer(1, 3))
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)

    story.append(Paragraph("<b>Smart Rural Area Issue Management System</b> &nbsp;&nbsp;(<i>First Prize - TinkHerHack 4.0 Hackathon | Full-Stack Development</i>)", item_title))
    story.append(Paragraph("&bull; Designed and deployed a full-stack web application to manage civic issues, events, public notices, and government welfare schemes across rural panchayats in Kerala.", bullet_style))
    story.append(Paragraph("&bull; Enabled citizens to report infrastructure problems, register for events via QR codes, and access pension/welfare scheme information from a single platform.", bullet_style))
    story.append(Paragraph("&bull; Won First Prize at TinkHerHack 4.0, competing against teams statewide across Kerala.", bullet_style))
<<<<<<< HEAD
    story.append(Spacer(1, 4))
=======
    story.append(Spacer(1, 3))
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)

    story.append(Paragraph("<b>ETLAB+ Smart Academic Advisor Platform</b> &nbsp;&nbsp;(<i>Best College Project Award | Java, REST APIs, JWT Authentication</i>)", item_title))
    story.append(Paragraph("&bull; Architected a secure academic advisor system with JWT-based authentication and encrypted ETLab token management; received Best College Project Award.", bullet_style))
    story.append(Paragraph("&bull; Implemented RESTful API endpoints for seamless backend integration and robust data security.", bullet_style))
    story.append(Paragraph("&bull; Applied object-oriented programming (OOP) principles for scalable, maintainable code architecture.", bullet_style))
<<<<<<< HEAD
    story.append(Spacer(1, 4))
=======
    story.append(Spacer(1, 3))
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)

    story.append(Paragraph("<b>AI Buddy System to Reduce University Dropouts</b> &nbsp;&nbsp;(<i>Flask, Python, NLP</i>)", item_title))
    story.append(Paragraph("&bull; Developed a full-stack web app to support at-risk students with AI-powered chat assistance and early intervention mechanisms.", bullet_style))
    story.append(Paragraph("&bull; Built responsive frontend UI and integrated NLP interaction flows for personalised student support.", bullet_style))
<<<<<<< HEAD
    story.append(Spacer(1, 4))
=======
    story.append(Spacer(1, 3))
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)

    story.append(Paragraph("<b>Tech Mentor Platform</b> &nbsp;&nbsp;(<i>Top 5 Finalist - Techlathlon Hackathon, ICT Kerala at Infopark | Full-Stack Development</i>)", item_title))
    story.append(Paragraph("&bull; Built a digital mentorship platform connecting college students with industry mentors for skill development; secured Top 5 among 100+ competing teams.", bullet_style))
    story.append(Paragraph("&bull; Delivered a rapid prototype through strong team collaboration under hackathon constraints.", bullet_style))
<<<<<<< HEAD
    story.append(Spacer(1, 4))
=======
    story.append(Spacer(1, 3))
>>>>>>> 925f52c (Update portfolio: responsive cursor fixes, typography scaling, PDF resume & direct Gmail CTA)

    story.append(Paragraph("<b>Banana Curvature Detection System</b> &nbsp;&nbsp;(<i>Python, OpenCV, Flask</i>)", item_title))
    story.append(Paragraph("&bull; Engineered a computer vision system to calculate banana curvature, perform quality ranking, and auto-generate certificates using image processing and shape analysis.", bullet_style))

    # CERTIFICATIONS
    add_section("Certifications")
    certs = [
        "AWS Cloud Practitioner Essentials - AWS Training and Certification (Certified)",
        "AI Automation and Intelligent Solutions Internship - AICTE | IBM SkillsBuild (BharatCares) (Completed)",
        "RDBMS - PostgreSQL - Indian Institute of Technology Bombay (IIT Bombay) (97.50%)",
        "IBM Web Development - IBM SkillsBuild (Completed)",
        "Machine Learning for Data Science Projects - IBM SkillsBuild (Completed)",
        "Generative AI and Symbolic Reasoning - Johns Hopkins University (Coursera) (Completed)",
        "Introduction to Selenium - Coursera (Completed)",
        "AI Workplace Proficiency - SuperHuman Academy (Certified)",
        "Project Management - HP LIFE (Certified)",
        "HackerRank Problem Solving - HackerRank (Silver Badge)",
    ]
    for c in certs:
        story.append(Paragraph(f"&bull; {c}", bullet_style))

    # ACHIEVEMENTS AND LEADERSHIP
    add_section("Achievements and Leadership")
    achievements = [
        "First Prize - TinkHerHack 4.0 Hackathon for Smart Rural Area Issue Management System (statewide competition, Kerala)",
        "Best College Project Award - ETLAB+ Smart Academic Advisor Platform (team project)",
        "Top 5 Finalist - Techlathlon Hackathon, ICT Kerala at Infopark (100+ competing teams)",
        "Finalist - Useless Project Finals, showcasing creative innovation and problem-solving",
        "20+ Hackathons Participated - consistent competitor across national and state-level events including TinkHerHack 4.0, Techlathlon, TinkerHub Overnight, and more",
        "HackerRank Silver Badge - Problem Solving",
        "Regular attendee of technical workshops, hands-on training sessions, and community tech events",
    ]
    for a in achievements:
        story.append(Paragraph(f"&bull; {a}", bullet_style))

    os.makedirs(os.path.dirname(filename), exist_ok=True)
    doc.build(story)
    print("PDF generated successfully at:", filename)

if __name__ == "__main__":
    build_pdf()
