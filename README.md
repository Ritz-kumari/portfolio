# Ritu Kumari — Portfolio

A responsive, resume-based portfolio built with React 19, TypeScript, and Vite.
An original dark editorial design pairs midnight surfaces, lavender, and peach
with a real-time chrome systems sculpture, larger high-contrast typography, and a
glowing oversized header wordmark.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm run dev
```

Open the URL printed by Vite.

```sh
npm run lint
npm run build
npm run preview
```

Production output is in `dist`. Deploy it to a static hosting provider. No backend,
API keys, or environment variables are required.

## Features

- Three.js, React Three Fiber, and Drei: procedural 3D geometry and studio lighting;
  no remote models, textures, or HDR downloads.
- Motion: entrance animations that honor reduced-motion preferences.
- Section-aware 3D orbit cursor: changes color and label across sections, tilts
  with pointer movement, and expands over interactive elements. The native cursor
  stays available. This decorative effect is disabled on touch/coarse pointers,
  for reduced motion, and while a case-study dialog is open.
- Interactive 3D cursor response, pause/play, and automatic suspension when the
  hero is off-screen or the tab is hidden.
- Static fallback with an explicit message when WebGL is unsupported.
- Filterable case studies with accessible native dialogs and an expandable career timeline.
- Responsive mobile navigation, keyboard focus states, self-hosted fonts, and
  email, phone, LinkedIn, and original Word resume links.

## Update content

- [src/content.ts](./src/content.ts): projects, experience, and technical skills.
- [src/App.tsx](./src/App.tsx): personal introduction, education, and contact details.
- [src/SystemsScene.tsx](./src/SystemsScene.tsx): 3D sculpture.
- [src/SectionCursor.tsx](./src/SectionCursor.tsx): lightweight CSS 3D pointer effect.
- [src/App.css](./src/App.css) and [src/index.css](./src/index.css): visual theme and responsive styles.
- [public/Ritu_Kumari_SDE.docx](./public/Ritu_Kumari_SDE.docx): downloadable resume.
- [index.html](./index.html): page title and social/search metadata.

All experience and project claims are based on the supplied resume. Enterprise
project previews are illustrative, not proprietary screenshots. No public demos
or source repositories were supplied, so project buttons open local case studies.

The email and phone actions open the visitor's email/phone app; there is no contact
form or message storage. Review personal contact details and the downloadable resume
before publishing.

To host under a subdirectory, configure Vite's `base` in [vite.config.ts](./vite.config.ts).
The resume link uses that base path automatically.
