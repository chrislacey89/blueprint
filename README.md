# **Assessment Form Application**

This project is a part of a take-home interview assignment. It's a full stack application built with Next.js, React and Prisma. It fetches assessment questions from a PostgreSQL database using Prisma ORM, displays them to the user, allows the user to respond, and then calculates and displays the assessment results.

The project is hosted at [https://blueprint-swart.vercel.app/](https://blueprint-swart.vercel.app/).

## **Project Structure**

The project is divided into several key files and components:

1. **Page.tsx**: The main page component. It fetches the data from the assessment API and passes the data to the FormDisplay component.
2. **FormDisplay.tsx**: A component that displays the form to the user. It keeps track of the user's answers and submits them to the server when the user has finished the assessment.
3. **RadioQuestion.tsx**: A reusable component that displays a question and several possible answers to the user. The user's selected answer is updated in the state of the FormDisplay component.
4. **assessment/route.tsx**: The API route. It has GET and POST methods. The GET method fetches the assessment from the database and the POST method receives the user's answers, calculates the assessment results, and sends them back to the client.
5. **Prisma Schema**: A file that defines the database schema. It includes models for the assessment, its content, sections, answers, and related data.

## **Setup Instructions**

To get started with this project, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running **`npm install`**, **`yarn install`**, or`pnpm install`.
3. Set up the database:
    - Install PostgreSQL and create a new database.
    - Update the **`DATABASE_URL`** in your .env file.
    - Run **`npx prisma migrate dev`** to run the migrations.
4. Start the Next.js server with **`npm run dev`** or **`yarn dev`**.
5. Open your browser to **`http://localhost:3000`** to see the application in action.

## **Usage**

Once you've started the application, you'll see a form with a series of questions. Each question can be answered by selecting one of the available options. Once all the questions have been answered, you can submit the form. After submitting the form, the application will calculate your assessment results and display them to you.

## Problem Description:

A full stack approach to generating dynamic, personalized assessments, managing responses, and calculating results based on specific domain mappings.

## Solution Description:

This solution provides an, intuitive interface that displays each question and corresponding options one at a time, tracking the user's progress throughout the assessment.

Upon completion, the user's responses are posted back to the API, which calculates the score based on a predefined mapping of questions to domains and domain scores to assessments.

Key functionalities of DynamicAssessment include:

1. **Dynamic Assessment Rendering**: The application fetches an assessment from the server, including the sections, questions, and possible answers. This information is used to dynamically generate an interactive assessment form.
2. **Progress Tracking**: The application keeps track of the current question and displays a progress bar, showing users how far they've progressed in the assessment.
3. **User Interaction**: Users select their answers via radio buttons. The application captures these responses, maintaining a state of the user's answers throughout the assessment.
4. **Results Calculation and Display**: Upon completion, the application posts the user's responses back to the server, where the score is calculated based on predefined mappings. The results are then returned to the user.

## Technical Choices:

### Full-stack Framework: Next.js

The application is built with Next.js, a powerful React framework that enables server-side rendering, static site generation, API routes, and much more. Next.js was selected due to its rich feature set and enables a tight integration between UI and data layers. The application uses React Server Components which allows for the rendering the components on the server-side, reducing client bundle size and a more ergonomic way of fetching data.

### **TypeScript**

TypeScript is used in the project for static type-checking, which can significantly reduce runtime bugs and facilitate easier navigation of the codebase. By explicitly defining types for our data, we can catch errors early in the development process and enhance code readability and maintainability.

### **Prisma**

Prisma is used as the ORM tool to interact with the PostgreSQL database. Prisma Client provides an auto-generated and type-safe query builder that's tailored to your database schema, which helps reduce bugs and typos related to database queries.

### **PostgreSQL**

PostgreSQL is used as the database for this application due to its robustness, ACID compliance, and support for complex SQL queries. It's a powerful open-source relational database that is extensible and standards-compliant.

### **ESLint**:

ESLint  is used to find and fix problems in the codebase. It helps maintain a consistent coding style, enforces best practices, and reduces potential bugs early in the development process. Using ESLint improves the quality of our codebase and makes code reviews more focused and efficient.

# **Production Deployment Strategy**

## **Platform Choice: Vercel**

For deploying this application in a true production environment, I would choose Vercel, which is an ideal platform for hosting Next.js applications. Vercel provides an optimized global delivery network ensuring high availability and performance, as well as seamless scaling capabilities, making it a great choice for our app.

### **Security:**

1. **HTTPS**: By default, Vercel provides HTTPS for all deployments, securing the data in transit.
2. **Environment Variables**: Vercel allows us to safely store and access sensitive data like API keys through their environment variables feature.
3. **Vercel's security measures**: Vercel itself has numerous security measures in place, including automatic DDoS protection, and regular audits of their services and operations.

### **Troubleshooting in a Live Environment:**

1. **Vercel's Integrated Logs**: Vercel provides built-in real-time logs for our deployments. In case of any issues, these can be checked for any errors or anomalies.
2. **Proactive Monitoring**: We would set up proactive monitoring and alerts using third-party tools like Sentry. This way, we get notified about any errors or performance issues and can quickly act on them.
3. **Performance Analytics**: Vercel's analytics will provide insights about our application's performance. This data can be used to find any bottlenecks and improve the performance of our application.

# **Trade-offs and Future Improvements**

Throughout the development of this application, various trade-offs were made.

## **Trade-offs:**

1. **Next.js over traditional backend**: Given the tight integration of our data and UI, Next.js was chosen as a full-stack framework instead of a traditional back-end framework like Express.js with a separate front-end application. This allowed for faster development but may limit some customization options or optimization if we want to have a more complex backend logic.

## **Left Out:**

Due to time constraints, there were a few items left out that could improve the application:

1. **Tests**: More comprehensive unit tests, integration tests, and end-to-end tests would be beneficial for maintaining the quality of the codebase.
2. **Error Handling and Logging**: More detailed error handling and logging would have been useful for easier debugging and improved resiliency of the app.
3. **Continuous Integration/Continuous Deployment (CI/CD)**: A fully automated CI/CD pipeline wasn't set up. This could streamline the development process and ensure that the code being deployed is tested and reliable.

## **With More Time:**

If given more time, here's what could be improved:

1. **User Interface**: The UI could be made more engaging and responsive. User experience could be improved with more interactive elements and feedback.
2. **Feature Completeness**: More features could be added, such as user authentication, personalized recommendations, etc.
3. **Accessibility**: More focus could be given to making the application accessible to all users, following ARIA standards.