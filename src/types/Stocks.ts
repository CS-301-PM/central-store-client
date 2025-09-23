export interface StockAddingType {
  id?: string;
  item_name?: string;
  original_quantity?: number;
  current_quantity?: number;
  cost_each?: number;
  location?: string;
  available?: boolean;
  category?: string;
}

export interface StockFetchedType extends StockAddingType {
  created_at?: string;
  updated_at?: string;
}

export const sampleStocks: StockFetchedType[] = [
  {
    id: "1",
    item_name: "Dell Laptop",
    original_quantity: 20,
    current_quantity: 15,
    cost_each: 1200,
    location: "Warehouse A",
    available: true,
    category: "Electronics",
    created_at: "2025-09-01T10:05:00Z",
    updated_at: "2025-09-15T14:30:00Z",
  },
  {
    id: "2",
    item_name: "HP Printer",
    original_quantity: 10,
    current_quantity: 7,
    cost_each: 300,
    location: "Warehouse B",
    available: true,
    category: "Office Equipment",
    created_at: "2025-09-02T09:10:00Z",
    updated_at: "2025-09-14T12:00:00Z",
  },
  {
    id: "3",
    item_name: "Office Chair",
    original_quantity: 50,
    current_quantity: 45,
    cost_each: 80,
    location: "Warehouse A",
    available: true,
    category: "Furniture",
    created_at: "2025-09-03T11:35:00Z",
    updated_at: "2025-09-18T10:20:00Z",
  },
  {
    id: "4",
    item_name: "Projector",
    original_quantity: 5,
    current_quantity: 3,
    cost_each: 900,
    location: "Warehouse C",
    available: true,
    category: "Electronics",
    created_at: "2025-09-04T14:05:00Z",
    updated_at: "2025-09-16T09:45:00Z",
  },
  {
    id: "5",
    item_name: "Whiteboard Marker",
    original_quantity: 200,
    current_quantity: 150,
    cost_each: 2,
    location: "Warehouse D",
    available: true,
    category: "Stationery",
    created_at: "2025-09-05T08:10:00Z",
    updated_at: "2025-09-19T16:30:00Z",
  },
  {
    id: "6",
    item_name: "HDMI Cable",
    original_quantity: 100,
    current_quantity: 90,
    cost_each: 15,
    location: "Warehouse C",
    available: true,
    category: "Accessories",
    created_at: "2025-09-06T13:05:00Z",
    updated_at: "2025-09-18T14:10:00Z",
  },
  {
    id: "7",
    item_name: "Server Rack",
    original_quantity: 3,
    current_quantity: 2,
    cost_each: 2500,
    location: "Warehouse E",
    available: true,
    category: "Networking",
    created_at: "2025-09-07T15:05:00Z",
    updated_at: "2025-09-17T13:45:00Z",
  },
  {
    id: "8",
    item_name: "Notebook",
    original_quantity: 500,
    current_quantity: 480,
    cost_each: 1.5,
    location: "Warehouse D",
    available: true,
    category: "Stationery",
    created_at: "2025-09-08T09:35:00Z",
    updated_at: "2025-09-20T11:00:00Z",
  },
  {
    id: "9",
    item_name: "Ethernet Switch",
    original_quantity: 15,
    current_quantity: 12,
    cost_each: 350,
    location: "Warehouse E",
    available: true,
    category: "Networking",
    created_at: "2025-09-09T16:05:00Z",
    updated_at: "2025-09-18T10:15:00Z",
  },
  {
    id: "10",
    item_name: "First Aid Kit",
    original_quantity: 30,
    current_quantity: 25,
    cost_each: 50,
    location: "Warehouse F",
    available: true,
    category: "Safety",
    created_at: "2025-09-10T12:05:00Z",
    updated_at: "2025-09-19T09:40:00Z",
  },
];
