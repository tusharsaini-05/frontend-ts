"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

// Define the Room type as provided in create-booking.tsx
type Room = {
  id: string
  roomNumber: string
  roomType: string
  bedType: string
  pricePerNight: number
  status: string // e.g., "available", "booked", "occupied", "cleaning", "maintenance"
  amenities: string[]
  images: string[]
  isActive: boolean
  createdAt: string
  updatedAt: string
  maintenanceNotes: string
  extraBedAllowed: boolean
  lastMaintained: string
  extraBedPrice: number
  baseOccupancy: number
  maxOccupancy: number
  lastCleaned: string
  floor: number
  hotelId: string
  roomSize: number
  bedCount: number
  isAvailable?: boolean // Optional, derived status
}

interface RoomGridProps {
  hotelId: string
  floorCount: number
  onCreateBooking: (room: Room) => void
}

export default function RoomGrid({ hotelId, floorCount, onCreateBooking }: RoomGridProps) {
  // This is dummy data for demonstration. In a real app, you'd fetch this based on hotelId.
  const [rooms, setRooms] = useState<Room[]>([])

  useEffect(() => {
    // Simulate fetching rooms for the given hotelId
    const fetchRooms = async () => {
      // Replace with actual API call
      const dummyRooms: Room[] = Array.from({ length: floorCount * 5 }).map((_, i) => ({
        id: `room-${hotelId}-${i + 1}`,
        roomNumber: `${Math.floor(i / 5) + 1}0${(i % 5) + 1}`,
        roomType: i % 2 === 0 ? "Standard" : "Deluxe",
        bedType: i % 3 === 0 ? "King" : "Queen",
        pricePerNight: 100 + i * 10,
        status: ["available", "booked", "occupied", "cleaning", "maintenance"][i % 5],
        amenities: ["WiFi", "TV", "AC"],
        images: [],
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        maintenanceNotes: "",
        extraBedAllowed: true,
        lastMaintained: new Date().toISOString(),
        extraBedPrice: 20,
        baseOccupancy: 2,
        maxOccupancy: 4,
        lastCleaned: new Date().toISOString(),
        floor: Math.floor(i / 5) + 1,
        hotelId: hotelId,
        roomSize: 30,
        bedCount: 1,
      }))
      setRooms(dummyRooms)
    }

    if (hotelId) {
      fetchRooms()
    }
  }, [hotelId, floorCount])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "booked":
        return "bg-red-500"
      case "occupied":
        return "bg-red-600"
      case "cleaning":
        return "bg-amber-500"
      case "maintenance":
        return "bg-blue-500"
      default:
        return "bg-gray-400"
    }
  }

  const roomsByFloor: { [key: number]: Room[] } = rooms.reduce(
    (acc, room) => {
      if (!acc[room.floor]) {
        acc[room.floor] = []
      }
      acc[room.floor].push(room)
      return acc
    },
    {} as { [key: number]: Room[] },
  )

  return (
    <div className="grid gap-6">
      {Array.from({ length: floorCount }).map((_, floorIndex) => {
        const floorNumber = floorIndex + 1
        const floorRooms = roomsByFloor[floorNumber] || []
        return (
          <div key={floorNumber} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Floor {floorNumber}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {floorRooms.map((room) => (
                <Card key={room.id} className="flex flex-col justify-between">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{room.roomNumber}</CardTitle>
                    <p className="text-sm text-muted-foreground">{room.roomType}</p>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <span className={cn("w-3 h-3 rounded-full", getStatusColor(room.status))} />
                      <span>{room.status.charAt(0).toUpperCase() + room.status.slice(1)}</span>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Price: ${room.pricePerNight}/night</p>
                      <p>
                        Occupancy: {room.baseOccupancy}-{room.maxOccupancy}
                      </p>
                    </div>
                    <Button
                      className="mt-4 w-full"
                      onClick={() => onCreateBooking(room)}
                      disabled={room.status !== "available"}
                    >
                      Book Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
