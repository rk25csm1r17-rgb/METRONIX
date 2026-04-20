import PyPDF2

pdf_path = r"d:\D\M.tech 2nd\ASE\lab\metronix\ETicket.pdf"

with open(pdf_path, 'rb') as f:
    reader = PyPDF2.PdfReader(f)
    print(f"Total pages: {len(reader.pages)}")
    print("=" * 80)
    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        print(f"\n--- PAGE {i+1} ---")
        print(text[:3000] if text else "[No text extracted]")
        print()
