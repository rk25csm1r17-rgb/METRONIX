from PIL import Image
import os, glob

IMG_DIR = r"C:\Users\ravik\.gemini\antigravity\brain\60b3e69d-b3ae-44d4-ac6c-e0a26e5be234"
for f in glob.glob(os.path.join(IMG_DIR, "*.png")):
    try:
        img = Image.open(f)
        # Re-save as proper PNG
        out = f.replace(".png", "_fixed.png")
        img.save(out, "PNG")
        print(f"Converted: {os.path.basename(f)} -> {os.path.basename(out)}")
    except Exception as e:
        print(f"Error with {os.path.basename(f)}: {e}")
