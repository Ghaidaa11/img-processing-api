1) install the project : npm install
scripts used in this project:
1) npm test (to run the build and test at the same time )
2) npm build to build the project 
3) to run the project use npm start 


To resize an image, make a GET request to:

http://localhost:3000/api/images?filename=FILENAME&width=WIDTH&height=HEIGHT

Example:

http://localhost:3000/api/images?filename=lion&width=200&height=300

    The original image should exist in src/images/full/ (e.g., lion.jpg)

    The resized image will be saved in src/images/thump/
