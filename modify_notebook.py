import json
import os
import sys

paths = [
    'render_colab.ipynb',
    'C:/Users/Allen/OneDrive/Desktop/remotion/render_colab.ipynb'
]

success = False

for path in paths:
    if os.path.exists(path):
        print(f"Checking {path}...")
        try:
            with open(path, 'r', encoding='utf-8') as f:
                notebook = json.load(f)

            updated = False
            for cell in notebook['cells']:
                if cell['cell_type'] == 'code':
                    source = cell['source']
                    for i, line in enumerate(source):
                        if 'ColabShowcase' in line:
                            print(f"  Found 'ColabShowcase' in cell, replacing...")
                            source[i] = line.replace('ColabShowcase', 'CryptoPaymentAnimation')
                            updated = True
                        if 'out/video.mp4' in line:
                            source[i] = line.replace('out/video.mp4', 'out/crypto_payment.mp4')
                            updated = True

            if updated:
                with open(path, 'w', encoding='utf-8') as f:
                    json.dump(notebook, f, indent=2, ensure_ascii=False)
                print(f"Successfully updated {path}")
                success = True
        except Exception as e:
            print(f"Error processing {path}: {e}")

if success:
    print("Done.")
else:
    print("Failed to find 'ColabShowcase' in any notebook.")
