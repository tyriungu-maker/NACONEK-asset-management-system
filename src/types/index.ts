// User Types
export type UserRole = 
  | 'super_admin'
  | 'asset_manager'
  | 'asset_auditor'
  | 'procurement_officer'
  | 'finance_officer'
  | 'department_custodian'
  | 'executive_management'

export interface User {
  id: string
  email: string
  name: string | null
  image: string | null
  role: UserRole
  active: boolean
  createdAt: Date
  updatedAt: Date
}

// Asset Types
export interface Asset {
  id: string
  assetTag: string
  name: string
  description: string | null
  categoryId: string
  status: 'active' | 'inactive' | 'maintenance' | 'disposed' | 'lost' | 'missing'
  condition: 'good' | 'fair' | 'poor' | 'damaged'
  purchaseCost: number
  currentValue: number
  createdAt: Date
  updatedAt: Date
}

// Audit Types
export interface AuditCampaign {
  id: string
  name: string
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'completed' | 'archived'
  campaignType: 'annual' | 'quarterly' | 'regional' | 'department' | 'surprise'
  startDate: Date
  endDate: Date | null
  totalAssets: number
  assetsVerified: number
  createdAt: Date
  updatedAt: Date
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Form Types
export interface LoginFormData {
  email: string
  password: string
}

export interface AssetFormData {
  name: string
  description: string
  categoryId: string
  subcategoryId: string
  manufacturerName: string
  modelNumber: string
  serialNumber: string
  purchaseDate: string
  purchaseCost: number
  currentValue: number
  locationId: string
  custodian: string
}
