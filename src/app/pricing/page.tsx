

// "use client"

// import { useState, useCallback, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { useToast } from "@/components/ui/use-toast"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Save, RefreshCw, Loader2, AlertCircle, CheckCircle } from "lucide-react"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Switch } from "@/components/ui/switch"
// import { useHotelContext } from "@/providers/hotel-provider"

// // Types
// interface RoomTypeData {
//   id: string
//   roomType: string
//   pricePerNight: number
//   pricePerNightMin: number
//   pricePerNightMax: number
//   available: number
//   roomIds: string[]
//   extraBedAllowed: boolean
//   extraBedPrice?: number
//   baseOccupancy: number
//   maxOccupancy: number
//   roomSize: number
//   bedType: string
//   bedCount: number
//   description?: string
//   isSmoking: boolean
//   lastUpdated?: string
// }

// interface WeekendRate {
//   roomTypeId: string
//   price: number
//   minPrice: number
//   maxPrice: number
//   enabled: boolean
// }

// interface ValidationError {
//   field: string
//   message: string
// }

// interface Notification {
//   id: string
//   type: "success" | "error" | "warning"
//   message: string
// }

// // GraphQL Queries and Mutations as plain strings
// const GET_ALL_ROOM_TYPES_QUERY = `
//   query getAllRoomTypes($hotelId: String!) {
//     getRoomTypes(hotelId: $hotelId) {
//       roomType
//     }
//   }
// `

// const GET_ROOM_TYPE_DEFINITION_QUERY = `
//   query getRoomType($hotelId: String!, $roomType: RoomType!) {
//     getRoomType(hotelId: $hotelId, roomType: $roomType) {
//       pricePerNight
//       pricePerNightMax
//       pricePerNightMin
//       baseOccupancy
//       maxOccupancy
//       extraBedAllowed
//       extraBedPrice
//       roomSize
//       bedType
//       bedCount
//       description
//       isSmoking
//       updatedAt
//     }
//   }
// `

// const GET_ALL_ROOMS_FOR_COUNT_QUERY = `
//   query GetRooms($hotelId: String!) {
//     rooms(hotelId: $hotelId) {
//       id
//       roomType
//       isActive
//     }
//   }
// `

// const UPDATE_ROOM_TYPE_MUTATION = `
//   mutation updateRoomType(
//     $hotelId: String!
//     $roomType: RoomType!
//     $updateData: UpdateRoomTypeInput!
//   ) {
//     updateRoomType(
//       hotelId: $hotelId
//       roomType: $roomType
//       updateData: $updateData
//     ) {
//       id
//       roomType
//       pricePerNight
//       pricePerNightMin
//       pricePerNightMax
//       extraBedPrice
//       baseOccupancy
//       maxOccupancy
//       extraBedAllowed
//       roomSize
//       bedType
//       bedCount
//       description
//       isSmoking
//       updatedAt
//     }
//   }
// `

// const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:8000/graphql"

// export default function PricingPage() {
//   const { toast } = useToast()
//   const [loading, setLoading] = useState(false)
//   const [activeTab, setActiveTab] = useState("standard")

//   const { selectedHotel } = useHotelContext()

//   // State management - CRITICAL: Separate source of truth from editable data
//   const [roomTypes, setRoomTypes] = useState<RoomTypeData[]>([]) // Source of truth from backend
//   const [editableRoomTypes, setEditableRoomTypes] = useState<RoomTypeData[]>([]) // Editable copy
//   const [weekendRates, setWeekendRates] = useState<WeekendRate[]>([])
//   const [editableWeekendRates, setEditableWeekendRates] = useState<WeekendRate[]>([])

//   const [weekendDays, setWeekendDays] = useState({
//     friday: true,
//     saturday: true,
//     sunday: true,
//   })

//   const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
//   const [notifications, setNotifications] = useState<Notification[]>([])
//   const [lastSaved, setLastSaved] = useState<Date | null>(null)

//   // Notification management
//   const addNotification = (type: "success" | "error" | "warning", message: string) => {
//     const id = Date.now().toString()
//     setNotifications((prev) => [...prev, { id, type, message }])
//     // Auto-remove notification after 5 seconds
//     setTimeout(() => {
//       setNotifications((prev) => prev.filter((n) => n.id !== id))
//     }, 5000)
//   }

//   // Helper function to get default pricing for room types
//   const getRoomTypeDefaults = (roomType: string) => {
//     const defaults: Record<string, { basePrice: number; minPrice: number; maxPrice: number }> = {
//       STANDARD: { basePrice: 500, minPrice: 350, maxPrice: 750 },
//       DELUXE: { basePrice: 800, minPrice: 560, maxPrice: 1200 },
//       SUITE: { basePrice: 2000, minPrice: 1400, maxPrice: 3000 },
//       EXECUTIVE: { basePrice: 1500, minPrice: 1050, maxPrice: 2250 },
//       PRESIDENTIAL: { basePrice: 5000, minPrice: 3500, maxPrice: 7500 },
//     }

//     return defaults[roomType.toUpperCase()] || { basePrice: 1000, minPrice: 700, maxPrice: 1500 }
//   }

//   const initializeWeekendRates = (roomTypesData: RoomTypeData[]) => {
//     const initialWeekendRates = roomTypesData.map((roomType) => {
//       const weekendRatio = 1.25
//       const weekendPrice = Math.round(roomType.pricePerNight * weekendRatio)

//       return {
//         roomTypeId: roomType.id,
//         price: weekendPrice,
//         minPrice: Math.round(roomType.pricePerNightMin * weekendRatio),
//         maxPrice: Math.round(roomType.pricePerNightMax * weekendRatio),
//         enabled: true,
//       }
//     })

//     setWeekendRates(initialWeekendRates)
//     setEditableWeekendRates(JSON.parse(JSON.stringify(initialWeekendRates)))
//   }

//   // CRITICAL: Use the exact same fetch logic as your working UpdateRoomTypeForm
//   const fetchRoomTypeDefinition = async (roomType: string) => {
//     try {
//       const resp = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: GET_ROOM_TYPE_DEFINITION_QUERY,
//           variables: { hotelId: selectedHotel?.id, roomType },
//         }),
//       })

//       const { data, errors } = await resp.json()
//       if (errors?.length) {
//         console.error(`GraphQL error fetching ${roomType} definition:`, errors[0].message)
//         return null
//       }
//       return data?.getRoomType || null
//     } catch (error) {
//       console.error(`Error fetching ${roomType} definition:`, error)
//       return null
//     }
//   }

//   // Load all room types data
//   const loadAllRoomTypes = async () => {
//     if (!selectedHotel?.id) {
//       setLoading(false) // Ensure loading is false if no hotel is selected
//       return
//     }

//     setLoading(true)
//     console.log("🔄 Loading all room types data...")

//     try {
//       // Step 1: Get all distinct room types from the backend
//       const allRoomTypesResp = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: GET_ALL_ROOM_TYPES_QUERY,
//           variables: { hotelId: selectedHotel.id },
//         }),
//       })
//       const { data: allRoomTypesData, errors: allRoomTypesErrors } = await allRoomTypesResp.json()
//       if (allRoomTypesErrors?.length) {
//         throw new Error(allRoomTypesErrors[0].message)
//       }
//       const distinctRoomTypes = allRoomTypesData?.getRoomTypes?.map((rt: { roomType: string }) => rt.roomType) || []

