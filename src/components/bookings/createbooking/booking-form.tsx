// // "use client"
// import { useMutation, useQuery } from "@apollo/client"
// import { CREATE_BOOKING } from "@/graphql/booking/mutations"
// import { useForm, useFieldArray, useWatch } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent } from "@/components/ui/card"
// import { CalendarIcon, Loader2, Plus, Trash2 } from "lucide-react"
// import { format, addDays } from "date-fns"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"
// import { cn } from "@/lib/utils"
// import { useToast } from "@/components/ui/use-toast"
// import { useEffect, useState } from "react"
// import { useHotelContext } from "@/providers/hotel-provider"

// // Room types from backend enum
// const ROOM_TYPES = ["STANDARD", "DELUXE", "SUITE", "EXECUTIVE", "PRESIDENTIAL"] as const

// // GraphQL query to fetch room pricing
// const GET_ROOM_PRICING = gql`
//   query GetRooms($hotelId: String!) {
//     rooms(hotelId: $hotelId, limit: 100, offset: 0) {
//       id
//       roomType
//       pricePerNight
//     }
//   }
// `

// const bookingSourceOptions = [
//   { value: "WEBSITE", label: "Website" },
//   { value: "WALK_IN", label: "Walk-in" },
//   { value: "PHONE", label: "Phone" },
//   { value: "DIRECT", label: "Direct" },
//   { value: "OTA", label: "Online Travel Agency" },
//   { value: "CORPORATE", label: "Corporate" },
// ]

// const bookingSchema = z.object({
//   checkInDate: z.date({ required_error: "Check-in date is required" }),
//   checkOutDate: z.date({ required_error: "Check-out date is required" }),
//   numberOfGuests: z.coerce.number().int().min(1, { message: "At least 1 guest is required" }),
//   bookingSource: z.enum(["DIRECT", "WEBSITE", "OTA", "PHONE", "WALK_IN", "CORPORATE"], {
//     required_error: "Booking source is required",
//   }),
//   specialRequests: z.string().optional(),
//   guest: z.object({
//     firstName: z.string().min(1, { message: "First name is required" }),
//     lastName: z.string().min(1, { message: "Last name is required" }),
//     email: z.string().email({ message: "Invalid email address" }),
//     phone: z.string().min(5, { message: "Phone number is required" }),
//   }),
//   roomTypeBookings: z
//     .array(
//       z.object({
//         roomType: z.enum(ROOM_TYPES, { required_error: "Room type is required" }),
//         numberOfRooms: z.coerce.number().int().min(1, { message: "At least 1 room is required" }),
//       }),
//     )
//     .min(1, { message: "At least one room type must be selected" }),
// })

// type BookingFormValues = z.infer<typeof bookingSchema>

// interface BookingFormProps {
//   onSuccess?: () => void
// }

// export default function BookingForm({ onSuccess }: BookingFormProps) {
//   const [createBooking, { loading }] = useMutation(CREATE_BOOKING)
//   const { toast } = useToast()
//   const today = new Date()

//   // Pricing data state
//   const [pricingData, setPricingData] = useState<
//     Record<string, { basePrice: number; minPrice: number; maxPrice: number }>
//   >({})
//   const [pricingLoading, setPricingLoading] = useState(true)

//   // Access hotel context
//   const { selectedHotel } = useHotelContext()

//   // Fetch pricing data using Apollo Client
//   const { data: roomPricingData, loading: roomPricingLoading, refetch: refetchRoomPricing } = useQuery(GET_ROOM_PRICING, {
//     variables: { hotelId: selectedHotel?.id },
//     skip: !selectedHotel?.id,
//     fetchPolicy: "network-only", // Don't use cache to ensure we get the latest pricing
//   })

//   // Process room pricing data when it's available
//   useEffect(() => {
//     if (roomPricingData?.rooms) {
//       processPricingData(roomPricingData.rooms)
//     }
//   }, [roomPricingData])

//   // Process the pricing data from GraphQL
//   const processPricingData = (rooms: any[]) => {
//     setPricingLoading(true)
//     try {
//       // Group rooms by type and calculate pricing
//       const roomTypeGroups = rooms.reduce((acc: any, room: any) => {
//         const roomType = room.roomType
//         if (!acc[roomType]) {
//           acc[roomType] = {
//             prices: [],
//             totalRooms: 0,
//           }
//         }
//         acc[roomType].prices.push(room.pricePerNight || 1000)
//         acc[roomType].totalRooms += 1
//         return acc
//       }, {})

//       // Calculate pricing data for each room type
//       const pricingMap: Record<string, { basePrice: number; minPrice: number; maxPrice: number }> = {}

