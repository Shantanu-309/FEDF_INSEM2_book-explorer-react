import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";


const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    description: "A story about the Jazz Age and lost dreams.",
    rating: 4.5,
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    description: "A dystopian novel on surveillance and totalitarianism.",
    rating: 4.7,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    description: "A novel about racial injustice and moral growth.",
    rating: 4.8,
  },
];


function BookCard({ book }) {
  return (
    <div style={styles.card}>
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <Link to={`/book/${book.id}`} style={styles.link}>
        View Details
      </Link>
    </div>
  );
}

function BookList() {
  const [bookData] = useState(books);

  return (
    <div style={styles.container}>
      <h2>All Books</h2>
      <div style={styles.grid}>
        {bookData.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}


function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {

    const foundBook = books.find((b) => b.id === parseInt(id));
    setTimeout(() => setBook(foundBook), 500);
  }, [id]);

  if (!book) {
    return <p style={{ textAlign: "center" }}>Loading book details...</p>;
  }

  return (
    <div style={styles.detail}>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Rating:</strong> ⭐ {book.rating}</p>
      <Link to="/" style={styles.backLink}>
        ← Back to List
      </Link>
    </div>
  );
}


function App() {
  return (
    <Router>
      <div style={styles.app}>
        <h1 style={styles.title}>📚 Book Explorer</h1>
        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </div>
    </Router>
  );
}


const styles = {
  app: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    color: "#2c3e50",
  },
  container: {
    marginTop: "20px",
  },
  grid: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    width: "200px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  link: {
    display: "inline-block",
    marginTop: "10px",
    textDecoration: "none",
    color: "#3498db",
  },
  detail: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fdfdfd",
    maxWidth: "400px",
    margin: "30px auto",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  backLink: {
    display: "block",
    marginTop: "15px",
    textDecoration: "none",
    color: "#2980b9",
  },
};

export default App;
