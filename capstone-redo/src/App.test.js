import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides the toHaveAttribute matcher
import Header from './Header'; // Adjust the import path as necessary
import BookingForm from './BookingForm';


// TEST THE HEADER LINKS
describe('Header Links', () => {
  test("Makes sure to render all of the header links with accurate href attributes", () => {
    render(<Header />)
    // 1. Find links by their accessible name (text content) and role 'link'
    const homeLink = screen.getByRole('link', { name: /home/i });
    const menuLink = screen.getByRole('link', { name: /menu/i });
    const reservationLink = screen.getByRole('link', { name: /reservations/i });
    const orderOnlineLink = screen.getByRole('link', { name: /order online/i });
    const loginLink = screen.getByRole('link', { name: /login/i })
    const aboutLink = screen.getByRole('link', { name: /about us/i })

    // 2. Assert that the links are in the document
    expect(homeLink).toBeInTheDocument();
    expect(menuLink).toBeInTheDocument();
    expect(reservationLink).toBeInTheDocument();
    expect(orderOnlineLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();

    // 3. Assert that the links have the correct 'href' attributes
    expect(homeLink).toHaveAttribute('href', '/');
    expect(menuLink).toHaveAttribute('href', '/menu');
    expect(reservationLink).toHaveAttribute('href', '/reservations');
    expect(orderOnlineLink).toHaveAttribute('href', '/order-online');
    expect(loginLink).toHaveAttribute('href', '/login');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});
/*
  test('another way to get all links and check in a loop', () => {
    render(<Header />);

    // Define expected links and their hrefs
    const expectedLinks = [
      { name: /home/i, href: '/' },
      { name: /menu/i, href: '/menu' },
      { name: /reservations/i, href: '/reservations' },
      { name: /order online/i, href: '/order-online' },
      { name: /login/i, href: '/login' },
      { name: /about us/i, href: '/about' },
    ];

    // Check each link dynamically
    expectedLinks.forEach((linkData) => {
      const linkElement = screen.getByRole('link', { name: linkData.name });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', linkData.href);
    })
  })
});
*/

// TEST THE BOOKING FORM:
describe('Booking form', () => {
  test("Makes sure that the booking form is working properly", () => {
    render(<BookingForm />)
    /* Query elements using getByLabelText and getByRole.
       input elements include: date, time, number of guests,
       and occasion.
       NOTE: there is also a submit button
    */
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeInput = screen.getByLabelText(/choose time/i);
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionInput = screen.getByLabelText(/set the occasion/i);
    const submitButton = screen.getByRole("button", { name: /make your reservation/i });

    // Query that the elements are in the document:
    expect(dateInput).toBeInTheDocument();
    expect(timeInput).toBeInTheDocument();
    expect(guestsInput).toBeInTheDocument();
    expect(occasionInput).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  /*Check the validation logic
    This INCLUDES: invalid number of guests*/
  
  test("shows error message for invalid number of guests", () => {
    render(<BookingForm/>);

    expect(screen.getByRole('button', { name: /make your reservation/i})).toBeDisabled();
  })
})