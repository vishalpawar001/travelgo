import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import "./tour-card.css";
import calculateAvgRating from "../utils/avgRating";
import Header from "../pages/Admin/Header/Header";

const BookingCard = ({ tour }) => {
  const {
    _id,
    userId,
    userEmail,
    tourName,
    fullName,
    guestSize,
    phone,
    bookAt,
  } = tour;

  // const { totalRating, avgRating } = calculateAvgRating(reviews)

  return (
    <>
     <Card>
      <div className="tour__card border border-primary shadow-0">
        <div class="card  ">
          {/* <div class="card-header">{tourName}</div> */}
          <div class="card-body">
            <h5 class="card-title">{fullName} </h5>
            <p class="card-text">
              Tour : {tourName} <br />
              Email: {userEmail} <br />
              No : {guestSize} <br />
              Phone: {phone} <br />
            </p>

            {/* <button type="button" class="btn btn-primary">
              Button
            </button> */}
          </div>
          <div class="card-footer">Date: {bookAt} </div>
        </div>
      </div>
      </Card>
    </>
  );
};

export default BookingCard;
