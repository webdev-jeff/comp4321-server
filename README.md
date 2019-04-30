# comp4321-server

* This repository is the server side of search engine course project ([COMP4321](https://course.cse.ust.hk/comp4321/labs/project.html))

* For database system, we use `MongoDB`. For server, we use `express` in `Node.js` .
* To run the code,
  1. Install mongodb by following [this](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-red-hat/) tutorial (Our version is 4.0.9) and start the mongod service (assume default configuration that the mongod is running on `mongodb://localhost:27017/`).

	2. Clone [this](https://github.com/webdev-jeff/comp4321-server) repository to your server machine and `cd` into the directory. Run `python3 db/crawler.py` to crawl the data into your database.

	3. run `node app.js` and the database server is serving on `http://localhost:8000`.

