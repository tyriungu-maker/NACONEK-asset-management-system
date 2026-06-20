import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ============================================================================
  // ROLES & PERMISSIONS
  // ============================================================================

  console.log('📋 Creating roles...')

  const superAdminRole = await prisma.role.upsert({
    where: { name: 'Super Administrator' },
    update: {},
    create: {
      name: 'Super Administrator',
      description: 'Full system control, user management, security',
      active: true,
    },
  })

  const assetManagerRole = await prisma.role.upsert({
    where: { name: 'Asset Manager' },
    update: {},
    create: {
      name: 'Asset Manager',
      description: 'Asset registration, allocation, transfers, reporting',
      active: true,
    },
  })

  const assetAuditorRole = await prisma.role.upsert({
    where: { name: 'Asset Auditor' },
    update: {},
    create: {
      name: 'Asset Auditor',
      description: 'Asset verification, audits, findings management',
      active: true,
    },
  })

  const procurementRole = await prisma.role.upsert({
    where: { name: 'Procurement Officer' },
    update: {},
    create: {
      name: 'Procurement Officer',
      description: 'Asset acquisition, supplier management',
      active: true,
    },
  })

  const financeRole = await prisma.role.upsert({
    where: { name: 'Finance Officer' },
    update: {},
    create: {
      name: 'Finance Officer',
      description: 'Asset valuation, depreciation, financial reporting',
      active: true,
    },
  })

  const custodianRole = await prisma.role.upsert({
    where: { name: 'Department Custodian' },
    update: {},
    create: {
      name: 'Department Custodian',
      description: 'Asset accountability, verification, transfers',
      active: true,
    },
  })

  const executiveRole = await prisma.role.upsert({
    where: { name: 'Executive Management' },
    update: {},
    create: {
      name: 'Executive Management',
      description: 'Dashboard access, analytics, reporting',
      active: true,
    },
  })

  console.log('🔐 Creating permissions...')

  const permissionCategories = [
    { name: 'asset:create', category: 'asset', description: 'Create new assets' },
    { name: 'asset:read', category: 'asset', description: 'View assets' },
    { name: 'asset:update', category: 'asset', description: 'Update assets' },
    { name: 'asset:delete', category: 'asset', description: 'Delete assets' },
    { name: 'asset:export', category: 'asset', description: 'Export assets' },
    { name: 'asset:import', category: 'asset', description: 'Import assets' },

    { name: 'audit:create', category: 'audit', description: 'Create audit campaigns' },
    { name: 'audit:read', category: 'audit', description: 'View audits' },
    { name: 'audit:update', category: 'audit', description: 'Update audits' },
    { name: 'audit:assign', category: 'audit', description: 'Assign audits' },
    { name: 'audit:approve', category: 'audit', description: 'Approve audit findings' },

    { name: 'report:create', category: 'report', description: 'Create reports' },
    { name: 'report:read', category: 'report', description: 'View reports' },
    { name: 'report:export', category: 'report', description: 'Export reports' },

    { name: 'user:create', category: 'user', description: 'Create users' },
    { name: 'user:read', category: 'user', description: 'View users' },
    { name: 'user:update', category: 'user', description: 'Update users' },
    { name: 'user:delete', category: 'user', description: 'Delete users' },

    { name: 'admin:settings', category: 'admin', description: 'Access system settings' },
    { name: 'admin:audit_log', category: 'admin', description: 'View audit logs' },
  ]

  const permissions = await Promise.all(
    permissionCategories.map((perm) =>
      prisma.permission.upsert({
        where: { name: perm.name },
        update: {},
        create: perm,
      })
    )
  )

  // Assign permissions to roles
  console.log('👤 Assigning permissions to roles...')

  const superAdminPermissions = permissions.slice(0, permissions.length)
  for (const perm of superAdminPermissions) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: superAdminRole.id,
          permissionId: perm.id,
        },
      },
      update: {},
      create: {
        roleId: superAdminRole.id,
        permissionId: perm.id,
      },
    })
  }

  // ============================================================================
  // REGIONS & COUNTIES
  // ============================================================================

  console.log('🗺️  Creating regions and counties...')

  const regionCodes = [
    { code: 'NRB', name: 'Nairobi' },
    { code: 'GRS', name: 'Garissa' },
    { code: 'WJR', name: 'Wajir' },
    { code: 'MDR', name: 'Mandera' },
    { code: 'TRK', name: 'Turkana' },
    { code: 'ISL', name: 'Isiolo' },
    { code: 'MRS', name: 'Marsabit' },
    { code: 'SAM', name: 'Samburu' },
    { code: 'KJL', name: 'Kajiado' },
    { code: 'BSA', name: 'Baringo' },
    { code: 'LKP', name: 'Laikipia' },
    { code: 'TNT', name: 'Tana River' },
  ]

  const regions = await Promise.all(
    regionCodes.map((region) =>
      prisma.region.upsert({
        where: { code: region.code },
        update: {},
        create: region,
      })
    )
  )

  // Create counties for each region
  const nrbRegion = regions.find((r) => r.code === 'NRB')!
  const grsRegion = regions.find((r) => r.code === 'GRS')!

  await prisma.county.upsert({
    where: { regionId_code: { regionId: nrbRegion.id, code: 'NRB001' } },
    update: {},
    create: {
      name: 'Nairobi County',
      code: 'NRB001',
      regionId: nrbRegion.id,
    },
  })

  await prisma.county.upsert({
    where: { regionId_code: { regionId: grsRegion.id, code: 'GRS001' } },
    update: {},
    create: {
      name: 'Garissa County',
      code: 'GRS001',
      regionId: grsRegion.id,
    },
  })

  // ============================================================================
  // DEPARTMENTS
  // ============================================================================

  console.log('🏢 Creating departments...')

  const departments = [
    { name: 'Finance', description: 'Finance and Accounts Department' },
    { name: 'Administration', description: 'Administration Department' },
    { name: 'ICT', description: 'Information Technology Department' },
    { name: 'Operations', description: 'Operations Department' },
    { name: 'Learning & Development', description: 'Learning and Development Department' },
  ]

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: dept,
    })
  }

  // ============================================================================
  // LOCATIONS
  // ============================================================================

  console.log('📍 Creating locations...')

  const nrbCounty = await prisma.county.findFirst({
    where: { code: 'NRB001' },
  })

  const adminDept = await prisma.department.findFirst({
    where: { name: 'Administration' },
  })

  if (nrbCounty && adminDept) {
    await prisma.location.upsert({
      where: { name: 'NACONEK Headquarters' },
      update: {},
      create: {
        name: 'NACONEK Headquarters',
        locationType: 'HQ',
        address: 'Nairobi, Kenya',
        countyId: nrbCounty.id,
        departmentId: adminDept.id,
        latitude: -1.2921,
        longitude: 36.8219,
      },
    })
  }

  // ============================================================================
  // ASSET CATEGORIES & SUBCATEGORIES
  // ============================================================================

  console.log('🏷️  Creating asset categories...')

  const categories = [
    { code: 'ICT', name: 'ICT Equipment', description: 'Information and Communication Technology Equipment' },
    { code: 'NET', name: 'Networking Equipment', description: 'Network Infrastructure and Equipment' },
    { code: 'PRT', name: 'Printers', description: 'Printing Equipment' },
    { code: 'FUR', name: 'Furniture', description: 'Office and Classroom Furniture' },
    { code: 'VEH', name: 'Vehicles', description: 'Vehicles and Transportation' },
    { code: 'SOL', name: 'Solar Equipment', description: 'Solar Panels and Systems' },
    { code: 'UPS', name: 'Power Equipment', description: 'Power Supply and UPS Systems' },
    { code: 'SEC', name: 'Security Equipment', description: 'Security and Surveillance Equipment' },
    { code: 'OFF', name: 'Office Equipment', description: 'General Office Equipment' },
    { code: 'MED', name: 'Medical Equipment', description: 'Medical and Health Equipment' },
    { code: 'LIB', name: 'Library Assets', description: 'Library Books and Resources' },
  ]

  for (const cat of categories) {
    await prisma.assetCategory.upsert({
      where: { code: cat.code },
      update: {},
      create: cat,
    })
  }

  // Create subcategories for ICT
  const ictCategory = await prisma.assetCategory.findFirst({
    where: { code: 'ICT' },
  })

  if (ictCategory) {
    const subcategories = [
      { code: 'LAPTOP', name: 'Laptops' },
      { code: 'DESKTOP', name: 'Desktop Computers' },
      { code: 'TABLET', name: 'Tablets' },
      { code: 'SERVER', name: 'Servers' },
    ]

    for (const subcat of subcategories) {
      await prisma.assetSubcategory.upsert({
        where: {
          categoryId_code: {
            categoryId: ictCategory.id,
            code: subcat.code,
          },
        },
        update: {},
        create: {
          ...subcat,
          categoryId: ictCategory.id,
        },
      })
    }
  }

  // ============================================================================
  // SUPPLIERS
  // ============================================================================

  console.log('🏪 Creating suppliers...')

  const suppliers = [
    {
      name: 'Tech Solutions Ltd',
      email: 'info@techsolutions.co.ke',
      phone: '+254 703 123456',
      address: 'Nairobi, Kenya',
      contact: 'John Omondi',
    },
    {
      name: 'Office Supplies Kenya',
      email: 'sales@officesupplies.co.ke',
      phone: '+254 704 654321',
      address: 'Nairobi, Kenya',
      contact: 'Mary Kipchoge',
    },
  ]

  for (const supplier of suppliers) {
    await prisma.supplier.upsert({
      where: { name: supplier.name },
      update: {},
      create: supplier,
    })
  }

  // ============================================================================
  // SYSTEM USERS
  // ============================================================================

  console.log('👥 Creating system users...')

  const hashedPassword = await bcrypt.hash('NACONEK2026!', 10)

  await prisma.user.upsert({
    where: { email: 'admin@naconek.org' },
    update: {},
    create: {
      email: 'admin@naconek.org',
      name: 'Administrator',
      password: hashedPassword,
      emailVerified: new Date(),
      active: true,
      roleId: superAdminRole.id,
    },
  })

  await prisma.user.upsert({
    where: { email: 'manager@naconek.org' },
    update: {},
    create: {
      email: 'manager@naconek.org',
      name: 'Asset Manager',
      password: hashedPassword,
      emailVerified: new Date(),
      active: true,
      roleId: assetManagerRole.id,
    },
  })

  await prisma.user.upsert({
    where: { email: 'auditor@naconek.org' },
    update: {},
    create: {
      email: 'auditor@naconek.org',
      name: 'Asset Auditor',
      password: hashedPassword,
      emailVerified: new Date(),
      active: true,
      roleId: assetAuditorRole.id,
    },
  })

  await prisma.user.upsert({
    where: { email: 'executive@naconek.org' },
    update: {},
    create: {
      email: 'executive@naconek.org',
      name: 'Executive Manager',
      password: hashedPassword,
      emailVerified: new Date(),
      active: true,
      roleId: executiveRole.id,
    },
  })

  // ============================================================================
  // SAMPLE ASSETS
  // ============================================================================

  console.log('📦 Creating sample assets...')

  const hq = await prisma.location.findFirst({
    where: { locationType: 'HQ' },
  })

  const laptopSubcat = await prisma.assetSubcategory.findFirst({
    where: { code: 'LAPTOP' },
  })

  const nrbReg = await prisma.region.findFirst({
    where: { code: 'NRB' },
  })

  if (hq && laptopSubcat && nrbCounty && nrbReg && adminDept) {
    const suppliers2 = await prisma.supplier.findFirst()

    for (let i = 1; i <= 5; i++) {
      await prisma.asset.create({
        data: {
          assetTag: `NACONEK-NRB-ICT-${String(i).padStart(5, '0')}`,
          name: `Dell Latitude Laptop ${i}`,
          description: `Business laptop for staff`,
          manufacturer: 'Dell',
          model: 'Latitude 5420',
          serialNumber: `DL-LAT-${String(i).padStart(5, '0')}`,
          purchaseDate: new Date('2023-01-01'),
          purchaseCost: 85000,
          currentValue: 75000,
          condition: 'good',
          status: 'active',
          categoryId: ictCategory!.id,
          subcategoryId: laptopSubcat.id,
          supplierId: suppliers2?.id,
          regionId: nrbReg.id,
          countyId: nrbCounty.id,
          departmentId: adminDept.id,
          locationId: hq.id,
          custodian: `Staff Member ${i}`,
          warrantyExpiry: new Date('2025-01-01'),
        },
      })
    }
  }

  // ============================================================================
  // SYSTEM CONFIGURATION
  // ============================================================================

  console.log('⚙️  Setting up system configuration...')

  const configs = [
    {
      key: 'app_name',
      value: 'NACONEK Asset Management System',
      dataType: 'string',
      description: 'Application name',
    },
    {
      key: 'app_version',
      value: '1.0.0',
      dataType: 'string',
      description: 'Application version',
    },
    {
      key: 'items_per_page',
      value: '20',
      dataType: 'number',
      description: 'Default items per page for pagination',
    },
    {
      key: 'max_upload_size',
      value: '10485760',
      dataType: 'number',
      description: 'Maximum file upload size in bytes',
    },
    {
      key: 'enable_notifications',
      value: 'true',
      dataType: 'boolean',
      description: 'Enable email notifications',
    },
    {
      key: 'maintenance_mode',
      value: 'false',
      dataType: 'boolean',
      description: 'System maintenance mode',
    },
  ]

  for (const config of configs) {
    await prisma.systemConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    })
  }

  console.log('✅ Database seeding completed successfully!')
  console.log('\n📝 Default Credentials:')
  console.log('   Email: admin@naconek.org')
  console.log('   Password: NACONEK2026!')
  console.log('\n   Email: auditor@naconek.org')
  console.log('   Password: NACONEK2026!')
  console.log('\n   Email: manager@naconek.org')
  console.log('   Password: NACONEK2026!')
  console.log('\n   Email: executive@naconek.org')
  console.log('   Password: NACONEK2026!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
