# TaskCore Frontend

TaskCore is a professional, engineering-grade task management system designed for high-density information environments. It helps teams maintain tight control over complex workflows with a fast, secure, and intuitive interface.

## 🏗️ Frontend Architecture

The frontend is built with a modern, scalable architecture using **React 19** and **Vite**, focusing on high performance, reusability, and clean code principles.

### Tech Stack
- **Framework:** React 19 + Vite (Fast HMR and optimized builds)
- **Styling:** Tailwind CSS (Custom configured design system with specific color tokens and utilities)
- **Routing:** React Router v6 (`react-router-dom`)

### Directory Structure
```
src/
├── components/       # Reusable UI building blocks
│   ├── layout/       # Structural components (AppLayout, Sidebar, Topbar)
│   ├── project/      # Project-specific domain components (ProjectCard)
│   ├── task/         # Task-specific domain components (KanbanColumn, TaskCard)
│   └── ui/           # Generic atomic components (Button, Input, Avatar, Card)
├── context/          # Global state management (AuthContext)
├── hooks/            # Custom React hooks for business logic (useTasks)
├── pages/            # Top-level route components (SignIn, Dashboard, Tasks, Projects)
├── services/         # External integration layer (API service mocks)
└── utils/            # Helpers and global configuration (constants)
```

### Key Architectural Decisions
1. **Component-Driven Design:** The UI is split into atomic elements (`components/ui`) and domain-specific compounds (`components/task`, `components/project`) to promote reusability.
2. **Centralized Layouts:** The `AppLayout` component wraps authenticated routes, ensuring the Sidebar and Topbar remain persistent across navigations, avoiding unnecessary re-renders.
3. **Decoupled Data Fetching:** Data retrieval logic is abstracted into custom hooks (e.g., `useTasks`) which rely on a centralized service layer (`services/api.js`). This makes swapping mock data for real API calls completely seamless.
4. **Tailwind Design System:** Replaced messy inline styles and CDNs with a robust `tailwind.config.js` tailored for the "TaskCore" theme (Primary: Amber `#eab308`, Surface: `#101419`).

---

## 🔌 API Endpoints (Integration Layer)

The application communicates with the backend via the centralized `src/services/api.js` layer. Below is the list of expected REST API endpoints that the frontend interfaces with:

### Authentication
*   **`POST /api/auth/login`**
    *   Authenticates a user and returns an access token.
*   **`POST /api/auth/logout`**
    *   Invalidates the current user session.
*   **`GET /api/auth/me`**
    *   Retrieves the profile information of the currently authenticated user.

### Tasks (Kanban Board)
*   **`GET /api/tasks`**
    *   Fetches the list of all active tasks for the team/user.
*   **`POST /api/tasks`**
    *   Creates a new task.
*   **`GET /api/tasks/:id`**
    *   Retrieves the details of a specific task.
*   **`PUT /api/tasks/:id`**
    *   Updates a task (e.g., changing its status from `todo` to `in_progress`).
*   **`DELETE /api/tasks/:id`**
    *   Deletes or archives a task.

### Projects
*   **`GET /api/projects`**
    *   Fetches the list of ongoing initiatives and their statuses.
*   **`POST /api/projects`**
    *   Creates a new project.
*   **`GET /api/projects/:id`**
    *   Retrieves details for a specific project including linked tasks.
*   **`PUT /api/projects/:id`**
    *   Updates project details (e.g., progression percentage).
*   **`DELETE /api/projects/:id`**
    *   Archives a project.

---

## 🚀 Getting Started

To run the frontend locally:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

The local server will be accessible at `http://localhost:5173`.
