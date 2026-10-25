# LokLink – Your locality. Your voice. Your government.

LokLink is a React civic-technology website made for the **Front End Engineering-II** project (Chitkara University).
Citizens can explore localities, browse government schemes, submit and track civic complaints, and read community posts.

> **Important:** All data is sample data. Complaint submission is **simulated** and never contacts real officials.
> Login is a **demo only** (no real security, passwords are never stored). Populations, PIN codes and statistics are illustrative.
> Scheme summaries are short and general; always confirm details on the official portal.

## Installation

```bash
npm install
npm run dev      # starts the development server (open the address shown in the terminal)
npm run build    # creates a production build in /dist
```

Requires Node.js 18 or newer.

## Technologies

HTML5, CSS3 (Grid, Flexbox, media queries), JavaScript ES6+, React 18 + JSX, Vite, React Router DOM 6,
Context API, Redux Toolkit + React Redux, Fetch API, localStorage. No TypeScript, Tailwind or Next.js.

## Folder structure

```
src/
  components/   Reusable UI: Navbar, Footer, Layout, Button, StatusBadge, FormField, cards, LocalitySearch...
  pages/        One file per route (Home, Explore, Schemes, Complaints, Dashboard...)
  context/      AuthContext.jsx  (demo login session)
  redux/        store.js, savedSchemesSlice.js  (saved schemes)
  data/         localities.json, schemes.json, complaints.json, community.json  (mock database)
  services/     storage.js (localStorage + data helpers), api.js (fetch request)
  styles/       variables.css, global.css, components.css, responsive.css
  App.jsx       Routes
  main.jsx      Entry point: Provider, AuthProvider, BrowserRouter
```

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/explore` | Search localities |
| `/locality/:id` | Locality details |
| `/schemes` | Search and filter schemes |
| `/schemes/:id` | Scheme details |
| `/complaints` | Search and filter complaints |
| `/complaints/new` | Submit complaint (controlled form) |
| `/complaints/:id` | Complaint details and status progress |
| `/community` | Posts, filters, bookmarks, API feed |
| `/dashboard` | Saved schemes, my complaints, activity |
| `/login`, `/register` | Demo authentication |
| `/profile` | Demo profile and locality preference |
| `*` | 404 page |

## Features

- Locality search (name, district, state, PIN) with suggestions, sorting, reset and no-results state
- Scheme search by title, category filters, save/remove with Redux Toolkit (kept after refresh)
- Complaint search, category and status filters, sorting, reference IDs, status stepper and history
- Controlled complaint form with validation; new complaints are stored in localStorage
- Community posts with search, category filters and bookmarks (kept after refresh)
- Optional JSONPlaceholder request with loading, error, Retry button and local fallback
- Demo login/register with AuthContext
- Responsive layout for mobile, tablet and desktop

## State management: who owns what

| State | Where | Why |
|---|---|---|
| Logged-in demo user | **Context API** (`AuthContext`) | Needed by Navbar, Dashboard, Profile, forms |
| Saved schemes (IDs) | **Redux Toolkit** (`savedSchemesSlice`) | Shared by cards, details page, dashboard, navbar |
| Search text, filters, form values | **useState** in each page | Only that page needs them |
| Complaints you submit, bookmarks | **localStorage** via `services/storage.js` | Survive a refresh |

Each piece of data lives in only one place.

## Syllabus mapping

| Topic | Where it is used |
|---|---|
| Semantic HTML, accessibility | `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, labels, `aria-*`, skip link, focus styles |
| Box model, Flexbox, Grid | `components.css` (navbar = Flexbox, card grids = Grid) |
| Responsive design | `responsive.css` media queries, `auto-fill` grids |
| Functions, arrays, objects, loops | `searchLocalities`, `filter`, `map`, `sort` in pages and `storage.js` |
| ES6+ | Destructuring (`const { id } = useParams()`), spread (`[...a, ...b]`), modules, arrow functions |
| Promises, async/await | `fetchCommunityPosts` in `api.js`, `loadPosts` in `Community.jsx` |
| JSON, browser storage | `src/data/*.json`, `readJSON` / `writeJSON` in `storage.js` |
| JSX, props, conditional rendering | Components such as `SchemeCard`, `EmptyState`, ternaries in pages |
| useState | Filters, forms, menu toggle |
| useEffect | Fetch on `Community` load, focus + scroll-to-top effects |
| useRef | Focus on the search box in `Explore.jsx` |
| useContext | `useAuth()` in `AuthContext.jsx` |
| Redux Toolkit | `store.js`, `savedSchemesSlice.js`, `useSelector`/`useDispatch` in `SaveSchemeButton.jsx` and `Dashboard.jsx` |
| React Router | `App.jsx` (nested layout, dynamic routes, 404), `useParams`, `useNavigate`, `useSearchParams` |
| Controlled forms, validation | `SubmitComplaint.jsx`, `Login.jsx`, `Register.jsx` |
| Vite | `vite.config.js`, `index.html`, `package.json` scripts |