//       // Step 2: Get all rooms to count available rooms per type
//       const allRoomsResp = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: GET_ALL_ROOMS_FOR_COUNT_QUERY,
//           variables: { hotelId: selectedHotel.id },
//         }),
//       })
//       const { data: allRoomsData, errors: allRoomsErrors } = await allRoomsResp.json()
//       if (allRoomsErrors?.length) {
//         throw new Error(allRoomsErrors[0].message)
//       }

//       const roomCounts: Record<string, { count: number; ids: string[] }> = {}
//       ;(allRoomsData?.rooms || []).forEach((room: any) => {
//         if (room.isActive) {
//           // Only count active rooms
//           roomCounts[room.roomType] = roomCounts[room.roomType] || { count: 0, ids: [] }
//           roomCounts[room.roomType].count++
//           roomCounts[room.roomType].ids.push(room.id)
//         }
//       })

//       const roomTypesForPricing: RoomTypeData[] = []

//       // Step 3: For each distinct room type, fetch its definition and combine with counts
//       for (const roomType of distinctRoomTypes) {
//         let roomTypeDefinition = await fetchRoomTypeDefinition(roomType)

//         // If room type definition doesn't exist or is incomplete, use defaults
//         if (
//           !roomTypeDefinition ||
//           (roomTypeDefinition.pricePerNight === null &&
//             roomTypeDefinition.pricePerNightMin === null &&
//             roomTypeDefinition.pricePerNightMax === null)
//         ) {
//           console.warn(`⚠️ Room type definition for ${roomType} not found or incomplete, using defaults.`)
//           const defaults = getRoomTypeDefaults(roomType)
//           roomTypeDefinition = {
//             pricePerNight: defaults.basePrice,
//             pricePerNightMin: defaults.minPrice,
//             pricePerNightMax: defaults.maxPrice,
//             baseOccupancy: 2,
//             maxOccupancy: 4,
//             extraBedAllowed: false,
//             extraBedPrice: 0,
//             roomSize: 25,
//             bedType: "QUEEN",
//             bedCount: 1,
//             description: "",
//             isSmoking: false,
//             updatedAt: new Date().toISOString(), // Placeholder
//           }
//           addNotification("warning", `No pricing data found for ${roomType}, using defaults.`)
//         } else {
//           // Ensure non-null values for pricing fields, default to 0 if null
//           roomTypeDefinition.pricePerNight = roomTypeDefinition.pricePerNight ?? 0
//           roomTypeDefinition.pricePerNightMin = roomTypeDefinition.pricePerNightMin ?? 0
//           roomTypeDefinition.pricePerNightMax = roomTypeDefinition.pricePerNightMax ?? 0
//         }

//         roomTypesForPricing.push({
//           id: roomType.toLowerCase().replace(/\s+/g, "-"),
//           roomType: roomType,
//           pricePerNight: roomTypeDefinition.pricePerNight,
//           pricePerNightMin: roomTypeDefinition.pricePerNightMin,
//           pricePerNightMax: roomTypeDefinition.pricePerNightMax,
//           available: roomCounts[roomType]?.count || 0,
//           roomIds: roomCounts[roomType]?.ids || [],
//           extraBedAllowed: roomTypeDefinition.extraBedAllowed || false,
//           extraBedPrice: roomTypeDefinition.extraBedPrice || 0,
//           baseOccupancy: roomTypeDefinition.baseOccupancy || 2,
//           maxOccupancy: roomTypeDefinition.maxOccupancy || 4,
//           roomSize: roomTypeDefinition.roomSize || 25,
//           bedType: roomTypeDefinition.bedType || "QUEEN",
//           bedCount: roomTypeDefinition.bedCount || 1,
//           description: roomTypeDefinition.description || "",
//           isSmoking: roomTypeDefinition.isSmoking || false,
//           lastUpdated: roomTypeDefinition.updatedAt,
//         })
//       }

//       console.log("✅ Processed room types with backend values:", roomTypesForPricing)
//       setRoomTypes(roomTypesForPricing)
//       setEditableRoomTypes(JSON.parse(JSON.stringify(roomTypesForPricing))) // Deep copy for editing
//       initializeWeekendRates(roomTypesForPricing)
//       addNotification("success", `Loaded ${roomTypesForPricing.length} room types.`)
//     } catch (error: any) {
//       console.error("❌ Error loading room types:", error)
//       addNotification("error", `Failed to load room types: ${error.message}`)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Load data when hotel changes
//   useEffect(() => {
//     if (selectedHotel?.id) {
//       loadAllRoomTypes()
//     }
//   }, [selectedHotel?.id])

//   // Validation
//   const validatePricing = (roomTypes: RoomTypeData[]): ValidationError[] => {
//     const errors: ValidationError[] = []

//     roomTypes.forEach((room) => {
//       if (room.pricePerNightMin >= room.pricePerNight) {
//         errors.push({
//           field: `${room.id}-price`,
//           message: `${room.roomType}: Base price must be higher than minimum price`,
//         })
//       }

//       if (room.pricePerNight >= room.pricePerNightMax) {
//         errors.push({
//           field: `${room.id}-price`,
//           message: `${room.roomType}: Base price must be lower than maximum price`
//         })
//       }

//       if (room.pricePerNightMin < 0 || room.pricePerNight < 0 || room.pricePerNightMax < 0) {
//         errors.push({
//           message: `${room.roomType}: Prices cannot be negative`,
//           field: `${room.id}-price`,
//         })
//       }

//       if (room.pricePerNightMin === 0 || room.pricePerNightMax === 0) {
//         errors.push({
//           message: `${room.roomType}: Min and max prices must be greater than 0`,
//           field: `${room.id}-price`,
//         })
//       }
//     })

//     return errors
//   }

//   // Price change handlers
//   const handlePriceChange = useCallback(
//     (id: string, field: "pricePerNight" | "pricePerNightMin" | "pricePerNightMax", value: string) => {
//       const numValue = Number.parseFloat(value) || 0

//       setEditableRoomTypes((prev) => {
//         return prev.map((room) => {
//           if (room.id === id) {
//             return { ...room, [field]: numValue }
//           }
//           return room
//         })
//       })

//       // Clear validation errors for this field
//       setValidationErrors((prev) => prev.filter((error) => error.field !== `${id}-${field}`))
//     },
//     [],
//   )

//   const handleWeekendPriceChange = useCallback(
//     (roomTypeId: string, field: "price" | "minPrice" | "maxPrice", value: string) => {
//       const numValue = Number.parseFloat(value) || 0

//       setEditableWeekendRates((prev) => {
//         return prev.map((rate) => {
//           if (rate.roomTypeId === roomTypeId) {
//             return { ...rate, [field]: numValue }
//           }
//           return rate
//         })
//       })
//     },
//     [],
//   )

//   const handleWeekendRateToggle = useCallback((roomTypeId: string, enabled: boolean) => {
//     setEditableWeekendRates((prev) =>
//       prev.map((rate) => (rate.roomTypeId === roomTypeId ? { ...rate, enabled } : rate)),
//     )
//   }, [])

//   // CRITICAL: Use the exact same update logic as your working UpdateRoomTypeForm
//   const updateRoomType = async (roomType: string, updateData: any) => {
//     try {
//       const resp = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: UPDATE_ROOM_TYPE_MUTATION,
//           variables: {
//             hotelId: selectedHotel?.id,
//             roomType,
//             updateData,
//           },
//         }),
//       })

