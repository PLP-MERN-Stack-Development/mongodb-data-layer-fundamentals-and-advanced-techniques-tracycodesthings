//Task 2
// Example queries for the books collection
Db.books.find({genre:"Fiction"}).pretty()

Db.books.find({published_year:{$gt:1847}}).pretty()

Db.books.find({author:"Jane Austen"}).pretty()

db.books.updateOne(
  { title: "The Lord of the Rings" },
  { $set: { price: 17.99 } }
)

db.books.deleteOne({ title: "Brave New World" })
//Task 3
// Basic queries
db.books.find(
  { in_stock: true, year: { $gt: 2010 } }
)

db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
)

db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
).sort({ price: 1 })

db.books.find(
  {},
  { _id: 0, title: 1, author: 1, price: 1 }
).sort({ price: 1 })

db.books.find().limit(5)

db.books.find().skip(5).limit(5)

db.books.find().skip(10).limit(5)
//Task 4
// Aggregation queries
db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      averagePrice: { $avg: "$price" }
    }
  }
])

db.books.aggregate([
  {
    $group: {
      _id: "$author",
      bookCount: { $sum: 1 }
    }
  },
  {
    $sort: { bookCount: -1 }
  },
  {
    $limit: 1
  }
])

db.books.aggregate([
  {
    $group: {
      _id: { $floor: { $divide: ["$year", 10] } },
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      decade: { $concat: [ { $toString: { $multiply: ["$_id", 10] } }, "s" ] },
      count: 1,
      _id: 0
    }
  },
  {
    $sort: { decade: 1 }
  }
])
//Task 5
// Create indexes to optimize queries
db.books.createIndex({ title: 1 })

db.books.createIndex({ author: 1, published_year: -1 })

db.books.find({ title: "Pride and Prejudice" }).explain("executionStats")






