import { render, screen } from '@testing-library/react';
import App from './App';

test('renders blogger app header and column titles', () => {
  render(<App />);
  const headerElement = screen.getByText(/Blogger App/i);
  expect(headerElement).toBeInTheDocument();

  const bookDetailsElement = screen.getByRole('heading', { name: /Book Details/i });
  expect(bookDetailsElement).toBeInTheDocument();

  const blogDetailsElement = screen.getByRole('heading', { name: /Blog Details/i });
  expect(blogDetailsElement).toBeInTheDocument();

  const courseDetailsElement = screen.getByRole('heading', { name: /Course Details/i });
  expect(courseDetailsElement).toBeInTheDocument();
});