//       Object.entries(roomTypeGroups).forEach(([typeName, data]: [string, any]) => {
//         const avgPrice = data.prices.reduce((sum: number, price: number) => sum + price, 0) / data.totalRooms

//         pricingMap[typeName] = {
//           basePrice: Math.round(avgPrice),
//           minPrice: Math.round(avgPrice * 0.5), // 50% of avg as min
//           maxPrice: Math.round(avgPrice * 2), // 200% of avg as max
//         }
//       })

//       setPricingData(pricingMap)
//     } catch (error) {
//       console.error("Error processing pricing data:", error)
//       toast({
//         title: "Warning",
//         description: "Could not process pricing data. Using default prices.",
//         variant: "destructive",
//       })
//     } finally {
//       setPricingLoading(false)
//     }
//   }

//   // Refetch pricing data when hotel changes
//   useEffect(() => {
//     if (selectedHotel?.id) {
//       refetchRoomPricing()
//     }
//   }, [selectedHotel, refetchRoomPricing])

//   const form = useForm<BookingFormValues>({
//     resolver: zodResolver(bookingSchema),
//     defaultValues: {
//       checkInDate: today,
//       checkOutDate: addDays(today, 1),
//       numberOfGuests: 2,
//       bookingSource: "WALK_IN",
//       guest: {
//         firstName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//       },
//       roomTypeBookings: [{ roomType: "STANDARD", numberOfRooms: 1 }],
//     },
//   })

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = form

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "roomTypeBookings",
//   })

//   const watchRoomTypeBookings = useWatch({
//     control,
//     name: "roomTypeBookings",
//   })

//   const onSubmit = async (data: BookingFormValues) => {
//     if (!selectedHotel?.id) {
//       toast({
//         title: "Error",
//         description: "No hotel selected",
//         variant: "destructive",
//       })
//       return
//     }

//     try {
//       const result = await createBooking({
//         variables: {
//           bookingData: {
//             ...data,
//             hotelId: selectedHotel.id,
//             ratePlan: "standard", // Default rate plan
//           },
//         },
//       })

//       toast({
//         title: "Booking Created",
//         description: `Booking #${result.data.createBooking.bookingNumber} created successfully`,
//       })

//       if (onSuccess) {
//         onSuccess()
//       }
//     } catch (error: any) {
//       console.error(error)
//       toast({
//         title: "Error",
//         description: error.message || "Failed to create booking",
//         variant: "destructive",
//       })
//     }
//   }

//   if (pricingLoading || roomPricingLoading) {
//     return (
//       <div className="flex items-center justify-center p-8">
//         <div className="flex items-center space-x-2">
//           <Loader2 className="h-5 w-5 animate-spin" />
//           <span>Loading pricing information...</span>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//         <Card>
//           <CardContent className="pt-6">
//             <div className="mb-4 pb-4 border-b">
//               <h3 className="text-lg font-medium">Guest Information</h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="guest.firstName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>First Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="John" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="guest.lastName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Last Name</FormLabel>
//                     <FormControl>
//                       <Input placeholder="Doe" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="guest.email"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Email</FormLabel>
//                     <FormControl>
//                       <Input placeholder="john.doe@example.com" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="guest.phone"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Phone</FormLabel>
//                     <FormControl>
//                       <Input placeholder="+1 (555) 123-4567" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="mb-4 pb-4 border-b">
//               <h3 className="text-lg font-medium">Stay Details</h3>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="checkInDate"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-col">
//                     <FormLabel>Check-in Date</FormLabel>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             variant={"outline"}
//                             className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
//                           >
//                             {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={field.value}
//                           onSelect={field.onChange}
//                           disabled={(date) => date < today}
//                           initialFocus
//                         />
//                       </PopoverContent>
//                     </Popover>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="checkOutDate"
//                 render={({ field }) => (
//                   <FormItem className="flex flex-col">
//                     <FormLabel>Check-out Date</FormLabel>
//                     <Popover>
//                       <PopoverTrigger asChild>
//                         <FormControl>
//                           <Button
//                             variant={"outline"}
//                             className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
//                           >
//                             {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </FormControl>
//                       </PopoverTrigger>
//                       <PopoverContent className="w-auto p-0" align="start">
//                         <Calendar
//                           mode="single"
//                           selected={field.value}
//                           onSelect={field.onChange}
//                           disabled={(date) => {
//                             const checkInDate = form.getValues("checkInDate")
//                             return date <= checkInDate
//                           }}
//                           initialFocus
//                         />
//                       </PopoverContent>
//                     </Popover>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="numberOfGuests"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Number of Guests</FormLabel>
//                     <FormControl>
//                       <Input type="number" min="1" {...field} />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="bookingSource"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Booking Source</FormLabel>
//                     <Select onValueChange={field.onChange} defaultValue={field.value}>
//                       <FormControl>
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select booking source" />
//                         </SelectTrigger>
//                       </FormControl>
//                       <SelectContent>
//                         {bookingSourceOptions.map((option) => (
//                           <SelectItem key={option.value} value={option.value}>
//                             {option.label}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="mb-4 pb-4 border-b flex justify-between items-center">
//               <h3 className="text-lg font-medium">Room Selection</h3>
//               <Button
//                 type="button"
//                 variant="outline"
//                 size="sm"
//                 onClick={() => append({ roomType: "STANDARD", numberOfRooms: 1 })}
//               >
//                 <Plus className="h-4 w-4 mr-2" /> Add Room Type
//               </Button>
//             </div>

