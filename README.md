# Nocturne — Horror Movie Discovery

**[Live Demo](https://streaming-clone-seven.vercel.app/)** · **[Source Code](https://github.com/tracycrossrvt-gif/streaming-clone)**

Nocturne is a horror-focused movie discovery application built with React. It brings movie browsing, search, trailers, and saved titles into one dark, cinematic interface so users can discover what to watch next.

## Features

- **Explore horror movies:** Browse curated categories and discover titles.
- **Search:** Find movies using data from The Movie Database (TMDB) API.
- **Movie details:** Navigate to dedicated pages with information about individual titles, including cast and crew.
- **Trailers:** Watch available movie trailers.
- **My List:** Save favorite titles and revisit them later.
- **Local persistence:** Keep saved movies in `localStorage` across browser sessions.
- **Responsive UI:** Layouts designed for desktop, tablet, and mobile screens.

## Technical implementation

Nocturne uses reusable React components and client-side routing to connect browsing, search, and individual movie pages. The TMDB API supplies movie information, while React state and browser storage support interactive features such as **My List**.

Key areas of the implementation include:

- Fetching and presenting data from an external API
- Dynamic navigation with React Router
- Rendering search results and movie-detail content
- Managing interactive UI state and saved items
- Responsive styling for a consistent browsing experience

## Tech stack

| Area | Technologies |
| --- | --- |
| Frontend | React, JavaScript, CSS |
| Routing | React Router |
| Build tooling | Vite |
| Movie data | TMDB API |
| Browser persistence | `localStorage` |

## Run locally

```bash
npm install
npm run dev
```

To check the production build:

```bash
npm run build
```

The movie-data features depend on TMDB API availability and any API configuration required by the project. See the source for the current integration.

## Planned improvements

- Give the interface a more cinematic, streaming-platform-inspired visual polish
- Improve search feedback and loading/error states
- Explore richer filtering and streaming-availability information
- Consider authentication and cross-device saved lists

These are **future enhancements**, not features claimed as already implemented.

## About the project

Nocturne demonstrates API-driven frontend development, client-side routing, persistent UI state, responsive design, and attention to how people discover content. Its horror aesthetic also provides room to explore visual hierarchy and interaction design beyond standard dashboard layouts.

## Developer

**Tracy Cross** — Software Developer  
[Portfolio](https://dev-portfolio-woad-seven.vercel.app/) · [GitHub](https://github.com/tracycrossrvt-gif) · [LinkedIn](https://www.linkedin.com/in/tracy-cross-dev/)

---

*Movie information is provided through TMDB. Nocturne is an independent portfolio project and is not endorsed or certified by TMDB.*


