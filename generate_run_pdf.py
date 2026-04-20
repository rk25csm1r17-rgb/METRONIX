from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, ListFlowable, ListItem
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors

pdf_path = r"d:\D\M.tech 2nd\ASE\lab\metronix\Metronix_Run_Steps.pdf"

doc = SimpleDocTemplate(pdf_path, pagesize=letter)
story = []
styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    name='TitleStyle',
    parent=styles['Heading1'],
    fontSize=18,
    spaceAfter=14,
    textColor=colors.HexColor("#003366")
)

heading_style = ParagraphStyle(
    name='HeaderStyle',
    parent=styles['Heading2'],
    fontSize=14,
    spaceAfter=6,
    textColor=colors.HexColor("#004488")
)

body_style = styles['Normal']
code_style = ParagraphStyle(
    name='CodeStyle',
    parent=styles['Normal'],
    fontName='Courier',
    fontSize=10,
    textColor=colors.white,
    backColor=colors.black,
    leftIndent=10,
    rightIndent=10,
    spaceBefore=5,
    spaceAfter=10,
    borderPadding=5
)

# Title
story.append(Paragraph("Metronix Smart City Analytics Platform - Setup & Run Guide", title_style))
story.append(Spacer(1, 12))

# Prerequisites
story.append(Paragraph("1. Prerequisites", heading_style))
story.append(Paragraph("- Node.js (v18+)", body_style))
story.append(Paragraph("- Python (v3.9+)", body_style))
story.append(Paragraph("- PostgreSQL Database (running locally or Docker)", body_style))
story.append(Paragraph("- Redis Server", body_style))
story.append(Paragraph("- Docker & Docker Compose (Optional for containerized run)", body_style))
story.append(Spacer(1, 12))

# Method 1
story.append(Paragraph("Method 1: Local Setup (Manual Execution)", heading_style))

# Backend
story.append(Paragraph("Step A: Start the Backend API", styles['Heading3']))
story.append(Paragraph("Open terminal and navigate to the backend folder:", body_style))
story.append(Paragraph("cd backend<br/>npm install<br/>npm run dev", code_style))

# Frontend
story.append(Paragraph("Step B: Start the Frontend UI", styles['Heading3']))
story.append(Paragraph("Open a new terminal tab and navigate to the frontend folder:", body_style))
story.append(Paragraph("cd frontend<br/>npm install<br/>npm run dev", code_style))

# ML
story.append(Paragraph("Step C: Start the Machine Learning Service", styles['Heading3']))
story.append(Paragraph("Open a new terminal tab and navigate to the ml folder:", body_style))
story.append(Paragraph("cd ml<br/>python -m venv venv<br/>venv\\Scripts\\activate  (On Windows)<br/>pip install -r requirements.txt<br/>python main.py", code_style))
story.append(Spacer(1, 12))

# Method 2
story.append(Paragraph("Method 2: Using Docker Compose (Recommended)", heading_style))
story.append(Paragraph("If you have Docker installed, you can start everything at once:", body_style))
story.append(Paragraph("docker-compose up --build -d", code_style))
story.append(Spacer(1, 12))

# Services URLs
story.append(Paragraph("Accessing the Services", heading_style))
story.append(Paragraph("- <b>Frontend Dashboard:</b> http://localhost:5173", body_style))
story.append(Paragraph("- <b>Backend API:</b> http://localhost:3000", body_style))
story.append(Paragraph("- <b>ML Prediction Component:</b> http://localhost:5000", body_style))

doc.build(story)
print(f"Generated running steps PDF at: {pdf_path}")
