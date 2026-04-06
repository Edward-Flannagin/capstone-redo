import { useReducer } from 'react';
import BookingForm from '../BookingForm.js';
import { timesReducer, getAvailableTimes } from '../timesReducer.js';

const BookingPage = ({
    reservation,
    setReservation,
    onNext,
    onBack,
    isSaving,
    showTitle = true,
    TopComponent = null,
}) => {
    const [availableTimes, dispatch] = useReducer(
        timesReducer,
        getAvailableTimes(new Date())
    );

    return (
        <section className="booking-page">
            <div className="booking-h1-and-h2">
                <h1 className="booking-header">Make a Reservation</h1>

                {showTitle && (
                    <>
                        <h2 className="booking-h2">Input your desired date, time, & party-size</h2>
                        {TopComponent && <TopComponent />}
                    </>
                )}
            </div>

            <BookingForm
                reservation={reservation}
                setReservation={setReservation}
                onNext={onNext}
                onBack={onBack}
                isSaving={isSaving}
                availableTimes={availableTimes}
            />
        </section>
    );
};

export default BookingPage;