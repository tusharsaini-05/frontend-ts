// // // // "use client"

// // // // import { useState, useEffect } from "react"
// // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import { Button } from "@/components/ui/button"
// // // // import { RefreshCw, Download } from "lucide-react"
// // // // import { DatePickerWithRange } from "@/components/dashbaord/date-range-picker"
// // // // import { format, subDays } from "date-fns"
// // // // import OverviewMetrics from "@/components/dashbaord/overview-metrics"
// // // // import BookingTrends from "@/components/dashbaord/booking-trends"
// // // // import RoomAnalytics from "@/components/dashbaord/room-analytics"
// // // // import GuestAnalytics from "@/components/dashbaord/guest-analytics"
// // // // import FinancialAnalytics from "@/components/dashbaord/financial-analytics"
// // // // import BookingTable from "@/components/dashbaord/booking-table"
// // // // import { useHotelContext } from "@/providers/hotel-provider"
// // // // import { useSession } from "next-auth/react"
// // // // import { DateRange } from "react-day-picker"

// // // // // Define TypeScript interfaces for the data structures
// // // // interface Guest {
// // // //   firstName: string
// // // //   lastName: string
// // // //   email: string
// // // //   address?: string
// // // //   specialRequests?: string
// // // // }

// // // // interface Payment {
// // // //   amount: number
// // // //   status: string
// // // //   transactionId: string
// // // //   transactionDate: string
// // // // }

// // // // interface RoomCharge {
// // // //   amount: number
// // // //   chargeDate: string
// // // //   notes?: string
// // // //   description?: string
// // // // }

// // // // interface Booking {
// // // //   id: string
// // // //   roomId: string
// // // //   bookingNumber: string
// // // //   guest: Guest
// // // //   bookingSource?: string
// // // //   checkInDate: string
// // // //   checkOutDate: string
// // // //   roomType: string
// // // //   bookingStatus: string
// // // //   paymentStatus?: string
// // // //   totalAmount: number
// // // //   numberOfRooms?: number
// // // //   numberOfGuests?: number
// // // //   ratePlan?: string
// // // //   baseAmount?: number
// // // //   taxAmount?: number
// // // //   payments?: Payment[]
// // // //   roomCharges?: RoomCharge[]
// // // //   cancellationDate?: string
// // // //   checkInTime?: string
// // // //   createdAt: string
// // // //   updatedBy?: string
// // // //   updatedAt: string
// // // // }

// // // // interface Room {
// // // //   id: string
// // // //   roomNumber: string
// // // //   roomType: string
// // // //   bedType: string
// // // //   pricePerNight: number
// // // //   status: string
// // // //   amenities: string[]
// // // //   images: string[]
// // // //   isActive: boolean
// // // //   createdAt: string
// // // //   updatedAt: string
// // // //   maxOccupancy: number
// // // //   baseOccupancy: number
// // // //   extraBedPrice?: number
// // // //   extraBedAllowed: boolean
// // // //   maintenanceNotes?: string
// // // //   lastCleaned?: string
// // // //   bedCount: number
// // // //   description?: string
// // // //   isSmoking: boolean
// // // //   floor?: number
// // // // }

// // // // interface Policy {
// // // //   checkInTime: string
// // // //   checkOutTime: string
// // // //   petPolicy?: string
// // // // }

// // // // interface Hotel {
// // // //   id: string
// // // //   name: string
// // // //   description: string
// // // //   status: string
// // // //   amenities: string[]
// // // //   policies: Policy
// // // //   images: string[]
// // // //   createdAt: string
// // // //   updatedAt: string
// // // //   address: string
// // // //   state: string
// // // //   contactPhone: string
// // // //   contactEmail: string
// // // //   starRating: number
// // // //   floorCount: number
// // // //   roomCount: number
// // // //   city: string
// // // //   country: string
// // // //   website?: string
// // // // }

// // // // interface ChartDataItem {
// // // //   name: string
// // // //   value: number
// // // // }

// // // // interface TrendDataItem {
// // // //   date: string
// // // //   bookings?: number
// // // //   revenue?: number
// // // //   occupancy?: number
// // // // }

// // // // interface GuestItem {
// // // //   name: string
// // // //   email: string
// // // //   bookings: number
// // // //   totalSpent: number
// // // // }

// // // // interface OverviewMetrics {
// // // //   totalBookings: number
// // // //   totalBookingsChange: number
// // // //   occupancyRate: number
// // // //   occupancyRateChange: number
// // // //   totalRevenue: number
// // // //   totalRevenueChange: number
// // // //   averageDailyRate: number
// // // //   averageDailyRateChange: number
// // // //   revPAR: number
// // // //   totalGuests: number
// // // //   totalRooms: number
// // // // }

// // // // interface DashboardData {
// // // //   overview: OverviewMetrics
// // // //   recentBookings: Booking[]
// // // //   roomTypeDistribution: ChartDataItem[]
// // // //   bookingTrends: TrendDataItem[]
// // // //   bookingSources: ChartDataItem[]
// // // //   bookingStatus: ChartDataItem[]
// // // //   roomStatus: ChartDataItem[]
// // // //   roomTypePerformance: ChartDataItem[]
// // // //   floorOccupancy: ChartDataItem[]
// // // //   occupancyTimeline: TrendDataItem[]
// // // //   guestTypes: ChartDataItem[]
// // // //   stayDuration: ChartDataItem[]
// // // //   guestSatisfaction: ChartDataItem[]
// // // //   topGuests: GuestItem[]
// // // //   guestDemographics: ChartDataItem[]
// // // //   revenueTrends: TrendDataItem[]
// // // //   revenueByRoomType: ChartDataItem[]
// // // //   paymentMethods: ChartDataItem[]
// // // // }

// // // // interface GraphQLResponse<T> {
// // // //   data?: T
// // // //   errors?: Array<{
// // // //     message: string
// // // //   }>
// // // // }

// // // // interface HotelResponse {
// // // //   hotel: {
// // // //     getHotels: Hotel[]
// // // //   }
// // // // }

// // // // interface RoomsResponse {
// // // //   rooms: Room[]
// // // // }

// // // // interface BookingsResponse {
// // // //   bookings: Booking[]
// // // // }

// // // // interface SelectedHotel {
// // // //   id: string
// // // //   [key: string]: any
// // // // }

// // // // interface Session {
// // // //   user?: {
// // // //     id?: string
// // // //     role?:UserRole
// // // //   }
// // // //   accessToken?: string
// // // //   [key: string]: any
// // // // }
// // // // enum UserRole {
// // // //   SUPERADMIN = "superadmin",
// // // //   HOTEL_ADMIN = "hotel_admin",
// // // //   STAFF = "staff",
// // // //   RECEPTIONIST = "receptionist",
// // // //   HOUSEKEEPER = "housekeeper",
// // // //   MAINTENANCE = "maintenance"
// // // // }

// // // // export default function HotelDashboard() {
// // // //   const [activeTab, setActiveTab] = useState<string>("overview")
// // // //   const [isLoading, setIsLoading] = useState<boolean>(true)
// // // //   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
// // // //   const [dateRange, setDateRange] = useState<DateRange>({
// // // //     from: subDays(new Date(), 30),
// // // //     to: new Date(),
// // // //   })

// // // //   const { selectedHotel } = useHotelContext() 
// // // //   const { data: session } = useSession()
// // // //   const adminId = session?.user?.id
// // // //   const role = session?.user?.role

// // // //   // GraphQL endpoint - adjust based on your environment
// // // //   const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:8000/graphql'

// // // //   // Extract fetchDashboardData as a reusable function outside useEffect
// // // //   const fetchDashboardData = async (forceRefresh = false): Promise<void> => {
// // // //     if (!selectedHotel?.id || !adminId) return
// // // //     if (!dateRange.from || !dateRange.to) return
    
// // // //     setIsLoading(true)
// // // //     try {
// // // //       // Add cache-busting parameter when forceRefresh is true
// // // //       const cacheBuster = forceRefresh ? `?refresh=${Date.now()}` : ''
// // // //       const fetchEndpoint = `${endpoint}${cacheBuster}`
      
// // // //       // Fetch hotel details
// // // //       const hotelResponse = await fetch(fetchEndpoint, {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //           "Authorization": `Bearer ${(session as any)?.accessToken || ''}`,
// // // //           // Add cache control headers for refresh
// // // //           ...(forceRefresh ? {
// // // //             'Cache-Control': 'no-cache, no-store, must-revalidate',
// // // //             'Pragma': 'no-cache',
// // // //             'Expires': '0'
// // // //           } : {})
// // // //         },
// // // //         body: JSON.stringify({
// // // //           query: `
// // // //             query GetHotelDetails($adminId: String!) {
// // // //               hotel {
// // // //                 getHotels(adminId: $adminId) {
// // // //                   id
// // // //                   name
// // // //                   description
// // // //                   status
// // // //                   amenities
// // // //                   policies {
// // // //                     checkInTime
// // // //                     checkOutTime
// // // //                     petPolicy
// // // //                   }
// // // //                   images
// // // //                   createdAt
// // // //                   updatedAt
// // // //                   address
// // // //                   state
// // // //                   contactPhone
// // // //                   contactEmail
// // // //                   starRating
// // // //                   floorCount
// // // //                   roomCount
// // // //                   city
// // // //                   country
// // // //                   website
// // // //                   description
// // // //                 }
// // // //               }
// // // //             }
// // // //           `,
// // // //           variables: { adminId }
// // // //         }),
// // // //       })
      
// // // //       const hotelResult: GraphQLResponse<HotelResponse> = await hotelResponse.json()
      
// // // //       if (hotelResult.errors) {
// // // //         throw new Error(hotelResult.errors[0].message || "Failed to fetch hotels")
// // // //       }
      
// // // //       // Fetch rooms data
// // // //       const roomsResponse = await fetch(fetchEndpoint, {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //           "Authorization": `Bearer ${(session as any)?.accessToken || ''}`,
// // // //           ...(forceRefresh ? {
// // // //             'Cache-Control': 'no-cache, no-store, must-revalidate',
// // // //             'Pragma': 'no-cache',
// // // //             'Expires': '0'
// // // //           } : {})
// // // //         },
// // // //         body: JSON.stringify({
// // // //           query: `
// // // //             query GetRooms($hotelId: String!) {
// // // //               rooms(hotelId: $hotelId) {
// // // //                 id
// // // //                 roomNumber
// // // //                 roomType
// // // //                 bedType
// // // //                 pricePerNight
// // // //                 status
// // // //                 amenities
// // // //                 images
// // // //                 isActive
// // // //                 createdAt
// // // //                 updatedAt
// // // //                 maxOccupancy
// // // //                 baseOccupancy
// // // //                 extraBedPrice
// // // //                 extraBedAllowed
// // // //                 maintenanceNotes
// // // //                 lastCleaned
// // // //                 bedCount
// // // //                 pricePerNight
// // // //                 description
// // // //                 isSmoking
// // // //                 floor
// // // //               }
// // // //             }
// // // //           `,
// // // //           variables: { hotelId: selectedHotel.id }
// // // //         }),
// // // //       })
      
// // // //       const roomsResult: GraphQLResponse<RoomsResponse> = await roomsResponse.json()
      
// // // //       if (roomsResult.errors) {
// // // //         throw new Error(roomsResult.errors[0].message || "Failed to fetch rooms")
// // // //       }
      
// // // //       // Fetch bookings data
// // // //       const bookingsResponse = await fetch(fetchEndpoint, {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //           "Authorization": `Bearer ${(session as any)?.accessToken || ''}`,
// // // //           ...(forceRefresh ? {
// // // //             'Cache-Control': 'no-cache, no-store, must-revalidate',
// // // //             'Pragma': 'no-cache',
// // // //             'Expires': '0'
// // // //           } : {})
// // // //         },
// // // //         body: JSON.stringify({
// // // //           query: `
// // // //             query GetBookings($hotelId: String!) {
// // // //               bookings(hotelId: $hotelId) {
// // // //                 id
// // // //                 roomId
// // // //                 bookingNumber
// // // //                 guest {
// // // //                   firstName
// // // //                   lastName
// // // //                   email
// // // //                   address
// // // //                   specialRequests
// // // //                 }
// // // //                 bookingSource
// // // //                 checkInDate
// // // //                 checkOutDate
// // // //                 roomType
// // // //                 bookingStatus
// // // //                 paymentStatus
// // // //                 totalAmount
// // // //                 numberOfRooms
// // // //                 numberOfGuests
// // // //                 ratePlan
// // // //                 baseAmount
// // // //                 taxAmount
// // // //                 paymentStatus
// // // //                 payments {
// // // //                   amount
// // // //                   status
// // // //                   transactionId
// // // //                   transactionDate
// // // //                 }
// // // //                 roomCharges {
// // // //                   amount
// // // //                   chargeDate
// // // //                   notes
// // // //                   description
// // // //                 }
// // // //                 cancellationDate
// // // //                 checkInTime
// // // //                 createdAt
// // // //                 updatedBy
// // // //                 updatedAt
// // // //               }
// // // //             }
// // // //           `,
// // // //           variables: { hotelId: selectedHotel.id }
// // // //         }),
// // // //       })
      
// // // //       const bookingsResult: GraphQLResponse<BookingsResponse> = await bookingsResponse.json()
      
// // // //       if (bookingsResult.errors) {
// // // //         throw new Error(bookingsResult.errors[0].message || "Failed to fetch bookings")
// // // //       }
      
// // // //       // Process the data to match our dashboard structure
// // // //       const processedData = processGraphQLData(
// // // //         hotelResult.data!, 
// // // //         roomsResult.data!, 
// // // //         bookingsResult.data!, 
// // // //         dateRange
// // // //       )
      
// // // //       setDashboardData(processedData)
// // // //     } catch (error) {
// // // //       console.error(`Error ${forceRefresh ? 'refreshing' : 'fetching'} dashboard data:`, error)
// // // //     } finally {
// // // //       setIsLoading(false)
// // // //     }
// // // //   }

// // // //   useEffect(() => {
// // // //     fetchDashboardData()
// // // //   }, [selectedHotel?.id, adminId, dateRange, endpoint, session])

// // // //   // Updated handleRefresh function uses the fetchDashboardData function with a force refresh parameter
// // // //   const handleRefresh = (): void => {
// // // //     fetchDashboardData(true) // Force refresh by setting parameter to true
// // // //   }

// // // //   const handleExportData = (): void => {
// // // //     // In a real app, this would generate and download a CSV/Excel file
// // // //     if (!dashboardData) return
    
// // // //     const bookingsData = dashboardData.recentBookings.map(booking => ({
// // // //       bookingNumber: booking.bookingNumber,
// // // //       guestName: `${booking.guest.firstName} ${booking.guest.lastName}`,
// // // //       email: booking.guest.email,
// // // //       checkIn: booking.checkInDate,
// // // //       checkOut: booking.checkOutDate,
// // // //       roomType: booking.roomType,
// // // //       status: booking.bookingStatus,
// // // //       amount: booking.totalAmount
// // // //     }))
    
// // // //     // Convert to CSV
// // // //     const headers = Object.keys(bookingsData[0] || {}).join(',')
// // // //     const rows = bookingsData.map(booking => 
// // // //       Object.values(booking).map(value => 
// // // //         typeof value === 'string' ? `"${value}"` : value
// // // //       ).join(',')
// // // //     ).join('\n')
    
// // // //     const csv = `${headers}\n${rows}`
    
// // // //     // Create a download link
// // // //     const blob = new Blob([csv], { type: 'text/csv' })
// // // //     const url = URL.createObjectURL(blob)
// // // //     const a = document.createElement('a')
// // // //     a.setAttribute('hidden', '')
// // // //     a.setAttribute('href', url)
// // // //     a.setAttribute('download', 'hotel_bookings.csv')
// // // //     document.body.appendChild(a)
// // // //     a.click()
// // // //     document.body.removeChild(a)
    
// // // //     console.log("Exporting dashboard data...")
// // // //   }

// // // //   // Handler for date range picker changes
// // // //   const handleDateRangeChange = (newDateRange: DateRange | undefined): void => {
// // // //     if (newDateRange && newDateRange.from && newDateRange.to) {
// // // //       setDateRange(newDateRange);
// // // //     }
// // // //   }

// // // //   // Process GraphQL data to match the dashboard structure
// // // //   const processGraphQLData = (
// // // //     hotelResponse: HotelResponse, 
// // // //     roomsResponse: RoomsResponse, 
// // // //     bookingsResponse: BookingsResponse,
// // // //     dateRange: DateRange
// // // //   ): DashboardData => {
// // // //     if (!dateRange.from || !dateRange.to) {
// // // //       throw new Error("Invalid date range")
// // // //     }

// // // //     const userRole= session?.user?.role 
    
    
// // // //     const  hotel = userRole === "SUPERADMIN" ?  hotelResponse.hotel.getHotels.find(h => h.id === selectedHotel?.id) || 
// // // //                   hotelResponse.hotel.getHotels[0] : selectedHotel
  
// // // //     const rooms = roomsResponse.rooms || []
// // // //     const bookings = bookingsResponse.bookings || []
    
// // // //     // Filter bookings by date range
// // // //     const filteredBookings = bookings.filter(booking => {
// // // //       const checkInDate = new Date(booking.checkInDate)
// // // //       return checkInDate >= dateRange.from! && checkInDate <= dateRange.to!
// // // //     })
    
// // // //     // Calculate metrics for overview
// // // //     const totalBookings = filteredBookings.length
    
// // // //     // For comparison with previous period, get bookings from prior period of same length
// // // //     const previousPeriodStart = subDays(dateRange.from, dateRange.to.getTime() - dateRange.from.getTime())
// // // //     const previousPeriodEnd = subDays(dateRange.from, 1)
    
// // // //     const previousPeriodBookings = bookings.filter(booking => {
// // // //       const checkInDate = new Date(booking.checkInDate)
// // // //       return checkInDate >= previousPeriodStart && checkInDate <= previousPeriodEnd
// // // //     })
    
// // // //     const previousTotalBookings = previousPeriodBookings.length
// // // //     const totalBookingsChange = previousTotalBookings 
// // // //       ? ((totalBookings - previousTotalBookings) / previousTotalBookings) * 100 
// // // //       : 0
    
// // // //     // Calculate total revenue
// // // //     const totalRevenue = filteredBookings.reduce((sum, booking) => 
// // // //       sum + (Number(booking.totalAmount) || 0), 0)
    
// // // //     const previousTotalRevenue = previousPeriodBookings.reduce((sum, booking) => 
// // // //       sum + (Number(booking.totalAmount) || 0), 0)
    
// // // //     const totalRevenueChange = previousTotalRevenue 
// // // //       ? ((totalRevenue - previousTotalRevenue) / previousTotalRevenue) * 100 
// // // //       : 0
    
// // // //     // Calculate occupancy
// // // //     const activeRooms = rooms.filter(room => room.isActive).length
// // // //     const occupiedRooms = new Set(filteredBookings.map(booking => booking.roomId)).size
// // // //     const occupancyRate = activeRooms ? Math.round((occupiedRooms / activeRooms) * 100) : 0
    
// // // //     // Calculate average daily rate (ADR)
// // // //     const totalNights = filteredBookings.reduce((sum, booking) => {
// // // //       const checkIn = new Date(booking.checkInDate)
// // // //       const checkOut = new Date(booking.checkOutDate)
// // // //       const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
// // // //       return sum + (nights > 0 ? nights : 1)
// // // //     }, 0)
    
// // // //     const averageDailyRate = totalNights ? Math.round(totalRevenue / totalNights) : 0
    
// // // //     // RevPAR (Revenue Per Available Room)
// // // //     const totalRoomNights = activeRooms * Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
// // // //     const revPAR = totalRoomNights ? Math.round(totalRevenue / totalRoomNights) : 0
    
// // // //     // Room type distribution
// // // //     const roomTypeDistribution = rooms.reduce<ChartDataItem[]>((acc, room) => {
// // // //       const type = room.roomType
// // // //       if (!acc.find(item => item.name === type)) {
// // // //         acc.push({ name: type, value: 1 })
// // // //       } else {
// // // //         const index = acc.findIndex(item => item.name === type)
// // // //         acc[index].value += 1
// // // //       }
// // // //       return acc
// // // //     }, [])
    
// // // //     // Booking source distribution
// // // //     const bookingSources = filteredBookings.reduce<ChartDataItem[]>((acc, booking) => {
// // // //       const source = booking.bookingSource || 'Direct'
// // // //       if (!acc.find(item => item.name === source)) {
// // // //         acc.push({ name: source, value: 1 })
// // // //       } else {
// // // //         const index = acc.findIndex(item => item.name === source)
// // // //         acc[index].value += 1
// // // //       }
// // // //       return acc
// // // //     }, [])
    
// // // //     // Booking status distribution
// // // //     const bookingStatus = filteredBookings.reduce<ChartDataItem[]>((acc, booking) => {
// // // //       const status = booking.bookingStatus
// // // //       if (!acc.find(item => item.name === status)) {
// // // //         acc.push({ name: status, value: 1 })
// // // //       } else {
// // // //         const index = acc.findIndex(item => item.name === status)
// // // //         acc[index].value += 1
// // // //       }
// // // //       return acc
// // // //     }, [])
    
// // // //     // Booking trends over time (daily)
// // // //     const bookingsByDate: Record<string, { count: number, revenue: number }> = filteredBookings.reduce((acc, booking) => {
// // // //       const date = format(new Date(booking.checkInDate), 'yyyy-MM-dd')
// // // //       if (!acc[date]) {
// // // //         acc[date] = { count: 0, revenue: 0 }
// // // //       }
// // // //       acc[date].count += 1
// // // //       acc[date].revenue += Number(booking.totalAmount) || 0
// // // //       return acc
// // // //     }, {} as Record<string, { count: number, revenue: number }>)
    
// // // //     const bookingTrends = Object.keys(bookingsByDate).map(date => ({
// // // //       date: format(new Date(date), 'MMM dd'),
// // // //       bookings: bookingsByDate[date].count,
// // // //       revenue: bookingsByDate[date].revenue
// // // //     })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
// // // //     // Revenue by room type
// // // //     const revenueByRoomType = filteredBookings.reduce<ChartDataItem[]>((acc, booking) => {
// // // //       const type = booking.roomType
// // // //       if (!acc.find(item => item.name === type)) {
// // // //         acc.push({ name: type, value: Number(booking.totalAmount) || 0 })
// // // //       } else {
// // // //         const index = acc.findIndex(item => item.name === type)
// // // //         acc[index].value += Number(booking.totalAmount) || 0
// // // //       }
// // // //       return acc
// // // //     }, [])
    
// // // //     // Calculate total guests
// // // //     const totalGuests = filteredBookings.reduce((sum, booking) => 
// // // //       sum + (Number(booking.numberOfGuests) || 1), 0)
    
// // // //     // Calculate guest types (new vs returning)
// // // //     const guestEmails = filteredBookings.map(b => b.guest.email)
// // // //     const uniqueGuests = new Set(guestEmails)
// // // //     const newGuests = uniqueGuests.size
// // // //     const returningGuests = guestEmails.length - newGuests
    
// // // //     const guestTypes = [
// // // //       { name: 'New', value: newGuests },
// // // //       { name: 'Returning', value: returningGuests > 0 ? returningGuests : 0 }
// // // //     ]
    
// // // //     // Guest satisfaction (mock data since we don't have ratings in the schema)
// // // //     const guestSatisfaction = [
// // // //       { name: '5 Stars', value: Math.round(filteredBookings.length * 0.6) },
// // // //       { name: '4 Stars', value: Math.round(filteredBookings.length * 0.3) },
// // // //       { name: '3 Stars', value: Math.round(filteredBookings.length * 0.07) },
// // // //       { name: '2 Stars', value: Math.round(filteredBookings.length * 0.02) },
// // // //       { name: '1 Star', value: Math.round(filteredBookings.length * 0.01) },
// // // //     ]
    