## Limitations

- No real backend or database: JSON files are the starting data and localStorage keeps demo actions in one browser only.
- Authentication is a demonstration; do not enter a real password you use elsewhere.
- Complaint status never changes by itself; the history for sample complaints is made up.
- Data (localities, populations, PINs, statistics, community posts) is illustrative, not live government data.
- The JSONPlaceholder feed shows placeholder text and needs internet; the app falls back to local tips when it fails.

## Viva questions and answers

1. **What is React?** A JavaScript library for building user interfaces from small reusable components.
2. **What is JSX?** A syntax that lets us write HTML-like code inside JavaScript. Vite/Babel turns it into normal JavaScript.
3. **What are props?** Inputs passed from a parent to a child component, e.g. `<SchemeCard scheme={scheme} />`.
4. **What is `useState`?** A hook that gives a component a value and a function to change it. Changing it re-renders the component (e.g. `search` in `Schemes.jsx`).
5. **What is `useEffect`?** A hook for side effects. In `Community.jsx` it calls `loadPosts()` once when the page opens (empty `[]` dependency list).
6. **What is `useRef` and where did you use it?** It holds a reference to a DOM element without re-rendering. In `Explore.jsx` it focuses the search box.
7. **What is the Context API?** A way to share data with many components without passing props through every level. `AuthContext` shares the demo user.
8. **Why did you use Context for login and Redux for schemes?** To show both tools clearly. Login is small session data; saved schemes are a list that many components add to or remove from.
9. **What is Redux Toolkit?** The modern, simpler way to write Redux. `createSlice` creates the reducer and actions together; `configureStore` builds the store.
10. **How do `useSelector` and `useDispatch` work?** `useSelector` reads data from the store (`state.savedSchemes.ids`); `useDispatch` returns a function to send actions like `addSavedScheme(id)`.
11. **How are saved schemes kept after a refresh?** The slice starts from `readJSON(KEYS.saved, [])`, and `store.subscribe` in `store.js` writes the IDs to localStorage after every change.
12. **How does search work?** `filter()` keeps items where `toLowerCase().includes(text)` is true for the name, district, state or PIN (`searchLocalities` in `storage.js`).
13. **How do category filters work?** A state value (e.g. `category`) is compared inside `filter()`. "All" means no category check.
14. **How does React Router handle dynamic routes?** The route `/schemes/:id` gives the page the value through `useParams()`, and `find()` looks up the scheme in the JSON.
15. **What is a nested layout?** In `App.jsx`, `Layout` wraps all routes. It draws the navbar and footer, and `<Outlet />` shows the current page.
16. **What is a controlled form?** An input whose value comes from state (`value={form.title}`) and updates through `onChange`. React always knows the current value.
17. **How does form validation work?** `validate(form)` returns an object of error messages. If it has any keys, we show the errors and stop; otherwise we save the complaint.
18. **What is localStorage and what are its limits?** Browser storage of text key/value pairs that survives refresh. It is per-browser, not secure and not a real database, so we store JSON text with `JSON.stringify` and read with `JSON.parse`.
19. **How do you handle the API request?** `fetch` with `async/await` inside `try/catch`. State holds `loading` and `error`; on failure we show a message, a Retry button and local tips.
20. **Why is the login only a demo?** There is no server to check passwords. We validate the format only and never store passwords; a real app needs a secure backend.
