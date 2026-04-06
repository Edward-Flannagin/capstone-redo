import React from "react";
import InformationDetailsForm from "./InformationDetailsForm";

const InformationDetailsPage = ({
  reservation = {},
  setReservation = () => { },
  onNext = () => { },
  onBack = () => { },
  onOpenReview = () => { },
  isSaving = false,
  showTitle = true,
  TopComponent = null,
}) => {
  return (
    <article className="booking-page-info-details">
      <h1 className="info-details-h1">
        Please enter your contact:
      </h1>

      {showTitle && (
        <>
          <h2 className="booking-h2">Please enter your contact information</h2>
          {TopComponent && <TopComponent />}
        </>
      )}

      {/* pass props and callbacks into the form */}
      <InformationDetailsForm
        reservation={reservation}
        setReservation={setReservation}
        onNext={onNext}
        onBack={onBack}
        onOpenReview={onOpenReview}
        isSaving={isSaving}
      />
    </article>
  );
};

export default InformationDetailsPage;