//       const { data, errors } = await resp.json()

//       if (errors?.length) {
//         throw new Error(errors[0].message)
//       }

//       console.log(`✅ ${roomType} updated successfully:`, data.updateRoomType)
//       return data.updateRoomType
//     } catch (error: any) {
//       console.error(`❌ Failed to update ${roomType}:`, error)
//       throw error
//     }
//   }

//   // Enhanced save handler using the exact same logic
//   const handleSave = async () => {
//     setLoading(true)

//     try {
//       if (activeTab === "standard") {
//         // Validate all pricing before saving
//         const errors = validatePricing(editableRoomTypes)
//         setValidationErrors(errors)

//         if (errors.length > 0) {
//           addNotification("error", "Please fix validation errors before saving")
//           return
//         }

//         console.log("💾 Saving room type pricing to backend...")

//         // Update each room type using the exact same logic as your working form
//         const updatePromises = editableRoomTypes.map(async (roomType) => {
//           console.log(`Updating pricing for ${roomType.roomType}:`, {
//             pricePerNight: roomType.pricePerNight,
//             pricePerNightMin: roomType.pricePerNightMin,
//             pricePerNightMax: roomType.pricePerNightMax,
//           })

//           const updateData = {
//             pricePerNight: roomType.pricePerNight,
//             pricePerNightMax: roomType.pricePerNightMax,
//             pricePerNightMin: roomType.pricePerNightMin,
//             baseOccupancy: roomType.baseOccupancy,
//             maxOccupancy: roomType.maxOccupancy,
//             extraBedAllowed: roomType.extraBedAllowed,
//             extraBedPrice: roomType.extraBedPrice || null,
//             roomSize: roomType.roomSize,
//             bedType: roomType.bedType,
//             bedCount: roomType.bedCount,
//             description: roomType.description || null,
//             isSmoking: roomType.isSmoking,
//           }

//           return await updateRoomType(roomType.roomType, updateData)
//         })

//         // Wait for all backend updates to complete
//         const updatedRoomTypes = await Promise.all(updatePromises)
//         console.log("✅ All room type updates completed successfully")

//         // Update local state after successful backend operations
//         setRoomTypes([...editableRoomTypes])
//         setLastSaved(new Date())
//         addNotification("success", `Successfully updated pricing for ${updatedRoomTypes.length} room types`)

//         // Reload data to confirm persistence
//         setTimeout(() => {
//           loadAllRoomTypes()
//         }, 1000)
//       } else if (activeTab === "weekend") {
//         // Validate weekend rates
//         for (const rate of editableWeekendRates) {
//           if (rate.enabled && (rate.minPrice > rate.price || rate.price > rate.maxPrice)) {
//             const room = roomTypes.find((r) => r.id === rate.roomTypeId)
//             throw new Error(
//               `Invalid weekend price range for ${room?.roomType}. Min price must be less than base price, and base price must be less than max price.`,
//             )
//           }
//         }

//         // Update weekend rates
//         setWeekendRates([...editableWeekendRates])
//         addNotification("success", "Weekend rates updated successfully")
//       }

//       setValidationErrors([])
//     } catch (error) {
//       console.error("❌ Error saving pricing:", error)
//       addNotification("error", error instanceof Error ? error.message : "Failed to update pricing")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleReset = () => {
//     if (activeTab === "standard") {
//       // Reset to last saved values from source of truth
//       setEditableRoomTypes(JSON.parse(JSON.stringify(roomTypes)))
//     } else if (activeTab === "weekend") {
//       setEditableWeekendRates(JSON.parse(JSON.stringify(weekendRates)))
//     }

//     setValidationErrors([])
//     addNotification("success", "Changes reset to last saved values")
//   }

//   const handleRefresh = async () => {
//     console.log("🔄 Manually refreshing room data from backend...")
//     await loadAllRoomTypes()
//     addNotification("success", "Data refreshed from backend")
//   }

//   // Auto-populate min/max prices based on base price
//   const handleAutoPopulate = (roomId: string) => {
//     setEditableRoomTypes((prev) => {
//       return prev.map((room) => {
//         if (room.id === roomId && room.pricePerNight > 0) {
//           const newMinPrice = Math.round(room.pricePerNight * 0.7) // 70% of base
//           const newMaxPrice = Math.round(room.pricePerNight * 1.5) // 150% of base

//           return {
//             ...room,
//             pricePerNightMin: newMinPrice,
//             pricePerNightMax: newMaxPrice,
//           }
//         }
//         return room
//       })
//     })

//     addNotification("success", "Min and max prices auto-populated based on base price")
//   }

//   // Check if there are unsaved changes
//   const hasChanges =
//     JSON.stringify(roomTypes) !== JSON.stringify(editableRoomTypes) ||
//     JSON.stringify(weekendRates) !== JSON.stringify(editableWeekendRates)

//   if (loading && roomTypes.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="flex items-center space-x-3">
//           <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
//           <span className="text-gray-600">Loading room pricing data...</span>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Notifications */}
//       <div className="fixed top-4 right-4 space-y-2 z-50">
//         {notifications.map((notification) => (
//           <div
//             key={notification.id}
//             className={`flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg ${
//               notification.type === "success"
//                 ? "bg-green-100 text-green-800 border border-green-200"
//                 : notification.type === "warning"
//                   ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
//                   : "bg-red-100 text-red-800 border border-red-200"
//             }`}
//           >
//             {notification.type === "success" ? (
//               <CheckCircle className="h-5 w-5" />
//             ) : (
//               <AlertCircle className="h-5 w-5" />
//             )}
//             <span className="text-sm font-medium">{notification.message}</span>
//           </div>
//         ))}
//       </div>

//       {/* Header */}
//       <div className="bg-white border-b">
//         <div className="container mx-auto px-4 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Room Pricing Management</h1>
//               <p className="text-sm text-gray-600">Configure room rates using the same logic as UpdateRoomTypeForm</p>
//               {lastSaved && <p className="text-sm text-green-600 mt-1">Last saved: {lastSaved.toLocaleString()}</p>}
//             </div>
//             <div className="flex items-center gap-2">
//               <Button variant="outline" size="icon" onClick={handleRefresh} disabled={loading}>
//                 <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-6">
//         <div className="mb-4 text-sm text-gray-600">
//           <p>
//             Found {roomTypes.length} room categories
//             {selectedHotel ? ` for ${selectedHotel.name}` : ""}
//           </p>
//         </div>

//         {/* Validation Errors */}
//         {validationErrors.length > 0 && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//             <div className="flex items-center space-x-2 mb-2">
//               <AlertCircle className="h-5 w-5 text-red-600" />
//               <h3 className="font-medium text-red-800">Validation Errors</h3>
//             </div>
//             <ul className="text-sm text-red-700 space-y-1">
//               {validationErrors.map((error, index) => (
//                 <li key={index}>• {error.message}</li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <Card>
//           <CardHeader>
//             <CardTitle>Room Pricing Configuration</CardTitle>
//             <CardDescription>
//               Set the base price, minimum, and maximum pricing for each room category. Uses the exact same logic as
//               UpdateRoomTypeForm.
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab}>
//               <TabsList className="mb-6">
//                 <TabsTrigger value="standard">Standard Rate</TabsTrigger>
//                 <TabsTrigger value="weekend">Weekend Rate</TabsTrigger>
//               </TabsList>