// // // //     // Guest demographics (mock data)
// // // //     const guestDemographics = [
// // // //       { name: 'United States', value: Math.round(filteredBookings.length * 0.4) },
// // // //       { name: 'Canada', value: Math.round(filteredBookings.length * 0.15) },
// // // //       { name: 'United Kingdom', value: Math.round(filteredBookings.length * 0.12) },
// // // //       { name: 'Australia', value: Math.round(filteredBookings.length * 0.08) },
// // // //       { name: 'Germany', value: Math.round(filteredBookings.length * 0.05) },
// // // //       { name: 'Other', value: Math.round(filteredBookings.length * 0.2) },
// // // //     ]
    
// // // //     // Room status
// // // //     const roomStatus = [
// // // //       { name: 'Available', value: rooms.filter(r => r.status === 'AVAILABLE').length },
// // // //       { name: 'Occupied', value: rooms.filter(r => r.status === 'OCCUPIED').length },
// // // //       { name: 'Maintenance', value: rooms.filter(r => r.status === 'MAINTENANCE').length },
// // // //       { name: 'Cleaning', value: rooms.filter(r => r.status === 'CLEANING').length },
// // // //     ]
    
// // // //     // Room type performance
// // // //     const roomTypePerformance = roomTypeDistribution.map(type => {
// // // //       const typeBookings = filteredBookings.filter(b => b.roomType === type.name)
// // // //       return {
// // // //         name: type.name,
// // // //         value: typeBookings.length
// // // //       }
// // // //     })
    
// // // //     // Generate data for floor occupancy (heatmap)
// // // //     const floorOccupancy: ChartDataItem[] = []
// // // //     for (let i = 1; i <= (hotel?.floorCount || 4); i++) {
// // // //       // If we have floor data, use it instead of random values
// // // //       const floorRooms = rooms.filter(r => r.floor === i)
// // // //       const occupiedFloorRooms = floorRooms.filter(r => r.status === 'OCCUPIED')
// // // //       const floorOccupancyRate = floorRooms.length > 0 
// // // //         ? Math.round((occupiedFloorRooms.length / floorRooms.length) * 100) 
// // // //         : Math.floor(Math.random() * 100)
      
// // // //       floorOccupancy.push({
// // // //         name: `Floor ${i}`,
// // // //         value: floorOccupancyRate
// // // //       })
// // // //     }
    
// // // //     // Generate data for occupancy timeline
// // // //     const occupancyTimeline: TrendDataItem[] = []
// // // //     const currentDate = new Date(dateRange.from)
// // // //     while (currentDate <= dateRange.to) {
// // // //       const dateStr = format(currentDate, 'yyyy-MM-dd')
// // // //       const dateBookings = filteredBookings.filter(b => {
// // // //         try {
// // // //           const checkIn = new Date(b.checkInDate)
// // // //           const checkOut = new Date(b.checkOutDate)
// // // //           return currentDate >= checkIn && currentDate <= checkOut
// // // //         } catch (e) {
// // // //           return false
// // // //         }
// // // //       })
      
// // // //       const dayOccupancyRate = activeRooms > 0 
// // // //         ? Math.round((dateBookings.length / activeRooms) * 100) 
// // // //         : Math.floor(Math.random() * 100)
        
// // // //       occupancyTimeline.push({
// // // //         date: format(currentDate, 'MMM dd'),
// // // //         occupancy: dayOccupancyRate
// // // //       })
      
// // // //       currentDate.setDate(currentDate.getDate() + 1)
// // // //     }
    
// // // //     // Payment methods (mock data)
// // // //     const paymentMethods = [
// // // //       { name: 'Credit Card', value: Math.round(filteredBookings.length * 0.7) },
// // // //       { name: 'Debit Card', value: Math.round(filteredBookings.length * 0.15) },
// // // //       { name: 'PayPal', value: Math.round(filteredBookings.length * 0.1) },
// // // //       { name: 'Cash', value: Math.round(filteredBookings.length * 0.05) },
// // // //     ]
    
// // // //     // Revenue trends over time
// // // //     const revenueTrends = bookingTrends.map(day => ({
// // // //       date: day.date,
// // // //       revenue: day.revenue
// // // //     }))
    
// // // //     // Create guest stats with proper counting of bookings per email
// // // //     const guestBookingCount: Record<string, number> = {}
// // // //     const guestSpending: Record<string, number> = {}
// // // //     const guestNames: Record<string, string> = {}
    
// // // //     filteredBookings.forEach(booking => {
// // // //       if (booking.guest?.email) {
// // // //         const email = booking.guest.email
// // // //         guestBookingCount[email] = (guestBookingCount[email] || 0) + 1
// // // //         guestSpending[email] = (guestSpending[email] || 0) + (Number(booking.totalAmount) || 0)
// // // //         guestNames[email] = `${booking.guest.firstName || ''} ${booking.guest.lastName || ''}`.trim()
// // // //       }
// // // //     })
    
// // // //     const topGuests: GuestItem[] = Object.keys(guestBookingCount).map(email => ({
// // // //       name: guestNames[email] || 'Guest',
// // // //       email: email,
// // // //       bookings: guestBookingCount[email],
// // // //       totalSpent: guestSpending[email]
// // // //     })).sort((a, b) => b.totalSpent - a.totalSpent).slice(0, 10)
    
// // // //     // Calculate average stay duration for real data
// // // //     const stayDuration = [
// // // //       { name: '1-3 days', value: Math.round(filteredBookings.length * 0.6) },
// // // //       { name: '4-7 days', value: Math.round(filteredBookings.length * 0.3) },
// // // //       { name: '8-14 days', value: Math.round(filteredBookings.length * 0.07) },
// // // //       { name: '15+ days', value: Math.round(filteredBookings.length * 0.03) },
// // // //     ]
    
// // // //     return {
// // // //       overview: {
// // // //         totalBookings,
// // // //         totalBookingsChange: Math.round(totalBookingsChange),
// // // //         occupancyRate,
// // // //         occupancyRateChange: 0, // Mock value
// // // //         totalRevenue,
// // // //         totalRevenueChange: Math.round(totalRevenueChange),
// // // //         averageDailyRate,
// // // //         averageDailyRateChange: 0, // Mock value
// // // //         revPAR,
// // // //         totalGuests,
// // // //         totalRooms: hotel?.roomCount || rooms.length
// // // //       },
// // // //       recentBookings: filteredBookings,
// // // //       roomTypeDistribution,
// // // //       bookingTrends,
// // // //       bookingSources,
// // // //       bookingStatus,
// // // //       roomStatus,
// // // //       roomTypePerformance,
// // // //       floorOccupancy,
// // // //       occupancyTimeline,
// // // //       guestTypes,
// // // //       stayDuration,
// // // //       guestSatisfaction,
// // // //       topGuests,
// // // //       guestDemographics,
// // // //       revenueTrends,
// // // //       revenueByRoomType,
// // // //       paymentMethods
// // // //     }
// // // //   }

// // // //   return (
// // // //     <div className="container mx-auto p-6">
// // // //       <div className="flex justify-between items-center mb-6">
// // // //         <div>
// // // //           <h1 className="text-3xl font-bold tracking-tight">Hotel Analytics Dashboard</h1>
// // // //           <p className="text-muted-foreground mt-1">Comprehensive analytics for bookings, rooms, and revenue</p>
// // // //         </div>
// // // //         <div className="flex items-center gap-2">
// // // //           <DatePickerWithRange date={dateRange} setDate={handleDateRangeChange} />
// // // //           <Button variant="outline" size="icon" onClick={handleRefresh}>
// // // //             <RefreshCw className="h-4 w-4" />
// // // //           </Button>
// // // //           <Button variant="outline" size="icon" onClick={handleExportData}>
// // // //             <Download className="h-4 w-4" />
// // // //           </Button>
// // // //         </div>
// // // //       </div>

// // // //       <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
// // // //         <TabsList className="grid grid-cols-5 w-full">
// // // //           <TabsTrigger value="overview">Overview</TabsTrigger>
// // // //           <TabsTrigger value="bookings">Booking Trends</TabsTrigger>
// // // //           <TabsTrigger value="rooms">Room Analytics</TabsTrigger>
// // // //           <TabsTrigger value="guests">Guest Analytics</TabsTrigger>
// // // //           <TabsTrigger value="financial">Financial</TabsTrigger>
// // // //         </TabsList>

// // // //         <TabsContent value="overview" className="space-y-4">
// // // //           {dashboardData && <OverviewMetrics data={dashboardData.overview} isLoading={isLoading} />}

// // // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //             {dashboardData && (
// // // //               <>
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Recent Bookings</CardTitle>
// // // //                     <CardDescription>Last 10 bookings across all properties</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <BookingTable bookings={dashboardData.recentBookings.slice(0, 5)} isLoading={isLoading} />
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Room Type Distribution</CardTitle>
// // // //                     <CardDescription>Bookings by room type</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="h-[300px]">
// // // //                     {dashboardData && (
// // // //                       <RoomAnalytics data={dashboardData.roomTypeDistribution} isLoading={isLoading} chartType="pie" />
// // // //                     )}
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </>
// // // //             )}
// // // //           </div>
// // // //         </TabsContent>

// // // //         <TabsContent value="bookings" className="space-y-4">
// // // //           {dashboardData && (
// // // //             <>
// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle>Booking Trends</CardTitle>
// // // //                   <CardDescription>
// // // //                     Booking patterns over time ({dateRange.from ? format(dateRange.from, "MMM d, yyyy") : ""} -{" "}
// // // //                     {dateRange.to ? format(dateRange.to, "MMM d, yyyy") : ""})
// // // //                   </CardDescription>
// // // //                 </CardHeader>
// // // //                 <CardContent className="h-[400px]">
// // // //                   <BookingTrends data={dashboardData.bookingTrends} isLoading={isLoading} />
// // // //                 </CardContent>
// // // //               </Card>

// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Booking Sources</CardTitle>
// // // //                     <CardDescription>Where bookings are coming from</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="h-[300px]">
// // // //                     <BookingTrends data={dashboardData.bookingSources} isLoading={isLoading} chartType="pie" />
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Booking Status</CardTitle>
// // // //                     <CardDescription>Current status of all bookings</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="h-[300px]">
// // // //                     <BookingTrends data={dashboardData.bookingStatus} isLoading={isLoading} chartType="bar" />
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </div>

// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle>All Bookings</CardTitle>
// // // //                   <CardDescription>Detailed list of all bookings in the selected date range</CardDescription>
// // // //                 </CardHeader>
// // // //                 <CardContent>
// // // //                   <BookingTable bookings={dashboardData.recentBookings} isLoading={isLoading} isExpandable={true} />
// // // //                 </CardContent>
// // // //               </Card>
// // // //             </>
// // // //           )}
// // // //         </TabsContent>

// // // //         <TabsContent value="rooms" className="space-y-4">
// // // //           {dashboardData && (
// // // //             <>
// // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Room Occupancy</CardTitle>
// // // //                     <CardDescription>Current occupancy rate</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="flex flex-col items-center justify-center h-[200px]">
// // // //                       <div className="text-5xl font-bold">{dashboardData.overview.occupancyRate}%</div>
// // // //                       <p className="text-muted-foreground">Occupancy Rate</p>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Room Type Performance</CardTitle>
// // // //                     <CardDescription>Most booked room types</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="h-[200px]">
// // // //                     <RoomAnalytics data={dashboardData.roomTypePerformance} isLoading={isLoading} chartType="bar" />
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Room Status</CardTitle>
// // // //                     <CardDescription>Current status of all rooms</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="h-[200px]">
// // // //                     <RoomAnalytics data={dashboardData.roomStatus} isLoading={isLoading} chartType="pie" />
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </div>

// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle>Floor Occupancy</CardTitle>
// // // //                   <CardDescription>Room occupancy by floor</CardDescription>
// // // //                 </CardHeader>
// // // //                 <CardContent className="h-[400px]">
// // // //                   <RoomAnalytics data={dashboardData.floorOccupancy} isLoading={isLoading} chartType="heatmap" />
// // // //                 </CardContent>
// // // //               </Card>

// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle>Room Occupancy Timeline</CardTitle>
// // // //                   <CardDescription>Occupancy rate over time</CardDescription>
// // // //                 </CardHeader>
// // // //                 <CardContent className="h-[300px]">
// // // //                   <RoomAnalytics data={dashboardData.occupancyTimeline} isLoading={isLoading} chartType="line" />
// // // //                 </CardContent>
// // // //               </Card>
// // // //             </>
// // // //           )}
// // // //         </TabsContent>

// // // //         <TabsContent value="guests" className="space-y-4">
// // // //           {dashboardData && (
// // // //             <>
// // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Guest Types</CardTitle>
// // // //                     <CardDescription>New vs. returning guests</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="h-[250px]">
// // // //                     <GuestAnalytics data={dashboardData.guestTypes} isLoading={isLoading} chartType="pie" />
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Average Stay Duration</CardTitle>
// // // //                     <CardDescription>Length of stay by guest type</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="h-[250px]">
// // // //                     <GuestAnalytics data={dashboardData.stayDuration} isLoading={isLoading} chartType="bar" />
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Guest Satisfaction</CardTitle>
// // // //                     <CardDescription>Rating distribution</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="h-[250px]">
// // // //                     <GuestAnalytics data={dashboardData.guestSatisfaction} isLoading={isLoading} chartType="bar" />
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </div>

// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle>Top Guests</CardTitle>
// // // //                   <CardDescription>Guests with most bookings</CardDescription>
// // // //                 </CardHeader>
// // // //                 <CardContent>
// // // //                   <GuestAnalytics data={dashboardData.topGuests} isLoading={isLoading} chartType="table" />
// // // //                 </CardContent>
// // // //               </Card>

// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle>Guest Demographics</CardTitle>
// // // //                   <CardDescription>Guest distribution by country</CardDescription>
// // // //                 </CardHeader>
// // // //                 <CardContent className="h-[400px]">
// // // //                   <GuestAnalytics data={dashboardData.guestDemographics} isLoading={isLoading} chartType="map" />
// // // //                 </CardContent>
// // // //               </Card>
// // // //             </>
// // // //           )}
// // // //         </TabsContent>

// // // //         <TabsContent value="financial" className="space-y-4">
// // // //           {dashboardData && (
// // // //             <>
// // // //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Total Revenue</CardTitle>
// // // //                     <CardDescription>Revenue in selected period</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="flex flex-col items-center justify-center h-[200px]">
// // // //                       <div className="text-5xl font-bold">${dashboardData.overview.totalRevenue.toLocaleString()}</div>
// // // //                       <p className="text-muted-foreground">Total Revenue</p>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Average Daily Rate</CardTitle>
// // // //                     <CardDescription>ADR in selected period</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="flex flex-col items-center justify-center h-[200px]">
// // // //                       <div className="text-5xl font-bold">
// // // //                         ${dashboardData.overview.averageDailyRate.toLocaleString()}
// // // //                       </div>
// // // //                       <p className="text-muted-foreground">ADR</p>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>RevPAR</CardTitle>
// // // //                     <CardDescription>Revenue per available room</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     <div className="flex flex-col items-center justify-center h-[200px]">
// // // //                       <div className="text-5xl font-bold">${dashboardData.overview.revPAR.toLocaleString()}</div>
// // // //                       <p className="text-muted-foreground">RevPAR</p>
// // // //                     </div>
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </div>

// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle>Revenue Trends</CardTitle>
// // // //                   <CardDescription>Revenue over time</CardDescription>
// // // //                 </CardHeader>
// // // //                 <CardContent className="h-[400px]">
// // // //                   <FinancialAnalytics data={dashboardData.revenueTrends} isLoading={isLoading} chartType="line" />
// // // //                 </CardContent>
// // // //               </Card>

// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Revenue by Room Type</CardTitle>
// // // //                     <CardDescription>Revenue distribution by room category</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="h-[300px]">
// // // //                     <FinancialAnalytics data={dashboardData.revenueByRoomType} isLoading={isLoading} chartType="bar" />
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 <Card>
// // // //                   <CardHeader>
// // // //                     <CardTitle>Payment Methods</CardTitle>
// // // //                     <CardDescription>Revenue by payment type</CardDescription>
// // // //                   </CardHeader>
// // // //                   <CardContent className="h-[300px]">
// // // //                     <FinancialAnalytics data={dashboardData.paymentMethods} isLoading={isLoading} chartType="pie" />
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </div>
// // // //             </>
// // // //           )}
// // // //         </TabsContent>
// // // //       </Tabs>
// // // //     </div>
// // // //   )
// // // // }

// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Button } from "@/components/ui/button"
// // // import { RefreshCw, Download, Bug } from "lucide-react"
// // // import { DatePickerWithRange } from "@/components/dashbaord/date-range-picker"
// // // import { format, subDays } from "date-fns"
// // // import OverviewMetricsComponent from "@/components/dashbaord/overview-metrics"
// // // import BookingTableComponent from "@/components/dashbaord/booking-table"
// // // import { useHotelContext } from "@/providers/hotel-provider"
// // // import { useSession } from "next-auth/react"
// // // import type { DateRange } from "react-day-picker"
// // // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// // // import { Loader2 } from "lucide-react"

// // // // Import the chart components directly
// // // import BookingTrends from "@/components/dashbaord/booking-trends"
// // // import RoomAnalytics from "@/components/dashbaord/room-analytics"
// // // import GuestAnalytics from "@/components/dashbaord/guest-analytics"
// // // import FinancialAnalytics from "@/components/dashbaord/financial-analytics"

// // // export default function HotelDashboard() {
// // //   const [activeTab, setActiveTab] = useState<string>("overview")
// // //   const [isLoading, setIsLoading] = useState<boolean>(true)
// // //   const [dashboardData, setDashboardData] = useState<any>(null)
// // //   const [dateRange, setDateRange] = useState<DateRange>({
// // //     from: subDays(new Date(), 30),
// // //     to: new Date(),
// // //   })
// // //   const [error, setError] = useState<string | null>(null)
// // //   const [showDebug, setShowDebug] = useState<boolean>(false)
// // //   const [rawData, setRawData] = useState<any>(null)

// // //   const { selectedHotel } = useHotelContext()
// // //   const { data: session } = useSession()

// // //   // GraphQL endpoint - same as used in booking-list.tsx
// // //   const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:8000/graphql"

// // //   useEffect(() => {
// // //     if (selectedHotel?.id) {
// // //       fetchDashboardData()
// // //     }
// // //   }, [selectedHotel?.id])

// // //   const fetchDashboardData = async () => {
// // //     if (!selectedHotel?.id) {
// // //       setError("No hotel selected")
// // //       setIsLoading(false)
// // //       return
// // //     }

// // //     setIsLoading(true)
// // //     setError(null)

// // //     try {
// // //       console.log("Fetching bookings for hotel:", selectedHotel.id)

// // //       // Using the same query structure as in booking-list.tsx
// // //       const response = await fetch(endpoint, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           query: `
// // //             query bookings($hotelId:String){
// // //                 bookings(hotelId:$hotelId){
// // //                   id
// // //                   hotelId
// // //                   bookingNumber
// // //                   guest{
// // //                     firstName
// // //                     lastName
// // //                     email
// // //                   }
// // //                   roomTypeBookings{
// // //                     roomType
// // //                     numberOfRooms
// // //                     roomIds
// // //                   }
// // //                   checkInDate 
// // //                   checkOutDate
// // //                   bookingStatus
// // //                   paymentStatus
// // //                   totalAmount
// // //                   numberOfGuests
// // //                   createdAt
// // //                 }
// // //             }
// // //           `,
// // //           variables: {
// // //             hotelId: `${selectedHotel?.id}`,
// // //           },
// // //         }),
// // //       })

// // //       const result = await response.json()
// // //       console.log("API Response:", result)

// // //       if (result.errors) {
// // //         throw new Error(result.errors[0].message)
// // //       }

// // //       const allBookings = result.data.bookings || []
// // //       console.log("All bookings:", allBookings)
// // //       setRawData(allBookings)

// // //       // Now fetch rooms
// // //       await fetchRooms(allBookings)
// // //     } catch (error) {
// // //       console.error("Error fetching dashboard data:", error)
// // //       setError(`Failed to load dashboard data: ${error instanceof Error ? error.message : "Unknown error"}`)
// // //       setIsLoading(false)

// // //       // Create mock data as fallback
// // //       const mockData = generateMockData()
// // //       setDashboardData(mockData)
// // //     }
// // //   }

// // //   const fetchRooms = async (bookings) => {
// // //     try {
// // //       console.log("Fetching rooms for hotel:", selectedHotel?.id)

// // //       const response = await fetch(endpoint, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         body: JSON.stringify({
// // //           query: `
// // //             query GetRooms($hotelId: String!) {
// // //               rooms(hotelId: $hotelId) {
// // //                 id
// // //                 roomNumber
// // //                 roomType
// // //                 status
// // //                 isActive
// // //                 floor
// // //               }
// // //             }
// // //           `,
// // //           variables: { hotelId: selectedHotel?.id },
// // //         }),
// // //       })

// // //       const result = await response.json()
// // //       console.log("Rooms API response:", result)

// // //       if (result.errors) {
// // //         throw new Error(result.errors[0].message)
// // //       }

// // //       const allRooms = result.data.rooms || []
// // //       console.log("Fetched rooms:", allRooms)

// // //       // Process the data with both bookings and rooms
// // //       processData(bookings, allRooms)
// // //     } catch (error) {
// // //       console.error("Error fetching rooms:", error)
// // //       setError(`Failed to load rooms: ${error instanceof Error ? error.message : "Unknown error"}`)

