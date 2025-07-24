import RoomAssignmentPage from "@/components/bookings/roomAssignment";

export default function RoomAssignment() {
  // TODO: Replace these with actual values from context, router, or props
  const hotelId = "hotel_123";
  const roomType = "Deluxe";
  const bookingId = "booking_456";

  return (
    <div>
      <RoomAssignmentPage
        hotelId={hotelId}
        roomType={roomType}
        bookingId={bookingId}
      />
    </div>
  );
}
