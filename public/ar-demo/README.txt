This folder hosts a static MindAR + A-Frame demo.
- index.html loads a sample 3D model when the target image is detected.
- You need a targets.mind file generated from an image.

Quick test (hosted sample):
- Open /ar-demo/ in the dev server and allow camera permission.
- Click "Open" to view the sample target image and point your camera at it.

Use your own image (recommended):
1) Place your marker image at images/pitcher.jpg (any name is fine; update commands accordingly).
2) Compile a MindAR targets file (targets.mind) from that image.

Option A — Using Node CLI (mindar CLI via npx):
	npx mind-ar-tools@latest compile-image --input images/pitcher.jpg --output targets.mind --filter 35 --debug

Option B — Online Tool:
- Go to https://hiukim.github.io/mind-ar-js-doc/tools/compile
- Upload your image, download the .mind file as targets.mind and place it here.

Run the demo:
- Refresh /ar-demo/. The page will auto-detect local targets.mind if present.
- Add ?local=1 to force using the local targets.mind (e.g., /ar-demo/?local=1)

Tips for good tracking images:
- High contrast, rich texture, minimal repetitive patterns, fill a good portion of the frame.
- Avoid blurry, overly glossy, or very low-contrast images.
