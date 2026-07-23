import React, { useState } from 'react';
import './App.css';

// Data Definitions exported directly
export const books = [
  { id: 101, bname: 'Master React', price: 670 },
  { id: 102, bname: 'Deep Dive into Angular 11 ', price: 800 },
  { id: 103, bname: 'Mongo Essentials', price: 450 }
];

export const courses = [
  { id: 201, cname: 'Angular', date: '4/5/2021' },
  { id: 202, cname: 'React', date: '6/3/20201' }
];

export const blogs = [
  { id: 301, title: 'React Learning', author: 'Stephen Biz', content: 'Welcome to learning React!' },
  { id: 302, title: 'Installation', author: 'Schewzdenier', content: 'You can install React from npm.' }
];

function App(props) {
  // State variables for interactive conditional rendering toggles
  const [showBooks, setShowBooks] = useState(true);
  const [showBlogs, setShowBlogs] = useState(true);
  const [showCourses, setShowCourses] = useState(true);

  // Extract variables with fallback to local exports if props are not provided
  const booksData = props.books || books;
  const blogsData = props.blogs || blogs;
  const coursesData = props.courses || courses;

  // --- CONDITIONAL RENDERING TECHNIQUE 1: Ternary Operator ---
  // If showBooks is true, map books list; otherwise, display empty state.
  const bookdet = showBooks ? (
    <ul>
      {booksData.map((book) => (
        <div key={book.id}>
          <h3> {book.bname}</h3>
          <h4>{book.price}</h4>
        </div>
      ))}
    </ul>
  ) : (
    <div className="empty-state">Book Details section is currently hidden.</div>
  );

  // --- CONDITIONAL RENDERING TECHNIQUE 2: If-Else Statement ---
  // Assign content conditionally using standard if-else controls.
  let content;
  if (!showBlogs) {
    content = <div className="empty-state">Blog Details section is currently hidden.</div>;
  } else {
    content = (
      <ul>
        {blogsData.map((blog) => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <h5>{blog.author}</h5>
            <p>{blog.content}</p>
          </div>
        ))}
      </ul>
    );
  }

  // --- CONDITIONAL RENDERING TECHNIQUE 3: Logical AND (&&) Operator ---
  // If showCourses is true, evaluate and render the courses list; otherwise renders false.
  const coursedet = showCourses && (
    <ul>
      {coursesData.map((course) => (
        <div key={course.id}>
          <h3>{course.cname}</h3>
          <h4>{course.date}</h4>
        </div>
      ))}
    </ul>
  );

  // Return the main DOM structure matching the visual layout & hints
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Blogger App</h1>
        <p>A hands-on demonstration of list rendering, keys, and conditional rendering techniques in React.</p>
        
        {/* Control Panel demonstrating the toggles */}
        <div className="controls-card">
          <h3>Interactive Toggles (Conditional Rendering Demo)</h3>
          <div className="control-group">
            <button 
              className={`btn-toggle ${showCourses ? 'active' : ''}`}
              onClick={() => setShowCourses(!showCourses)}
            >
              Toggle Course Details (Logical &&)
            </button>
            <button 
              className={`btn-toggle ${showBooks ? 'active' : ''}`}
              onClick={() => setShowBooks(!showBooks)}
            >
              Toggle Book Details (Ternary)
            </button>
            <button 
              className={`btn-toggle ${showBlogs ? 'active' : ''}`}
              onClick={() => setShowBlogs(!showBlogs)}
            >
              Toggle Blog Details (If-Else)
            </button>
          </div>
        </div>
      </header>

      {/* Main columns block, ordered visually by CSS flexbox */}
      <div className="columns-container">
        <div className="st2">
          <h1>Book Details</h1>
          {bookdet}
        </div>
        <div className="v1">
          <h1>Blog Details</h1>
          {content}
        </div>
        <div className="mystyle1">
          <h1>Course Details</h1>
          {coursedet}
        </div>
      </div>
    </div>
  );
}

export default App;
