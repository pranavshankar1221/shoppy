@echo off
echo Installing backend dependencies...
npm install

echo Starting MongoDB (make sure MongoDB is installed)
echo If MongoDB is not installed, download from: https://www.mongodb.com/try/download/community

echo Starting backend server...
npm start