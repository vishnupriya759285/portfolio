import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def build_pdf(filename="public/resume.pdf"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=0.45 * inch,
        rightMargin=0.45 * inch,
        topMargin=0.4 * inch,
        bottomMargin=0.4 * inch,
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=20,
        alignment=1,
        textColor=colors.HexColor("#0f172a"),
        spaceAfter=3
    )

    contact_style = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=12,
        alignment=1,
        textColor=colors.HexColor("#334155"),
        spaceAfter=5
    )

    summary_style = ParagraphStyle(
        'DocSummary',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11.5,
        alignment=1,
        textColor=colors.HexColor("#475569"),
        spaceAfter=8
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=colors.HexColor("#0f172a"),
        spaceBefore=6,
        spaceAfter=2
    )

    item_title = ParagraphStyle(
        'ItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12,
        textColor=colors.HexColor("#1e293b")
    )

    item_subtitle = ParagraphStyle(
        'ItemSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#64748b")
    )

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#334155"),
        leftIndent=10,
        spaceAfter=2
    )

    body_style = ParagraphStyle(
        'BodyStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=colors.HexColor("#334155"),
        spaceAfter=2
    )

    story = []

    # Header
    story.append(Paragraph("VISHNUPRIYA M V", title_style))
    story.append(Paragraph(
        "Thrissur, Kerala, India &bull; v74641001@gmail.com &bull; +91 75928 50641 &bull; "
        "<a href='https://linkedin.com/in/vishnupriya-m-v' color='#2563eb'>linkedin.com/in/vishnupriya-m-v</a> &bull; "
        "<a href='https://github.com/vishnupriya759285' color='#2563eb'>github.com/vishnupriya759285</a>",
        contact_style
    ))
    story.append(Paragraph(
        "Computer Science Engineering student & AI Automation Engineer Intern passionate about building intelligent systems, "
        "LLM agent workflows, full-stack applications, and scalable automated solutions.",
        summary_style
    ))

    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor("#cbd5e1"), spaceBefore=2, spaceAfter=4))

    # Education
    story.append(Paragraph("EDUCATION", section_heading))
    story.append(Paragraph("<b>B.Tech in Computer Science and Engineering</b> &bull; CGPA: <b>9.66 / 10</b>", item_title))
    story.append(Paragraph("Sahrdaya College of Engineering and Technology, Thrissur | 2022 – 2026", item_subtitle))
    story.append(Paragraph("&bull; <b>Minor:</b> Bioinformatics | <b>Honours:</b> Mathematics for Machine Learning", bullet_style))
    story.append(Spacer(1, 4))

    # Experience
    story.append(Paragraph("EXPERIENCE", section_heading))
    
    story.append(Paragraph("<b>AI Automation Engineer Intern</b> — Karv Devices Pvt. Ltd.", item_title))
    story.append(Paragraph("July 2026 – Present", item_subtitle))
    story.append(Paragraph("&bull; Designed and deployed AI agents, custom chatbots, and automated workflows using n8n, Make, Zapier, and LLM APIs.", bullet_style))
    story.append(Paragraph("&bull; Automated Shopify e-commerce ops, CRM syncs, inventory pipelines, customer support, and SEO metadata generation.", bullet_style))
    story.append(Spacer(1, 3))

    story.append(Paragraph("<b>AI & Machine Learning Intern</b> — InternPe", item_title))
    story.append(Paragraph("June 2026 – July 2026", item_subtitle))
    story.append(Paragraph("&bull; Built predictive machine learning models, exploratory data analysis pipelines, and automation tools using Python & Scikit-learn.", bullet_style))
    story.append(Spacer(1, 3))

    story.append(Paragraph("<b>AI Automation Intern</b> — AICTE | IBM SkillsBuild", item_title))
    story.append(Paragraph("June 2026", item_subtitle))
    story.append(Paragraph("&bull; Implemented intelligent AI solutions and workflow automations under IBM SkillsBuild mentorship.", bullet_style))
    story.append(Spacer(1, 4))

    # Projects
    story.append(Paragraph("KEY PROJECTS", section_heading))

    story.append(Paragraph("<b>Smart Rural Area Issue Management System</b> (<i>1st Prize – TinkHerHack 4.0</i>)", item_title))
    story.append(Paragraph("&bull; Full-stack civic platform for reporting panchayat issues, welfare access, notice board updates, and QR event registration.", bullet_style))
    story.append(Spacer(1, 2))

    story.append(Paragraph("<b>Bus Connect — Real-Time Bus Tracking System</b>", item_title))
    story.append(Paragraph("&bull; Flutter & Firebase app tracking live bus coordinates on Google Maps with real-time ETA calculation & route visualization.", bullet_style))
    story.append(Spacer(1, 2))

    story.append(Paragraph("<b>ETLAB+ Smart Academic Advisor</b> (<i>Best College Project Award</i>)", item_title))
    story.append(Paragraph("&bull; Secure academic portal with JWT authentication, encrypted tokens, and automated student analytics REST APIs.", bullet_style))
    story.append(Spacer(1, 2))

    story.append(Paragraph("<b>AI Buddy — Student Early Intervention Platform</b>", item_title))
    story.append(Paragraph("&bull; Flask NLP platform identifying at-risk academic patterns and providing automated conversational support.", bullet_style))
    story.append(Spacer(1, 4))

    # Skills
    story.append(Paragraph("TECHNICAL SKILLS", section_heading))
    story.append(Paragraph("<b>Languages:</b> Python, JavaScript, Java, Dart, C, C++, SQL", body_style))
    story.append(Paragraph("<b>AI & Automation:</b> AI Agents, LLM Integrations, n8n, Make, Zapier, Prompt Engineering", body_style))
    story.append(Paragraph("<b>Web & Mobile:</b> React.js, Next.js, Node.js, Express.js, FastAPI, Flutter, HTML5, CSS3, Tailwind CSS", body_style))
    story.append(Paragraph("<b>Databases & Tools:</b> PostgreSQL, MongoDB, MySQL, Firebase, Git, Docker, OpenCV, Postman", body_style))
    story.append(Spacer(1, 4))

    # Achievements & Certifications
    story.append(Paragraph("ACHIEVEMENTS & CERTIFICATIONS", section_heading))
    story.append(Paragraph("&bull; <b>AWS Certified:</b> AWS Cloud Practitioner Essentials", bullet_style))
    story.append(Paragraph("&bull; <b>IIT Bombay Certified:</b> RDBMS - PostgreSQL (97.50%)", bullet_style))
    story.append(Paragraph("&bull; <b>Hackathons:</b> 20+ Hackathons | 1st Prize TinkHerHack 4.0 | Top 5 Finalist Techlathlon", bullet_style))

    doc.build(story)
    print(f"Successfully generated clean PDF at {filename}")

if __name__ == "__main__":
    build_pdf()