//               <TabsContent value="standard" className="space-y-4">
//                 <div className="rounded-md border">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead className="w-[300px]">Room Category</TableHead>
//                         <TableHead>Min Price (฿)</TableHead>
//                         <TableHead>Base Price (฿)</TableHead>
//                         <TableHead>Max Price (฿)</TableHead>
//                         <TableHead>Extra Bed</TableHead>
//                         <TableHead>Actions</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {editableRoomTypes.map((room) => {
//                         const hasFieldError = (field: string) =>
//                           validationErrors.some((error) => error.field === `${room.id}-${field}`)

//                         return (
//                           <TableRow key={room.id} className="hover:bg-gray-50">
//                             <TableCell className="font-medium">
//                               <div>{room.roomType}</div>
//                               {/* Show warning if min/max are 0 */}
//                               {(room.pricePerNightMin === 0 || room.pricePerNightMax === 0) && (
//                                 <div className="text-xs text-red-600 mt-1">⚠️ Min/Max prices missing</div>
//                               )}
//                             </TableCell>
//                             <TableCell>
//                               <Input
//                                 type="number"
//                                 value={room.pricePerNightMin}
//                                 onChange={(e) => handlePriceChange(room.id, "pricePerNightMin", e.target.value)}
//                                 className={`w-[120px] ${hasFieldError("pricePerNightMin") ? "border-red-500 bg-red-50" : ""} ${
//                                   room.pricePerNightMin === 0 ? "border-yellow-500 bg-yellow-50" : ""
//                                 }`}
//                                 min="0"
//                                 step="0.01"
//                                 placeholder="Min price"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Input
//                                 type="number"
//                                 value={room.pricePerNight}
//                                 onChange={(e) => handlePriceChange(room.id, "pricePerNight", e.target.value)}
//                                 className={`w-[120px] ${hasFieldError("pricePerNight") ? "border-red-500 bg-red-50" : ""}`}
//                                 min="0"
//                                 step="0.01"
//                                 placeholder="Base price"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Input
//                                 type="number"
//                                 value={room.pricePerNightMax}
//                                 onChange={(e) => handlePriceChange(room.id, "pricePerNightMax", e.target.value)}
//                                 className={`w-[120px] ${hasFieldError("pricePerNightMax") ? "border-red-500 bg-red-50" : ""} ${
//                                   room.pricePerNightMax === 0 ? "border-yellow-500 bg-yellow-50" : ""
//                                 }`}
//                                 min="0"
//                                 step="0.01"
//                                 placeholder="Max price"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               {room.extraBedAllowed ? `฿${room.extraBedPrice || 0}` : "Not allowed"}
//                             </TableCell>
//                             <TableCell>
//                               <Button
//                                 variant="outline"
//                                 size="sm"
//                                 onClick={() => handleAutoPopulate(room.id)}
//                                 disabled={room.pricePerNight <= 0}
//                                 className="text-xs"
//                               >
//                                 Auto-fill
//                               </Button>
//                             </TableCell>
//                           </TableRow>
//                         )
//                       })}
//                     </TableBody>
//                   </Table>
//                 </div>

//                 <div className="bg-green-50 border border-green-200 rounded-md p-4 text-sm text-green-800">
//                   <p className="font-medium mb-2">✅ Using Exact Same Logic as UpdateRoomTypeForm</p>
//                   <ul className="space-y-1">
//                     <li>• Same getRoomType query to fetch current values</li>
//                     <li>• Same updateRoomType mutation to save changes</li>
//                     <li>• Same field names: pricePerNight, pricePerNightMin, pricePerNightMax</li>
//                     <li>• Same direct fetch approach without Apollo Client</li>
//                   </ul>
//                 </div>
//               </TabsContent>

//               <TabsContent value="weekend" className="space-y-4">
//                 <div className="flex items-center space-x-4 mb-4">
//                   <div className="text-sm font-medium">Weekend days:</div>
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="friday"
//                       checked={weekendDays.friday}
//                       onCheckedChange={(checked) => setWeekendDays((prev) => ({ ...prev, friday: checked === true }))}
//                     />
//                     <label htmlFor="friday" className="text-sm">
//                       Friday
//                     </label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="saturday"
//                       checked={weekendDays.saturday}
//                       onCheckedChange={(checked) => setWeekendDays((prev) => ({ ...prev, saturday: checked === true }))}
//                     />
//                     <label htmlFor="saturday" className="text-sm">
//                       Saturday
//                     </label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="sunday"
//                       checked={weekendDays.sunday}
//                       onCheckedChange={(checked) => setWeekendDays((prev) => ({ ...prev, sunday: checked === true }))}
//                     />
//                     <label htmlFor="sunday" className="text-sm">
//                       Sunday
//                     </label>
//                   </div>
//                 </div>

//                 <div className="rounded-md border">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead className="w-[250px]">Room Category</TableHead>
//                         <TableHead>Enabled</TableHead>
//                         <TableHead>Min Price (฿)</TableHead>
//                         <TableHead>Base Price (฿)</TableHead>
//                         <TableHead>Max Price (฿)</TableHead>
//                         <TableHead className="text-right">Standard Price</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {editableWeekendRates.map((rate) => {
//                         const room = roomTypes.find((r) => r.id === rate.roomTypeId)
//                         return (
//                           <TableRow key={rate.roomTypeId}>
//                             <TableCell className="font-medium">{room?.roomType}</TableCell>
//                             <TableCell>
//                               <Switch
//                                 checked={rate.enabled}
//                                 onCheckedChange={(checked) => handleWeekendRateToggle(rate.roomTypeId, checked)}
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Input
//                                 type="number"
//                                 value={rate.minPrice}
//                                 onChange={(e) => handleWeekendPriceChange(rate.roomTypeId, "minPrice", e.target.value)}
//                                 className="w-[120px]"
//                                 disabled={!rate.enabled}
//                                 min="0"
//                                 step="0.01"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Input
//                                 type="number"
//                                 value={rate.price}
//                                 onChange={(e) => handleWeekendPriceChange(rate.roomTypeId, "price", e.target.value)}
//                                 className={`w-[120px] ${
//                                   rate.enabled && (rate.price < rate.minPrice || rate.price > rate.maxPrice)
//                                     ? "border-red-500 bg-red-50"
//                                     : ""
//                                 }`}
//                                 disabled={!rate.enabled}
//                                 min="0"
//                                 step="0.01"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Input
//                                 type="number"
//                                 value={rate.maxPrice}
//                                 onChange={(e) => handleWeekendPriceChange(rate.roomTypeId, "maxPrice", e.target.value)}
//                                 className="w-[120px]"
//                                 disabled={!rate.enabled}
//                                 min="0"
//                                 step="0.01"
//                               />
//                             </TableCell>
//                             <TableCell className="text-right text-gray-500">฿ {room?.pricePerNight}</TableCell>
//                           </TableRow>
//                         )
//                       })}
//                     </TableBody>
//                   </Table>
//                 </div>