//             {fields.map((field, index) => {
//               const currentRoomType = watchRoomTypeBookings?.[index]?.roomType ?? ""
//               const pricing = pricingData[currentRoomType]

//               return (
//                 <div key={field.id} className="mb-4 p-4 border rounded-md">
//                   <div className="flex justify-between items-center mb-4">
//                     <h4 className="font-medium">Room Type {index + 1}</h4>
//                     {fields.length > 1 && (
//                       <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormField
//                       control={form.control}
//                       name={`roomTypeBookings.${index}.roomType`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Room Type</FormLabel>
//                           <Select onValueChange={field.onChange} value={field.value}>
//                             <FormControl>
//                               <SelectTrigger>
//                                 <SelectValue placeholder="Select room type" />
//                               </SelectTrigger>
//                             </FormControl>
//                             <SelectContent>
//                               {ROOM_TYPES.map((type) => {
//                                 const typePricing = pricingData[type]
//                                 return (
//                                   <SelectItem key={type} value={type}>
//                                     <div className="flex flex-col">
//                                       <span>{type.charAt(0) + type.slice(1).toLowerCase()}</span>
//                                       {typePricing && (
//                                         <div className="text-xs text-gray-500">
//                                           ฿{typePricing.basePrice} (฿{typePricing.minPrice} - ฿{typePricing.maxPrice})
//                                         </div>
//                                       )}
//                                     </div>
//                                   </SelectItem>
//                                 )
//                               })}
//                             </SelectContent>
//                           </Select>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name={`roomTypeBookings.${index}.numberOfRooms`}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Number of Rooms</FormLabel>
//                           <FormControl>
//                             <Input type="number" min="1" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   {/* Pricing Display */}
//                   {pricing && (
//                     <div className="mt-4 p-3 bg-gray-50 rounded-md">
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <div className="text-lg font-semibold text-green-600">
//                             ฿{pricing.basePrice}
//                             <span className="text-sm font-normal text-gray-500 ml-1">per night</span>
//                           </div>
//                           <div className="text-xs text-gray-500">
//                             Range: ฿{pricing.minPrice} - ฿{pricing.maxPrice}
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <div className="text-sm text-gray-600">
//                             {watchRoomTypeBookings?.[index]?.numberOfRooms || 1} room(s)
//                           </div>
//                           <div className="text-lg font-semibold">
//                             ฿{pricing.basePrice * (watchRoomTypeBookings?.[index]?.numberOfRooms || 1)}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )
//             })}

//             {fields.length === 0 && (
//               <div className="text-center py-4">
//                 <p className="text-muted-foreground">No room types added</p>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   className="mt-2"
//                   onClick={() => append({ roomType: "STANDARD", numberOfRooms: 1 })}
//                 >
//                   <Plus className="h-4 w-4 mr-2" /> Add Room Type
//                 </Button>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="mb-4 pb-4 border-b">
//               <h3 className="text-lg font-medium">Special Requests</h3>
//             </div>

//             <FormField
//               control={form.control}
//               name="specialRequests"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Any special requests or requirements..."
//                       className="min-h-[100px]"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormDescription>Optional: Add any special requests for the stay</FormDescription>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </CardContent>
//         </Card>

//         <div className="mt-6 pt-6 flex justify-end">
//           <Button type="submit" disabled={loading} className="bg-green-500 hover:bg-green-600">
//             {loading ? (
//               <>
//                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 Creating Booking...
//               </>
//             ) : (
//               "Create Booking"
//             )}
//           </Button>
//         </div>
//       </form>
//     </Form>
//   )
// }

"use client"

import { useMutation } from "@apollo/client"
import { CREATE_BOOKING } from "@/graphql/booking/mutations"
import { useForm, useFieldArray, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, Loader2, Plus, Trash2 } from "lucide-react"
import { format, addDays } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { useHotelContext } from "@/providers/hotel-provider"