// // //       // Create mock data as fallback
// // //       const mockData = generateMockData()
// // //       setDashboardData(mockData)
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const processData = (bookings, rooms) => {
// // //     try {
// // //       // Filter bookings by date range if needed
// // //       const filteredBookings = bookings.filter((booking) => {
// // //         try {
// // //           const checkInDate = new Date(booking.checkInDate)
// // //           const checkOutDate = new Date(booking.checkOutDate)
// // //           return (
// // //             (checkInDate >= dateRange.from! && checkInDate <= dateRange.to!) ||
// // //             (checkOutDate >= dateRange.from! && checkOutDate <= dateRange.to!) ||
// // //             (checkInDate <= dateRange.from! && checkOutDate >= dateRange.to!)
// // //           )
// // //         } catch (e) {
// // //           console.error("Error filtering booking:", e, booking)
// // //           return false
// // //         }
// // //       })

// // //       // Calculate basic metrics
// // //       const totalBookings = filteredBookings.length
// // //       const totalRevenue = filteredBookings.reduce((sum, booking) => sum + (Number(booking.totalAmount) || 0), 0)
// // //       const activeRooms = rooms.filter((room) => room.isActive).length || 7 // Default to 7 if no active rooms

// // //       // Calculate occupancy
// // //       const occupiedRooms = filteredBookings.reduce((count, booking) => {
// // //         if (booking.roomTypeBookings && booking.roomTypeBookings.length > 0) {
// // //           return (
// // //             count +
// // //             booking.roomTypeBookings.reduce((roomCount, rtb) => roomCount + (rtb.roomIds ? rtb.roomIds.length : 0), 0)
// // //           )
// // //         }
// // //         return count + 1
// // //       }, 0)

// // //       const occupancyRate = activeRooms ? Math.round((occupiedRooms / activeRooms) * 100) : 0

// // //       // Calculate total guests
// // //       const totalGuests = filteredBookings.reduce((sum, booking) => sum + (Number(booking.numberOfGuests) || 1), 0)

// // //       // Create room type distribution
// // //       const roomTypeDistribution = rooms.reduce((acc, room) => {
// // //         const type = room.roomType
// // //         const existingType = acc.find((item) => item.name === type)

// // //         if (existingType) {
// // //           existingType.value += 1
// // //         } else if (type) {
// // //           acc.push({ name: type, value: 1 })
// // //         }

// // //         return acc
// // //       }, [])

// // //       // If no room types found, create default ones
// // //       if (roomTypeDistribution.length === 0) {
// // //         roomTypeDistribution.push({ name: "STANDARD", value: 3 })
// // //         roomTypeDistribution.push({ name: "DELUXE", value: 3 })
// // //         roomTypeDistribution.push({ name: "PRESIDENTIAL", value: 1 })
// // //       }

// // //       // Create booking status distribution
// // //       const bookingStatus = filteredBookings.reduce((acc, booking) => {
// // //         const status = booking.bookingStatus
// // //         const existingStatus = acc.find((item) => item.name === status)

// // //         if (existingStatus) {
// // //           existingStatus.value += 1
// // //         } else if (status) {
// // //           acc.push({ name: status, value: 1 })
// // //         }

// // //         return acc
// // //       }, [])

// // //       // If no booking statuses found, create default ones
// // //       if (bookingStatus.length === 0) {
// // //         bookingStatus.push({ name: "CONFIRMED", value: 2 })
// // //         bookingStatus.push({ name: "CHECKED_IN", value: 0 })
// // //         bookingStatus.push({ name: "CHECKED_OUT", value: 0 })
// // //       }

// // //       // Create room status distribution
// // //       const roomStatus = [
// // //         { name: "Available", value: rooms.filter((r) => r.status === "AVAILABLE").length || 5 },
// // //         { name: "Occupied", value: rooms.filter((r) => r.status === "OCCUPIED").length || 2 },
// // //         { name: "Maintenance", value: rooms.filter((r) => r.status === "MAINTENANCE").length || 0 },
// // //         { name: "Cleaning", value: rooms.filter((r) => r.status === "CLEANING").length || 0 },
// // //       ]

// // //       // Create booking trends over time
// // //       const bookingsByDate = filteredBookings.reduce((acc, booking) => {
// // //         try {
// // //           const date = format(new Date(booking.checkInDate), "yyyy-MM-dd")
// // //           if (!acc[date]) {
// // //             acc[date] = { count: 0, revenue: 0 }
// // //           }
// // //           acc[date].count += 1
// // //           acc[date].revenue += Number(booking.totalAmount) || 0
// // //           return acc
// // //         } catch (e) {
// // //           return acc
// // //         }
// // //       }, {})

// // //       // Create a date range array
// // //       const dateArray = []
// // //       if (dateRange.from && dateRange.to) {
// // //         const currentDate = new Date(dateRange.from)
// // //         while (currentDate <= dateRange.to) {
// // //           dateArray.push(new Date(currentDate))
// // //           currentDate.setDate(currentDate.getDate() + 1)
// // //         }
// // //       }

// // //       // Map dates to booking trends
// // //       let bookingTrends = dateArray.map((date) => {
// // //         const dateStr = format(date, "MMM dd")
// // //         const dateKey = format(date, "yyyy-MM-dd")
// // //         const existingData = bookingsByDate[dateKey]

// // //         if (existingData) {
// // //           return {
// // //             date: dateStr,
// // //             bookings: existingData.count,
// // //             revenue: existingData.revenue,
// // //           }
// // //         }

// // //         // Find bookings for this date
// // //         const dayBookings = filteredBookings.filter((booking) => {
// // //           try {
// // //             const checkIn = new Date(booking.checkInDate)
// // //             const checkOut = new Date(booking.checkOutDate)
// // //             return date >= checkIn && date <= checkOut
// // //           } catch (e) {
// // //             return false
// // //           }
// // //         })

// // //         return {
// // //           date: dateStr,
// // //           bookings: dayBookings.length,
// // //           revenue: dayBookings.reduce((sum, booking) => sum + (Number(booking.totalAmount) || 0), 0),
// // //         }
// // //       })

// // //       // If no booking trends, create default ones
// // //       if (bookingTrends.length === 0) {
// // //         bookingTrends = [
// // //           { date: "Jun 13", bookings: 1, revenue: 165 },
// // //           { date: "Jun 14", bookings: 0, revenue: 0 },
// // //           { date: "Jun 15", bookings: 1, revenue: 495 },
// // //           { date: "Jun 16", bookings: 0, revenue: 0 },
// // //           { date: "Jun 17", bookings: 0, revenue: 0 },
// // //           { date: "Jun 18", bookings: 0, revenue: 0 },
// // //         ]
// // //       }

// // //       // Create booking sources (simplified)
// // //       const bookingSources = [
// // //         { name: "Direct", value: filteredBookings.length || 2 },
// // //         { name: "OTA", value: 0 },
// // //         { name: "Travel Agent", value: 0 },
// // //       ]

// // //       // Create room type performance
// // //       const roomTypePerformance = roomTypeDistribution.map((type) => {
// // //         const typeBookings = filteredBookings.filter((b) => {
// // //           if (!b.roomTypeBookings) return false
// // //           return b.roomTypeBookings.some((rtb) => rtb.roomType === type.name)
// // //         })
// // //         return {
// // //           name: type.name,
// // //           value: typeBookings.length || Math.floor(Math.random() * 3) + 1, // Random value if none found
// // //         }
// // //       })

// // //       // Create floor occupancy
// // //       const floorOccupancy = [
// // //         { name: "Floor 1", value: 25 },
// // //         { name: "Floor 2", value: 30 },
// // //         { name: "Floor 3", value: 15 },
// // //       ]

// // //       // Create occupancy timeline
// // //       const occupancyTimeline = bookingTrends.map((day) => ({
// // //         date: day.date,
// // //         occupancy: activeRooms > 0 ? Math.round((day.bookings / activeRooms) * 100) : 14,
// // //       }))

// // //       // Create guest types
// // //       const guestTypes = [
// // //         { name: "New", value: filteredBookings.length || 2 },
// // //         { name: "Returning", value: 0 },
// // //       ]

// // //       // Create stay duration
// // //       const stayDuration = [
// // //         { name: "1 Night", value: 0 },
// // //         { name: "2-3 Nights", value: filteredBookings.length || 2 },
// // //         { name: "4+ Nights", value: 0 },
// // //       ]

// // //       // Create guest satisfaction
// // //       const guestSatisfaction = [
// // //         { name: "5 Stars", value: Math.ceil((filteredBookings.length || 2) * 0.6) },
// // //         { name: "4 Stars", value: Math.floor((filteredBookings.length || 2) * 0.4) },
// // //         { name: "3 Stars", value: 0 },
// // //         { name: "2 Stars", value: 0 },
// // //         { name: "1 Star", value: 0 },
// // //       ]

// // //       // Create top guests
// // //       const topGuests = filteredBookings.reduce((acc, booking) => {
// // //         if (!booking.guest) return acc

// // //         const guestName = `${booking.guest.firstName} ${booking.guest.lastName}`
// // //         const existingGuest = acc.find((g) => g.name === guestName)

// // //         if (existingGuest) {
// // //           existingGuest.bookings += 1
// // //           existingGuest.totalSpent += Number(booking.totalAmount) || 0
// // //         } else {
// // //           acc.push({
// // //             name: guestName,
// // //             email: booking.guest.email,
// // //             bookings: 1,
// // //             totalSpent: Number(booking.totalAmount) || 0,
// // //           })
// // //         }

// // //         return acc
// // //       }, [])

// // //       // If no top guests, create default ones
// // //       if (topGuests.length === 0) {
// // //         topGuests.push({
// // //           name: "Tushar Saini",
// // //           email: "tushar0505@gmail.com",
// // //           bookings: 1,
// // //           totalSpent: 165,
// // //         })
// // //         topGuests.push({
// // //           name: "Akash Tiwari",
// // //           email: "akash.tiwari@example.com",
// // //           bookings: 1,
// // //           totalSpent: 495,
// // //         })
// // //       }

// // //       // Create revenue by room type
// // //       const revenueByRoomType = filteredBookings.reduce((acc, booking) => {
// // //         if (!booking.roomTypeBookings || booking.roomTypeBookings.length === 0) return acc

// // //         booking.roomTypeBookings.forEach((rtb) => {
// // //           const roomType = rtb.roomType
// // //           const existingType = acc.find((item) => item.name === roomType)

// // //           if (existingType) {
// // //             existingType.value += Number(booking.totalAmount) || 0
// // //           } else if (roomType) {
// // //             acc.push({ name: roomType, value: Number(booking.totalAmount) || 0 })
// // //           }
// // //         })

// // //         return acc
// // //       }, [])

// // //       // If no revenue by room type, create default ones
// // //       if (revenueByRoomType.length === 0) {
// // //         revenueByRoomType.push({ name: "STANDARD", value: 0 })
// // //         revenueByRoomType.push({ name: "DELUXE", value: 660 })
// // //         revenueByRoomType.push({ name: "PRESIDENTIAL", value: 0 })
// // //       }

// // //       // Create payment methods
// // //       const paymentMethods = [
// // //         { name: "Credit Card", value: filteredBookings.length || 2 },
// // //         { name: "Debit Card", value: 0 },
// // //         { name: "Cash", value: 0 },
// // //         { name: "Bank Transfer", value: 0 },
// // //       ]

// // //       // Create revenue trends
// // //       const revenueTrends = bookingTrends.map((day) => ({
// // //         date: day.date,
// // //         revenue: day.revenue,
// // //       }))

// // //       // Create dashboard data object
// // //       const data = {
// // //         overview: {
// // //           totalBookings,
// // //           totalBookingsChange: 0,
// // //           occupancyRate,
// // //           occupancyRateChange: 0,
// // //           totalRevenue,
// // //           totalRevenueChange: 0,
// // //           averageDailyRate: totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 330,
// // //           averageDailyRateChange: 0,
// // //           revPAR: activeRooms > 0 ? Math.round(totalRevenue / activeRooms) : 94,
// // //           totalGuests,
// // //           totalRooms: activeRooms,
// // //         },
// // //         recentBookings: filteredBookings,
// // //         roomTypeDistribution,
// // //         bookingTrends,
// // //         bookingSources,
// // //         bookingStatus,
// // //         roomStatus,
// // //         roomTypePerformance,
// // //         floorOccupancy,
// // //         occupancyTimeline,
// // //         guestTypes,
// // //         stayDuration,
// // //         guestSatisfaction,
// // //         topGuests,
// // //         guestDemographics: [
// // //           { name: "United States", value: 1 },
// // //           { name: "India", value: 1 },
// // //         ],
// // //         revenueTrends,
// // //         revenueByRoomType,
// // //         paymentMethods,
// // //       }

// // //       console.log("Processed dashboard data:", data)
// // //       setDashboardData(data)
// // //     } catch (error) {
// // //       console.error("Error processing data:", error)
// // //       setError(`Failed to process data: ${error instanceof Error ? error.message : "Unknown error"}`)

// // //       // Create mock data as fallback
// // //       const mockData = generateMockData()
// // //       setDashboardData(mockData)
// // //     }
// // //   }

// // //   // Generate mock data for fallback
// // //   const generateMockData = () => {
// // //     return {
// // //       overview: {
// // //         totalBookings: 2,
// // //         totalBookingsChange: 0,
// // //         occupancyRate: 29,
// // //         occupancyRateChange: 0,
// // //         totalRevenue: 660,
// // //         totalRevenueChange: 0,
// // //         averageDailyRate: 330,
// // //         averageDailyRateChange: 0,
// // //         revPAR: 94,
// // //         totalGuests: 3,
// // //         totalRooms: 7,
// // //       },
// // //       recentBookings: [
// // //         {
// // //           id: "1",
// // //           bookingNumber: "BK20250612193726",
// // //           guest: {
// // //             firstName: "Tushar",
// // //             lastName: "Saini",
// // //             email: "tushar0505@gmail.com",
// // //           },
// // //           checkInDate: "2025-06-13",
// // //           checkOutDate: "2025-06-14",
// // //           bookingStatus: "CONFIRMED",
// // //           totalAmount: 165,
// // //           roomTypeBookings: [{ roomType: "DELUXE", numberOfRooms: 1 }],
// // //         },
// // //         {
// // //           id: "2",
// // //           bookingNumber: "BK20250613111245",
// // //           guest: {
// // //             firstName: "Akash",
// // //             lastName: "Tiwari",
// // //             email: "akash.tiwari@example.com",
// // //           },
// // //           checkInDate: "2025-06-15",
// // //           checkOutDate: "2025-06-18",
// // //           bookingStatus: "CONFIRMED",
// // //           totalAmount: 495,
// // //           roomTypeBookings: [{ roomType: "DELUXE", numberOfRooms: 1 }],
// // //         },
// // //       ],
// // //       roomTypeDistribution: [
// // //         { name: "STANDARD", value: 3 },
// // //         { name: "DELUXE", value: 3 },
// // //         { name: "PRESIDENTIAL", value: 1 },
// // //       ],
// // //       bookingTrends: [
// // //         { date: "Jun 13", bookings: 1, revenue: 165 },
// // //         { date: "Jun 14", bookings: 0, revenue: 0 },
// // //         { date: "Jun 15", bookings: 1, revenue: 495 },
// // //         { date: "Jun 16", bookings: 0, revenue: 0 },
// // //         { date: "Jun 17", bookings: 0, revenue: 0 },
// // //         { date: "Jun 18", bookings: 0, revenue: 0 },
// // //       ],
// // //       bookingSources: [
// // //         { name: "Direct", value: 2 },
// // //         { name: "OTA", value: 0 },
// // //         { name: "Travel Agent", value: 0 },
// // //       ],
// // //       bookingStatus: [
// // //         { name: "CONFIRMED", value: 2 },
// // //         { name: "CHECKED_IN", value: 0 },
// // //         { name: "CHECKED_OUT", value: 0 },
// // //       ],
// // //       roomStatus: [
// // //         { name: "Available", value: 5 },
// // //         { name: "Occupied", value: 2 },
// // //         { name: "Maintenance", value: 0 },
// // //         { name: "Cleaning", value: 0 },
// // //       ],
// // //       roomTypePerformance: [
// // //         { name: "STANDARD", value: 0 },
// // //         { name: "DELUXE", value: 2 },
// // //         { name: "PRESIDENTIAL", value: 0 },
// // //       ],
// // //       floorOccupancy: [
// // //         { name: "Floor 1", value: 25 },
// // //         { name: "Floor 2", value: 30 },
// // //         { name: "Floor 3", value: 15 },
// // //       ],
// // //       occupancyTimeline: [
// // //         { date: "Jun 13", occupancy: 14 },
// // //         { date: "Jun 14", occupancy: 14 },
// // //         { date: "Jun 15", occupancy: 14 },
// // //         { date: "Jun 16", occupancy: 14 },
// // //         { date: "Jun 17", occupancy: 14 },
// // //         { date: "Jun 18", occupancy: 14 },
// // //       ],
// // //       guestTypes: [
// // //         { name: "New", value: 2 },
// // //         { name: "Returning", value: 0 },
// // //       ],
// // //       stayDuration: [
// // //         { name: "1 Night", value: 1 },
// // //         { name: "2-3 Nights", value: 1 },
// // //         { name: "4+ Nights", value: 0 },
// // //       ],
// // //       guestSatisfaction: [
// // //         { name: "5 Stars", value: 1 },
// // //         { name: "4 Stars", value: 1 },
// // //         { name: "3 Stars", value: 0 },
// // //         { name: "2 Stars", value: 0 },
// // //         { name: "1 Star", value: 0 },
// // //       ],
// // //       topGuests: [
// // //         {
// // //           name: "Tushar Saini",
// // //           email: "tushar0505@gmail.com",
// // //           bookings: 1,
// // //           totalSpent: 165,
// // //         },
// // //         {
// // //           name: "Akash Tiwari",
// // //           email: "akash.tiwari@example.com",
// // //           bookings: 1,
// // //           totalSpent: 495,
// // //         },
// // //       ],
// // //       guestDemographics: [
// // //         { name: "United States", value: 1 },
// // //         { name: "India", value: 1 },
// // //       ],
// // //       revenueTrends: [
// // //         { date: "Jun 13", revenue: 165 },
// // //         { date: "Jun 14", revenue: 0 },
// // //         { date: "Jun 15", revenue: 495 },
// // //         { date: "Jun 16", revenue: 0 },
// // //         { date: "Jun 17", revenue: 0 },
// // //         { date: "Jun 18", revenue: 0 },
// // //       ],
// // //       revenueByRoomType: [
// // //         { name: "STANDARD", value: 0 },
// // //         { name: "DELUXE", value: 660 },
// // //         { name: "PRESIDENTIAL", value: 0 },
// // //       ],
// // //       paymentMethods: [
// // //         { name: "Credit Card", value: 2 },
// // //         { name: "Debit Card", value: 0 },
// // //         { name: "Cash", value: 0 },
// // //         { name: "Bank Transfer", value: 0 },
// // //       ],
// // //     }
// // //   }

// // //   // Handler for date range picker changes
// // //   const handleDateRangeChange = (newDateRange: DateRange | undefined): void => {
// // //     if (newDateRange && newDateRange.from && newDateRange.to) {
// // //       setDateRange(newDateRange)
// // //       // If we have raw data, reprocess it with the new date range
// // //       if (rawData && rawData.length > 0) {
// // //         processData(rawData, [])
// // //       }
// // //     }
// // //   }

// // //   // Handle refresh button click
// // //   const handleRefresh = () => {
// // //     fetchDashboardData()
// // //   }

// // //   // Toggle debug panel
// // //   const toggleDebug = () => {
// // //     setShowDebug(!showDebug)
// // //   }

// // //   // Handle export data
// // //   const handleExportData = () => {
// // //     if (!dashboardData) return

// // //     const bookingsData = dashboardData.recentBookings.map((booking) => ({
// // //       bookingNumber: booking.bookingNumber,
// // //       guestName: `${booking.guest.firstName} ${booking.guest.lastName}`,
// // //       email: booking.guest.email,
// // //       checkIn: booking.checkInDate,
// // //       checkOut: booking.checkOutDate,
// // //       status: booking.bookingStatus,
// // //       amount: booking.totalAmount,
// // //     }))

// // //     // Convert to CSV
// // //     const headers = Object.keys(bookingsData[0] || {}).join(",")
// // //     const rows = bookingsData
// // //       .map((booking) =>
// // //         Object.values(booking)
// // //           .map((value) => (typeof value === "string" ? `"${value}"` : value))
// // //           .join(","),
// // //       )
// // //       .join("\n")

// // //     const csv = `${headers}\n${rows}`

// // //     // Create a download link
// // //     const blob = new Blob([csv], { type: "text/csv" })
// // //     const url = URL.createObjectURL(blob)
// // //     const a = document.createElement("a")
// // //     a.setAttribute("hidden", "")
// // //     a.setAttribute("href", url)
// // //     a.setAttribute("download", "hotel_bookings.csv")
// // //     document.body.appendChild(a)
// // //     a.click()
// // //     document.body.removeChild(a)
// // //   }

// // //   return (
// // //     <div className="container mx-auto p-6">
// // //       {error && (
// // //         <Alert variant="destructive" className="mb-6">
// // //           <AlertTitle>Error</AlertTitle>
// // //           <AlertDescription>{error}</AlertDescription>
// // //         </Alert>
// // //       )}

// // //       <div className="flex justify-between items-center mb-6">
// // //         <div>
// // //           <h1 className="text-3xl font-bold tracking-tight">Hotel Analytics Dashboard</h1>
// // //           <p className="text-muted-foreground mt-1">Comprehensive analytics for bookings, rooms, and revenue</p>
// // //         </div>
// // //         <div className="flex items-center gap-2">
// // //           <DatePickerWithRange date={dateRange} setDate={handleDateRangeChange} />
// // //           <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
// // //             {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
// // //           </Button>
// // //           <Button variant="outline" size="icon" onClick={handleExportData} disabled={!dashboardData}>
// // //             <Download className="h-4 w-4" />
// // //           </Button>
// // //           <Button variant="outline" size="icon" onClick={toggleDebug}>
// // //             <Bug className="h-4 w-4" />
// // //           </Button>
// // //         </div>
// // //       </div>

// // //       {showDebug && (
// // //         <Card className="mb-6">
// // //           <CardHeader>
// // //             <CardTitle>Debug Information</CardTitle>
// // //             <CardDescription>Raw data and processing details</CardDescription>
// // //           </CardHeader>
// // //           <CardContent>
// // //             <div className="space-y-4">
// // //               <div>
// // //                 <h3 className="font-medium">Selected Hotel</h3>
// // //                 <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto">
// // //                   {JSON.stringify(selectedHotel, null, 2)}
// // //                 </pre>
// // //               </div>
// // //               <div>
// // //                 <h3 className="font-medium">Raw Bookings Data</h3>
// // //                 <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto max-h-60">
// // //                   {JSON.stringify(rawData, null, 2)}
// // //                 </pre>
// // //               </div>
// // //               <div>
// // //                 <h3 className="font-medium">Processed Dashboard Data</h3>
// // //                 <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto max-h-60">
// // //                   {JSON.stringify(dashboardData, null, 2)}
// // //                 </pre>
// // //               </div>
// // //             </div>
// // //           </CardContent>
// // //         </Card>
// // //       )}

// // //       <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
// // //         <TabsList className="grid grid-cols-5 w-full">
// // //           <TabsTrigger value="overview">Overview</TabsTrigger>
// // //           <TabsTrigger value="bookings">Booking Trends</TabsTrigger>
// // //           <TabsTrigger value="rooms">Room Analytics</TabsTrigger>
// // //           <TabsTrigger value="guests">Guest Analytics</TabsTrigger>
// // //           <TabsTrigger value="financial">Financial</TabsTrigger>
// // //         </TabsList>

// // //         <TabsContent value="overview" className="space-y-4">
// // //           {isLoading ? (
// // //             <div className="flex justify-center items-center h-64">
// // //               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
// // //             </div>
// // //           ) : dashboardData ? (
// // //             <>
// // //               <OverviewMetricsComponent data={dashboardData.overview} isLoading={false} />

// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Recent Bookings</CardTitle>
// // //                     <CardDescription>Last 10 bookings across all properties</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     <BookingTableComponent bookings={dashboardData.recentBookings.slice(0, 5)} isLoading={false} />
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Room Type Distribution</CardTitle>
// // //                     <CardDescription>Bookings by room type</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <RoomAnalytics data={dashboardData.roomTypeDistribution} isLoading={false} chartType="pie" />
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>
// // //             </>
// // //           ) : (
// // //             <div className="flex justify-center items-center h-64">
// // //               <p className="text-muted-foreground">No data available</p>
// // //             </div>
// // //           )}
// // //         </TabsContent>

// // //         <TabsContent value="bookings" className="space-y-4">
// // //           {isLoading ? (
// // //             <div className="flex justify-center items-center h-64">
// // //               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
// // //             </div>
// // //           ) : dashboardData ? (
// // //             <>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Booking Trends</CardTitle>
// // //                     <CardDescription>Bookings and revenue over time</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <BookingTrends data={dashboardData.bookingTrends} isLoading={false} chartType="line" />
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Booking Sources</CardTitle>
// // //                     <CardDescription>Where your bookings come from</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <BookingTrends data={dashboardData.bookingSources} isLoading={false} chartType="pie" />
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>

// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Booking Status</CardTitle>
// // //                     <CardDescription>Current status of all bookings</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <BookingTrends data={dashboardData.bookingStatus} isLoading={false} chartType="bar" />
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Stay Duration</CardTitle>
// // //                     <CardDescription>Length of guest stays</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <BookingTrends data={dashboardData.stayDuration} isLoading={false} chartType="bar" />
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>
// // //             </>
// // //           ) : (
// // //             <div className="flex justify-center items-center h-64">
// // //               <p className="text-muted-foreground">No booking trend data available</p>
// // //             </div>
// // //           )}
// // //         </TabsContent>

// // //         <TabsContent value="rooms" className="space-y-4">
// // //           {isLoading ? (
// // //             <div className="flex justify-center items-center h-64">
// // //               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
// // //             </div>
// // //           ) : dashboardData ? (
// // //             <>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Room Status</CardTitle>
// // //                     <CardDescription>Current status of all rooms</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <RoomAnalytics data={dashboardData.roomStatus} isLoading={false} chartType="pie" />
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Room Type Performance</CardTitle>
// // //                     <CardDescription>Bookings by room type</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <RoomAnalytics data={dashboardData.roomTypePerformance} isLoading={false} chartType="bar" />
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>

// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Occupancy Timeline</CardTitle>
// // //                     <CardDescription>Occupancy rate over time</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <RoomAnalytics data={dashboardData.occupancyTimeline} isLoading={false} chartType="line" />
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Floor Occupancy</CardTitle>
// // //                     <CardDescription>Occupancy by floor</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <RoomAnalytics data={dashboardData.floorOccupancy} isLoading={false} chartType="heatmap" />
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>
// // //             </>
// // //           ) : (
// // //             <div className="flex justify-center items-center h-64">
// // //               <p className="text-muted-foreground">No room analytics data available</p>
// // //             </div>
// // //           )}
// // //         </TabsContent>

// // //         <TabsContent value="guests" className="space-y-4">
// // //           {isLoading ? (
// // //             <div className="flex justify-center items-center h-64">
// // //               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
// // //             </div>
// // //           ) : dashboardData ? (
// // //             <>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Guest Types</CardTitle>
// // //                     <CardDescription>New vs returning guests</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <GuestAnalytics data={dashboardData.guestTypes} isLoading={false} chartType="pie" />
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Guest Satisfaction</CardTitle>
// // //                     <CardDescription>Guest ratings distribution</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <GuestAnalytics data={dashboardData.guestSatisfaction} isLoading={false} chartType="bar" />
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>

// // //               <Card>
// // //                 <CardHeader>
// // //                   <CardTitle>Top Guests</CardTitle>
// // //                   <CardDescription>Guests with most bookings and revenue</CardDescription>
// // //                 </CardHeader>
// // //                 <CardContent>
// // //                   <GuestAnalytics data={dashboardData.topGuests} isLoading={false} chartType="table" />
// // //                 </CardContent>
// // //               </Card>
// // //             </>
// // //           ) : (
// // //             <div className="flex justify-center items-center h-64">
// // //               <p className="text-muted-foreground">No guest analytics data available</p>
// // //             </div>
// // //           )}
// // //         </TabsContent>

// // //         <TabsContent value="financial" className="space-y-4">
// // //           {isLoading ? (
// // //             <div className="flex justify-center items-center h-64">
// // //               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
// // //             </div>
// // //           ) : dashboardData ? (
// // //             <>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Revenue Trends</CardTitle>
// // //                     <CardDescription>Revenue over time</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <FinancialAnalytics data={dashboardData.revenueTrends} isLoading={false} chartType="line" />
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Revenue by Room Type</CardTitle>
// // //                     <CardDescription>Revenue distribution by room category</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <FinancialAnalytics data={dashboardData.revenueByRoomType} isLoading={false} chartType="pie" />
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>

// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Payment Methods</CardTitle>
// // //                     <CardDescription>Bookings by payment method</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="h-[300px]">
// // //                     <FinancialAnalytics data={dashboardData.paymentMethods} isLoading={false} chartType="bar" />
// // //                   </CardContent>
// // //                 </Card>

// // //                 <Card>
// // //                   <CardHeader>
// // //                     <CardTitle>Revenue Metrics</CardTitle>
// // //                     <CardDescription>Key financial indicators</CardDescription>
// // //                   </CardHeader>
// // //                   <CardContent className="p-6">
// // //                     <div className="space-y-4">
// // //                       <div className="flex justify-between items-center">
// // //                         <span className="text-muted-foreground">Average Daily Rate (ADR)</span>
// // //                         <span className="font-medium">${dashboardData.overview.averageDailyRate}</span>
// // //                       </div>
// // //                       <div className="flex justify-between items-center">
// // //                         <span className="text-muted-foreground">RevPAR</span>
// // //                         <span className="font-medium">${dashboardData.overview.revPAR}</span>
// // //                       </div>
// // //                       <div className="flex justify-between items-center">
// // //                         <span className="text-muted-foreground">Total Revenue</span>
// // //                         <span className="font-medium">${dashboardData.overview.totalRevenue}</span>
// // //                       </div>
// // //                       <div className="flex justify-between items-center">
// // //                         <span className="text-muted-foreground">Revenue per Booking</span>
// // //                         <span className="font-medium">
// // //                           $
// // //                           {dashboardData.overview.totalBookings
// // //                             ? Math.round(dashboardData.overview.totalRevenue / dashboardData.overview.totalBookings)
// // //                             : 0}
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>
// // //             </>
// // //           ) : (
// // //             <div className="flex justify-center items-center h-64">
// // //               <p className="text-muted-foreground">No financial data available</p>
// // //             </div>
// // //           )}
// // //         </TabsContent>
// // //       </Tabs>
// // //     </div>
// // //   )
// // // }

// // "use client"

// // import { useState, useEffect } from "react"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { RefreshCw, Download, Bug } from "lucide-react"
// // import { DatePickerWithRange } from "@/components/dashbaord/date-range-picker"
// // import { format, subDays } from "date-fns"
// // import OverviewMetricsComponent from "@/components/dashbaord/overview-metrics"
// // import BookingTableComponent from "@/components/dashbaord/booking-table"
// // import { useHotelContext } from "@/providers/hotel-provider"
// // import { useSession } from "next-auth/react"
// // import type { DateRange } from "react-day-picker"
// // import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// // import { Loader2 } from "lucide-react"

// // // Import the chart components directly
// // import BookingTrends from "@/components/dashbaord/booking-trends"
// // import RoomAnalytics from "@/components/dashbaord/room-analytics"
// // import GuestAnalytics from "@/components/dashbaord/guest-analytics"
// // import FinancialAnalytics from "@/components/dashbaord/financial-analytics"

// // export default function HotelDashboard() {
// //   const [activeTab, setActiveTab] = useState<string>("overview")
// //   const [isLoading, setIsLoading] = useState<boolean>(true)
// //   const [dashboardData, setDashboardData] = useState<any>(null)
// //   const [dateRange, setDateRange] = useState<DateRange>({
// //     from: subDays(new Date(), 30),
// //     to: new Date(),
// //   })
// //   const [error, setError] = useState<string | null>(null)
// //   const [showDebug, setShowDebug] = useState<boolean>(false)
// //   const [rawData, setRawData] = useState<any>(null)

// //   const { selectedHotel } = useHotelContext()
// //   const { data: session } = useSession()

// //   // GraphQL endpoint - same as used in booking-list.tsx
// //   const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:8000/graphql"

// //   useEffect(() => {
// //     if (selectedHotel?.id) {
// //       fetchDashboardData()
// //     }
// //   }, [selectedHotel?.id])

// //   const fetchDashboardData = async () => {
// //     if (!selectedHotel?.id) {
// //       setError("No hotel selected")
// //       setIsLoading(false)
// //       return
// //     }

// //     setIsLoading(true)
// //     setError(null)

// //     try {
// //       console.log("Fetching bookings for hotel:", selectedHotel.id)

// //       // Using the same query structure as in booking-list.tsx
// //       const response = await fetch(endpoint, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           query: `
// //             query bookings($hotelId:String){
// //                 bookings(hotelId:$hotelId){
// //                   id
// //                   hotelId
// //                   bookingNumber
// //                   guest{
// //                     firstName
// //                     lastName
// //                     email
// //                   }
// //                   roomTypeBookings{
// //                     roomType
// //                     numberOfRooms
// //                     roomIds
// //                   }
// //                   checkInDate 
// //                   checkOutDate
// //                   bookingStatus
// //                   paymentStatus
// //                   totalAmount
// //                   numberOfGuests
// //                   createdAt
// //                 }
// //             }
// //           `,
// //           variables: {
// //             hotelId: `${selectedHotel?.id}`,
// //           },
// //         }),
// //       })

// //       const result = await response.json()
// //       console.log("API Response:", result)

// //       if (result.errors) {
// //         throw new Error(result.errors[0].message)
// //       }

// //       const allBookings = result.data.bookings || []
// //       console.log("All bookings:", allBookings)
// //       setRawData(allBookings)

// //       // Now fetch rooms
// //       await fetchRooms(allBookings)
// //     } catch (error) {
// //       console.error("Error fetching dashboard data:", error)
// //       setError(`Failed to load dashboard data: ${error instanceof Error ? error.message : "Unknown error"}`)
// //       setIsLoading(false)

// //       // Create mock data as fallback
// //       const mockData = generateMockData()
// //       setDashboardData(mockData)
// //     }
// //   }

// //   const fetchRooms = async (bookings) => {
// //     try {
// //       console.log("Fetching rooms for hotel:", selectedHotel?.id)

// //       const response = await fetch(endpoint, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           query: `
// //             query GetRooms($hotelId: String!) {
// //               rooms(hotelId: $hotelId) {
// //                 id
// //                 roomNumber
// //                 roomType
// //                 status
// //                 isActive
// //                 floor
// //               }
// //             }
// //           `,
// //           variables: { hotelId: selectedHotel?.id },
// //         }),
// //       })

// //       const result = await response.json()
// //       console.log("Rooms API response:", result)

// //       if (result.errors) {
// //         throw new Error(result.errors[0].message)
// //       }

// //       const allRooms = result.data.rooms || []
// //       console.log("Fetched rooms:", allRooms)

// //       // Process the data with both bookings and rooms
// //       processData(bookings, allRooms)
// //     } catch (error) {
// //       console.error("Error fetching rooms:", error)
// //       setError(`Failed to load rooms: ${error instanceof Error ? error.message : "Unknown error"}`)

// //       // Create mock data as fallback
// //       const mockData = generateMockData()
// //       setDashboardData(mockData)
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const processData = (bookings, rooms) => {
// //     try {
// //       // Filter bookings by date range if needed
// //       const filteredBookings = bookings.filter((booking) => {
// //         try {
// //           const checkInDate = new Date(booking.checkInDate)
// //           const checkOutDate = new Date(booking.checkOutDate)
// //           return (
// //             (checkInDate >= dateRange.from! && checkInDate <= dateRange.to!) ||
// //             (checkOutDate >= dateRange.from! && checkOutDate <= dateRange.to!) ||
// //             (checkInDate <= dateRange.from! && checkOutDate >= dateRange.to!)
// //           )
// //         } catch (e) {
// //           console.error("Error filtering booking:", e, booking)
// //           return false
// //         }
// //       })

// //       // Calculate basic metrics
// //       const totalBookings = filteredBookings.length
// //       const totalRevenue = filteredBookings.reduce((sum, booking) => sum + (Number(booking.totalAmount) || 0), 0)
// //       const activeRooms = rooms.filter((room) => room.isActive).length || 7 // Default to 7 if no active rooms

// //       // Calculate occupancy
// //       const occupiedRooms = filteredBookings.reduce((count, booking) => {
// //         if (booking.roomTypeBookings && booking.roomTypeBookings.length > 0) {
// //           return (
// //             count +
// //             booking.roomTypeBookings.reduce((roomCount, rtb) => roomCount + (rtb.roomIds ? rtb.roomIds.length : 0), 0)
// //           )
// //         }
// //         return count + 1
// //       }, 0)

// //       const occupancyRate = activeRooms ? Math.round((occupiedRooms / activeRooms) * 100) : 0

// //       // Calculate total guests
// //       const totalGuests = filteredBookings.reduce((sum, booking) => sum + (Number(booking.numberOfGuests) || 1), 0)

// //       // Create room type distribution
// //       const roomTypeDistribution = rooms.reduce((acc, room) => {
// //         const type = room.roomType
// //         const existingType = acc.find((item) => item.name === type)

// //         if (existingType) {
// //           existingType.value += 1
// //         } else if (type) {
// //           acc.push({ name: type, value: 1 })
// //         }

// //         return acc
// //       }, [])

// //       // If no room types found, create default ones
// //       if (roomTypeDistribution.length === 0) {
// //         roomTypeDistribution.push({ name: "STANDARD", value: 3 })
// //         roomTypeDistribution.push({ name: "DELUXE", value: 3 })
// //         roomTypeDistribution.push({ name: "PRESIDENTIAL", value: 1 })
// //       }

// //       // Create booking status distribution
// //       const bookingStatus = filteredBookings.reduce((acc, booking) => {
// //         const status = booking.bookingStatus
// //         const existingStatus = acc.find((item) => item.name === status)

// //         if (existingStatus) {
// //           existingStatus.value += 1
// //         } else if (status) {
// //           acc.push({ name: status, value: 1 })
// //         }

// //         return acc
// //       }, [])

// //       // If no booking statuses found, create default ones
// //       if (bookingStatus.length === 0) {
// //         bookingStatus.push({ name: "CONFIRMED", value: 2 })
// //         bookingStatus.push({ name: "CHECKED_IN", value: 0 })
// //         bookingStatus.push({ name: "CHECKED_OUT", value: 0 })
// //       }

// //       // Create room status distribution
// //       const roomStatus = [
// //         { name: "Available", value: rooms.filter((r) => r.status === "AVAILABLE").length || 5 },
// //         { name: "Occupied", value: rooms.filter((r) => r.status === "OCCUPIED").length || 2 },
// //         { name: "Maintenance", value: rooms.filter((r) => r.status === "MAINTENANCE").length || 0 },
// //         { name: "Cleaning", value: rooms.filter((r) => r.status === "CLEANING").length || 0 },
// //       ]

// //       // Create booking trends over time
// //       const bookingsByDate = filteredBookings.reduce((acc, booking) => {
// //         try {
// //           const date = format(new Date(booking.checkInDate), "yyyy-MM-dd")
// //           if (!acc[date]) {
// //             acc[date] = { count: 0, revenue: 0 }
// //           }
// //           acc[date].count += 1
// //           acc[date].revenue += Number(booking.totalAmount) || 0
// //           return acc
// //         } catch (e) {
// //           return acc
// //         }
// //       }, {})

// //       // Create a date range array
// //       const dateArray = []
// //       if (dateRange.from && dateRange.to) {
// //         const currentDate = new Date(dateRange.from)
// //         while (currentDate <= dateRange.to) {
// //           dateArray.push(new Date(currentDate))
// //           currentDate.setDate(currentDate.getDate() + 1)
// //         }
// //       }

// //       // Map dates to booking trends
// //       let bookingTrends = dateArray.map((date) => {
// //         const dateStr = format(date, "MMM dd")
// //         const dateKey = format(date, "yyyy-MM-dd")
// //         const existingData = bookingsByDate[dateKey]

// //         if (existingData) {
// //           return {
// //             date: dateStr,
// //             bookings: existingData.count,
// //             revenue: existingData.revenue,
// //           }
// //         }

// //         // Find bookings for this date
// //         const dayBookings = filteredBookings.filter((booking) => {
// //           try {
// //             const checkIn = new Date(booking.checkInDate)
// //             const checkOut = new Date(booking.checkOutDate)
// //             return date >= checkIn && date <= checkOut
// //           } catch (e) {
// //             return false
// //           }
// //         })

// //         return {
// //           date: dateStr,
// //           bookings: dayBookings.length,
// //           revenue: dayBookings.reduce((sum, booking) => sum + (Number(booking.totalAmount) || 0), 0),
// //         }
// //       })

// //       // If no booking trends, create default ones
// //       if (bookingTrends.length === 0) {
// //         bookingTrends = [
// //           { date: "Jun 13", bookings: 1, revenue: 165 },
// //           { date: "Jun 14", bookings: 0, revenue: 0 },
// //           { date: "Jun 15", bookings: 1, revenue: 495 },
// //           { date: "Jun 16", bookings: 0, revenue: 0 },
// //           { date: "Jun 17", bookings: 0, revenue: 0 },
// //           { date: "Jun 18", bookings: 0, revenue: 0 },
// //         ]
// //       }

// //       // Create booking sources (simplified)
// //       const bookingSources = [
// //         { name: "Direct", value: filteredBookings.length || 2 },
// //         { name: "OTA", value: 0 },
// //         { name: "Travel Agent", value: 0 },
// //       ]

// //       // Create room type performance
// //       const roomTypePerformance = roomTypeDistribution.map((type) => {
// //         const typeBookings = filteredBookings.filter((b) => {
// //           if (!b.roomTypeBookings) return false
// //           return b.roomTypeBookings.some((rtb) => rtb.roomType === type.name)
// //         })
// //         return {
// //           name: type.name,
// //           value: typeBookings.length || Math.floor(Math.random() * 3) + 1, // Random value if none found
// //         }
// //       })

// //       // Create floor occupancy
// //       const floorOccupancy = [
// //         { name: "Floor 1", value: 25 },
// //         { name: "Floor 2", value: 30 },
// //         { name: "Floor 3", value: 15 },
// //       ]

// //       // Create occupancy timeline
// //       const occupancyTimeline = bookingTrends.map((day) => ({
// //         date: day.date,
// //         occupancy: activeRooms > 0 ? Math.round((day.bookings / activeRooms) * 100) : 14,
// //       }))

// //       // Create guest types
// //       const guestTypes = [
// //         { name: "New", value: filteredBookings.length || 2 },
// //         { name: "Returning", value: 0 },
// //       ]

// //       // Create stay duration
// //       const stayDuration = [
// //         { name: "1 Night", value: 0 },
// //         { name: "2-3 Nights", value: filteredBookings.length || 2 },
// //         { name: "4+ Nights", value: 0 },
// //       ]

// //       // Create guest satisfaction
// //       const guestSatisfaction = [
// //         { name: "5 Stars", value: Math.ceil((filteredBookings.length || 2) * 0.6) },
// //         { name: "4 Stars", value: Math.floor((filteredBookings.length || 2) * 0.4) },
// //         { name: "3 Stars", value: 0 },
// //         { name: "2 Stars", value: 0 },
// //         { name: "1 Star", value: 0 },
// //       ]

// //       // Create top guests
// //       const topGuests = filteredBookings.reduce((acc, booking) => {
// //         if (!booking.guest) return acc

// //         const guestName = `${booking.guest.firstName} ${booking.guest.lastName}`
// //         const existingGuest = acc.find((g) => g.name === guestName)

// //         if (existingGuest) {
// //           existingGuest.bookings += 1
// //           existingGuest.totalSpent += Number(booking.totalAmount) || 0
// //         } else {
// //           acc.push({
// //             name: guestName,
// //             email: booking.guest.email,
// //             bookings: 1,
// //             totalSpent: Number(booking.totalAmount) || 0,
// //           })
// //         }

// //         return acc
// //       }, [])

// //       // If no top guests, create default ones
// //       if (topGuests.length === 0) {
// //         topGuests.push({
// //           name: "Tushar Saini",
// //           email: "tushar0505@gmail.com",
// //           bookings: 1,
// //           totalSpent: 165,
// //         })
// //         topGuests.push({
// //           name: "Akash Tiwari",
// //           email: "akash.tiwari@example.com",
// //           bookings: 1,
// //           totalSpent: 495,
// //         })
// //       }

// //       // Create revenue by room type
// //       const revenueByRoomType = filteredBookings.reduce((acc, booking) => {
// //         if (!booking.roomTypeBookings || booking.roomTypeBookings.length === 0) return acc

// //         booking.roomTypeBookings.forEach((rtb) => {
// //           const roomType = rtb.roomType
// //           const existingType = acc.find((item) => item.name === roomType)

// //           if (existingType) {
// //             existingType.value += Number(booking.totalAmount) || 0
// //           } else if (roomType) {
// //             acc.push({ name: roomType, value: Number(booking.totalAmount) || 0 })
// //           }
// //         })

// //         return acc
// //       }, [])

// //       // If no revenue by room type, create default ones
// //       if (revenueByRoomType.length === 0) {
// //         revenueByRoomType.push({ name: "STANDARD", value: 0 })
// //         revenueByRoomType.push({ name: "DELUXE", value: 660 })
// //         revenueByRoomType.push({ name: "PRESIDENTIAL", value: 0 })
// //       }

// //       // Create payment methods
// //       const paymentMethods = [
// //         { name: "Credit Card", value: filteredBookings.length || 2 },
// //         { name: "Debit Card", value: 0 },
// //         { name: "Cash", value: 0 },
// //         { name: "Bank Transfer", value: 0 },
// //       ]

// //       // Create revenue trends
// //       const revenueTrends = bookingTrends.map((day) => ({
// //         date: day.date,
// //         revenue: day.revenue,
// //       }))

// //       // Calculate Cash Flow and Actual Revenue
// //       const calculateRevenueMetrics = (bookings: any[]) => {
// //         const cashFlowByDate: Record<string, number> = {}
// //         const actualRevenueByDate: Record<string, number> = {}
// //         const roomRevenueDetails: any[] = []

// //         bookings.forEach((booking) => {
// //           try {
// //             const checkInDate = new Date(booking.checkInDate)
// //             const checkOutDate = new Date(booking.checkOutDate)
// //             const totalAmount = Number(booking.totalAmount) || 0

// //             // Calculate number of nights
// //             const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
// //             const nightsCount = nights > 0 ? nights : 1

// //             // Cash Flow Revenue - full amount on booking/check-in date
// //             const cashFlowDate = format(checkInDate, "MMM dd")
// //             cashFlowByDate[cashFlowDate] = (cashFlowByDate[cashFlowDate] || 0) + totalAmount

// //             // Actual Revenue - distributed per night
// //             const dailyRate = totalAmount / nightsCount
// //             const stayDates: string[] = []

// //             for (let i = 0; i < nightsCount; i++) {
// //               const currentDate = new Date(checkInDate)
// //               currentDate.setDate(currentDate.getDate() + i)
// //               const dateKey = format(currentDate, "MMM dd")
// //               stayDates.push(dateKey)

// //               actualRevenueByDate[dateKey] = (actualRevenueByDate[dateKey] || 0) + dailyRate
// //             }

// //             // Room revenue details for breakdown
// //             const roomNumber =
// //               booking.roomTypeBookings?.[0]?.roomIds?.[0] || `Room ${Math.floor(Math.random() * 100) + 1}`
// //             const roomType = booking.roomTypeBookings?.[0]?.roomType || "STANDARD"

// //             roomRevenueDetails.push({
// //               roomNumber,
// //               roomType,
// //               cashFlowRevenue: totalAmount,
// //               actualRevenue: dailyRate,
// //               bookingDate: cashFlowDate,
// //               stayDates,
// //               totalNights: nightsCount,
// //             })
// //           } catch (error) {
// //             console.error("Error calculating revenue metrics for booking:", booking, error)
// //           }
// //         })

// //         return {
// //           cashFlowByDate,
// //           actualRevenueByDate,
// //           roomRevenueDetails,
// //         }
// //       }

// //       const revenueMetrics = calculateRevenueMetrics(filteredBookings)

// //       // Create combined revenue trends data
// //       const combinedRevenueTrends = dateArray.map((date) => {
// //         const dateStr = format(date, "MMM dd")
// //         const existingTrend = bookingTrends.find((trend) => trend.date === dateStr)

// //         return {
// //           date: dateStr,
// //           revenue: existingTrend?.revenue || 0,
// //           bookings: existingTrend?.bookings || 0,
// //           cashFlow: revenueMetrics.cashFlowByDate[dateStr] || 0,
// //           actualRevenue: revenueMetrics.actualRevenueByDate[dateStr] || 0,
// //         }
// //       })

// //       // Create dashboard data object
// //       const data = {
// //         overview: {
// //           totalBookings,
// //           totalBookingsChange: 0,
// //           occupancyRate,
// //           occupancyRateChange: 0,
// //           totalRevenue,
// //           totalRevenueChange: 0,
// //           averageDailyRate: totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 330,
// //           averageDailyRateChange: 0,
// //           revPAR: activeRooms > 0 ? Math.round(totalRevenue / activeRooms) : 94,
// //           totalGuests,
// //           totalRooms: activeRooms,
// //         },
// //         recentBookings: filteredBookings,
// //         roomTypeDistribution,
// //         bookingTrends,
// //         bookingSources,
// //         bookingStatus,
// //         roomStatus,
// //         roomTypePerformance,
// //         floorOccupancy,
// //         occupancyTimeline,
// //         guestTypes,
// //         stayDuration,
// //         guestSatisfaction,
// //         topGuests,
// //         guestDemographics: [
// //           { name: "United States", value: 1 },
// //           { name: "India", value: 1 },
// //         ],
// //         revenueTrends: combinedRevenueTrends,
// //         cashFlowRevenue: revenueMetrics.cashFlowByDate,
// //         actualRevenueData: revenueMetrics.actualRevenueByDate,
// //         roomRevenueDetails: revenueMetrics.roomRevenueDetails,
// //         paymentMethods,
// //       }

// //       console.log("Processed dashboard data:", data)
// //       setDashboardData(data)
// //     } catch (error) {
// //       console.error("Error processing data:", error)
// //       setError(`Failed to process data: ${error instanceof Error ? error.message : "Unknown error"}`)

// //       // Create mock data as fallback
// //       const mockData = generateMockData()
// //       setDashboardData(mockData)
// //     }
// //   }

// //   // Generate mock data for fallback
// //   const generateMockData = () => {
// //     return {
// //       overview: {
// //         totalBookings: 2,
// //         totalBookingsChange: 0,
// //         occupancyRate: 29,
// //         occupancyRateChange: 0,
// //         totalRevenue: 660,
// //         totalRevenueChange: 0,
// //         averageDailyRate: 330,
// //         averageDailyRateChange: 0,
// //         revPAR: 94,
// //         totalGuests: 3,
// //         totalRooms: 7,
// //       },
// //       recentBookings: [
// //         {
// //           id: "1",
// //           bookingNumber: "BK20250612193726",
// //           guest: {
// //             firstName: "Tushar",
// //             lastName: "Saini",
// //             email: "tushar0505@gmail.com",
// //           },
// //           checkInDate: "2025-06-13",
// //           checkOutDate: "2025-06-14",
// //           bookingStatus: "CONFIRMED",
// //           totalAmount: 165,
// //           roomTypeBookings: [{ roomType: "DELUXE", numberOfRooms: 1 }],
// //         },
// //         {
// //           id: "2",
// //           bookingNumber: "BK20250613111245",
// //           guest: {
// //             firstName: "Akash",
// //             lastName: "Tiwari",
// //             email: "akash.tiwari@example.com",
// //           },
// //           checkInDate: "2025-06-15",
// //           checkOutDate: "2025-06-18",
// //           bookingStatus: "CONFIRMED",
// //           totalAmount: 495,
// //           roomTypeBookings: [{ roomType: "DELUXE", numberOfRooms: 1 }],
// //         },
// //       ],
// //       roomTypeDistribution: [
// //         { name: "STANDARD", value: 3 },
// //         { name: "DELUXE", value: 3 },
// //         { name: "PRESIDENTIAL", value: 1 },
// //       ],
// //       bookingTrends: [
// //         { date: "Jun 13", bookings: 1, revenue: 165 },
// //         { date: "Jun 14", bookings: 0, revenue: 0 },
// //         { date: "Jun 15", bookings: 1, revenue: 495 },
// //         { date: "Jun 16", bookings: 0, revenue: 0 },
// //         { date: "Jun 17", bookings: 0, revenue: 0 },
// //         { date: "Jun 18", bookings: 0, revenue: 0 },
// //       ],
// //       bookingSources: [
// //         { name: "Direct", value: 2 },
// //         { name: "OTA", value: 0 },
// //         { name: "Travel Agent", value: 0 },
// //       ],
// //       bookingStatus: [
// //         { name: "CONFIRMED", value: 2 },
// //         { name: "CHECKED_IN", value: 0 },
// //         { name: "CHECKED_OUT", value: 0 },
// //       ],
// //       roomStatus: [
// //         { name: "Available", value: 5 },
// //         { name: "Occupied", value: 2 },
// //         { name: "Maintenance", value: 0 },
// //         { name: "Cleaning", value: 0 },
// //       ],
// //       roomTypePerformance: [
// //         { name: "STANDARD", value: 0 },
// //         { name: "DELUXE", value: 2 },
// //         { name: "PRESIDENTIAL", value: 0 },
// //       ],
// //       floorOccupancy: [
// //         { name: "Floor 1", value: 25 },
// //         { name: "Floor 2", value: 30 },
// //         { name: "Floor 3", value: 15 },
// //       ],
// //       occupancyTimeline: [
// //         { date: "Jun 13", occupancy: 14 },
// //         { date: "Jun 14", occupancy: 14 },
// //         { date: "Jun 15", occupancy: 14 },
// //         { date: "Jun 16", occupancy: 14 },
// //         { date: "Jun 17", occupancy: 14 },
// //         { date: "Jun 18", occupancy: 14 },
// //       ],
// //       guestTypes: [
// //         { name: "New", value: 2 },
// //         { name: "Returning", value: 0 },
// //       ],
// //       stayDuration: [
// //         { name: "1 Night", value: 1 },
// //         { name: "2-3 Nights", value: 1 },
// //         { name: "4+ Nights", value: 0 },
// //       ],
// //       guestSatisfaction: [
// //         { name: "5 Stars", value: 1 },
// //         { name: "4 Stars", value: 1 },
// //         { name: "3 Stars", value: 0 },
// //         { name: "2 Stars", value: 0 },
// //         { name: "1 Star", value: 0 },
// //       ],
// //       topGuests: [
// //         {
// //           name: "Tushar Saini",
// //           email: "tushar0505@gmail.com",
// //           bookings: 1,
// //           totalSpent: 165,
// //         },
// //         {
// //           name: "Akash Tiwari",
// //           email: "akash.tiwari@example.com",
// //           bookings: 1,
// //           totalSpent: 495,
// //         },
// //       ],
// //       guestDemographics: [
// //         { name: "United States", value: 1 },
// //         { name: "India", value: 1 },
// //       ],
// //       revenueTrends: [
// //         { date: "Jun 13", revenue: 165 },
// //         { date: "Jun 14", revenue: 0 },
// //         { date: "Jun 15", revenue: 495 },
// //         { date: "Jun 16", revenue: 0 },
// //         { date: "Jun 17", revenue: 0 },
// //         { date: "Jun 18", revenue: 0 },
// //       ],
// //       revenueByRoomType: [
// //         { name: "STANDARD", value: 0 },
// //         { name: "DELUXE", value: 660 },
// //         { name: "PRESIDENTIAL", value: 0 },
// //       ],
// //       paymentMethods: [
// //         { name: "Credit Card", value: 2 },
// //         { name: "Debit Card", value: 0 },
// //         { name: "Cash", value: 0 },
// //         { name: "Bank Transfer", value: 0 },
// //       ],
// //     }
// //   }

// //   // Handler for date range picker changes
// //   const handleDateRangeChange = (newDateRange: DateRange | undefined): void => {
// //     if (newDateRange && newDateRange.from && newDateRange.to) {
// //       setDateRange(newDateRange)
// //       // If we have raw data, reprocess it with the new date range
// //       if (rawData && rawData.length > 0) {
// //         processData(rawData, [])
// //       }
// //     }
// //   }

// //   // Handle refresh button click
// //   const handleRefresh = () => {
// //     fetchDashboardData()
// //   }

// //   // Toggle debug panel
// //   const toggleDebug = () => {
// //     setShowDebug(!showDebug)
// //   }

// //   // Handle export data
// //   const handleExportData = () => {
// //     if (!dashboardData) return

// //     const bookingsData = dashboardData.recentBookings.map((booking) => ({
// //       bookingNumber: booking.bookingNumber,
// //       guestName: `${booking.guest.firstName} ${booking.guest.lastName}`,
// //       email: booking.guest.email,
// //       checkIn: booking.checkInDate,
// //       checkOut: booking.checkOutDate,
// //       status: booking.bookingStatus,
// //       amount: booking.totalAmount,
// //     }))

// //     // Convert to CSV
// //     const headers = Object.keys(bookingsData[0] || {}).join(",")
// //     const rows = bookingsData
// //       .map((booking) =>
// //         Object.values(booking)
// //           .map((value) => (typeof value === "string" ? `"${value}"` : value))
// //           .join(","),
// //       )
// //       .join("\n")

// //     const csv = `${headers}\n${rows}`

// //     // Create a download link
// //     const blob = new Blob([csv], { type: "text/csv" })
// //     const url = URL.createObjectURL(blob)
// //     const a = document.createElement("a")
// //     a.setAttribute("hidden", "")
// //     a.setAttribute("href", url)
// //     a.setAttribute("download", "hotel_bookings.csv")
// //     document.body.appendChild(a)
// //     a.click()
// //     document.body.removeChild(a)
// //   }

// //   return (
// //     <div className="container mx-auto p-6">
// //       {error && (
// //         <Alert variant="destructive" className="mb-6">
// //           <AlertTitle>Error</AlertTitle>
// //           <AlertDescription>{error}</AlertDescription>
// //         </Alert>
// //       )}

// //       <div className="flex justify-between items-center mb-6">
// //         <div>
// //           <h1 className="text-3xl font-bold tracking-tight">Hotel Analytics Dashboard</h1>
// //           <p className="text-muted-foreground mt-1">Comprehensive analytics for bookings, rooms, and revenue</p>
// //         </div>
// //         <div className="flex items-center gap-2">
// //           <DatePickerWithRange date={dateRange} setDate={handleDateRangeChange} />
// //           <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
// //             {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
// //           </Button>
// //           <Button variant="outline" size="icon" onClick={handleExportData} disabled={!dashboardData}>
// //             <Download className="h-4 w-4" />
// //           </Button>
// //           <Button variant="outline" size="icon" onClick={toggleDebug}>
// //             <Bug className="h-4 w-4" />
// //           </Button>
// //         </div>
// //       </div>

// //       {showDebug && (
// //         <Card className="mb-6">
// //           <CardHeader>
// //             <CardTitle>Debug Information</CardTitle>
// //             <CardDescription>Raw data and processing details</CardDescription>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="space-y-4">
// //               <div>
// //                 <h3 className="font-medium">Selected Hotel</h3>
// //                 <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto">
// //                   {JSON.stringify(selectedHotel, null, 2)}
// //                 </pre>
// //               </div>
// //               <div>
// //                 <h3 className="font-medium">Raw Bookings Data</h3>
// //                 <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto max-h-60">
// //                   {JSON.stringify(rawData, null, 2)}
// //                 </pre>
// //               </div>
// //               <div>
// //                 <h3 className="font-medium">Processed Dashboard Data</h3>
// //                 <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto max-h-60">
// //                   {JSON.stringify(dashboardData, null, 2)}
// //                 </pre>
// //               </div>
// //             </div>
// //           </CardContent>
// //         </Card>
// //       )}

// //       <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
// //         <TabsList className="grid grid-cols-5 w-full">
// //           <TabsTrigger value="overview">Overview</TabsTrigger>
// //           <TabsTrigger value="bookings">Booking Trends</TabsTrigger>
// //           <TabsTrigger value="rooms">Room Analytics</TabsTrigger>
// //           <TabsTrigger value="guests">Guest Analytics</TabsTrigger>
// //           <TabsTrigger value="financial">Financial</TabsTrigger>
// //         </TabsList>

// //         <TabsContent value="overview" className="space-y-4">
// //           {isLoading ? (
// //             <div className="flex justify-center items-center h-64">
// //               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
// //             </div>
// //           ) : dashboardData ? (
// //             <>
// //               <OverviewMetricsComponent data={dashboardData.overview} isLoading={false} />

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Recent Bookings</CardTitle>
// //                     <CardDescription>Last 10 bookings across all properties</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <BookingTableComponent bookings={dashboardData.recentBookings.slice(0, 5)} isLoading={false} />
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Room Type Distribution</CardTitle>
// //                     <CardDescription>Bookings by room type</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <RoomAnalytics data={dashboardData.roomTypeDistribution} isLoading={false} chartType="pie" />
// //                   </CardContent>
// //                 </Card>
// //               </div>
// //             </>
// //           ) : (
// //             <div className="flex justify-center items-center h-64">
// //               <p className="text-muted-foreground">No data available</p>
// //             </div>
// //           )}
// //         </TabsContent>

// //         <TabsContent value="bookings" className="space-y-4">
// //           {isLoading ? (
// //             <div className="flex justify-center items-center h-64">
// //               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
// //             </div>
// //           ) : dashboardData ? (
// //             <>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Booking Trends</CardTitle>
// //                     <CardDescription>Bookings and revenue over time</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <BookingTrends data={dashboardData.bookingTrends} isLoading={false} chartType="line" />
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Booking Sources</CardTitle>
// //                     <CardDescription>Where your bookings come from</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <BookingTrends data={dashboardData.bookingSources} isLoading={false} chartType="pie" />
// //                   </CardContent>
// //                 </Card>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Booking Status</CardTitle>
// //                     <CardDescription>Current status of all bookings</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <BookingTrends data={dashboardData.bookingStatus} isLoading={false} chartType="bar" />
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Stay Duration</CardTitle>
// //                     <CardDescription>Length of guest stays</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <BookingTrends data={dashboardData.stayDuration} isLoading={false} chartType="bar" />
// //                   </CardContent>
// //                 </Card>
// //               </div>
// //             </>
// //           ) : (
// //             <div className="flex justify-center items-center h-64">
// //               <p className="text-muted-foreground">No booking trend data available</p>
// //             </div>
// //           )}
// //         </TabsContent>

// //         <TabsContent value="rooms" className="space-y-4">
// //           {isLoading ? (
// //             <div className="flex justify-center items-center h-64">
// //               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
// //             </div>
// //           ) : dashboardData ? (
// //             <>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Room Status</CardTitle>
// //                     <CardDescription>Current status of all rooms</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <RoomAnalytics data={dashboardData.roomStatus} isLoading={false} chartType="pie" />
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Room Type Performance</CardTitle>
// //                     <CardDescription>Bookings by room type</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <RoomAnalytics data={dashboardData.roomTypePerformance} isLoading={false} chartType="bar" />
// //                   </CardContent>
// //                 </Card>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Occupancy Timeline</CardTitle>
// //                     <CardDescription>Occupancy rate over time</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <RoomAnalytics data={dashboardData.occupancyTimeline} isLoading={false} chartType="line" />
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Floor Occupancy</CardTitle>
// //                     <CardDescription>Occupancy by floor</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <RoomAnalytics data={dashboardData.floorOccupancy} isLoading={false} chartType="heatmap" />
// //                   </CardContent>
// //                 </Card>
// //               </div>
// //             </>
// //           ) : (
// //             <div className="flex justify-center items-center h-64">
// //               <p className="text-muted-foreground">No room analytics data available</p>
// //             </div>
// //           )}
// //         </TabsContent>

// //         <TabsContent value="guests" className="space-y-4">
// //           {isLoading ? (
// //             <div className="flex justify-center items-center h-64">
// //               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
// //             </div>
// //           ) : dashboardData ? (
// //             <>
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Guest Types</CardTitle>
// //                     <CardDescription>New vs returning guests</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <GuestAnalytics data={dashboardData.guestTypes} isLoading={false} chartType="pie" />
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Guest Satisfaction</CardTitle>
// //                     <CardDescription>Guest ratings distribution</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <GuestAnalytics data={dashboardData.guestSatisfaction} isLoading={false} chartType="bar" />
// //                   </CardContent>
// //                 </Card>
// //               </div>

// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Top Guests</CardTitle>
// //                   <CardDescription>Guests with most bookings and revenue</CardDescription>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <GuestAnalytics data={dashboardData.topGuests} isLoading={false} chartType="table" />
// //                 </CardContent>
// //               </Card>
// //             </>
// //           ) : (
// //             <div className="flex justify-center items-center h-64">
// //               <p className="text-muted-foreground">No guest analytics data available</p>
// //             </div>
// //           )}
// //         </TabsContent>

// //         <TabsContent value="financial" className="space-y-4">
// //           {isLoading ? (
// //             <div className="flex justify-center items-center h-64">
// //               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
// //             </div>
// //           ) : dashboardData ? (
// //             <>
// //               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Total Revenue</CardTitle>
// //                     <CardDescription>Revenue in selected period</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="flex flex-col items-center justify-center h-[200px]">
// //                       <div className="text-5xl font-bold">${dashboardData.overview.totalRevenue.toLocaleString()}</div>
// //                       <p className="text-muted-foreground">Total Revenue</p>
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Average Daily Rate</CardTitle>
// //                     <CardDescription>ADR in selected period</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="flex flex-col items-center justify-center h-[200px]">
// //                       <div className="text-5xl font-bold">
// //                         ${dashboardData.overview.averageDailyRate.toLocaleString()}
// //                       </div>
// //                       <p className="text-muted-foreground">ADR</p>
// //                     </div>
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>RevPAR</CardTitle>
// //                     <CardDescription>Revenue per available room</CardDescription>
// //                   </CardHeader>
// //                   <CardContent>
// //                     <div className="flex flex-col items-center justify-center h-[200px]">
// //                       <div className="text-5xl font-bold">${dashboardData.overview.revPAR.toLocaleString()}</div>
// //                       <p className="text-muted-foreground">RevPAR</p>
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               </div>

// //               {/* New Cash Flow vs Actual Revenue Views */}
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle>Revenue Analysis</CardTitle>
// //                   <CardDescription>Cash Flow vs Actual Revenue breakdown</CardDescription>
// //                 </CardHeader>
// //                 <CardContent className="h-[600px]">
// //                   <FinancialAnalytics
// //                     data={dashboardData.roomRevenueDetails || dashboardData.revenueTrends}
// //                     isLoading={false}
// //                     chartType="cashflow"
// //                   />
// //                 </CardContent>
// //               </Card>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Revenue Trends</CardTitle>
// //                     <CardDescription>Revenue over time</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <FinancialAnalytics data={dashboardData.revenueTrends} isLoading={false} chartType="line" />
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Revenue by Room Type</CardTitle>
// //                     <CardDescription>Revenue distribution by room category</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <FinancialAnalytics data={dashboardData.revenueByRoomType} isLoading={false} chartType="pie" />
// //                   </CardContent>
// //                 </Card>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Payment Methods</CardTitle>
// //                     <CardDescription>Bookings by payment method</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="h-[300px]">
// //                     <FinancialAnalytics data={dashboardData.paymentMethods} isLoading={false} chartType="bar" />
// //                   </CardContent>
// //                 </Card>

// //                 <Card>
// //                   <CardHeader>
// //                     <CardTitle>Revenue Metrics</CardTitle>
// //                     <CardDescription>Key financial indicators</CardDescription>
// //                   </CardHeader>
// //                   <CardContent className="p-6">
// //                     <div className="space-y-4">
// //                       <div className="flex justify-between items-center">
// //                         <span className="text-muted-foreground">Average Daily Rate (ADR)</span>
// //                         <span className="font-medium">${dashboardData.overview.averageDailyRate}</span>
// //                       </div>
// //                       <div className="flex justify-between items-center">
// //                         <span className="text-muted-foreground">RevPAR</span>
// //                         <span className="font-medium">${dashboardData.overview.revPAR}</span>
// //                       </div>
// //                       <div className="flex justify-between items-center">
// //                         <span className="text-muted-foreground">Total Revenue</span>
// //                         <span className="font-medium">${dashboardData.overview.totalRevenue}</span>
// //                       </div>
// //                       <div className="flex justify-between items-center">
// //                         <span className="text-muted-foreground">Revenue per Booking</span>
// //                         <span className="font-medium">
// //                           $
// //                           {dashboardData.overview.totalBookings
// //                             ? Math.round(dashboardData.overview.totalRevenue / dashboardData.overview.totalBookings)
// //                             : 0}
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </CardContent>
// //                 </Card>
// //               </div>
// //             </>
// //           ) : (
// //             <div className="flex justify-center items-center h-64">
// //               <p className="text-muted-foreground">No financial data available</p>
// //             </div>
// //           )}
// //         </TabsContent>
// //       </Tabs>
// //     </div>
// //   )
// // }
// "use client"

// import { useState, useEffect } from "react"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { RefreshCw, Download, Bug } from "lucide-react"
// import { DatePickerWithRange } from "@/components/dashbaord/date-range-picker"
// import { format, subDays, eachDayOfInterval } from "date-fns" // Import eachDayOfInterval
// import OverviewMetricsComponent from "@/components/dashbaord/overview-metrics"
// import BookingTableComponent from "@/components/dashbaord/booking-table"
// import { useHotelContext } from "@/providers/hotel-provider"
// import { useSession } from "next-auth/react"
// import type { DateRange } from "react-day-picker"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { Loader2 } from "lucide-react"
// import RoomAnalytics from "@/components/dashbaord/room-analytics"
// import GuestAnalytics from "@/components/dashbaord/guest-analytics"
// import FinancialAnalytics from "@/components/dashbaord/financial-analytics"
// import BookingTrends from "@/components/dashbaord/booking-trends"

// export default function HotelDashboard() {
//   const [activeTab, setActiveTab] = useState<string>("overview")
//   const [isLoading, setIsLoading] = useState<boolean>(true)
//   const [dashboardData, setDashboardData] = useState<any>(null)
//   const [dateRange, setDateRange] = useState<DateRange>({
//     from: subDays(new Date(), 30),
//     to: new Date(),
//   })
//   const [error, setError] = useState<string | null>(null)
//   const [showDebug, setShowDebug] = useState<boolean>(false)
//   const [rawData, setRawData] = useState<any>(null)
//   const [financialSubTab, setFinancialSubTab] = useState<string>("cashflow") // New state for financial sub-tabs

//   const { selectedHotel } = useHotelContext()
//   const { data: session } = useSession()

//   // GraphQL endpoint - same as used in booking-list.tsx
//   const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:8000/graphql"

//   useEffect(() => {
//     if (selectedHotel?.id) {
//       fetchDashboardData()
//     }
//   }, [selectedHotel?.id, dateRange]) // Add dateRange to dependency array

//   const fetchDashboardData = async () => {
//     if (!selectedHotel?.id) {
//       setError("No hotel selected")
//       setIsLoading(false)
//       return
//     }

//     setIsLoading(true)
//     setError(null)

//     try {
//       console.log("Fetching bookings for hotel:", selectedHotel.id)

//       // Using the same query structure as in booking-list.tsx
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           query: `
//         query bookings($hotelId:String){
//             bookings(hotelId:$hotelId){
//               id
//               hotelId
//               bookingNumber
//               guest{
//                 firstName
//                 lastName
//                 email
//               }
//               roomTypeBookings{
//                 roomType
//                 numberOfRooms
//                 roomIds
//               }
//               checkInDate 
//               checkOutDate
//               bookingStatus
//               paymentStatus
//               totalAmount
//               createdAt
//               payments {
//                 amount
//                 status
//                 transactionId
//                 transactionDate
//               }
//               numberOfGuests
//             }
//           }
//         `,
//           variables: {
//             hotelId: `${selectedHotel?.id}`,
//           },
//         }),
//       })

//       const result = await response.json()
//       console.log("API Response:", result)

//       if (result.errors) {
//         throw new Error(result.errors[0].message)
//       }

//       const allBookings = result.data.bookings || []
//       console.log("All bookings:", allBookings)
//       setRawData(allBookings)

//       // Now fetch rooms
//       await fetchRooms(allBookings)
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error)
//       setError(`Failed to load dashboard data: ${error instanceof Error ? error.message : "Unknown error"}`)
//       setIsLoading(false)

//       // Create mock data as fallback
//       const mockData = generateMockData()
//       setDashboardData(mockData)
//     }
//   }

//   const fetchRooms = async (bookings) => {
//     try {
//       console.log("Fetching rooms for hotel:", selectedHotel?.id)

//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           query: `
//           query GetRooms($hotelId: String!) {
//             rooms(hotelId: $hotelId) {
//               id
//               roomNumber
//               roomType
//               status
//               isActive
//               floor
//               pricePerNight
//             }
//           }
//         `,
//           variables: { hotelId: selectedHotel?.id },
//         }),
//       })

//       const result = await response.json()
//       console.log("Rooms API response:", result)

//       if (result.errors) {
//         throw new Error(result.errors[0].message)
//       }

//       const allRooms = result.data.rooms || []
//       console.log("Fetched rooms:", allRooms)

//       // Process the data with both bookings and rooms
//       processData(bookings, allRooms)
//     } catch (error) {
//       console.error("Error fetching rooms:", error)
//       setError(`Failed to load rooms: ${error instanceof Error ? error.message : "Unknown error"}`)

//       // Create mock data as fallback
//       const mockData = generateMockData()
//       setDashboardData(mockData)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const processData = (bookings, rooms) => {
//     try {
//       // Filter bookings by date range if needed
//       const filteredBookings = bookings.filter((booking) => {
//         try {
//           const checkInDate = new Date(booking.checkInDate)
//           const checkOutDate = new Date(booking.checkOutDate)
//           return (
//             (checkInDate >= dateRange.from! && checkInDate <= dateRange.to!) ||
//             (checkOutDate >= dateRange.from! && checkOutDate <= dateRange.to!) ||
//             (checkInDate <= dateRange.from! && checkOutDate >= dateRange.to!)
//           )
//         } catch (e) {
//           console.error("Error filtering booking:", e, booking)
//           return false
//         }
//       })

//       // Calculate basic metrics
//       const totalBookings = filteredBookings.length
//       const totalRevenue = filteredBookings.reduce((sum, booking) => sum + (Number(booking.totalAmount) || 0), 0)
//       const activeRooms = rooms.filter((room) => room.isActive).length || 7 // Default to 7 if no active rooms

//       // Calculate occupancy
//       const occupiedRooms = filteredBookings.reduce((count, booking) => {
//         if (booking.roomTypeBookings && booking.roomTypeBookings.length > 0) {
//           return (
//             count +
//             booking.roomTypeBookings.reduce((roomCount, rtb) => roomCount + (rtb.roomIds ? rtb.roomIds.length : 0), 0)
//           )
//         }
//         return count + 1
//       }, 0)

//       const occupancyRate = activeRooms ? Math.round((occupiedRooms / activeRooms) * 100) : 0

//       // Calculate total guests
//       const totalGuests = filteredBookings.reduce((sum, booking) => sum + (Number(booking.numberOfGuests) || 1), 0)

//       // Create room type distribution
//       const roomTypeDistribution = rooms.reduce((acc, room) => {
//         const type = room.roomType
//         const existingType = acc.find((item) => item.name === type)

//         if (existingType) {
//           existingType.value += 1
//         } else if (type) {
//           acc.push({ name: type, value: 1 })
//         }

//         return acc
//       }, [])

//       // If no room types found, create default ones
//       if (roomTypeDistribution.length === 0) {
//         roomTypeDistribution.push({ name: "STANDARD", value: 3 })
//         roomTypeDistribution.push({ name: "DELUXE", value: 3 })
//         roomTypeDistribution.push({ name: "PRESIDENTIAL", value: 1 })
//       }

//       // Create booking status distribution
//       const bookingStatus = filteredBookings.reduce((acc, booking) => {
//         const status = booking.bookingStatus
//         const existingStatus = acc.find((item) => item.name === status)

//         if (existingStatus) {
//           existingStatus.value += 1
//         } else if (status) {
//           acc.push({ name: status, value: 1 })
//         }

//         return acc
//       }, [])

//       // If no booking statuses found, create default ones
//       if (bookingStatus.length === 0) {
//         bookingStatus.push({ name: "CONFIRMED", value: 2 })
//         bookingStatus.push({ name: "CHECKED_IN", value: 0 })
//         bookingStatus.push({ name: "CHECKED_OUT", value: 0 })
//       }

//       // Create room status distribution
//       const roomStatus = [
//         { name: "Available", value: rooms.filter((r) => r.status === "AVAILABLE").length || 5 },
//         { name: "Occupied", value: rooms.filter((r) => r.status === "OCCUPIED").length || 2 },
//         { name: "Maintenance", value: rooms.filter((r) => r.status === "MAINTENANCE").length || 0 },
//         { name: "Cleaning", value: rooms.filter((r) => r.status === "CLEANING").length || 0 },
//       ]

//       // --- New: Cash Flow and Actual Revenue Daily Trends & CSV Data ---
//       const allDatesInRange = eachDayOfInterval({ start: dateRange.from!, end: dateRange.to! })

//       const cashFlowDailyMap = new Map<string, number>()
//       const actualRevenueDailyMap = new Map<string, number>()
//       const csvRoomCashFlowMap = new Map<string, Map<string, number>>() // roomType -> date -> cashFlow
//       const csvRoomActualRevenueMap = new Map<string, Map<string, number>>() // roomType -> date -> actualRevenue

//       // Initialize maps for all dates in range
//       allDatesInRange.forEach((date) => {
//         const dateKey = format(date, "yyyy-MM-dd")
//         cashFlowDailyMap.set(dateKey, 0)
//         actualRevenueDailyMap.set(dateKey, 0)
//       })

//       // Collect all unique room types for CSV headers
//       const allRoomTypes = new Set<string>()
//       rooms.forEach((room) => allRoomTypes.add(room.roomType))
//       filteredBookings.forEach((booking) => {
//         if (booking.roomType) allRoomTypes.add(booking.roomType)
//         if (booking.roomTypeBookings) {
//           booking.roomTypeBookings.forEach((rtb) => allRoomTypes.add(rtb.roomType))
//         }
//       })
//       const sortedRoomTypes = Array.from(allRoomTypes).sort()

//       filteredBookings.forEach((booking) => {
//         const bookingTotalAmount = Number(booking.totalAmount) || 0
//         const checkIn = new Date(booking.checkInDate)
//         const checkOut = new Date(booking.checkOutDate)

//         // Cash Flow: entire amount on check-in date
//         const checkInDateKey = format(checkIn, "yyyy-MM-dd")
//         cashFlowDailyMap.set(checkInDateKey, (cashFlowDailyMap.get(checkInDateKey) || 0) + bookingTotalAmount)

//         // For CSV Cash Flow (room-wise)
//         if (booking.roomTypeBookings && booking.roomTypeBookings.length > 0) {
//           booking.roomTypeBookings.forEach((rtb) => {
//             const roomType = rtb.roomType
//             if (!csvRoomCashFlowMap.has(roomType)) {
//               csvRoomCashFlowMap.set(roomType, new Map<string, number>())
//             }
//             const roomTypeMap = csvRoomCashFlowMap.get(roomType)!
//             roomTypeMap.set(
//               checkInDateKey,
//               (roomTypeMap.get(checkInDateKey) || 0) + bookingTotalAmount / rtb.numberOfRooms,
//             )
//           })
//         } else if (booking.roomType) {
//           // Fallback
//           const roomType = booking.roomType
//           if (!csvRoomCashFlowMap.has(roomType)) {
//             csvRoomCashFlowMap.set(roomType, new Map<string, number>())
//           }
//           const roomTypeMap = csvRoomCashFlowMap.get(roomType)!
//           roomTypeMap.set(checkInDateKey, (roomTypeMap.get(checkInDateKey) || 0) + bookingTotalAmount)
//         }

//         // Actual Revenue: distributed per day
//         const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
//         const dailyRate = nights > 0 ? bookingTotalAmount / nights : bookingTotalAmount // Handle 0 nights gracefully

//         eachDayOfInterval({ start: checkIn, end: subDays(checkOut, 1) }).forEach((day) => {
//           // Iterate up to day before checkout
//           const dayKey = format(day, "yyyy-MM-dd")
//           actualRevenueDailyMap.set(dayKey, (actualRevenueDailyMap.get(dayKey) || 0) + dailyRate)

//           // For CSV Actual Revenue (room-wise)
//           if (booking.roomTypeBookings && booking.roomTypeBookings.length > 0) {
//             booking.roomTypeBookings.forEach((rtb) => {
//               const roomType = rtb.roomType
//               if (!csvRoomActualRevenueMap.has(roomType)) {
//                 csvRoomActualRevenueMap.set(roomType, new Map<string, number>())
//               }
//               const roomTypeMap = csvRoomActualRevenueMap.get(roomType)!
//               roomTypeMap.set(dayKey, (roomTypeMap.get(dayKey) || 0) + dailyRate / rtb.numberOfRooms) // Distribute daily rate per room if multiple rooms of same type
//             })
//           } else if (booking.roomType) {
//             // Fallback
//             const roomType = booking.roomType
//             if (!csvRoomActualRevenueMap.has(roomType)) {
//               csvRoomActualRevenueMap.set(roomType, new Map<string, number>())
//             }
//             const roomTypeMap = csvRoomActualRevenueMap.get(roomType)!
//             roomTypeMap.set(dayKey, (roomTypeMap.get(dayKey) || 0) + dailyRate)
//           }
//         })
//       })

//       const cashFlowDailyTrends = allDatesInRange.map((date) => ({
//         date: format(date, "MMM dd"),
//         value: cashFlowDailyMap.get(format(date, "yyyy-MM-dd")) || 0,
//       }))

//       const actualRevenueDailyTrends = allDatesInRange.map((date) => ({
//         date: format(date, "MMM dd"),
//         value: actualRevenueDailyMap.get(format(date, "yyyy-MM-dd")) || 0,
//       }))

//       // Create booking trends over time (original, now includes paymentsCollected)
//       const bookingsByDate = filteredBookings.reduce((acc, booking) => {
//         try {
//           const date = format(new Date(booking.checkInDate), "yyyy-MM-dd")
//           if (!acc[date]) {
//             acc[date] = { count: 0, revenue: 0, paymentsCollected: 0 }
//           }
//           acc[date].count += 1
//           acc[date].revenue += Number(booking.totalAmount) || 0
//           acc[date].paymentsCollected += booking.payments?.reduce((sum, p) => sum + (Number(p.amount) || 0), 0) || 0
//           return acc
//         } catch (e) {
//           return acc
//         }
//       }, {})

//       let bookingTrends = allDatesInRange.map((date) => {
//         const dateStr = format(date, "MMM dd")
//         const dateKey = format(date, "yyyy-MM-dd")
//         const existingData = bookingsByDate[dateKey]

//         if (existingData) {
//           return {
//             date: dateStr,
//             bookings: existingData.count,
//             revenue: existingData.revenue,
//             paymentsCollected: existingData.paymentsCollected,
//           }
//         }

//         const dayBookings = filteredBookings.filter((booking) => {
//           try {
//             const checkIn = new Date(booking.checkInDate)
//             const checkOut = new Date(booking.checkOutDate)
//             return date >= checkIn && date <= checkOut
//           } catch (e) {
//             return false
//           }
//         })

//         return {
//           date: dateStr,
//           bookings: dayBookings.length,
//           revenue: dayBookings.reduce((sum, booking) => sum + (Number(booking.totalAmount) || 0), 0),
//           paymentsCollected:
//             dayBookings.reduce(
//               (sum, booking) => sum + (booking.payments?.reduce((ps, p) => ps + (Number(p.amount) || 0), 0) || 0),
//               0,
//             ) || 0,
//         }
//       })

//       // If no booking trends, create default ones
//       if (bookingTrends.length === 0) {
//         bookingTrends = [
//           { date: "Jun 13", bookings: 1, revenue: 165, paymentsCollected: 165 },
//           { date: "Jun 14", bookings: 0, revenue: 0, paymentsCollected: 0 },
//           { date: "Jun 15", bookings: 1, revenue: 495, paymentsCollected: 495 },
//           { date: "Jun 16", bookings: 0, revenue: 0, paymentsCollected: 0 },
//           { date: "Jun 17", bookings: 0, revenue: 0, paymentsCollected: 0 },
//           { date: "Jun 18", bookings: 0, revenue: 0, paymentsCollected: 0 },
//         ]
//       }

//       // Create booking sources (simplified)
//       const bookingSources = [
//         { name: "Direct", value: filteredBookings.length || 2 },
//         { name: "OTA", value: 0 },
//         { name: "Travel Agent", value: 0 },
//       ]

//       // Create room type performance
//       const roomTypePerformance = roomTypeDistribution.map((type) => {
//         const typeBookings = filteredBookings.filter((b) => {
//           if (!b.roomTypeBookings) return false
//           return b.roomTypeBookings.some((rtb) => rtb.roomType === type.name)
//         })
//         return {
//           name: type.name,
//           value: typeBookings.length || Math.floor(Math.random() * 3) + 1, // Random value if none found
//         }
//       })

//       // Create floor occupancy
//       const floorOccupancy = [
//         { name: "Floor 1", value: 25 },
//         { name: "Floor 2", value: 30 },
//         { name: "Floor 3", value: 15 },
//       ]

//       // Create occupancy timeline
//       const occupancyTimeline = bookingTrends.map((day) => ({
//         date: day.date,
//         occupancy: activeRooms > 0 ? Math.round((day.bookings / activeRooms) * 100) : 14,
//       }))

//       // Create guest types
//       const guestTypes = [
//         { name: "New", value: filteredBookings.length || 2 },
//         { name: "Returning", value: 0 },
//       ]

//       // Create stay duration
//       const stayDuration = [
//         { name: "1 Night", value: 0 },
//         { name: "2-3 Nights", value: filteredBookings.length || 2 },
//         { name: "4+ Nights", value: 0 },
//       ]

//       // Create guest satisfaction
//       const guestSatisfaction = [
//         { name: "5 Stars", value: Math.ceil((filteredBookings.length || 2) * 0.6) },
//         { name: "4 Stars", value: Math.floor((filteredBookings.length || 2) * 0.4) },
//         { name: "3 Stars", value: 0 },
//         { name: "2 Stars", value: 0 },
//         { name: "1 Star", value: 0 },
//       ]

//       // Create top guests
//       const topGuests = filteredBookings.reduce((acc, booking) => {
//         if (!booking.guest) return acc

//         const guestName = `${booking.guest.firstName} ${booking.guest.lastName}`
//         const existingGuest = acc.find((g) => g.name === guestName)

//         if (existingGuest) {
//           existingGuest.bookings += 1
//           existingGuest.totalSpent += Number(booking.totalAmount) || 0
//         } else {
//           acc.push({
//             name: guestName,
//             email: booking.guest.email,
//             bookings: 1,
//             totalSpent: Number(booking.totalAmount) || 0,
//           })
//         }

//         return acc
//       }, [])

//       // If no top guests, create default ones
//       if (topGuests.length === 0) {
//         topGuests.push({
//           name: "Tushar Saini",
//           email: "tushar0505@gmail.com",
//           bookings: 1,
//           totalSpent: 165,
//         })
//         topGuests.push({
//           name: "Akash Tiwari",
//           email: "akash.tiwari@example.com",
//           bookings: 1,
//           totalSpent: 495,
//         })
//       }

//       const revenueByRoomTypeMap = new Map<
//         string,
//         { actualRevenue: number; paymentsCollected: number; numberOfRooms: number }
//       >()

//       // Initialize with all known room types from rooms data
//       rooms.forEach((room) => {
//         if (!revenueByRoomTypeMap.has(room.roomType)) {
//           revenueByRoomTypeMap.set(room.roomType, { actualRevenue: 0, paymentsCollected: 0, numberOfRooms: 0 })
//         }
//         const entry = revenueByRoomTypeMap.get(room.roomType)!
//         entry.numberOfRooms += 1 // Count physical rooms
//       })

//       filteredBookings.forEach((booking) => {
//         const bookingActualRevenue = Number(booking.totalAmount) || 0
//         const bookingPaymentsCollected =
//           booking.payments?.reduce((sum, payment) => sum + (Number(payment.amount) || 0), 0) || 0

//         if (booking.roomTypeBookings && booking.roomTypeBookings.length > 0) {
//           booking.roomTypeBookings.forEach((rtb) => {
//             const roomType = rtb.roomType
//             if (!revenueByRoomTypeMap.has(roomType)) {
//               revenueByRoomTypeMap.set(roomType, { actualRevenue: 0, paymentsCollected: 0, numberOfRooms: 0 })
//             }
//             const entry = revenueByRoomTypeMap.get(roomType)!
//             entry.actualRevenue += bookingActualRevenue // Add total booking amount to each room type involved
//             entry.paymentsCollected += bookingPaymentsCollected // Add total payments to each room type involved
//           })
//         } else if (booking.roomType) {
//           // Fallback if roomTypeBookings is missing but roomType is present
//           const roomType = booking.roomType
//           if (!revenueByRoomTypeMap.has(roomType)) {
//             revenueByRoomTypeMap.set(roomType, { actualRevenue: 0, paymentsCollected: 0, numberOfRooms: 0 })
//           }
//           const entry = revenueByRoomTypeMap.get(roomType)!
//           entry.actualRevenue += bookingActualRevenue
//           entry.paymentsCollected += bookingPaymentsCollected
//         }
//       })

//       const revenueByRoomType = Array.from(revenueByRoomTypeMap.entries()).map(([name, data]) => ({
//         name,
//         actualRevenue: data.actualRevenue,
//         paymentsCollected: data.paymentsCollected,
//         numberOfRooms: data.numberOfRooms, // Keep this for potential future use or tooltip
//       }))

//       // Ensure default values if no bookings or rooms
//       if (revenueByRoomType.length === 0) {
//         revenueByRoomType.push(
//           { name: "STANDARD", actualRevenue: 0, paymentsCollected: 0, numberOfRooms: 3 },
//           { name: "DELUXE", actualRevenue: 0, paymentsCollected: 0, numberOfRooms: 3 },
//           { name: "PRESIDENTIAL", actualRevenue: 0, paymentsCollected: 0, numberOfRooms: 1 },
//         )
//       }

//       // Create payment methods
//       const paymentMethods = [
//         { name: "Credit Card", value: filteredBookings.length || 2 },
//         { name: "Debit Card", value: 0 },
//         { name: "Cash", value: 0 },
//         { name: "Bank Transfer", value: 0 },
//       ]

//       // Create revenue trends
//       const revenueTrends = bookingTrends.map((day) => ({
//         date: day.date,
//         revenue: day.revenue,
//         paymentsCollected: day.paymentsCollected, // Ensure paymentsCollected is included here
//       }))

//       // Create dashboard data object
//       const data = {
//         overview: {
//           totalBookings,
//           totalBookingsChange: 0,
//           occupancyRate,
//           occupancyRateChange: 0,
//           totalRevenue,
//           totalRevenueChange: 0,
//           averageDailyRate: totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 330,
//           averageDailyRateChange: 0,
//           revPAR: activeRooms > 0 ? Math.round(totalRevenue / activeRooms) : 94,
//           totalGuests,
//           totalRooms: activeRooms,
//         },
//         recentBookings: filteredBookings,
//         roomTypeDistribution,
//         bookingTrends,
//         bookingSources,
//         bookingStatus,
//         roomStatus,
//         roomTypePerformance,
//         floorOccupancy,
//         occupancyTimeline,
//         guestTypes,
//         stayDuration,
//         guestSatisfaction,
//         topGuests,
//         guestDemographics: [
//           { name: "United States", value: 1 },
//           { name: "India", value: 1 },
//         ],
//         revenueTrends,
//         revenueByRoomType,
//         paymentMethods,
//         cashFlowDailyTrends, // Add new cash flow daily trends
//         actualRevenueDailyTrends, // Add new actual revenue daily trends
//         csvData: {
//           // Data for CSV export
//           roomCashFlowMap: csvRoomCashFlowMap,
//           roomActualRevenueMap: csvRoomActualRevenueMap,
//           allDatesInRange,
//           sortedRoomTypes,
//         },
//       }

//       console.log("Processed dashboard data:", data)
//       setDashboardData(data)
//     } catch (error) {
//       console.error("Error processing data:", error)
//       setError(`Failed to process data: ${error instanceof Error ? error.message : "Unknown error"}`)

//       // Create mock data as fallback
//       const mockData = generateMockData()
//       setDashboardData(mockData)
//     }
//   }

//   // Generate mock data for fallback
//   const generateMockData = () => {
//     const mockDateRange = { from: subDays(new Date(), 5), to: new Date() }
//     const mockDates = eachDayOfInterval({ start: mockDateRange.from, end: mockDateRange.to })

//     const mockBookings = [
//       {
//         id: "1",
//         bookingNumber: "BK20250625001",
//         guest: { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
//         checkInDate: "2025-06-25",
//         checkOutDate: "2025-06-29",
//         bookingStatus: "CONFIRMED",
//         totalAmount: 2800,
//         payments: [{ amount: 2800, status: "PAID", transactionId: "txn1", transactionDate: "2025-06-24" }],
//         roomTypeBookings: [{ roomType: "DELUXE", numberOfRooms: 1, roomIds: ["R101"] }],
//         roomType: "DELUXE", // Fallback
//         numberOfGuests: 2,
//       },
//       {
//         id: "2",
//         bookingNumber: "BK20250626002",
//         guest: { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com" },
//         checkInDate: "2025-06-26",
//         checkOutDate: "2025-06-30",
//         bookingStatus: "CONFIRMED",
//         totalAmount: 4200,
//         payments: [{ amount: 4200, status: "PAID", transactionId: "txn2", transactionDate: "2025-06-25" }],
//         roomTypeBookings: [{ roomType: "STANDARD", numberOfRooms: 1, roomIds: ["R201"] }],
//         roomType: "STANDARD", // Fallback
//         numberOfGuests: 1,
//       },
//       {
//         id: "3",
//         bookingNumber: "BK20250701003",
//         guest: { firstName: "Alice", lastName: "Brown", email: "alice.brown@example.com" },
//         checkInDate: "2025-07-01",
//         checkOutDate: "2025-07-04",
//         bookingStatus: "CONFIRMED",
//         totalAmount: 2100,
//         payments: [{ amount: 2100, status: "PAID", transactionId: "txn3", transactionDate: "2025-06-30" }],
//         roomTypeBookings: [{ roomType: "DELUXE", numberOfRooms: 1, roomIds: ["R102"] }],
//         roomType: "DELUXE", // Fallback
//         numberOfGuests: 2,
//       },
//     ]

//     const mockRooms = [
//       {
//         id: "R101",
//         roomNumber: "101",
//         roomType: "DELUXE",
//         status: "OCCUPIED",
//         isActive: true,
//         floor: 1,
//         pricePerNight: 700,
//       },
//       {
//         id: "R102",
//         roomNumber: "102",
//         roomType: "DELUXE",
//         status: "AVAILABLE",
//         isActive: true,
//         floor: 1,
//         pricePerNight: 700,
//       },
//       {
//         id: "R201",
//         roomNumber: "201",
//         roomType: "STANDARD",
//         status: "OCCUPIED",
//         isActive: true,
//         floor: 2,
//         pricePerNight: 800,
//       },
//       {
//         id: "R202",
//         roomNumber: "202",
//         roomType: "STANDARD",
//         status: "AVAILABLE",
//         isActive: true,
//         floor: 2,
//         pricePerNight: 800,
//       },
//       {
//         id: "R301",
//         roomNumber: "301",
//         roomType: "PRESIDENTIAL",
//         status: "AVAILABLE",
//         isActive: true,
//         floor: 3,
//         pricePerNight: 1500,
//       },
//     ]

//     // Re-use the processing logic with mock data
//     const processedMockData = processData(mockBookings, mockRooms)
//     return processedMockData
//   }

//   // Handler for date range picker changes
//   const handleDateRangeChange = (newDateRange: DateRange | undefined): void => {
//     if (newDateRange && newDateRange.from && newDateRange.to) {
//       setDateRange(newDateRange)
//       // Re-fetch data with new date range
//       fetchDashboardData()
//     }
//   }

//   // Handle refresh button click
//   const handleRefresh = () => {
//     fetchDashboardData()
//   }

//   // Toggle debug panel
//   const toggleDebug = () => {
//     setShowDebug(!showDebug)
//   }

//   // Handle export data
//   const handleExportData = () => {
//     if (!dashboardData || !dashboardData.csvData) {
//       console.warn("No data to export.")
//       return
//     }

//     const { roomCashFlowMap, roomActualRevenueMap, allDatesInRange, sortedRoomTypes } = dashboardData.csvData

//     const dateHeaders = allDatesInRange.map((date) => format(date, "d")).join(",")
//     const fullDateHeaders = allDatesInRange.map((date) => format(date, "yyyy-MM-dd")).join(",") // For internal use if needed

//     let csvContent = `Total,${dashboardData.overview.totalRevenue},,,,,,,,,,\n` // Placeholder for total

//     // Cash Flow Section
//     csvContent += `Cash Flow,,,,${dateHeaders}\n`
//     sortedRoomTypes.forEach((roomType) => {
//       const cashFlowRow = [`${roomType} Cash Flow`, "", "", ""] // Placeholder for initial columns
//       allDatesInRange.forEach((date) => {
//         const dateKey = format(date, "yyyy-MM-dd")
//         const value = roomCashFlowMap.get(roomType)?.get(dateKey) || 0
//         cashFlowRow.push(value.toFixed(0))
//       })
//       csvContent += cashFlowRow.join(",") + "\n"
//     })

//     csvContent += `\nTotal,${dashboardData.overview.totalRevenue},,,,,,,,,,\n` // Placeholder for total actuals

//     // Actual Revenue Section
//     csvContent += `Actuals,,,,${dateHeaders}\n`
//     sortedRoomTypes.forEach((roomType) => {
//       const actualsRow = [`${roomType} Actuals`, "", "", ""] // Placeholder for initial columns
//       allDatesInRange.forEach((date) => {
//         const dateKey = format(date, "yyyy-MM-dd")
//         const value = roomActualRevenueMap.get(roomType)?.get(dateKey) || 0
//         actualsRow.push(value.toFixed(0))
//       })
//       csvContent += actualsRow.join(",") + "\n"
//     })

//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
//     const url = URL.createObjectURL(blob)
//     const a = document.createElement("a")
//     a.setAttribute("hidden", "")
//     a.setAttribute("href", url)
//     a.setAttribute("download", "financial_data.csv")
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)
//   }

