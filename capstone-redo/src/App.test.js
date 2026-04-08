import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'; // Provides the toHaveAttribute matcher
import { MemoryRouter as Router } from 'react-router-dom';
import Header from './Header'; // Adjust the import path as necessary
import BookingForm from './BookingForm';
import InformationDetailsForm from './pages/InformationDetailsForm';
import PaymentPage from './pages/PaymentPage';
import { CartProvider } from './context/CartContext';


// TEST THE HEADER LINKS
describe('Header Links', () => {
  test("Makes sure to render all of the header links with accurate href attributes", () => {
    render(
      <Router>
        <CartProvider>
          <Header />
        </CartProvider>
      </Router>
    );
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
    render(<BookingForm availableTimes={["17:00"]} />);
    /* Query elements using getByLabelText and getByRole.
       input elements include: date, time, number of guests,
       and occasion.
    */
    const dateInput = screen.getByLabelText(/choose date/i);
    const timeInput = screen.getByRole("button", { name: /choose time/i });
    const guestsInput = screen.getByLabelText(/number of guests/i);
    const occasionInput = screen.getByLabelText(/occasion/i);
    const submitButton = screen.getByRole("button", { name: /begin my reservation/i });

    expect(dateInput).toBeInTheDocument();
    expect(timeInput).toBeInTheDocument();
    expect(guestsInput).toBeInTheDocument();
    expect(occasionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("renders the booking form with accessible action controls", () => {
    render(<BookingForm availableTimes={["17:00"]} />);

    const submitButton = screen.getByRole('button', { name: /begin my reservation/i });
    expect(submitButton).toBeInTheDocument();
    expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /choose time/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  });
});

describe('InformationDetailsForm validation', () => {
  test('shows validation errors when required fields are missing', async () => {
    const user = userEvent;

    render(<InformationDetailsForm onOpenReview={jest.fn()} />);
    const continueButton = screen.getByRole('button', { name: /review reservation/i });

    await user.click(continueButton);

    expect(await screen.findByText(/please enter your first name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your last name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
  });

  test('shows phone validation when phone contact method is selected', async () => {
    const user = userEvent;

    render(<InformationDetailsForm onOpenReview={jest.fn()} />);
    await user.click(screen.getByRole('radio', { name: /phone/i }));
    await user.click(screen.getByRole('button', { name: /review reservation/i }));

    expect(await screen.findByText(/please enter your phone number/i)).toBeInTheDocument();
  });
});

describe('PaymentPage validation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('validates payment selection and required shipping fields', async () => {
    const user = userEvent;
    const cartItems = [{ id: '1', title: 'Greek Salad', price: '$12.00', quantity: 1 }];
    localStorage.setItem('orderCart', JSON.stringify(cartItems));

    render(
      <Router>
        <PaymentPage />
      </Router>
    );

    const completeButton = screen.getByRole('button', { name: /complete order/i });
    await user.click(completeButton);

    expect(await screen.findByText(/please select a payment method/i)).toBeInTheDocument();

    await user.click(screen.getByLabelText(/credit card/i));
    await user.type(screen.getByPlaceholderText(/^John$/i), 'John');
    await user.type(screen.getByPlaceholderText(/^Doe$/i), 'Doe');
    await user.type(screen.getByPlaceholderText(/john@example.com/i), 'john@example.com');
    await user.type(screen.getByPlaceholderText(/\(555\) 123-4567/i), '5551234567');
    await user.type(screen.getByPlaceholderText(/123 main street/i), '123 Main Street');
    await user.type(screen.getByPlaceholderText(/chicago/i), 'Chicago');
    await user.type(screen.getByPlaceholderText(/il/i), 'IL');
    await user.type(screen.getByPlaceholderText(/60601/i), '60601');

    await user.click(completeButton);
    expect(await screen.findByText(/cardholder name is required/i)).toBeInTheDocument();
  });
});