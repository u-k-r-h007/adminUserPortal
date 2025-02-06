# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Public Routes:
/: Home page – A private route, only accessible after successful login.
/login: Login page – Users can log in to access their dashboard.
/signup: Signup page – New users can register to create an account.
Admin Routes:
/admindashboard: Admin Dashboard – Admin can manage users and tasks.
/adminlogin: Admin Login page – Admin users can log in here.
/adminsignup: Admin Signup page – Admin users can register here.
How to Perform Actions
1. User Registration:
Visit the Signup page at /signup.
Provide your name, email, and password.
Click "Register". If successful, you'll be redirected to the Login page.
2. User Login:
Visit the Login page at /login.
Enter your registered email and password.
Click "LogIn". If successful, you will be redirected to the Home page.
3. Admin Registration:
Visit the Admin Signup page at /adminsignup.
Provide the admin's name, email, and password.
Click "Register" to create the admin account.
4. Admin Login:
Visit the Admin Login page at /adminlogin.
Enter the registered admin email and password.
Click "LogIn" to access the Admin Dashboard.
5. Admin Dashboard:
Access the Admin Dashboard at /admindashboard.
View Users: Admin can see a list of registered users, their tasks, and their statuses.
Create User: Admin can create new users by providing the name, email, and password, along with tasks.
Assign Tasks: Admin can assign tasks to users directly from the dashboard.
Edit Tasks: Admin can edit existing tasks of users.
Delete User: Admin can delete users and their associated tasks.
6. Private Route for Home:
The Home page is a protected route.
Only logged-in users can access the Home page.
If a non-logged-in user tries to access it, they will be redirected to the Login page.