// Room types from backend enum
const ROOM_TYPES = ["STANDARD", "DELUXE", "SUITE", "EXECUTIVE", "PRESIDENTIAL"] as const

const bookingSourceOptions = [
  { value: "WEBSITE", label: "Website" },
  { value: "WALK_IN", label: "Walk-in" },
  { value: "PHONE", label: "Phone" },
  { value: "DIRECT", label: "Direct" },
  { value: "OTA", label: "Online Travel Agency" },
  { value: "CORPORATE", label: "Corporate" },
]

const bookingSchema = z.object({
  checkInDate: z.date({ required_error: "Check-in date is required" }),
  checkOutDate: z.date({ required_error: "Check-out date is required" }),
  numberOfGuests: z.coerce.number().int().min(1, { message: "At least 1 guest is required" }),
  bookingSource: z.enum(["DIRECT", "WEBSITE", "OTA", "PHONE", "WALK_IN", "CORPORATE"], {
    required_error: "Booking source is required",
  }),
  specialRequests: z.string().optional(),
  guest: z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(5, { message: "Phone number is required" }),
  }),
  roomTypeBookings: z
    .array(
      z.object({
        roomType: z.enum(ROOM_TYPES, { required_error: "Room type is required" }),
        numberOfRooms: z.coerce.number().int().min(1, { message: "At least 1 room is required" }),
      }),
    )
    .min(1, { message: "At least one room type must be selected" }),
})

type BookingFormValues = z.infer<typeof bookingSchema>

// Function to get pricing config from localStorage
function getPricingConfig(hotelId: string) {
  try {
    const configKey = `pricingConfig_${hotelId}`
    return JSON.parse(localStorage.getItem(configKey) || "{}")
  } catch (error) {
    console.error("Error getting pricing config from localStorage:", error)
    return {}
  }
}

interface BookingFormProps {
  onSuccess?: () => void
}

