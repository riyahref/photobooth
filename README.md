# VibeBooth

A vintage-style digital photobooth web application.

## Features

- Camera capture with face detection
- Multiple photo filters (warm, cool, matte, mono)
- Vibe overlays (romantic, energetic, cozy, dreamy, peaceful, bright)
- Customizable photo strip colors
- Date stamp and personal notes
- Downloadable photo strips

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- MediaPipe Face Mesh

## Development

```sh
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── screens/        # Screen components
│   └── VibeBoothApp.jsx
├── context/            # React context
├── styles/             # CSS files
├── types/              # Constants
└── utils/              # Helper functions
```