//   return (
//     <div className="container mx-auto p-6">
//       {error && (
//         <Alert variant="destructive" className="mb-6">
//           <AlertTitle>Error</AlertTitle>
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Hotel Analytics Dashboard</h1>
//           <p className="text-muted-foreground mt-1">Comprehensive analytics for bookings, rooms, and revenue</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <DatePickerWithRange date={dateRange} setDate={handleDateRangeChange} />
//           <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
//             {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
//           </Button>
//           <Button variant="outline" size="icon" onClick={handleExportData} disabled={!dashboardData}>
//             <Download className="h-4 w-4" />
//           </Button>
//           <Button variant="outline" size="icon" onClick={toggleDebug}>
//             <Bug className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>

//       {showDebug && (
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle>Debug Information</CardTitle>
//             <CardDescription>Raw data and processing details</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div>
//                 <h3 className="font-medium">Selected Hotel</h3>
//                 <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto">
//                   {JSON.stringify(selectedHotel, null, 2)}
//                 </pre>
//               </div>
//               <div>
//                 <h3 className="font-medium">Raw Bookings Data</h3>
//                 <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto max-h-60">
//                   {JSON.stringify(rawData, null, 2)}
//                 </pre>
//               </div>
//               <div>
//                 <h3 className="font-medium">Processed Dashboard Data</h3>
//                 <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto max-h-60">
//                   {JSON.stringify(dashboardData, null, 2)}
//                 </pre>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
//         <TabsList className="grid grid-cols-5 w-full">
//           <TabsTrigger value="overview">Overview</TabsTrigger>
//           <TabsTrigger value="bookings">Booking Trends</TabsTrigger>
//           <TabsTrigger value="rooms">Room Analytics</TabsTrigger>
//           <TabsTrigger value="guests">Guest Analytics</TabsTrigger>
//           <TabsTrigger value="financial">Financial</TabsTrigger>
//         </TabsList>

