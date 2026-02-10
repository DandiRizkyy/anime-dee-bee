# AnimeDeeBee - Anime Database

Website database anime yang dibangun dengan React, Vite, Shadcn UI, dan Zustand untuk state management.

## Features

- 🎬 Browse anime
- 🔍 **Smart search dengan auto-complete dropdown** (debounced)
- ❤️ Simpan anime favorit (localStorage)
- 📱 Responsive design untuk semua perangkat
- 🎨 Modern UI dengan Shadcn components
- ⚡ Fast loading dengan Vite

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: Zustand
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **API**:
  - Jikan API (MyAnimeList unofficial API)

## API yang Digunakan

### 1. Jikan API

- Base URL: `https://api.jikan.moe/v4`
- Digunakan untuk mendapatkan data anime (info, trending, search)
- Gratis dan tidak perlu API key
- Dokumentasi: https://docs.api.jikan.moe/

## Installation

1. Clone repository:

```bash
git clone <repository-url>
cd anime-streaming-site
```

2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

4. Build untuk production:

```bash
npm run build
```

5. Preview production build:

```bash
npm run preview
```

## Project Structure

```
anime-streaming-site/
├── src/
│   ├── components/
│   │   ├── ui/              # Shadcn UI components
│   │   ├── AnimeCard.jsx    # Card component untuk anime
│   │   └── Navbar.jsx       # Navigation bar
│   ├── pages/
│   │   ├── Home.jsx         # Homepage
│   │   ├── AnimeDetail.jsx  # Anime detail page
│   │   ├── Search.jsx       # Search results page
│   │   ├── Trending.jsx     # Trending anime page
│   │   └── Favorites.jsx    # User favorites page
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── store/
│   │   └── animeStore.js    # Zustand store
│   ├── lib/
│   │   └── utils.js         # Utility functions
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Features Detail

### State Management (Zustand)

- Trending anime
- Search results
- Current anime details
- Favorites (disimpan di localStorage)
- Loading states
- Error handling

### Pages

1. **Home** - Menampilkan trending dan seasonal anime
2. **Trending** - List anime trending dengan infinite scroll
3. **Search** - Hasil pencarian anime
4. **Anime Detail** - Informasi lengkap anime + list episodes
5. **Favorites** - Koleksi anime favorit user

### Components

- **Navbar** - Navigation dengan search bar
- **AnimeCard** - Card component reusable untuk display anime
- **UI Components** (Shadcn):
  - Button
  - Card
  - Input
  - Badge

## API Endpoints yang Digunakan

### Jikan API

- `GET /top/anime` - Trending anime
- `GET /seasons/{year}/{season}` - Seasonal anime
- `GET /anime` - Search anime
- `GET /anime/{id}/full` - Detail anime
- `GET /anime/{id}/episodes` - List episodes

## License

MIT License - Free to use and modify