//                 <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
//                   <p>
//                     <strong>Note:</strong> Weekend rates apply to the days selected above. These rates will be applied
//                     automatically for bookings on weekend days.
//                   </p>
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </CardContent>
//           <CardFooter className="flex justify-between">
//             <div className="text-sm text-gray-600">
//               {hasChanges && <span className="text-orange-600 font-medium">You have unsaved changes</span>}
//             </div>
//             <div className="flex items-center space-x-3">
//               <Button variant="outline" onClick={handleReset} disabled={!hasChanges || loading}>
//                 <RefreshCw className="mr-2 h-4 w-4" />
//                 Reset Changes
//               </Button>
//               <Button onClick={handleSave} disabled={!hasChanges || loading || validationErrors.length > 0}>
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
//                     Saving to Backend...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="mr-2 h-4 w-4" />
//                     Save Changes
//                   </>
//                 )}
//               </Button>
//             </div>
//           </CardFooter>
//         </Card>

//         {/* Debug Information */}
//         <div className="mt-6 bg-gray-100 rounded-lg p-4">
//           <details className="cursor-pointer">
//             <summary className="text-sm font-medium text-gray-700 mb-2">Debug Information</summary>
//             <div className="text-xs text-gray-600 space-y-2">
//               <div>
//                 <strong>Has Changes:</strong> {hasChanges ? "Yes" : "No"}
//               </div>
//               <div>
//                 <strong>Validation Errors:</strong> {validationErrors.length}
//               </div>
//               <div>
//                 <strong>Room Types Count:</strong> {roomTypes.length}
//               </div>
//               <div>
//                 <strong>Last Saved:</strong> {lastSaved ? lastSaved.toISOString() : "Never"}
//               </div>
//               <div>
//                 <strong>Selected Hotel:</strong> {selectedHotel?.name || "None"}
//               </div>
//               <div>
//                 <strong>Using Same Logic:</strong> UpdateRoomTypeForm approach with direct fetch
//               </div>
//               <div>
//                 <strong>Backend Values:</strong>
//                 <pre className="mt-1 text-xs bg-gray-200 p-2 rounded">
//                   {JSON.stringify(
//                     roomTypes.map((r) => ({
//                       type: r.roomType,
//                       base: r.pricePerNight,
//                       min: r.pricePerNightMin,
//                       max: r.pricePerNightMax,
//                     })),
//                     null,
//                     2,
//                   )}
//                 </pre>
//               </div>
//             </div>
//           </details>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Save, RefreshCw, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { useHotelContext } from "@/providers/hotel-provider"

// Types
interface RoomTypeData {
  id: string
  roomType: string // This will store the original case from backend for display
  pricePerNight: number
  pricePerNightMin: number
  pricePerNightMax: number
  available: number
  roomIds: string[]
  extraBedAllowed: boolean
  extraBedPrice?: number
  baseOccupancy: number
  maxOccupancy: number
  roomSize: number
  bedType: string // This is a string, but its value needs to match backend enum
  bedCount: number
  description?: string
  isSmoking: boolean
  lastUpdated?: string
}

interface WeekendRate {
  roomTypeId: string
  price: number
  minPrice: number
  maxPrice: number
  enabled: boolean
}

interface ValidationError {
  field: string
  message: string
}

interface Notification {
  id: string
  type: "success" | "error" | "warning"
  message: string
}

// GraphQL Queries and Mutations as plain strings
const GET_ALL_ROOM_TYPES_QUERY = `
query getAllRoomTypes($hotelId: String!) {
  getRoomTypes(hotelId: $hotelId) {
    roomType
  }
}
`

const GET_ROOM_TYPE_DEFINITION_QUERY = `
query getRoomType($hotelId: String!, $roomType: RoomType!) {
  getRoomType(hotelId: $hotelId, roomType: $roomType) {
    pricePerNight
    pricePerNightMax
    pricePerNightMin
    baseOccupancy
    maxOccupancy
    extraBedAllowed
    extraBedPrice
    roomSize
    bedType
    bedCount
    description
    isSmoking
    updatedAt
  }
}
`

const GET_ALL_ROOMS_FOR_COUNT_QUERY = `
query GetRooms($hotelId: String!) {
  rooms(hotelId: $hotelId) {
    id
    roomType
    isActive
  }
}
`

const UPDATE_ROOM_TYPE_MUTATION = `
mutation updateRoomType(
  $hotelId: String!
  $roomType: RoomType!
  $updateData: UpdateRoomTypeInput!
) {
  updateRoomType(
    hotelId: $hotelId
    roomType: $roomType
    updateData: $updateData
  ) {
    id
    roomType
    pricePerNight
    pricePerNightMin
    pricePerNightMax
    extraBedPrice
    baseOccupancy
    maxOccupancy
    extraBedAllowed
    roomSize
    bedType
    bedCount
    description
    isSmoking
    updatedAt
  }
}
`

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:8000/graphql"