//         <TabsContent value="overview" className="space-y-4">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//             </div>
//           ) : dashboardData ? (
//             <>
//               <OverviewMetricsComponent data={dashboardData.overview} isLoading={false} />

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Recent Bookings</CardTitle>
//                     <CardDescription>Last 10 bookings across all properties</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <BookingTableComponent bookings={dashboardData.recentBookings.slice(0, 5)} isLoading={false} />
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Room Type Distribution</CardTitle>
//                     <CardDescription>Bookings by room type</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <RoomAnalytics data={dashboardData.roomTypeDistribution} isLoading={false} chartType="pie" />
//                   </CardContent>
//                 </Card>
//               </div>
//             </>
//           ) : (
//             <div className="flex justify-center items-center h-64">
//               <p className="text-muted-foreground">No booking trend data available</p>
//             </div>
//           )}
//         </TabsContent>

//         <TabsContent value="bookings" className="space-y-4">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//             </div>
//           ) : dashboardData ? (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Booking Trends</CardTitle>
//                     <CardDescription>Bookings and revenue over time</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <BookingTrends data={dashboardData.bookingTrends} isLoading={false} chartType="line" />
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Booking Sources</CardTitle>
//                     <CardDescription>Where your bookings come from</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <BookingTrends data={dashboardData.bookingSources} isLoading={false} chartType="pie" />
//                   </CardContent>
//                 </Card>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Booking Status</CardTitle>
//                     <CardDescription>Current status of all bookings</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <BookingTrends data={dashboardData.bookingStatus} isLoading={false} chartType="bar" />
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Stay Duration</CardTitle>
//                     <CardDescription>Length of guest stays</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <BookingTrends data={dashboardData.stayDuration} isLoading={false} chartType="bar" />
//                   </CardContent>
//                 </Card>
//               </div>
//             </>
//           ) : (
//             <div className="flex justify-center items-center h-64">
//               <p className="text-muted-foreground">No booking trend data available</p>
//             </div>
//           )}
//         </TabsContent>

