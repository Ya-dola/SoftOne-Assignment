# PLAN

### Day 1

- Set up your development environment: Install Visual Studio Code, .NET SDK 7.0, Angular CLI, and SQL Server Management
  Studio if not already installed. ✅
- Create a new ASP.NET project using .NET 7.0. ✅
- Set up the Angular 15 project within the ASP.NET project. ✅
- Configure the connection to the MS SQL Server running on Azure. ✅

### Day 2

- Create a simple UI layout using Angular components. ✅
- Implement a basic Angular service to fetch and display a list of localStudents (without details). ✅
- Set up a basic Web API controller in your ASP.NET project to serve student data. ✅
- Test the connection between the Angular frontend and the Web API backend by displaying a list of student names. ✅
- Connect your Web API to the MS SQL Server database on Azure. ✅

### Day 3

- Create Angular forms for updating student information. ✅
- Implement the CRUD operations (Create, Read, Update, Delete) in both the Angular frontend and the ASP.NET Web API
  backend. (Create ❓- Read ✅ - Update ✅ - Delete ❓)

### Day 4

- Handle Uploading of Profile Image. ✅
- Handle Displaying Profile Image from DB ✅
- Expand the student list UI to include a details section. 
- Create Angular forms for inserting new student information.
- Implement Angular functionality to populate the details section when a student is clicked.  ❓
- Test CRUD operations by sending requests from the Angular frontend and ensuring data is being stored and retrieved
  correctly. (Create ❓- Read ✅ - Update ✅ - Delete ❓)

### Day 5

- Restructure the UI with flex grids and css. ❓
- Fix Loading of Previous Date when Editing Student Details
- Implement pagination functionality for the student list in the Angular frontend.  
- Add a search bar to search for localStudents by any field in the list. 
- Implement sorting functionality for the student list. 
- Test pagination, searching, and sorting to ensure they are working as expected. 



# OLD


### Day 1: Initial Setup and Project Structure

- Set up your development environment: Install Visual Studio Code, .NET SDK 7.0, Angular CLI, and SQL Server Management
  Studio if not already installed. ✅
- Create a new ASP.NET project using .NET 7.0. ✅
- Set up the Angular 15 project within the ASP.NET project. ✅
- Configure the connection to the MS SQL Server running on Azure. ✅

### Day 2: Basic UI and Web API

- Create a simple UI layout using Angular components. ✅
- Implement a basic Angular service to fetch and display a list of localStudents (without details). ✅
- Set up a basic Web API controller in your ASP.NET project to serve student data. ✅
- Test the connection between the Angular frontend and the Web API backend by displaying a list of student names. ✅

### Day 3: Details Section and CRUD Operations

- Expand the student list UI to include a details section.
- Restructure the UI with flex grids and css.
- Implement Angular functionality to populate the details section when a student is clicked.
- Create Angular forms for inserting and updating student information.
- Implement the CRUD operations (Create, Read, Update, Delete) in both the Angular frontend and the ASP.NET Web API
  backend.

### Day 4: Web API Integration and Database

- Implement the backend logic in your Web API controller to handle CRUD operations.
- Connect your Web API to the MS SQL Server database on Azure. ✅
- Test CRUD operations by sending requests from the Angular frontend and ensuring data is being stored and retrieved
  correctly. (Read ✅)

### Day 5: Pagination, Searching, and Sorting

- Implement pagination functionality for the student list in the Angular frontend.
- Add a search bar to search for localStudents by any field in the list.
- Implement sorting functionality for the student list.
- Test pagination, searching, and sorting to ensure they are working as expected.


# OLDEST

### Day 1: Project Setup and Core Functionality (Prototype)

- Set up your development environment:
    - Install Visual Studio Code and necessary extensions.
    - Install Angular CLI and required dependencies.
    - Install MS SQL Server Express.

- Create a new Angular project:
    - Set up the basic project structure.
    - Create necessary components for the student registration and details.

- Implement core functionality:
    - Create a student registration form with required fields.
    - Set up API calls to connect with the database using C#.NET.
    - Implement CRUD operations (Create, Read, Update, Delete) for student records.

### Day 2: Refine CRUD Operations and API Integration

- Test and debug the CRUD operations:
    - Ensure data is correctly sent to and retrieved from the database.
    - Handle errors and exceptions gracefully.

- Implement API integration for details section:
    - Set up API endpoints for retrieving student details.
    - Integrate API calls into the Angular application for populating the details section.

### Day 3: Implement Pagination and Basic Search

- Implement pagination for the student grid:
    - Display a limited number of records per page.
    - Add navigation controls for page switching.

- Implement basic search functionality:
    - Create a search box that filters records based on any field.
    - Update the grid dynamically as the user types in the search box.

### Day 4: Design and Layout Refinement

- Design the layout:
    - Use CSS or a UI library (such as Angular Material) to style the application.
    - Create a responsive design that works well on different screen sizes.

- Refine user interactions:
    - Implement the click behavior on student rows to show/hide details.
    - Ensure a smooth and intuitive user experience.

### Day 5: Finalize Features and Testing

- Implement sorting functionality:
    - Allow users to sort student records based on different fields.

- Test the application:
    - Conduct thorough testing of all features and interactions.
    - Fix any remaining bugs or issues.

- Documentation:
    - Write a brief README that explains how to set up and run the application.
    - Document any important design decisions or implementation details.

