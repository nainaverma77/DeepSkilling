import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Ticket Booking App - Conditional Rendering Lab', () => {
  test('renders guest view by default with "Please sign up." and a Login button', () => {
    render(<App />);
    
    // Greeting
    const greetingElement = screen.getByText(/Please sign up\./i);
    expect(greetingElement).toBeInTheDocument();
    expect(greetingElement.tagName).toBe('H1');

    // Login button
    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();
    
    // Logout button should not exist
    const logoutButton = screen.queryByRole('button', { name: /logout/i });
    expect(logoutButton).not.in.document; // Or expect(logoutButton).toBeNull();
    expect(logoutButton).toBeNull();
  });

  test('displays available flights to guests, but prevents booking', () => {
    render(<App />);
    
    // Check flight details table header
    expect(screen.getByText(/Available Flights/i)).toBeInTheDocument();
    expect(screen.getByText(/AI-101/i)).toBeInTheDocument();
    expect(screen.getByText(/New York \(JFK\)/i)).toBeInTheDocument();

    // Check that guest users see "Login required to book" and no active booking form
    const loginBadges = screen.getAllByText(/Login required to book/i);
    expect(loginBadges.length).toBeGreaterThan(0);
    
    const bookButtons = screen.queryAllByRole('button', { name: /book now/i });
    expect(bookButtons.length).toBe(0);

    // Booking form should not be rendered
    const passengerInput = screen.queryByLabelText(/Passenger Name/i);
    expect(passengerInput).toBeNull();
  });

  test('toggles to logged-in view showing "Welcome back" and Logout button upon Login click', () => {
    render(<App />);
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // Should show Welcome back
    const greetingElement = screen.getByText(/Welcome back/i);
    expect(greetingElement).toBeInTheDocument();

    // Should show Logout button
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    expect(logoutButton).toBeInTheDocument();

    // Login button should be gone
    const loginButtonAfter = screen.queryByRole('button', { name: /login/i });
    expect(loginButtonAfter).toBeNull();
  });

  test('shows Book Now buttons and booking form to logged-in users', () => {
    render(<App />);
    
    // Login
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // Guest badge should not be there anymore
    const loginBadge = screen.queryByText(/Login required to book/i);
    expect(loginBadge).toBeNull();

    // Active Book Now buttons should be present
    const bookButtons = screen.getAllByRole('button', { name: /book now/i });
    expect(bookButtons.length).toBeGreaterThan(0);

    // Booking form should be visible
    const bookingFormTitle = screen.getByText(/Book Flight Ticket/i);
    expect(bookingFormTitle).toBeInTheDocument();
  });

  test('can select flight and submit the booking form successfully', () => {
    render(<App />);
    
    // Login
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // Select flight by clicking the book button of the first flight
    const bookButtons = screen.getAllByRole('button', { name: /book now/i });
    fireEvent.click(bookButtons[0]);

    // Fill passenger name
    const passengerInput = screen.getByLabelText(/Passenger Name/i);
    fireEvent.change(passengerInput, { target: { value: 'John Doe' } });

    // Submit form
    const submitButton = screen.getByRole('button', { name: /Confirm Booking/i });
    fireEvent.click(submitButton);

    // Expect success message
    expect(screen.getByText(/Booking Successful!/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
  });

  test('toggles back to guest view when Logout is clicked', () => {
    render(<App />);
    
    // Login
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // Logout
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);

    // Should return to "Please sign up."
    expect(screen.getByText(/Please sign up\./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /logout/i })).toBeNull();
  });
});