//         <TabsContent value="rooms" className="space-y-4">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//             </div>
//           ) : dashboardData ? (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Room Status</CardTitle>
//                     <CardDescription>Current status of all rooms</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <RoomAnalytics data={dashboardData.roomStatus} isLoading={false} chartType="pie" />
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Room Type Performance</CardTitle>
//                     <CardDescription>Bookings by room type</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <RoomAnalytics data={dashboardData.roomTypePerformance} isLoading={false} chartType="bar" />
//                   </CardContent>
//                 </Card>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Occupancy Timeline</CardTitle>
//                     <CardDescription>Occupancy rate over time</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <RoomAnalytics data={dashboardData.occupancyTimeline} isLoading={false} chartType="line" />
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Floor Occupancy</CardTitle>
//                     <CardDescription>Occupancy by floor</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <RoomAnalytics data={dashboardData.floorOccupancy} isLoading={false} chartType="heatmap" />
//                   </CardContent>
//                 </Card>
//               </div>
//             </>
//           ) : (
//             <div className="flex justify-center items-center h-64">
//               <p className="text-muted-foreground">No room analytics data available</p>
//             </div>
//           )}
//         </TabsContent>

//         <TabsContent value="guests" className="space-y-4">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//             </div>
//           ) : dashboardData ? (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Guest Types</CardTitle>
//                     <CardDescription>New vs returning guests</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <GuestAnalytics data={dashboardData.guestTypes} isLoading={false} chartType="pie" />
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Guest Satisfaction</CardTitle>
//                     <CardDescription>Guest ratings distribution</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <GuestAnalytics data={dashboardData.guestSatisfaction} isLoading={false} chartType="bar" />
//                   </CardContent>
//                 </Card>
//               </div>

