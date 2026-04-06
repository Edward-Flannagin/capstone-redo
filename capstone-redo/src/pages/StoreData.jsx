import { useState } from "react"
import InformationDetailsForm from "./InformationDetailsForm"
import TableSelectPage from "./TableSelectPage"
import BookingForm from "../BookingForm"
import ReservationReviewOverlay from "../components/ReservationReviewOverlay"

const StoreData = () => {
    const [formData, setFormData] = useState(null)

    return (
        <>
            <InformationDetailsForm onSubmitSuccess={setFormData} />
            <TableSelectPage onSubmitSuccess={setFormData} />
            <BookingForm onSubmitSuccess={setFormData} />
            <ReservationReviewOverlay formData={formData} />
        </>
    )
}