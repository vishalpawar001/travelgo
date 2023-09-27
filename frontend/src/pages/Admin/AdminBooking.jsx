import React from "react";
import Header from "./Header/Header";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import { Col } from "reactstrap";
import BookingCard from "../../shared/BookingCard";

function AdminBooking() {
  const {
    data: bookings,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/admin/getallbookings`);

  const bookStyle = {
    display: "flex",
    flexWrap:"auto",
    gap:"10px"
  };

  return (
    <div>
    <Header />

    <div style={bookStyle}>
      {loading && <h4>Loading.....</h4>}
      {error && <h4>{error}</h4>}
      {!loading &&
        !error &&
        bookings?.map((tour) => (
          <Col lg="3" md="4" sm="6" className="mb-4" key={tour._id}>
            <BookingCard tour={tour} />
          </Col>
        ))}
    </div>
    </div>
    
  );
}

export default AdminBooking;
