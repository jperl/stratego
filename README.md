Stratego (Working Name)
===========

###Getting Started

1. Install [meteor](http://docs.meteor.com/#quickstart) and [meteorite](http://oortcloud.github.com/meteorite/)

2. Run mrt install

3. Run mongo with text search

    mongod --setParameter textSearchEnabled=true

4. Run the application

    MONGO_URL="mongodb://localhost:27017/meteor" meteor