export default function BookingForm({ onSuccess }: BookingFormProps) {
  const [createBooking, { loading }] = useMutation(CREATE_BOOKING)
  const { toast } = useToast()
  const today = new Date()

  // Pricing data state
  const [pricingData, setPricingData] = useState<
    Record<string, { basePrice: number; minPrice: number; maxPrice: number }>
  >({})
  const [pricingLoading, setPricingLoading] = useState(true)

  // Access hotel context
  const { selectedHotel } = useHotelContext()

  const fetchPricingData = async () => {
    setPricingLoading(true)
    try {
      const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:8000/graphql"

      console.group("🏨 Room Data Fetching Debug")
      console.log("1. Selected Hotel:", selectedHotel)
      console.log("2. Hotel ID:", selectedHotel?.id)
      console.log("3. GraphQL Endpoint:", endpoint)

      // Try multiple query variations to find the correct one
      const queryVariations = [
        // Variation 1: With hotelId parameter
        `
      query {
        rooms(hotelId: "${selectedHotel?.id}") {
          id
          roomType
          pricePerNight
        }
      }
      `,
        // Variation 2: Without parameters (get all rooms)
        `
      query {
        rooms {
          id
          roomType
          pricePerNight
          hotelId
        }
      }
      `,
        // Variation 3: With different parameter name
        `
      query {
        rooms(hotel_id: "${selectedHotel?.id}") {
          id
          roomType
          pricePerNight
        }
      }
      `,
        // Variation 4: Using getRooms instead of rooms
        `
      query {
        getRooms(hotelId: "${selectedHotel?.id}") {
          id
          roomType
          pricePerNight
        }
      }
      `,
        // Variation 5: Using different field names
        `
      query {
        rooms(hotelId: "${selectedHotel?.id}") {
          id
          type
          price
        }
      }
      `,
      ]

      let roomData = null
      let successfulQuery = null

      for (let i = 0; i < queryVariations.length; i++) {
        console.log(`4.${i + 1}. Trying query variation ${i + 1}:`, queryVariations[i])

        try {
          const response = await fetch(endpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: queryVariations[i],
            }),
          })

          const result = await response.json()
          console.log(`5.${i + 1}. Response for variation ${i + 1}:`, result)

          if (result.data && !result.errors) {
            // Check for different possible field names
            const possibleRoomFields = ["rooms", "getRooms", "roomList", "hotelRooms"]

            for (const fieldName of possibleRoomFields) {
              if (
                result.data[fieldName] &&
                Array.isArray(result.data[fieldName]) &&
                result.data[fieldName].length > 0
              ) {
                roomData = result.data[fieldName]
                successfulQuery = i + 1
                console.log(`6. ✅ Found room data with field '${fieldName}' in query variation ${i + 1}`)
                break
              }
            }

            if (roomData) break
          } else if (result.errors) {
            console.log(`6.${i + 1}. GraphQL errors for variation ${i + 1}:`, result.errors)
          }
        } catch (error) {
          console.log(`6.${i + 1}. Network error for variation ${i + 1}:`, error)
        }
      }

      if (roomData && roomData.length > 0) {
        console.log("7. ✅ Successfully fetched room data:", roomData)
        console.log("8. Using query variation:", successfulQuery)
        console.log("9. Number of rooms found:", roomData.length)
        console.log("10. Sample room:", roomData[0])

        // Filter rooms by hotel ID if we got all rooms
        let filteredRooms = roomData
        if (selectedHotel?.id) {
          filteredRooms = roomData.filter(
            (room) =>
              room.hotelId === selectedHotel.id ||
              room.hotel_id === selectedHotel.id ||
              room.hotel === selectedHotel.id,
          )
          console.log("11. Filtered rooms for hotel:", filteredRooms)
        }

        // Group rooms by type and calculate pricing
        const roomTypeGroups = filteredRooms.reduce((acc: any, room: any) => {
          // Handle different possible field names for room type
          const roomType = room.roomType || room.type || room.room_type
          // Handle different possible field names for price
          const price = room.pricePerNight || room.price || room.price_per_night || 1000

          if (!roomType) {
            console.warn("12. Room missing roomType field:", room)
            return acc
          }

          if (!acc[roomType]) {
            acc[roomType] = {
              prices: [],
              totalRooms: 0,
              rooms: [],
            }
          }
          acc[roomType].prices.push(price)
          acc[roomType].totalRooms += 1
          acc[roomType].rooms.push(room)
          return acc
        }, {})

        console.log("13. Room type groups:", roomTypeGroups)
        console.log("14. Available room types:", Object.keys(roomTypeGroups))

        // Get pricing configuration from localStorage
        const pricingConfig = getPricingConfig(selectedHotel?.id || "")
        console.log("15. Pricing config from localStorage:", pricingConfig)

        // Calculate pricing data for each room type
        const pricingMap: Record<string, { basePrice: number; minPrice: number; maxPrice: number }> = {}

        // Process each room type
        Object.entries(roomTypeGroups).forEach(([typeName, data]: [string, any]) => {
          const avgPrice = data.prices.reduce((sum: number, price: number) => sum + price, 0) / data.totalRooms

          console.log(`16. Processing ${typeName}:`, {
            totalRooms: data.totalRooms,
            prices: data.prices,
            avgPrice: avgPrice,
          })

          // Check if we have pricing configuration for this room type
          const roomConfig = pricingConfig[typeName]

          if (roomConfig) {
            pricingMap[typeName] = {
              basePrice: roomConfig.basePrice,
              minPrice: roomConfig.minPrice,
              maxPrice: roomConfig.maxPrice,
            }
            console.log(`17. Using configured pricing for ${typeName}:`, pricingMap[typeName])
          } else {
            // Default pricing based on room type
            if (typeName === "STANDARD") {
              pricingMap[typeName] = { basePrice: 500, minPrice: 250, maxPrice: 1000 }
            } else if (typeName === "DELUXE") {
              pricingMap[typeName] = { basePrice: 300, minPrice: 150, maxPrice: 600 }
            } else if (typeName === "SUITE") {
              pricingMap[typeName] = { basePrice: 2000, minPrice: 1000, maxPrice: 4000 }
            } else {
              pricingMap[typeName] = {
                basePrice: Math.round(avgPrice),
                minPrice: Math.round(avgPrice * 0.5),
                maxPrice: Math.round(avgPrice * 2),
              }
            }
            console.log(`18. Using default pricing for ${typeName}:`, pricingMap[typeName])
          }
        })

        console.log("19. Final pricing map:", pricingMap)
        setPricingData(pricingMap)

        toast({
          title: "Room Data Loaded",
          description: `Found ${Object.keys(roomTypeGroups).length} room types`,
        })
      } else {
        console.error("20. ❌ No room data found with any query variation")

        // Set default pricing data so the form still works
        const defaultPricing = {
          STANDARD: { basePrice: 500, minPrice: 250, maxPrice: 1000 },
          DELUXE: { basePrice: 300, minPrice: 150, maxPrice: 600 },
          SUITE: { basePrice: 2000, minPrice: 1000, maxPrice: 4000 },
          EXECUTIVE: { basePrice: 1500, minPrice: 750, maxPrice: 3000 },
          PRESIDENTIAL: { basePrice: 5000, minPrice: 2500, maxPrice: 10000 },
        }

        setPricingData(defaultPricing)
        console.log("21. Using default pricing data:", defaultPricing)

        toast({
          title: "Using Default Pricing",
          description: "Could not load room data from server. Using default prices.",
          variant: "destructive",
        })
      }

      console.groupEnd()
    } catch (error) {
      console.error("❌ Error fetching room data:", error)

      // Set default pricing data so the form still works
      const defaultPricing = {
        STANDARD: { basePrice: 500, minPrice: 250, maxPrice: 1000 },
        DELUXE: { basePrice: 300, minPrice: 150, maxPrice: 600 },
        SUITE: { basePrice: 2000, minPrice: 1000, maxPrice: 4000 },
        EXECUTIVE: { basePrice: 1500, minPrice: 750, maxPrice: 3000 },
        PRESIDENTIAL: { basePrice: 5000, minPrice: 2500, maxPrice: 10000 },
      }

      setPricingData(defaultPricing)

      toast({
        title: "Warning",
        description: "Could not load room data. Using default prices.",
        variant: "destructive",
      })
    } finally {
      setPricingLoading(false)
    }
  }

  // Add this useEffect to debug hotel context
  useEffect(() => {
    console.group("🏨 Hotel Context Debug")
    console.log("Selected Hotel:", selectedHotel)
    console.log("Hotel ID:", selectedHotel?.id)
    console.log("Hotel Name:", selectedHotel?.name)
    console.groupEnd()
  }, [selectedHotel])

  // Fetch pricing data when hotel changes
  useEffect(() => {
    if (selectedHotel?.id) {
      fetchPricingData()
    }
  }, [selectedHotel])

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      checkInDate: today,
      checkOutDate: addDays(today, 1),
      numberOfGuests: 2,
      bookingSource: "WALK_IN",
      guest: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      roomTypeBookings: [{ roomType: "STANDARD", numberOfRooms: 1 }],
    },
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "roomTypeBookings",
  })

  const watchRoomTypeBookings = useWatch({
    control,
    name: "roomTypeBookings",
  })

  const onSubmit = async (data: BookingFormValues) => {
    if (!selectedHotel?.id) {
      toast({
        title: "Error",
        description: "No hotel selected",
        variant: "destructive",
      })
      return
    }

    const bookingData = {
      ...data,
      hotelId: selectedHotel.id,
      // Convert dates to ISO string format for GraphQL
      checkInDate: data.checkInDate.toISOString().split("T")[0], // YYYY-MM-DD format
      checkOutDate: data.checkOutDate.toISOString().split("T")[0], // YYYY-MM-DD format
      ratePlan: null,
    }

    // Enhanced debugging for inventory issues
    console.group("🏨 Inventory Debug Information")
    console.log("1. Hotel Details:")
    console.log("   - Hotel ID:", selectedHotel.id)
    console.log("   - Hotel Name:", selectedHotel.name)
    console.log("2. Date Information:")
    console.log("   - Original Check-in:", data.checkInDate)
    console.log("   - Original Check-out:", data.checkOutDate)
    console.log("   - Formatted Check-in:", bookingData.checkInDate)
    console.log("   - Formatted Check-out:", bookingData.checkOutDate)
    console.log("   - Today's Date:", new Date().toISOString().split("T")[0])
    console.log("3. Room Type Information:")
    data.roomTypeBookings.forEach((room, index) => {
      console.log(`   - Room ${index + 1}: ${room.roomType} (${room.numberOfRooms} rooms)`)
    })
    console.log("4. Complete Booking Data Structure:")
    console.log(JSON.stringify(bookingData, null, 2))
    console.groupEnd()

    try {
      console.group("🚀 GraphQL Mutation Debug")
      console.log("1. Selected Hotel:", selectedHotel)
      console.log("2. Form Data:", data)
      console.log("3. Final Booking Data:", bookingData)
      console.log("4. Mutation Variables:", { bookingData })

      // Log each field in detail
      console.log("5. Detailed Field Analysis:")
      console.log("   - Hotel ID:", bookingData.hotelId)
      console.log("   - Check-in Date:", bookingData.checkInDate)
      console.log("   - Check-out Date:", bookingData.checkOutDate)
      console.log("   - Number of Guests:", bookingData.numberOfGuests)
      console.log("   - Booking Source:", bookingData.bookingSource)
      console.log("   - Guest Info:", bookingData.guest)
      console.log("   - Room Type Bookings:", bookingData.roomTypeBookings)
      console.log("   - Rate Plan:", bookingData.ratePlan)

      // Validate data before sending
      const validationIssues = []
      if (!bookingData.hotelId) validationIssues.push("Missing hotel ID")
      if (!bookingData.checkInDate) validationIssues.push("Missing check-in date")
      if (!bookingData.checkOutDate) validationIssues.push("Missing check-out date")
      if (!bookingData.guest.firstName) validationIssues.push("Missing guest first name")
      if (!bookingData.guest.lastName) validationIssues.push("Missing guest last name")
      if (!bookingData.guest.email) validationIssues.push("Missing guest email")
      if (!bookingData.roomTypeBookings || bookingData.roomTypeBookings.length === 0) {
        validationIssues.push("Missing room type bookings")
      }

      if (validationIssues.length > 0) {
        console.warn("6. Validation Issues Found:", validationIssues)
      } else {
        console.log("6. ✅ All required fields present")
      }

      console.groupEnd()

      const result = await createBooking({
        variables: {
          bookingData,
        },
      })

      // Comprehensive result logging
      console.group("📥 GraphQL Response Debug")
      console.log("1. Full Result Object:", result)
      console.log("2. Result Data:", result.data)
      console.log("3. Result Errors:", result.errors)
      console.log("4. Result Loading:", result.loading)
      console.log("5. Result Called:", result.called)

      // Check if result.data exists and what it contains
      if (result.data) {
        console.log("6. Data Keys:", Object.keys(result.data))
        console.log("7. CreateBooking Value:", result.data.createBooking)

        if (result.data.createBooking) {
          console.log("8. CreateBooking Keys:", Object.keys(result.data.createBooking))
        }
      } else {
        console.log("6. ❌ result.data is null/undefined")
      }
      console.groupEnd()

      // Check for GraphQL errors first
      if (result.errors && result.errors.length > 0) {
        console.group("❌ Detailed GraphQL Errors")
        result.errors.forEach((error, index) => {
          console.error(`Error ${index + 1}:`, error)
          console.error(`Message: ${error.message}`)
          console.error(`Path: ${error.path}`)
          console.error(`Extensions: ${JSON.stringify(error.extensions, null, 2)}`)
          console.error(`Locations: ${JSON.stringify(error.locations, null, 2)}`)
        })
        console.groupEnd()

        // Show detailed error message to user
        const errorMessage = result.errors[0].message || "Unknown GraphQL error occurred"
        const errorDetails = result.errors.map((err) => err.message).join(", ")

        toast({
          title: "GraphQL Error",
          description: errorDetails.length > 100 ? errorMessage : errorDetails,
          variant: "destructive",
        })
        return
      }

      // Check if we have data
      if (!result.data) {
        console.error("❌ No data returned from mutation")
        toast({
          title: "Error",
          description: "No data returned from server. Please check your network connection.",
          variant: "destructive",
        })
        return
      }

      // Check if createBooking exists
      if (!result.data.createBooking) {
        console.error("❌ createBooking is null/undefined in response")
        console.log("Available data keys:", Object.keys(result.data))
        toast({
          title: "Error",
          description: "Booking creation failed. The server returned no booking data.",
          variant: "destructive",
        })
        return
      }

      // Success cases
      const booking = result.data.createBooking

      if (booking.bookingNumber) {
        // Success with booking number
        toast({
          title: "Booking Created Successfully! 🎉",
          description: `Booking Number: ${booking.bookingNumber}`,
        })
        console.log("✅ Booking created successfully:", booking)
      } else if (booking.id) {
        // Success with ID but no booking number
        toast({
          title: "Booking Created Successfully! 🎉",
          description: `Booking ID: ${booking.id}`,
        })
        console.log("✅ Booking created (no booking number):", booking)
      } else {
        // Success but missing expected fields
        toast({
          title: "Booking Created",
          description: "Booking was created but some details are missing.",
        })
        console.log("⚠️ Booking created with incomplete data:", booking)
      }

      // Reset form and call success callback
      reset()
      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      console.group("❌ GraphQL Error Debug")
      console.error("1. Full Error Object:", error)
      console.error("2. Error Message:", error.message)
      console.error("3. Error Name:", error.name)
      console.error("4. Error Stack:", error.stack)

      if (error.graphQLErrors) {
        console.error("5. GraphQL Errors:", error.graphQLErrors)
      }
      if (error.networkError) {
        console.error("6. Network Error:", error.networkError)
        console.error("7. Network Error Status:", error.networkError.statusCode)
        console.error("8. Network Error Body:", error.networkError.bodyText)
      }
      if (error.extraInfo) {
        console.error("9. Extra Info:", error.extraInfo)
      }
      console.groupEnd()

      // Enhanced error handling with better user messages
      let errorMessage = "An unexpected error occurred while creating the booking."
      let errorTitle = "Booking Creation Failed"

      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const graphQLError = error.graphQLErrors[0].message

        // Handle specific business logic errors
        if (graphQLError.includes("Inventory not configured")) {
          errorTitle = "Room Not Available"
          if (graphQLError.includes("RoomType.SUITE")) {
            errorMessage =
              "Suite rooms are not available for the selected dates. Please choose a different room type or date."
          } else if (graphQLError.includes("RoomType.DELUXE")) {
            errorMessage =
              "Deluxe rooms are not available for the selected dates. Please choose a different room type or date."
          } else if (graphQLError.includes("RoomType.STANDARD")) {
            errorMessage =
              "Standard rooms are not available for the selected dates. Please choose a different room type or date."
          } else {
            errorMessage =
              "The selected room type is not available for the chosen dates. Please try a different room type or date."
          }
        } else if (graphQLError.includes("insufficient inventory")) {
          errorTitle = "Not Enough Rooms Available"
          errorMessage =
            "There aren't enough rooms of the selected type available. Please reduce the number of rooms or choose different dates."
        } else if (graphQLError.includes("invalid date")) {
          errorTitle = "Invalid Date Selection"
          errorMessage = "The selected dates are not valid for booking. Please choose different dates."
        } else {
          errorMessage = `Error: ${graphQLError}`
        }
      } else if (error.networkError) {
        if (error.networkError.statusCode === 400) {
          errorTitle = "Invalid Booking Details"
          errorMessage = "Please check your booking details and try again."
        } else if (error.networkError.statusCode === 401) {
          errorTitle = "Authentication Required"
          errorMessage = "Please log in and try again."
        } else if (error.networkError.statusCode === 500) {
          errorTitle = "Server Error"
          errorMessage = "Our servers are experiencing issues. Please try again later."
        } else {
          errorMessage = `Network Error: ${error.networkError.message}`
        }
      } else if (error.message) {
        errorMessage = error.message
      }

      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  if (pricingLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Loading pricing information...</span>
        </div>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="mb-4 pb-4 border-b">
              <h3 className="text-lg font-medium">Guest Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="guest.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guest.lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guest.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guest.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="mb-4 pb-4 border-b">
              <h3 className="text-lg font-medium">Stay Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="checkInDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Check-in Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < today}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkOutDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Check-out Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => {
                            const checkInDate = form.getValues("checkInDate")
                            return date <= checkInDate
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="numberOfGuests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Guests</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bookingSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Booking Source</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select booking source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bookingSourceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="mb-4 pb-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Room Selection</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ roomType: "STANDARD", numberOfRooms: 1 })}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Room Type
              </Button>
            </div>

            {fields.map((field, index) => {
              const currentRoomType = watchRoomTypeBookings?.[index]?.roomType ?? ""
              const pricing = pricingData[currentRoomType]

              return (
                <div key={field.id} className="mb-4 p-4 border rounded-md">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Room Type {index + 1}</h4>
                    {fields.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`roomTypeBookings.${index}.roomType`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Room Type</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select room type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {ROOM_TYPES.map((type) => {
                                const typePricing = pricingData[type]
                                return (
                                  <SelectItem key={type} value={type}>
                                    <div className="flex flex-col">
                                      <span>{type.charAt(0) + type.slice(1).toLowerCase()}</span>
                                      {typePricing && (
                                        <div className="text-xs text-gray-500">
                                          ฿{typePricing.basePrice} (฿{typePricing.minPrice} - ฿{typePricing.maxPrice})
                                        </div>
                                      )}
                                    </div>
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`roomTypeBookings.${index}.numberOfRooms`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Rooms</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Pricing Display */}
                  {pricing && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-lg font-semibold text-green-600">
                            ฿{pricing.basePrice}
                            <span className="text-sm font-normal text-gray-500 ml-1">per night</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Range: ฿{pricing.minPrice} - ฿{pricing.maxPrice}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">
                            {watchRoomTypeBookings?.[index]?.numberOfRooms || 1} room(s)
                          </div>
                          <div className="text-lg font-semibold">
                            ฿{pricing.basePrice * (watchRoomTypeBookings?.[index]?.numberOfRooms || 1)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}

            {fields.length === 0 && (
              <div className="text-center py-4">
                <p className="text-muted-foreground">No room types added</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => append({ roomType: "STANDARD", numberOfRooms: 1 })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Room Type
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="mb-4 pb-4 border-b">
              <h3 className="text-lg font-medium">Special Requests</h3>
            </div>

            <FormField
              control={form.control}
              name="specialRequests"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Any special requests or requirements..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Optional: Add any special requests for the stay</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="mt-6 pt-6 flex justify-end">
          <Button type="submit" disabled={loading} className="bg-green-500 hover:bg-green-600">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Booking...
              </>
            ) : (
              "Create Booking"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