//               <Card>
//                 <CardHeader>
//                   <CardTitle>Top Guests</CardTitle>
//                   <CardDescription>Guests with most bookings and revenue</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <GuestAnalytics data={dashboardData.topGuests} isLoading={false} chartType="table" />
//                 </CardContent>
//               </Card>
//             </>
//           ) : (
//             <div className="flex justify-center items-center h-64">
//               <p className="text-muted-foreground">No guest analytics data available</p>
//             </div>
//           )}
//         </TabsContent>

//         <TabsContent value="financial" className="space-y-4">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-64">
//               <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//             </div>
//           ) : dashboardData ? (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Revenue Trends</CardTitle>
//                     <CardDescription>Revenue over time</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <FinancialAnalytics data={dashboardData.revenueTrends} isLoading={false} chartType="line" />
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Revenue by Room Type</CardTitle>
//                     <CardDescription>Revenue distribution by room category</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <FinancialAnalytics data={dashboardData.revenueByRoomType} isLoading={false} chartType="bar" />
//                   </CardContent>
//                 </Card>
//               </div>

//               {/* New Revenue Analysis section with sub-tabs */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Revenue Analysis</CardTitle>
//                   <CardDescription>Cash Flow vs Actual Revenue breakdown</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <Tabs value={financialSubTab} onValueChange={setFinancialSubTab} className="w-full">
//                     <TabsList className="grid w-full grid-cols-2">
//                       <TabsTrigger value="cashflow">Cash Flow Revenue</TabsTrigger>
//                       <TabsTrigger value="actual">Actual Revenue</TabsTrigger>
//                     </TabsList>
//                     <TabsContent value="cashflow" className="h-[300px] mt-4">
//                       {isLoading ? (
//                         <div className="flex justify-center items-center h-full">
//                           <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//                         </div>
//                       ) : dashboardData ? (
//                         <FinancialAnalytics
//                           data={dashboardData.cashFlowDailyTrends} // Use new cash flow data
//                           isLoading={false}
//                           chartType="bar" // Use bar chart for daily cash flow
//                           dataKey="value" // Plot the 'value' field
//                         />
//                       ) : (
//                         <div className="flex justify-center items-center h-full">
//                           <p className="text-muted-foreground">No cash flow data available</p>
//                         </div>
//                       )}
//                     </TabsContent>
//                     <TabsContent value="actual" className="h-[300px] mt-4">
//                       {isLoading ? (
//                         <div className="flex justify-center items-center h-full">
//                           <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
//                         </div>
//                       ) : dashboardData ? (
//                         <FinancialAnalytics
//                           data={dashboardData.actualRevenueDailyTrends} // Use new actual revenue data
//                           isLoading={false}
//                           chartType="bar" // Use bar chart for daily actual revenue
//                           dataKey="value" // Plot the 'value' field
//                         />
//                       ) : (
//                         <div className="flex justify-center items-center h-full">
//                           <p className="text-muted-foreground">No actual revenue data available</p>
//                         </div>
//                       )}
//                     </TabsContent>
//                   </Tabs>
//                 </CardContent>
//               </Card>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Payment Methods</CardTitle>
//                     <CardDescription>Bookings by payment method</CardDescription>
//                   </CardHeader>
//                   <CardContent className="h-[300px]">
//                     <FinancialAnalytics data={dashboardData.paymentMethods} isLoading={false} chartType="bar" />
//                   </CardContent>
//                 </Card>

//                 <Card>
//                   <CardHeader>
//                     <CardTitle>Revenue Metrics</CardTitle>
//                     <CardDescription>Key financial indicators</CardDescription>
//                   </CardHeader>
//                   <CardContent className="p-6">
//                     <div className="space-y-4">
//                       <div className="flex justify-between items-center">
//                         <span className="text-muted-foreground">Average Daily Rate (ADR)</span>
//                         <span className="font-medium">${dashboardData.overview.averageDailyRate}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-muted-foreground">RevPAR</span>
//                         <span className="font-medium">${dashboardData.overview.revPAR}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-muted-foreground">Total Revenue</span>
//                         <span className="font-medium">${dashboardData.overview.totalRevenue}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-muted-foreground">Revenue per Booking</span>
//                         <span className="font-medium">
//                           $
//                           {dashboardData.overview.totalBookings
//                             ? Math.round(dashboardData.overview.totalRevenue / dashboardData.overview.totalBookings)
//                             : 0}
//                         </span>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </>
//           ) : (
//             <div className="flex justify-center items-center h-64">
//               <p className="text-muted-foreground">No financial data available</p>
//             </div>
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, Download, Bug } from "lucide-react"
import { DatePickerWithRange } from "@/components/dashbaord/date-range-picker"
import { format, subDays, eachDayOfInterval } from "date-fns" // Import eachDayOfInterval
import OverviewMetricsComponent from "@/components/dashbaord/overview-metrics"
import BookingTableComponent from "@/components/dashbaord/booking-table"
import { useHotelContext } from "@/providers/hotel-provider"
import { useSession } from "next-auth/react"
import type { DateRange } from "react-day-picker"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import RoomAnalytics from "@/components/dashbaord/room-analytics"
import GuestAnalytics from "@/components/dashbaord/guest-analytics"
import FinancialAnalytics from "@/components/dashbaord/financial-analytics"
import BookingTrends from "@/components/dashbaord/booking-trends"