export default function PricingPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("standard")

  const { selectedHotel } = useHotelContext()

  // State management - CRITICAL: Separate source of truth from editable data
  const [roomTypes, setRoomTypes] = useState<RoomTypeData[]>([]) // Source of truth from backend
  const [editableRoomTypes, setEditableRoomTypes] = useState<RoomTypeData[]>([]) // Editable copy
  const [weekendRates, setWeekendRates] = useState<WeekendRate[]>([])
  const [editableWeekendRates, setEditableWeekendRates] = useState<WeekendRate[]>([])

  const [weekendDays, setWeekendDays] = useState({
    friday: true,
    saturday: true,
    sunday: true,
  })

  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Notification management
  const addNotification = (type: "success" | "error" | "warning", message: string) => {
    // Generate a more unique ID to prevent key collision
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    setNotifications((prev) => [...prev, { id, type, message }])
    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 5000)
  }

  // Helper function to get default pricing for room types
  const getRoomTypeDefaults = (roomType: string) => {
    const defaults: Record<string, { basePrice: number; minPrice: number; maxPrice: number }> = {
      STANDARD: { basePrice: 500, minPrice: 350, maxPrice: 750 },
      DELUXE: { basePrice: 800, minPrice: 560, maxPrice: 1200 },
      SUITE: { basePrice: 2000, minPrice: 1400, maxPrice: 3000 },
      EXECUTIVE: { basePrice: 1500, minPrice: 1050, maxPrice: 2250 },
      PRESIDENTIAL: { basePrice: 5000, minPrice: 3500, maxPrice: 7500 },
    }

    return defaults[roomType.toUpperCase()] || { basePrice: 1000, minPrice: 700, maxPrice: 1500 }
  }

  const initializeWeekendRates = (roomTypesData: RoomTypeData[]) => {
    const initialWeekendRates = roomTypesData.map((roomType) => {
      const weekendRatio = 1.25
      const weekendPrice = Math.round(roomType.pricePerNight * weekendRatio)

      return {
        roomTypeId: roomType.id,
        price: weekendPrice,
        minPrice: Math.round(roomType.pricePerNightMin * weekendRatio),
        maxPrice: Math.round(roomType.pricePerNightMax * weekendRatio),
        enabled: true,
      }
    })

    setWeekendRates(initialWeekendRates)
    setEditableWeekendRates(JSON.parse(JSON.stringify(initialWeekendRates)))
  }

  // Helper to normalize roomType string to GraphQL enum format (UPPER_CASE_WITH_UNDERSCORES)
  const normalizeRoomTypeForGraphQL = (roomType: string): string => {
    const normalized = roomType.trim().toUpperCase().replace(/\s+/g, "_")
    return normalized
  }

  // CRITICAL: Use the exact same fetch logic as your working UpdateRoomTypeForm
  const fetchRoomTypeDefinition = async (roomType: string) => {
    const roomTypeForGraphQL = normalizeRoomTypeForGraphQL(roomType) // Use new normalization
    console.log(
      `Attempting to fetch definition for roomType: '${roomType}' (Normalized GraphQL variable: '${roomTypeForGraphQL}')`,
    )
    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: GET_ROOM_TYPE_DEFINITION_QUERY,
          variables: { hotelId: selectedHotel?.id, roomType: roomTypeForGraphQL },
        }),
      })

      const { data, errors } = await resp.json()
      if (errors?.length) {
        console.error(`GraphQL error fetching ${roomType} definition:`, errors[0].message)
        return null
      }
      return data?.getRoomType || null
    } catch (error) {
      console.error(`Error fetching ${roomType} definition:`, error)
      return null
    }
  }

  // Load all room types data
  const loadAllRoomTypes = async () => {
    if (!selectedHotel?.id) {
      setLoading(false) // Ensure loading is false if no hotel is selected
      return
    }

    setLoading(true)
    console.log("🔄 Loading all room types data...")

    try {
      // Step 1: Get all distinct room types from the backend
      const allRoomTypesResp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: GET_ALL_ROOM_TYPES_QUERY,
          variables: { hotelId: selectedHotel.id },
        }),
      })
      const { data: allRoomTypesData, errors: allRoomTypesErrors } = await allRoomTypesResp.json()
      if (allRoomTypesErrors?.length) {
        throw new Error(allRoomTypesErrors[0].message)
      }
      // Store the roomType as returned by the backend (e.g., 'standard', 'deluxe', or 'standard room')
      const distinctRoomTypes = allRoomTypesData?.getRoomTypes?.map((rt: { roomType: string }) => rt.roomType) || []

      // Step 2: Get all rooms to count available rooms per type
      const allRoomsResp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: GET_ALL_ROOMS_FOR_COUNT_QUERY,
          variables: { hotelId: selectedHotel.id },
        }),
      })
      const { data: allRoomsData, errors: allRoomsErrors } = await allRoomsResp.json()
      if (allRoomsErrors?.length) {
        throw new Error(allRoomsErrors[0].message)
      }

      const roomCounts: Record<string, { count: number; ids: string[] }> = {}
      ;(allRoomsData?.rooms || []).forEach((room: any) => {
        if (room.isActive) {
          // Only count active rooms
          roomCounts[room.roomType] = roomCounts[room.roomType] || { count: 0, ids: [] }
          roomCounts[room.roomType].count++
          roomCounts[room.roomType].ids.push(room.id)
        }
      })

      const roomTypesForPricing: RoomTypeData[] = []

      // Step 3: For each distinct room type, fetch its definition and combine with counts
      for (const roomType of distinctRoomTypes) {
        // Pass original roomType to fetchRoomTypeDefinition, which handles uppercase conversion
        let roomTypeDefinition = await fetchRoomTypeDefinition(roomType)

        // If room type definition doesn't exist or is incomplete, use defaults
        if (
          !roomTypeDefinition ||
          (roomTypeDefinition.pricePerNight === null &&
            roomTypeDefinition.pricePerNightMin === null &&
            roomTypeDefinition.pricePerNightMax === null)
        ) {
          console.warn(`⚠️ Room type definition for ${roomType} not found or incomplete, using defaults.`)
          const defaults = getRoomTypeDefaults(roomType)
          roomTypeDefinition = {
            pricePerNight: defaults.basePrice,
            pricePerNightMin: defaults.minPrice,
            pricePerNightMax: defaults.maxPrice,
            baseOccupancy: 2,
            maxOccupancy: 4,
            extraBedAllowed: false,
            extraBedPrice: 0,
            roomSize: 25,
            bedType: "QUEEN", // Default bedType
            bedCount: 1,
            description: "",
            isSmoking: false,
            updatedAt: new Date().toISOString(), // Placeholder
          }
          addNotification("warning", `No pricing data found for ${roomType}, using defaults.`)
        } else {
          // Ensure non-null values for pricing fields, default to 0 if null
          roomTypeDefinition.pricePerNight = roomTypeDefinition.pricePerNight ?? 0
          roomTypeDefinition.pricePerNightMin = roomTypeDefinition.pricePerNightMin ?? 0
          roomTypeDefinition.pricePerNightMax = roomTypeDefinition.pricePerNightMax ?? 0
        }

        roomTypesForPricing.push({
          id: roomType.toLowerCase().replace(/\s+/g, "-"), // Use lowercase for local ID
          roomType: roomType, // Keep original case for display
          pricePerNight: roomTypeDefinition.pricePerNight,
          pricePerNightMin: roomTypeDefinition.pricePerNightMin,
          pricePerNightMax: roomTypeDefinition.pricePerNightMax,
          available: roomCounts[roomType]?.count || 0,
          roomIds: roomCounts[roomType]?.ids || [],
          extraBedAllowed: roomTypeDefinition.extraBedAllowed || false,
          extraBedPrice: roomTypeDefinition.extraBedPrice || 0,
          baseOccupancy: roomTypeDefinition.baseOccupancy || 2,
          maxOccupancy: roomTypeDefinition.maxOccupancy || 4,
          roomSize: roomTypeDefinition.roomSize || 25,
          bedType: roomTypeDefinition.bedType || "QUEEN", // Ensure bedType is present, default if null
          bedCount: roomTypeDefinition.bedCount || 1,
          description: roomTypeDefinition.description || "",
          isSmoking: roomTypeDefinition.isSmoking || false,
          lastUpdated: roomTypeDefinition.updatedAt,
        })
      }

      console.log("✅ Processed room types with backend values:", roomTypesForPricing)
      setRoomTypes(roomTypesForPricing)
      setEditableRoomTypes(JSON.parse(JSON.stringify(roomTypesForPricing))) // Deep copy for editing
      initializeWeekendRates(roomTypesForPricing)
      addNotification("success", `Loaded ${roomTypesForPricing.length} room types.`)
    } catch (error: any) {
      console.error("❌ Error loading room types:", error)
      addNotification("error", `Failed to load room types: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  // Load data when hotel changes
  useEffect(() => {
    if (selectedHotel?.id) {
      loadAllRoomTypes()
    }
  }, [selectedHotel?.id])

  // Validation
  const validatePricing = (roomTypes: RoomTypeData[]): ValidationError[] => {
    const errors: ValidationError[] = []

    roomTypes.forEach((room) => {
      if (room.pricePerNightMin >= room.pricePerNight) {
        errors.push({
          field: `${room.id}-price`,
          message: `${room.roomType}: Base price must be higher than minimum price`,
        })
      }

      if (room.pricePerNight >= room.pricePerNightMax) {
        errors.push({
          field: `${room.id}-price`,
          message: `${room.roomType}: Base price must be lower than maximum price`,
        })
      }

      if (room.pricePerNightMin < 0 || room.pricePerNight < 0 || room.pricePerNightMax < 0) {
        errors.push({
          message: `${room.roomType}: Prices cannot be negative`,
          field: `${room.id}-price`,
        })
      }

      if (room.pricePerNightMin === 0 || room.pricePerNightMax === 0) {
        errors.push({
          message: `${room.roomType}: Min and max prices must be greater than 0`,
          field: `${room.id}-price`,
        })
      }
    })

    return errors
  }

  // Price change handlers
  const handlePriceChange = useCallback(
    (id: string, field: "pricePerNight" | "pricePerNightMin" | "pricePerNightMax", value: string) => {
      const numValue = Number.parseFloat(value) || 0

      setEditableRoomTypes((prev) => {
        return prev.map((room) => {
          if (room.id === id) {
            return { ...room, [field]: numValue }
          }
          return room
        })
      })

      // Clear validation errors for this field
      setValidationErrors((prev) => prev.filter((error) => error.field !== `${id}-${field}`))
    },
    [],
  )

  const handleWeekendPriceChange = useCallback(
    (roomTypeId: string, field: "price" | "minPrice" | "maxPrice", value: string) => {
      const numValue = Number.parseFloat(value) || 0

      setEditableWeekendRates((prev) => {
        return prev.map((rate) => {
          if (rate.roomTypeId === roomTypeId) {
            return { ...rate, [field]: numValue }
          }
          return rate
        })
      })
    },
    [],
  )

  const handleWeekendRateToggle = useCallback((roomTypeId: string, enabled: boolean) => {
    setEditableWeekendRates((prev) =>
      prev.map((rate) => (rate.roomTypeId === roomTypeId ? { ...rate, enabled } : rate)),
    )
  }, [])

  // CRITICAL: Use the exact same update logic as your working UpdateRoomTypeForm
  const updateRoomType = async (roomType: string, updateData: any) => {
    const roomTypeForGraphQL = normalizeRoomTypeForGraphQL(roomType) // Use new normalization
    console.log(`Attempting to update roomType: '${roomType}' (Normalized GraphQL variable: '${roomTypeForGraphQL}')`)
    console.log(`Sending updateData:`, updateData) // Log the entire updateData object
    try {
      const resp = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: UPDATE_ROOM_TYPE_MUTATION,
          variables: {
            hotelId: selectedHotel?.id,
            roomType: roomTypeForGraphQL,
            updateData: {
              ...updateData,
              bedType: updateData.bedType.trim().toUpperCase(), // Normalize bedType here
            },
          },
        }),
      })

      const { data, errors } = await resp.json()

      if (errors?.length) {
        throw new Error(errors[0].message)
      }

      console.log(`✅ ${roomType} updated successfully:`, data.updateRoomType)
      return data.updateRoomType
    } catch (error: any) {
      console.error(`❌ Failed to update ${roomType}:`, error)
      throw error
    }
  }

  // Enhanced save handler using the exact same logic
  const handleSave = async () => {
    setLoading(true)

    try {
      if (activeTab === "standard") {
        // Validate all pricing before saving
        const errors = validatePricing(editableRoomTypes)
        setValidationErrors(errors)

        if (errors.length > 0) {
          addNotification("error", "Please fix validation errors before saving")
          return
        }

        console.log("💾 Saving room type pricing to backend...")

        // Update each room type using the exact same logic as your working form
        const updatePromises = editableRoomTypes.map(async (roomType) => {
          console.log(`Preparing update for ${roomType.roomType}:`, {
            pricePerNight: roomType.pricePerNight,
            pricePerNightMin: roomType.pricePerNightMin,
            pricePerNightMax: roomType.pricePerNightMax,
            bedType: roomType.bedType, // Include bedType in the log
          })

          const updateData = {
            pricePerNight: roomType.pricePerNight,
            pricePerNightMax: roomType.pricePerNightMax,
            pricePerNightMin: roomType.pricePerNightMin,
            baseOccupancy: roomType.baseOccupancy,
            maxOccupancy: roomType.maxOccupancy,
            extraBedAllowed: roomType.extraBedAllowed,
            extraBedPrice: roomType.extraBedPrice || null,
            roomSize: roomType.roomSize,
            bedType: roomType.bedType, // This will be normalized in updateRoomType function
            bedCount: roomType.bedCount,
            description: roomType.description || null,
            isSmoking: roomType.isSmoking,
          }

          return await updateRoomType(roomType.roomType, updateData)
        })

        // Wait for all backend updates to complete
        const updatedRoomTypes = await Promise.all(updatePromises)
        console.log("✅ All room type updates completed successfully")

        // Update local state after successful backend operations
        setRoomTypes([...editableRoomTypes])
        setLastSaved(new Date())
        addNotification("success", `Successfully updated pricing for ${updatedRoomTypes.length} room types`)

        // Reload data to confirm persistence
        setTimeout(() => {
          loadAllRoomTypes()
        }, 1000)
      } else if (activeTab === "weekend") {
        // Validate weekend rates
        for (const rate of editableWeekendRates) {
          if (rate.enabled && (rate.minPrice > rate.price || rate.price > rate.maxPrice)) {
            const room = roomTypes.find((r) => r.id === rate.roomTypeId)
            throw new Error(
              `Invalid weekend price range for ${room?.roomType}. Min price must be less than base price, and base price must be less than max price.`,
            )
          }
        }

        // Update weekend rates
        setWeekendRates([...editableWeekendRates])
        addNotification("success", "Weekend rates updated successfully")
      }

      setValidationErrors([])
    } catch (error) {
      console.error("❌ Error saving pricing:", error)
      addNotification("error", error instanceof Error ? error.message : "Failed to update pricing")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    if (activeTab === "standard") {
      // Reset to last saved values from source of truth
      setEditableRoomTypes(JSON.parse(JSON.stringify(roomTypes)))
    } else if (activeTab === "weekend") {
      setEditableWeekendRates(JSON.parse(JSON.stringify(weekendRates)))
    }

    setValidationErrors([])
    addNotification("success", "Changes reset to last saved values")
  }

  const handleRefresh = async () => {
    console.log("🔄 Manually refreshing room data from backend...")
    await loadAllRoomTypes()
    addNotification("success", "Data refreshed from backend")
  }

  // Auto-populate min/max prices based on base price
  const handleAutoPopulate = (roomId: string) => {
    setEditableRoomTypes((prev) => {
      return prev.map((room) => {
        if (room.id === roomId && room.pricePerNight > 0) {
          const newMinPrice = Math.round(room.pricePerNight * 0.7) // 70% of base
          const newMaxPrice = Math.round(room.pricePerNight * 1.5) // 150% of base

          return {
            ...room,
            pricePerNightMin: newMinPrice,
            pricePerNightMax: newMaxPrice,
          }
        }
        return room
      })
    })

    addNotification("success", "Min and max prices auto-populated based on base price")
  }

  // Check if there are unsaved changes
  const hasChanges =
    JSON.stringify(roomTypes) !== JSON.stringify(editableRoomTypes) ||
    JSON.stringify(weekendRates) !== JSON.stringify(editableWeekendRates)

  if (loading && roomTypes.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading room pricing data...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notifications */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg ${
              notification.type === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : notification.type === "warning"
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span className="text-sm font-medium">{notification.message}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Room Pricing Management</h1>
              <p className="text-sm text-gray-600">Configure room rates using the same logic as UpdateRoomTypeForm</p>
              {lastSaved && <p className="text-sm text-green-600 mt-1">Last saved: {lastSaved.toLocaleString()}</p>}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={handleRefresh} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 text-sm text-gray-600">
          <p>
            Found {roomTypes.length} room categories
            {selectedHotel ? ` for ${selectedHotel.name}` : ""}
          </p>
        </div>

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <h3 className="font-medium text-red-800">Validation Errors</h3>
            </div>
            <ul className="text-sm text-red-700 space-y-1">
              {validationErrors.map((error, index) => (
                <li key={index}>• {error.message}</li>
              ))}
            </ul>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Room Pricing Configuration</CardTitle>
            <CardDescription>
              Set the base price, minimum, and maximum pricing for each room category. Uses the exact same logic as
              UpdateRoomTypeForm.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="standard" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="standard">Standard Rate</TabsTrigger>
                <TabsTrigger value="weekend">Weekend Rate</TabsTrigger>
              </TabsList>

              <TabsContent value="standard" className="space-y-4">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Room Category</TableHead>
                        <TableHead>Min Price (฿)</TableHead>
                        <TableHead>Base Price (฿)</TableHead>
                        <TableHead>Max Price (฿)</TableHead>
                        <TableHead>Extra Bed</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {editableRoomTypes.map((room) => {
                        const hasFieldError = (field: string) =>
                          validationErrors.some((error) => error.field === `${room.id}-${field}`)

                        return (
                          <TableRow key={room.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">
                              <div>{room.roomType}</div>
                              {/* Show warning if min/max are 0 */}
                              {(room.pricePerNightMin === 0 || room.pricePerNightMax === 0) && (
                                <div className="text-xs text-red-600 mt-1">⚠️ Min/Max prices missing</div>
                              )}
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={room.pricePerNightMin}
                                onChange={(e) => handlePriceChange(room.id, "pricePerNightMin", e.target.value)}
                                className={`w-[120px] ${hasFieldError("pricePerNightMin") ? "border-red-500 bg-red-50" : ""} ${
                                  room.pricePerNightMin === 0 ? "border-yellow-500 bg-yellow-50" : ""
                                }`}
                                min="0"
                                step="0.01"
                                placeholder="Min price"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={room.pricePerNight}
                                onChange={(e) => handlePriceChange(room.id, "pricePerNight", e.target.value)}
                                className={`w-[120px] ${hasFieldError("pricePerNight") ? "border-red-500 bg-red-50" : ""}`}
                                min="0"
                                step="0.01"
                                placeholder="Base price"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={room.pricePerNightMax}
                                onChange={(e) => handlePriceChange(room.id, "pricePerNightMax", e.target.value)}
                                className={`w-[120px] ${hasFieldError("pricePerNightMax") ? "border-red-500 bg-red-50" : ""} ${
                                  room.pricePerNightMax === 0 ? "border-yellow-500 bg-yellow-50" : ""
                                }`}
                                min="0"
                                step="0.01"
                                placeholder="Max price"
                              />
                            </TableCell>
                            <TableCell>
                              {room.extraBedAllowed ? `฿${room.extraBedPrice || 0}` : "Not allowed"}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAutoPopulate(room.id)}
                                disabled={room.pricePerNight <= 0}
                                className="text-xs"
                              >
                                Auto-fill
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-md p-4 text-sm text-green-800">
                  <p className="font-medium mb-2">✅ Using Exact Same Logic as UpdateRoomTypeForm</p>
                  <ul className="space-y-1">
                    <li>• Same getRoomType query to fetch current values</li>
                    <li>• Same updateRoomType mutation to save changes</li>
                    <li>• Same field names: pricePerNight, pricePerNightMin, pricePerNightMax</li>
                    <li>• Same direct fetch approach without Apollo Client</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="weekend" className="space-y-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-sm font-medium">Weekend days:</div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="friday"
                      checked={weekendDays.friday}
                      onCheckedChange={(checked) => setWeekendDays((prev) => ({ ...prev, friday: checked === true }))}
                    />
                    <label htmlFor="friday" className="text-sm">
                      Friday
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="saturday"
                      checked={weekendDays.saturday}
                      onCheckedChange={(checked) => setWeekendDays((prev) => ({ ...prev, saturday: checked === true }))}
                    />
                    <label htmlFor="saturday" className="text-sm">
                      Saturday
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sunday"
                      checked={weekendDays.sunday}
                      onCheckedChange={(checked) => setWeekendDays((prev) => ({ ...prev, sunday: checked === true }))}
                    />
                    <label htmlFor="sunday" className="text-sm">
                      Sunday
                    </label>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[250px]">Room Category</TableHead>
                        <TableHead>Enabled</TableHead>
                        <TableHead>Min Price (฿)</TableHead>
                        <TableHead>Base Price (฿)</TableHead>
                        <TableHead>Max Price (฿)</TableHead>
                        <TableHead className="text-right">Standard Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {editableWeekendRates.map((rate) => {
                        const room = roomTypes.find((r) => r.id === rate.roomTypeId)
                        return (
                          <TableRow key={rate.roomTypeId}>
                            <TableCell className="font-medium">{room?.roomType}</TableCell>
                            <TableCell>
                              <Switch
                                checked={rate.enabled}
                                onCheckedChange={(checked) => handleWeekendRateToggle(rate.roomTypeId, checked)}
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={rate.minPrice}
                                onChange={(e) => handleWeekendPriceChange(rate.roomTypeId, "minPrice", e.target.value)}
                                className="w-[120px]"
                                disabled={!rate.enabled}
                                min="0"
                                step="0.01"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={rate.price}
                                onChange={(e) => handleWeekendPriceChange(rate.roomTypeId, "price", e.target.value)}
                                className={`w-[120px] ${
                                  rate.enabled && (rate.price < rate.minPrice || rate.price > rate.maxPrice)
                                    ? "border-red-500 bg-red-50"
                                    : ""
                                }`}
                                disabled={!rate.enabled}
                                min="0"
                                step="0.01"
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={rate.maxPrice}
                                onChange={(e) => handleWeekendPriceChange(rate.roomTypeId, "maxPrice", e.target.value)}
                                className="w-[120px]"
                                disabled={!rate.enabled}
                                min="0"
                                step="0.01"
                              />
                            </TableCell>
                            <TableCell className="text-right text-gray-500">฿ {room?.pricePerNight}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-sm text-blue-800">
                  <p>
                    <strong>Note:</strong> Weekend rates apply to the days selected above. These rates will be applied
                    automatically for bookings on weekend days.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-sm text-gray-600">
              {hasChanges && <span className="text-orange-600 font-medium">You have unsaved changes</span>}
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleReset} disabled={!hasChanges || loading}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Changes
              </Button>
              <Button onClick={handleSave} disabled={!hasChanges || loading || validationErrors.length > 0}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Saving to Backend...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>

        {/* Debug Information */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <details className="cursor-pointer">
            <summary className="text-sm font-medium text-gray-700 mb-2">Debug Information</summary>
            <div className="text-xs text-gray-600 space-y-2">
              <div>
                <strong>Has Changes:</strong> {hasChanges ? "Yes" : "No"}
              </div>
              <div>
                <strong>Validation Errors:</strong> {validationErrors.length}
              </div>
              <div>
                <strong>Room Types Count:</strong> {roomTypes.length}
              </div>
              <div>
                <strong>Last Saved:</strong> {lastSaved ? lastSaved.toISOString() : "Never"}
              </div>
              <div>
                <strong>Selected Hotel:</strong> {selectedHotel?.name || "None"}
              </div>
              <div>
                <strong>Using Same Logic:</strong> UpdateRoomTypeForm approach with direct fetch
              </div>
              <div>
                <strong>Backend Values:</strong>
                <pre className="mt-1 text-xs bg-gray-200 p-2 rounded">
                  {JSON.stringify(
                    roomTypes.map((r) => ({
                      type: r.roomType,
                      base: r.pricePerNight,
                      min: r.pricePerNightMin,
                      max: r.pricePerNightMax,
                    })),
                    null,
                    2,
                  )}
                </pre>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  )
}
