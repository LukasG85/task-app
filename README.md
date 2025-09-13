# Task App

## Project Description

The `Task App` is a simple **to-do list application** built using the modern **Next.js** framework. This project was bootstrapped with `create-next-app` [1], providing a solid foundation for a scalable and efficient React application. The primary goal of this application is to demonstrate the basic functionalities of creating, managing, and displaying tasks, serving as a base for further development [conversation].

## Technologies

The project utilizes the following key technologies and tools:

- **Next.js**: A React framework for building web applications, offering features like Server-Side Rendering (SSR), Static Site Generation (SSG), and various optimization capabilities [1, 2].
- **React**: The JavaScript library for building user interfaces, which forms the core of Next.js [conversation].
- **TypeScript** (98.2% of the codebase): A programming language that adds static typing to JavaScript, enhancing code reliability, readability, and maintainability [3].
- **pnpm**: An efficient package manager, likely used to manage project dependencies [1]. It is known for its speed and disk space efficiency [conversation].
- **`next/font`**: A Next.js module for automatically optimizing and loading custom fonts, such as Geist [2]. This significantly improves page load performance.
- **PostCSS** (implied by `postcss.config.mjs`): A tool for transforming CSS with JavaScript plugins, often used for features like autoprefixing and other CSS optimizations [5, conversation].

## Getting Started

To run the application locally on your machine, follow the steps below.

### Requirements

- **Node.js**: The current stable LTS version is recommended [conversation].
- **pnpm**: Or alternatively `npm`, `yarn`, `bun` [6, conversation].

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone https://github.com/LukasG85/task-app.git
    cd task-app
    ```
2.  Install all project dependencies using pnpm:
    ```bash
    pnpm install
    ```

### Running the Development Server

After installing the dependencies, you can start the application in development mode:

```bash
pnpm dev
The application will be available at: http://localhost:3000. The page will auto-update in your browser as you edit source files, for example, after modifying app/page.tsx.
Key Features
• Font Optimization: The project uses next/font to automatically optimize and load Geist, a new font family from Vercel. This contributes to faster and smoother text rendering.
Learn More about Next.js
If you wish to deepen your knowledge of Next.js, please refer to the following official resources:
• Next.js Documentation: A comprehensive guide to all Next.js features and APIs.
• Learn Next.js: An interactive Next.js tutorial that will help you master the basics of Next.js.
We also encourage you to check out the Next.js GitHub repository – your feedback and contributions are always welcome!
Deploy on Vercel
The easiest and recommended way to deploy your Next.js app in a production environment is to use the Vercel Platform, which was created by the developers of Next.js.
For detailed instructions on deploying a Next.js application on Vercel, please refer to the Next.js deployment documentation.
```