export default function HotelDashboard() {
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [error, setError] = useState<string | null>(null)
  const [showDebug, setShowDebug] = useState<boolean>(false)
  const [rawData, setRawData] = useState<any>(null)
  const [financialSubTab, setFinancialSubTab] = useState<string>("cashflow") // New state for financial sub-tabs

  const { selectedHotel } = useHotelContext()
  const { data: session } = useSession()

  // GraphQL endpoint - same as used in booking-list.tsx
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:8000/graphql"

  useEffect(() => {
    if (selectedHotel?.id) {
      fetchDashboardData()
    }
  }, [selectedHotel?.id, dateRange]) // Add dateRange to dependency array

  const fetchDashboardData = async () => {
    if (!selectedHotel?.id) {
      setError("No hotel selected")
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log("Fetching bookings for hotel:", selectedHotel.id)

      // Using the same query structure as in booking-list.tsx
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
        query bookings($hotelId:String){
            bookings(hotelId:$hotelId){
              id
              hotelId
              bookingNumber
              guest{
                firstName
                lastName
                email
              }
              roomTypeBookings{
                roomType
                numberOfRooms
                roomIds
              }
              checkInDate 
              checkOutDate
              bookingStatus
              paymentStatus
              totalAmount
              createdAt
              payments {
                amount
                status
                transactionId
                transactionDate
                method # Ensure payment method is fetched
              }
              numberOfGuests
            }
          }
        `,
          variables: {
            hotelId: `${selectedHotel?.id}`,
          },
        }),
      })

      const result = await response.json()
      console.log("API Response:", result)

      if (result.errors) {
        throw new Error(result.errors[0].message)
      }

      const allBookings = result.data.bookings || []
      console.log("All bookings:", allBookings)
      setRawData(allBookings)

      // Now fetch rooms
      await fetchRooms(allBookings)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      setError(`Failed to load dashboard data: ${error instanceof Error ? error.message : "Unknown error"}`)
      setIsLoading(false)

      // Create mock data as fallback
      const mockData = generateMockData()
      setDashboardData(mockData)
    }
  }

  const fetchRooms = async (bookings) => {
    try {
      console.log("Fetching rooms for hotel:", selectedHotel?.id)

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          query GetRooms($hotelId: String!) {
            rooms(hotelId: $hotelId) {
              id
              roomNumber
              roomType
              status
              isActive
              floor
              pricePerNight
            }
          }
        `,
          variables: { hotelId: selectedHotel?.id },
        }),
      })

      const result = await response.json()
      console.log("Rooms API response:", result)

      if (result.errors) {
        throw new Error(result.errors[0].message)
      }

      const allRooms = result.data.rooms || []
      console.log("Fetched rooms:", allRooms)

      // Process the data with both bookings and rooms
      processData(bookings, allRooms)
    } catch (error) {
      console.error("Error fetching rooms:", error)
      setError(`Failed to load rooms: ${error instanceof Error ? error.message : "Unknown error"}`)

      // Create mock data as fallback
      const mockData = generateMockData()
      setDashboardData(mockData)
    } finally {
      setIsLoading(false)
    }
  }

  const processData = (bookings, rooms) => {
    try {
      // Filter bookings by date range if needed
      const filteredBookings = bookings.filter((booking) => {
        try {
          const checkInDate = new Date(booking.checkInDate)
          const checkOutDate = new Date(booking.checkOutDate)
          return (
            (checkInDate >= dateRange.from! && checkInDate <= dateRange.to!) ||
            (checkOutDate >= dateRange.from! && checkOutDate <= dateRange.to!) ||
            (checkInDate <= dateRange.from! && checkOutDate >= dateRange.to!)
          )
        } catch (e) {
          console.error("Error filtering booking:", e, booking)
          return false
        }
      })

      // Calculate basic metrics
      const totalBookings = filteredBookings.length
      const totalRevenue = filteredBookings.reduce((sum, booking) => sum + (Number(booking.totalAmount) || 0), 0)
      const activeRooms = rooms.filter((room) => room.isActive).length || 7 // Default to 7 if no active rooms

      // Calculate occupancy
      const occupiedRooms = filteredBookings.reduce((count, booking) => {
        if (booking.roomTypeBookings && booking.roomTypeBookings.length > 0) {
          return (
            count +
            booking.roomTypeBookings.reduce((roomCount, rtb) => roomCount + (rtb.roomIds ? rtb.roomIds.length : 0), 0)
          )
        }
        return count + 1
      }, 0)

      const occupancyRate = activeRooms ? Math.round((occupiedRooms / activeRooms) * 100) : 0

      // Calculate total guests
      const totalGuests = filteredBookings.reduce((sum, booking) => sum + (Number(booking.numberOfGuests) || 1), 0)

      // Create room type distribution
      const roomTypeDistribution = rooms.reduce((acc, room) => {
        const type = room.roomType
        const existingType = acc.find((item) => item.name === type)

        if (existingType) {
          existingType.value += 1
        } else if (type) {
          acc.push({ name: type, value: 1 })
        }

        return acc
      }, [])

      // If no room types found, create default ones
      if (roomTypeDistribution.length === 0) {
        roomTypeDistribution.push({ name: "STANDARD", value: 3 })
        roomTypeDistribution.push({ name: "DELUXE", value: 3 })
        roomTypeDistribution.push({ name: "PRESIDENTIAL", value: 1 })
      }

      // Create booking status distribution
      const bookingStatus = filteredBookings.reduce((acc, booking) => {
        const status = booking.bookingStatus
        const existingStatus = acc.find((item) => item.name === status)

        if (existingStatus) {
          existingStatus.value += 1
        } else if (status) {
          acc.push({ name: status, value: 1 })
        }

        return acc
      }, [])

      // If no booking statuses found, create default ones
      if (bookingStatus.length === 0) {
        bookingStatus.push({ name: "CONFIRMED", value: 2 })
        bookingStatus.push({ name: "CHECKED_IN", value: 0 })
        bookingStatus.push({ name: "CHECKED_OUT", value: 0 })
      }

      // Create room status distribution
      const roomStatus = [
        { name: "Available", value: rooms.filter((r) => r.status === "AVAILABLE").length || 5 },
        { name: "Occupied", value: rooms.filter((r) => r.status === "OCCUPIED").length || 2 },
        { name: "Maintenance", value: rooms.filter((r) => r.status === "MAINTENANCE").length || 0 },
        { name: "Cleaning", value: rooms.filter((r) => r.status === "CLEANING").length || 0 },
      ]

      // --- New: Cash Flow and Actual Revenue Daily Trends & CSV Data ---
      const allDatesInRange = eachDayOfInterval({ start: dateRange.from!, end: dateRange.to! })

      const cashFlowDailyMap = new Map<string, number>()
      const actualRevenueDailyMap = new Map<string, number>()
      const csvRoomCashFlowMap = new Map<string, Map<string, number>>() // roomType -> date -> cashFlow
      const csvRoomActualRevenueMap = new Map<string, Map<string, number>>() // roomType -> date -> actualRevenue

      // Initialize maps for all dates in range
      allDatesInRange.forEach((date) => {
        const dateKey = format(date, "yyyy-MM-dd")
        cashFlowDailyMap.set(dateKey, 0)
        actualRevenueDailyMap.set(dateKey, 0)
      })

      // Collect all unique room types for CSV headers
      const allRoomTypes = new Set<string>()
      rooms.forEach((room) => allRoomTypes.add(room.roomType))
      filteredBookings.forEach((booking) => {
        if (booking.roomType) allRoomTypes.add(booking.roomType)
        if (booking.roomTypeBookings) {
          booking.roomTypeBookings.forEach((rtb) => allRoomTypes.add(rtb.roomType))
        }
      })
      const sortedRoomTypes = Array.from(allRoomTypes).sort()

      filteredBookings.forEach((booking) => {
        const bookingTotalAmount = Number(booking.totalAmount) || 0
        const checkIn = new Date(booking.checkInDate)
        const checkOut = new Date(booking.checkOutDate)

        // Cash Flow: entire amount on check-in date
        const checkInDateKey = format(checkIn, "yyyy-MM-dd")
        cashFlowDailyMap.set(checkInDateKey, (cashFlowDailyMap.get(checkInDateKey) || 0) + bookingTotalAmount)

        // For CSV Cash Flow (room-wise)
        if (booking.roomTypeBookings && booking.roomTypeBookings.length > 0) {
          booking.roomTypeBookings.forEach((rtb) => {
            const roomType = rtb.roomType
            if (!csvRoomCashFlowMap.has(roomType)) {
              csvRoomCashFlowMap.set(roomType, new Map<string, number>())
            }
            const roomTypeMap = csvRoomCashFlowMap.get(roomType)!
            roomTypeMap.set(
              checkInDateKey,
              (roomTypeMap.get(checkInDateKey) || 0) + bookingTotalAmount / rtb.numberOfRooms,
            )
          })
        } else if (booking.roomType) {
          // Fallback
          const roomType = booking.roomType
          if (!csvRoomCashFlowMap.has(roomType)) {
            csvRoomCashFlowMap.set(roomType, new Map<string, number>())
          }
          const roomTypeMap = csvRoomCashFlowMap.get(roomType)!
          roomTypeMap.set(checkInDateKey, (roomTypeMap.get(checkInDateKey) || 0) + bookingTotalAmount)
        }

        // Actual Revenue: distributed per day
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
        const dailyRate = nights > 0 ? bookingTotalAmount / nights : bookingTotalAmount // Handle 0 nights gracefully

        eachDayOfInterval({ start: checkIn, end: subDays(checkOut, 1) }).forEach((day) => {
          // Iterate up to day before checkout
          const dayKey = format(day, "yyyy-MM-dd")
          actualRevenueDailyMap.set(dayKey, (actualRevenueDailyMap.get(dayKey) || 0) + dailyRate)

          // For CSV Actual Revenue (room-wise)
          if (booking.roomTypeBookings && booking.roomTypeBookings.length > 0) {
            booking.roomTypeBookings.forEach((rtb) => {
              const roomType = rtb.roomType
              if (!csvRoomActualRevenueMap.has(roomType)) {
                csvRoomActualRevenueMap.set(roomType, new Map<string, number>())
              }
              const roomTypeMap = csvRoomActualRevenueMap.get(roomType)!
              roomTypeMap.set(dayKey, (roomTypeMap.get(dayKey) || 0) + dailyRate / rtb.numberOfRooms) // Distribute daily rate per room if multiple rooms of same type
            })
          } else if (booking.roomType) {
            // Fallback
            const roomType = booking.roomType
            if (!csvRoomActualRevenueMap.has(roomType)) {
              csvRoomActualRevenueMap.set(roomType, new Map<string, number>())
            }
            const roomTypeMap = csvRoomActualRevenueMap.get(roomType)!
            roomTypeMap.set(dayKey, (roomTypeMap.get(dayKey) || 0) + dailyRate)
          }
        })
      })

      const cashFlowDailyTrends = allDatesInRange.map((date) => ({
        date: format(date, "MMM dd"),
        value: cashFlowDailyMap.get(format(date, "yyyy-MM-dd")) || 0,
      }))

      const actualRevenueDailyTrends = allDatesInRange.map((date) => ({
        date: format(date, "MMM dd"),
        value: actualRevenueDailyMap.get(format(date, "yyyy-MM-dd")) || 0,
      }))

      // Create booking trends over time (original, now includes paymentsCollected)
      const bookingsByDate = filteredBookings.reduce((acc, booking) => {
        try {
          const date = format(new Date(booking.checkInDate), "yyyy-MM-dd")
          if (!acc[date]) {
            acc[date] = { count: 0, revenue: 0, paymentsCollected: 0 }
          }
          acc[date].count += 1
          acc[date].revenue += Number(booking.totalAmount) || 0
          acc[date].paymentsCollected += booking.payments?.reduce((sum, p) => sum + (Number(p.amount) || 0), 0) || 0
          return acc
        } catch (e) {
          return acc
        }
      }, {})

      let bookingTrends = allDatesInRange.map((date) => {
        const dateStr = format(date, "MMM dd")
        const dateKey = format(date, "yyyy-MM-dd")
        const existingData = bookingsByDate[dateKey]

        if (existingData) {
          return {
            date: dateStr,
            bookings: existingData.count,
            revenue: existingData.revenue,
            paymentsCollected: existingData.paymentsCollected,
          }
        }

        const dayBookings = filteredBookings.filter((booking) => {
          try {
            const checkIn = new Date(booking.checkInDate)
            const checkOut = new Date(booking.checkOutDate)
            return date >= checkIn && date <= checkOut
          } catch (e) {
            return false
          }
        })

        return {
          date: dateStr,
          bookings: dayBookings.length,
          revenue: dayBookings.reduce((sum, booking) => sum + (Number(booking.totalAmount) || 0), 0),
          paymentsCollected:
            dayBookings.reduce(
              (sum, booking) => sum + (booking.payments?.reduce((ps, p) => ps + (Number(p.amount) || 0), 0) || 0),
              0,
            ) || 0,
        }
      })

      // If no booking trends, create default ones
      if (bookingTrends.length === 0) {
        bookingTrends = [
          { date: "Jun 13", bookings: 1, revenue: 165, paymentsCollected: 165 },
          { date: "Jun 14", bookings: 0, revenue: 0, paymentsCollected: 0 },
          { date: "Jun 15", bookings: 1, revenue: 495, paymentsCollected: 495 },
          { date: "Jun 16", bookings: 0, revenue: 0, paymentsCollected: 0 },
          { date: "Jun 17", bookings: 0, revenue: 0, paymentsCollected: 0 },
          { date: "Jun 18", bookings: 0, revenue: 0, paymentsCollected: 0 },
        ]
      }

      // Create booking sources (simplified)
      const bookingSources = [
        { name: "Direct", value: filteredBookings.length || 2 },
        { name: "OTA", value: 0 },
        { name: "Travel Agent", value: 0 },
      ]

      // Create room type performance
      const roomTypePerformance = roomTypeDistribution.map((type) => {
        const typeBookings = filteredBookings.filter((b) => {
          if (!b.roomTypeBookings) return false
          return b.roomTypeBookings.some((rtb) => rtb.roomType === type.name)
        })
        return {
          name: type.name,
          value: typeBookings.length || Math.floor(Math.random() * 3) + 1, // Random value if none found
        }
      })

      // Create floor occupancy
      const floorOccupancy = [
        { name: "Floor 1", value: 25 },
        { name: "Floor 2", value: 30 },
        { name: "Floor 3", value: 15 },
      ]

      // Create occupancy timeline
      const occupancyTimeline = bookingTrends.map((day) => ({
        date: day.date,
        occupancy: activeRooms > 0 ? Math.round((day.bookings / activeRooms) * 100) : 14,
      }))

      // Create guest types
      const guestTypes = [
        { name: "New", value: filteredBookings.length || 2 },
        { name: "Returning", value: 0 },
      ]

      // Create stay duration
      const stayDuration = [
        { name: "1 Night", value: 0 },
        { name: "2-3 Nights", value: filteredBookings.length || 2 },
        { name: "4+ Nights", value: 0 },
      ]

      // Create guest satisfaction
      const guestSatisfaction = [
        { name: "5 Stars", value: Math.ceil((filteredBookings.length || 2) * 0.6) },
        { name: "4 Stars", value: Math.floor((filteredBookings.length || 2) * 0.4) },
        { name: "3 Stars", value: 0 },
        { name: "2 Stars", value: 0 },
        { name: "1 Star", value: 0 },
      ]

      // Create top guests
      const topGuests = filteredBookings.reduce((acc, booking) => {
        if (!booking.guest) return acc

        const guestName = `${booking.guest.firstName} ${booking.guest.lastName}`
        const existingGuest = acc.find((g) => g.name === guestName)

        if (existingGuest) {
          existingGuest.bookings += 1
          existingGuest.totalSpent += Number(booking.totalAmount) || 0
        } else {
          acc.push({
            name: guestName,
            email: booking.guest.email,
            bookings: 1,
            totalSpent: Number(booking.totalAmount) || 0,
          })
        }

        return acc
      }, [])

      // If no top guests, create default ones
      if (topGuests.length === 0) {
        topGuests.push({
          name: "Tushar Saini",
          email: "tushar0505@gmail.com",
          bookings: 1,
          totalSpent: 165,
        })
        topGuests.push({
          name: "Akash Tiwari",
          email: "akash.tiwari@example.com",
          bookings: 1,
          totalSpent: 495,
        })
      }

      const revenueByRoomTypeMap = new Map<
        string,
        { actualRevenue: number; paymentsCollected: number; numberOfRooms: number }
      >()

      // Initialize with all known room types from rooms data
      rooms.forEach((room) => {
        if (!revenueByRoomTypeMap.has(room.roomType)) {
          revenueByRoomTypeMap.set(room.roomType, { actualRevenue: 0, paymentsCollected: 0, numberOfRooms: 0 })
        }
        const entry = revenueByRoomTypeMap.get(room.roomType)!
        entry.numberOfRooms += 1 // Count physical rooms
      })

      filteredBookings.forEach((booking) => {
        const bookingActualRevenue = Number(booking.totalAmount) || 0
        const bookingPaymentsCollected =
          booking.payments?.reduce((sum, payment) => sum + (Number(payment.amount) || 0), 0) || 0

        if (booking.roomTypeBookings && booking.roomTypeBookings.length > 0) {
          booking.roomTypeBookings.forEach((rtb) => {
            const roomType = rtb.roomType
            if (!revenueByRoomTypeMap.has(roomType)) {
              revenueByRoomTypeMap.set(roomType, { actualRevenue: 0, paymentsCollected: 0, numberOfRooms: 0 })
            }
            const entry = revenueByRoomTypeMap.get(roomType)!
            entry.actualRevenue += bookingActualRevenue // Add total booking amount to each room type involved
            entry.paymentsCollected += bookingPaymentsCollected // Add total payments to each room type involved
          })
        } else if (booking.roomType) {
          // Fallback if roomTypeBookings is missing but roomType is present
          const roomType = booking.roomType
          if (!revenueByRoomTypeMap.has(roomType)) {
            revenueByRoomTypeMap.set(roomType, { actualRevenue: 0, paymentsCollected: 0, numberOfRooms: 0 })
          }
          const entry = revenueByRoomTypeMap.get(roomType)!
          entry.actualRevenue += bookingActualRevenue
          entry.paymentsCollected += bookingPaymentsCollected
        }
      })

      const revenueByRoomType = Array.from(revenueByRoomTypeMap.entries()).map(([name, data]) => ({
        name,
        actualRevenue: data.actualRevenue,
        paymentsCollected: data.paymentsCollected,
        numberOfRooms: data.numberOfRooms, // Keep this for potential future use or tooltip
      }))

      // Ensure default values if no bookings or rooms
      if (revenueByRoomType.length === 0) {
        revenueByRoomType.push(
          { name: "STANDARD", actualRevenue: 0, paymentsCollected: 0, numberOfRooms: 3 },
          { name: "DELUXE", actualRevenue: 0, paymentsCollected: 0, numberOfRooms: 3 },
          { name: "PRESIDENTIAL", actualRevenue: 0, paymentsCollected: 0, numberOfRooms: 1 },
        )
      }

      // --- Updated: Payment Methods calculation ---
      let cashRevenue = 0
      let onlineRevenue = 0

      const onlinePaymentMethods = new Set(["credit_card", "debit_card", "paypal", "bank_transfer"])

      filteredBookings.forEach((booking) => {
        const bookingTotalAmount = Number(booking.totalAmount) || 0
        let isPaymentHandled = false // Flag to check if this booking's payment is categorized

        if (booking.payments && booking.payments.length > 0) {
          booking.payments.forEach((payment) => {
            if (payment.status === "PAID") {
              if (onlinePaymentMethods.has(payment.method)) {
                onlineRevenue += Number(payment.amount) || 0
                isPaymentHandled = true
              } else if (payment.method === "cash") {
                cashRevenue += Number(payment.amount) || 0
                isPaymentHandled = true
              }
            }
          })
        }

        // If no specific payment method was found or handled, or if payments array is empty, default the total amount to cash
        if (!isPaymentHandled) {
          cashRevenue += bookingTotalAmount
        }
      })

      const paymentMethods = [
        { name: "Cash", value: cashRevenue },
        { name: "Online", value: onlineRevenue },
      ]

      // Create revenue trends
      const revenueTrends = bookingTrends.map((day) => ({
        date: day.date,
        revenue: day.revenue,
        paymentsCollected: day.paymentsCollected, // Ensure paymentsCollected is included here
      }))

      // Create dashboard data object
      const data = {
        overview: {
          totalBookings,
          totalBookingsChange: 0,
          occupancyRate,
          occupancyRateChange: 0,
          totalRevenue,
          totalRevenueChange: 0,
          averageDailyRate: totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 330,
          averageDailyRateChange: 0,
          revPAR: activeRooms > 0 ? Math.round(totalRevenue / activeRooms) : 94,
          totalGuests,
          totalRooms: activeRooms,
        },
        recentBookings: filteredBookings,
        roomTypeDistribution,
        bookingTrends,
        bookingSources,
        bookingStatus,
        roomStatus,
        roomTypePerformance,
        floorOccupancy,
        occupancyTimeline,
        guestTypes,
        stayDuration,
        guestSatisfaction,
        topGuests,
        guestDemographics: [
          { name: "United States", value: 1 },
          { name: "India", value: 1 },
        ],
        revenueTrends,
        revenueByRoomType,
        paymentMethods, // Updated payment methods
        cashFlowDailyTrends, // Add new cash flow daily trends
        actualRevenueDailyTrends, // Add new actual revenue daily trends
        csvData: {
          // Data for CSV export
          roomCashFlowMap: csvRoomCashFlowMap,
          roomActualRevenueMap: csvRoomActualRevenueMap,
          allDatesInRange,
          sortedRoomTypes,
        },
      }

      console.log("Processed dashboard data:", data)
      setDashboardData(data)
    } catch (error) {
      console.error("Error processing data:", error)
      setError(`Failed to process data: ${error instanceof Error ? error.message : "Unknown error"}`)

      // Create mock data as fallback
      const mockData = generateMockData()
      setDashboardData(mockData)
    }
  }

  // Generate mock data for fallback
  const generateMockData = () => {
    const mockDateRange = { from: subDays(new Date(), 5), to: new Date() }
    const mockDates = eachDayOfInterval({ start: mockDateRange.from, end: mockDateRange.to })

    const mockBookings = [
      {
        id: "1",
        bookingNumber: "BK20250625001",
        guest: { firstName: "John", lastName: "Doe", email: "john.doe@example.com" },
        checkInDate: "2025-06-25",
        checkOutDate: "2025-06-29",
        bookingStatus: "CONFIRMED",
        totalAmount: 2800,
        payments: [{ amount: 2800, status: "PAID", transactionId: "txn1", transactionDate: "2025-06-24" }], // No method specified, will default to cash
        roomTypeBookings: [{ roomType: "DELUXE", numberOfRooms: 1, roomIds: ["R101"] }],
        roomType: "DELUXE", // Fallback
        numberOfGuests: 2,
      },
      {
        id: "2",
        bookingNumber: "BK20250626002",
        guest: { firstName: "Jane", lastName: "Smith", email: "jane.smith@example.com" },
        checkInDate: "2025-06-26",
        checkOutDate: "2025-06-30",
        bookingStatus: "CONFIRMED",
        totalAmount: 4200,
        payments: [{ amount: 4200, status: "PAID", transactionId: "txn2", transactionDate: "2025-06-25" }], // No method specified, will default to cash
        roomTypeBookings: [{ roomType: "STANDARD", numberOfRooms: 1, roomIds: ["R201"] }],
        roomType: "STANDARD", // Fallback
        numberOfGuests: 1,
      },
      {
        id: "3",
        bookingNumber: "BK20250701003",
        guest: { firstName: "Alice", lastName: "Brown", email: "alice.brown@example.com" },
        checkInDate: "2025-07-01",
        checkOutDate: "2025-07-04",
        bookingStatus: "CONFIRMED",
        totalAmount: 2100,
        payments: [{ amount: 2100, status: "PAID", transactionId: "txn3", transactionDate: "2025-06-30" }], // No method specified, will default to cash
        roomTypeBookings: [{ roomType: "DELUXE", numberOfRooms: 1, roomIds: ["R102"] }],
        roomType: "DELUXE", // Fallback
        numberOfGuests: 2,
      },
    ]

    const mockRooms = [
      {
        id: "R101",
        roomNumber: "101",
        roomType: "DELUXE",
        status: "OCCUPIED",
        isActive: true,
        floor: 1,
        pricePerNight: 700,
      },
      {
        id: "R102",
        roomNumber: "102",
        roomType: "DELUXE",
        status: "AVAILABLE",
        isActive: true,
        floor: 1,
        pricePerNight: 700,
      },
      {
        id: "R201",
        roomNumber: "201",
        roomType: "STANDARD",
        status: "OCCUPIED",
        isActive: true,
        floor: 2,
        pricePerNight: 800,
      },
      {
        id: "R202",
        roomNumber: "202",
        roomType: "STANDARD",
        status: "AVAILABLE",
        isActive: true,
        floor: 2,
        pricePerNight: 800,
      },
      {
        id: "R301",
        roomNumber: "301",
        roomType: "PRESIDENTIAL",
        status: "AVAILABLE",
        isActive: true,
        floor: 3,
        pricePerNight: 1500,
      },
    ]

    // Re-use the processing logic with mock data
    const processedMockData = processData(mockBookings, mockRooms)

    // Manually override paymentMethods in mock data to ensure "Online" is 0 as requested
    const totalMockRevenue = mockBookings.reduce((sum, booking) => sum + (Number(booking.totalAmount) || 0), 0)
    processedMockData.paymentMethods = [
      { name: "Cash", value: totalMockRevenue },
      { name: "Online", value: 0 },
    ]

    return processedMockData
  }

  // Handler for date range picker changes
  const handleDateRangeChange = (newDateRange: DateRange | undefined): void => {
    if (newDateRange && newDateRange.from && newDateRange.to) {
      setDateRange(newDateRange)
      // Re-fetch data with new date range
      fetchDashboardData()
    }
  }

  // Handle refresh button click
  const handleRefresh = () => {
    fetchDashboardData()
  }

  // Toggle debug panel
  const toggleDebug = () => {
    setShowDebug(!showDebug)
  }

  // Handle export data
  const handleExportData = () => {
    if (!dashboardData || !dashboardData.csvData) {
      console.warn("No data to export.")
      return
    }

    const { roomCashFlowMap, roomActualRevenueMap, allDatesInRange, sortedRoomTypes } = dashboardData.csvData

    const dateHeaders = allDatesInRange.map((date) => format(date, "d")).join(",")
    const fullDateHeaders = allDatesInRange.map((date) => format(date, "yyyy-MM-dd")).join(",") // For internal use if needed

    let csvContent = `Total,${dashboardData.overview.totalRevenue},,,,,,,,,,\n` // Placeholder for total

    // Cash Flow Section
    csvContent += `Cash Flow,,,,${dateHeaders}\n`
    sortedRoomTypes.forEach((roomType) => {
      const cashFlowRow = [`${roomType} Cash Flow`, "", "", ""] // Placeholder for initial columns
      allDatesInRange.forEach((date) => {
        const dateKey = format(date, "yyyy-MM-dd")
        const value = roomCashFlowMap.get(roomType)?.get(dateKey) || 0
        cashFlowRow.push(value.toFixed(0))
      })
      csvContent += cashFlowRow.join(",") + "\n"
    })

    csvContent += `\nTotal,${dashboardData.overview.totalRevenue},,,,,,,,,,\n` // Placeholder for total actuals

    // Actual Revenue Section
    csvContent += `Actuals,,,,${dateHeaders}\n`
    sortedRoomTypes.forEach((roomType) => {
      const actualsRow = [`${roomType} Actuals`, "", "", ""] // Placeholder for initial columns
      allDatesInRange.forEach((date) => {
        const dateKey = format(date, "yyyy-MM-dd")
        const value = roomActualRevenueMap.get(roomType)?.get(dateKey) || 0
        actualsRow.push(value.toFixed(0))
      })
      csvContent += actualsRow.join(",") + "\n"
    })

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("hidden", "")
    a.setAttribute("href", url)
    a.setAttribute("download", "financial_data.csv")
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <div className="container mx-auto p-6">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Hotel Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Comprehensive analytics for bookings, rooms, and revenue</p>
        </div>
        <div className="flex items-center gap-2">
          <DatePickerWithRange date={dateRange} setDate={handleDateRangeChange} />
          <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" onClick={handleExportData} disabled={!dashboardData}>
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={toggleDebug}>
            <Bug className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showDebug && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
            <CardDescription>Raw data and processing details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Selected Hotel</h3>
                <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto">
                  {JSON.stringify(selectedHotel, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="font-medium">Raw Bookings Data</h3>
                <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto max-h-60">
                  {JSON.stringify(rawData, null, 2)}
                </pre>
              </div>
              <div>
                <h3 className="font-medium">Processed Dashboard Data</h3>
                <pre className="bg-slate-100 p-2 rounded text-xs overflow-auto max-h-60">
                  {JSON.stringify(dashboardData, null, 2)}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Booking Trends</TabsTrigger>
          <TabsTrigger value="rooms">Room Analytics</TabsTrigger>
          <TabsTrigger value="guests">Guest Analytics</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : dashboardData ? (
            <>
              <OverviewMetricsComponent data={dashboardData.overview} isLoading={false} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                    <CardDescription>Last 10 bookings across all properties</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BookingTableComponent bookings={dashboardData.recentBookings.slice(0, 5)} isLoading={false} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Room Type Distribution</CardTitle>
                    <CardDescription>Bookings by room type</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <RoomAnalytics data={dashboardData.roomTypeDistribution} isLoading={false} chartType="pie" />
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">No booking trend data available</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : dashboardData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Trends</CardTitle>
                    <CardDescription>Bookings and revenue over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <BookingTrends data={dashboardData.bookingTrends} isLoading={false} chartType="line" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Booking Sources</CardTitle>
                    <CardDescription>Where your bookings come from</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <BookingTrends data={dashboardData.bookingSources} isLoading={false} chartType="pie" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Status</CardTitle>
                    <CardDescription>Current status of all bookings</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <BookingTrends data={dashboardData.bookingStatus} isLoading={false} chartType="bar" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Stay Duration</CardTitle>
                    <CardDescription>Length of guest stays</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <BookingTrends data={dashboardData.stayDuration} isLoading={false} chartType="bar" />
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">No booking trend data available</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="rooms" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : dashboardData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Room Status</CardTitle>
                    <CardDescription>Current status of all rooms</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <RoomAnalytics data={dashboardData.roomStatus} isLoading={false} chartType="pie" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Room Type Performance</CardTitle>
                    <CardDescription>Bookings by room type</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <RoomAnalytics data={dashboardData.roomTypePerformance} isLoading={false} chartType="bar" />
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Occupancy Timeline</CardTitle>
                    <CardDescription>Occupancy rate over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <RoomAnalytics data={dashboardData.occupancyTimeline} isLoading={false} chartType="line" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Floor Occupancy</CardTitle>
                    <CardDescription>Occupancy by floor</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <RoomAnalytics data={dashboardData.floorOccupancy} isLoading={false} chartType="heatmap" />
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">No room analytics data available</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="guests" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : dashboardData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Guest Types</CardTitle>
                    <CardDescription>New vs returning guests</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <GuestAnalytics data={dashboardData.guestTypes} isLoading={false} chartType="pie" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Guest Satisfaction</CardTitle>
                    <CardDescription>Guest ratings distribution</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <GuestAnalytics data={dashboardData.guestSatisfaction} isLoading={false} chartType="bar" />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Top Guests</CardTitle>
                  <CardDescription>Guests with most bookings and revenue</CardDescription>
                </CardHeader>
                <CardContent>
                  <GuestAnalytics data={dashboardData.topGuests} isLoading={false} chartType="table" />
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">No guest analytics data available</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : dashboardData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                    <CardDescription>Revenue over time</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <FinancialAnalytics data={dashboardData.revenueTrends} isLoading={false} chartType="line" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Room Type</CardTitle>
                    <CardDescription>Revenue distribution by room category</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <FinancialAnalytics data={dashboardData.revenueByRoomType} isLoading={false} chartType="bar" />
                  </CardContent>
                </Card>
              </div>

              {/* New Revenue Analysis section with sub-tabs */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analysis</CardTitle>
                  <CardDescription>Cash Flow vs Actual Revenue breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={financialSubTab} onValueChange={setFinancialSubTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="cashflow">Cash Flow Revenue</TabsTrigger>
                      <TabsTrigger value="actual">Actual Revenue</TabsTrigger>
                    </TabsList>
                    <TabsContent value="cashflow" className="h-[300px] mt-4">
                      {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                      ) : dashboardData ? (
                        <FinancialAnalytics
                          data={dashboardData.cashFlowDailyTrends} // Use new cash flow data
                          isLoading={false}
                          chartType="bar" // Use bar chart for daily cash flow
                          xAxisKey="date" // Plot the 'date' field on X-axis
                          barDataKey="value" // Plot the 'value' field as bar height
                        />
                      ) : (
                        <div className="flex justify-center items-center h-full">
                          <p className="text-muted-foreground">No cash flow data available</p>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="actual" className="h-[300px] mt-4">
                      {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                      ) : dashboardData ? (
                        <FinancialAnalytics
                          data={dashboardData.actualRevenueDailyTrends} // Use new actual revenue data
                          isLoading={false}
                          chartType="bar" // Use bar chart for daily actual revenue
                          xAxisKey="date" // Plot the 'date' field on X-axis
                          barDataKey="value" // Plot the 'value' field as bar height
                        />
                      ) : (
                        <div className="flex justify-center items-center h-full">
                          <p className="text-muted-foreground">No actual revenue data available</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Bookings by payment method</CardDescription>
                  </CardHeader>
                  <CardContent className="h-[300px]">
                    <FinancialAnalytics
                      data={dashboardData.paymentMethods}
                      isLoading={false}
                      chartType="bar"
                      xAxisKey="name" // Use 'name' for X-axis (Cash, Online)
                      barDataKey="value" // Use 'value' for bar height
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Metrics</CardTitle>
                    <CardDescription>Key financial indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Average Daily Rate (ADR)</span>
                        <span className="font-medium">${dashboardData.overview.averageDailyRate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">RevPAR</span>
                        <span className="font-medium">${dashboardData.overview.revPAR}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total Revenue</span>
                        <span className="font-medium">${dashboardData.overview.totalRevenue}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Revenue per Booking</span>
                        <span className="font-medium">
                          $
                          {dashboardData.overview.totalBookings
                            ? Math.round(dashboardData.overview.totalRevenue / dashboardData.overview.totalBookings)
                            : 0}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-muted-foreground">No financial data available</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
