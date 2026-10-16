# Daymark Todo

A simple React Todo application with a demo login. It runs in the browser and does not need a backend or database.

## Requirements

- Windows, macOS, or Linux
- Node.js 20.19+ or 22.12+ (Node.js 24 LTS is suitable)
- npm, which is included with Node.js

Install Node.js from the [official download page](https://nodejs.org/en/download/). After installation, open a **new** terminal window and check that Node.js and npm are available:

```powershell
node --version
npm --version
```

## Start the app on Windows

Open PowerShell and run:

```powershell
cd D:\ai_demo
npm install
npm run dev
```

Vite prints a local address, usually `http://localhost:5173/`. Open it in your browser. Keep the terminal open while using the app; press **Ctrl+C** in that terminal to stop the development server.

## Demo login

- Email: `student@example.com`
- Password: `password123`

The login checks the supplied demo credentials in the frontend. It is for demonstration only and is not production authentication.

## Using the app

- Add a task with the input at the top of the Todo page.
- Select the circle beside a task to mark it complete or active again.
- Select **Edit** beside an active task to change its title; save or cancel the edit. Completed tasks cannot be edited.
- Select **Remove** to delete a task, whether it is active or completed.
- Use **All**, **Active**, or **Completed** to filter the list.
- Use the × button to delete a task.
- The remaining count shows how many tasks are active.
- Select **Log out** to return to the login page.
- Use the mode button on either screen to switch between the default black and turmeric theme and a light theme. Your choice is remembered in this browser.
- The progress bar updates as you complete tasks and celebrates when the list is finished.

## Data and session

- Todos are stored in this browser's `localStorage` under `daymark.todos`, so they remain after refreshing or closing the tab.
- Login state is stored in `sessionStorage` under `daymark.signedIn`, so it lasts for the current tab session.
- Theme preference is stored in `localStorage` under `daymark.theme`.
- Data is local to the browser and device. Clearing this site's browser storage removes the saved todos and session.

## Build for production

```powershell
npm run build
```

Vite writes the production files to `dist/`. To preview that build locally, run `npm run preview` and open the URL it prints.

## Project structure

```text
index.html       HTML entry point
src/main.jsx     React entry point
src/App.jsx      Login, todo list, and localStorage behavior
src/styles.css   Responsive page styling
```
