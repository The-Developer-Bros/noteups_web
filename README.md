# Noteups

## Frontend Deployed on -> Netlify

- Connect with GitHub
- put in the build directory and the build command (`CI= npm run build`)
  along with base directory `"./frontend"` and the build directory `"./frontend/build"`
- Setup the environment variables
- Make an `_redirects file` inside public `directory` so that the file is located in `public/_redirects` and paste the line `/* /index.html 200` into the `_redirects` file
  This prevents 404 on netlify page refresh
- name the app `notesup-frontend`
- Obviously setup automatic deploys with Github

## Backend Deployed on -> Heroku

- Connect with GitHub in Heroku app(`noteups-backend`) dashboard
- Setup the environment variables
- Install heroku-cli
- `heroku login`
- Can deploy to Heroku via the web interface or the command line
- Obviously setup automatic deploys with Github

## Products Data Deployed on -> Cloudinary

- Products MetaData Deployed on -> MongoDB

<!-- URL -->

# URL for tutorial

- [Tutorial](https://niruhan.medium.com/deploying-mern-fullstack-application-on-the-web-for-free-with-netlify-and-heroku-87d888012635)

# Contact

- Later entire app to be migrated to AWS
- [Medium Tutorial](https://medium.com/@patrickmichelberger/building-a-serverless-e-commerce-app-with-aws-lambda-stripe-and-react-4663e241710b)
