import { Product, CategoryTheme, CategoryId } from '../types';
import { PRODUCTS, CATEGORY_THEMES } from '../data/products';

export interface SpreadsheetCatalogResult {
  products: Product[];
  categories: CategoryTheme[];
}

export const PRODUCT_SHEET_HEADERS = [
  'ID',
  'Name',
  'Category',
  'CategoryName',
  'Price',
  'OriginalPrice',
  'Image',
  'SecondaryImage',
  'Fabric',
  'Embroidery',
  'Pieces',
  'LeadTime',
  'Status',
  'Featured',
  'Bestseller',
  'NewArrival',
  'Description',
];

export const CATEGORY_SHEET_HEADERS = [
  'ID',
  'Title',
  'UrduTitle',
  'Description',
  'CoverImage',
];

/**
 * Creates a brand new Google Spreadsheet in the user's Google Drive account
 * and seeds it with all 16 current sample products and categories.
 */
export async function createSampleCatalogSpreadsheet(accessToken: string): Promise<{
  spreadsheetId: string;
  spreadsheetUrl: string;
}> {
  // 1. Create the spreadsheet structure with two tabs: 'Products' and 'Categories'
  const createPayload = {
    properties: {
      title: 'Ashrafi Bridal Studio — Live Products & Categories Catalog',
    },
    sheets: [
      {
        properties: {
          title: 'Products',
          gridProperties: {
            frozenRowCount: 1,
            columnCount: 20,
            rowCount: 50,
          },
        },
      },
      {
        properties: {
          title: 'Categories',
          gridProperties: {
            frozenRowCount: 1,
            columnCount: 10,
            rowCount: 25,
          },
        },
      },
    ],
  };

  const createRes = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createPayload),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Failed to create Google Sheet: ${errText}`);
  }

  const createdSheet = await createRes.json();
  const spreadsheetId = createdSheet.spreadsheetId;
  const spreadsheetUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;

  // 2. Prepare all 16 sample products rows
  const productRows = PRODUCTS.map((p) => [
    p.id,
    p.name,
    p.category,
    p.categoryName,
    p.price,
    p.originalPrice || '',
    p.image,
    p.secondaryImage || '',
    p.fabric,
    p.embroidery,
    p.pieces,
    p.leadTime,
    p.status,
    p.isFeatured ? 'TRUE' : 'FALSE',
    p.isBestseller ? 'TRUE' : 'FALSE',
    p.isNewArrival ? 'TRUE' : 'FALSE',
    p.description,
  ]);

  const allProductValues = [PRODUCT_SHEET_HEADERS, ...productRows];

  // 3. Prepare all categories rows
  const categoryRows = Object.values(CATEGORY_THEMES).map((theme) => {
    return [
      theme.id,
      theme.name,
      theme.urduName,
      theme.description,
      theme.heroImage || '',
    ];
  });

  const allCategoryValues = [CATEGORY_SHEET_HEADERS, ...categoryRows];

  // 4. Populate values into 'Products' and 'Categories' tabs
  const batchUpdateValuesPayload = {
    valueInputOption: 'USER_ENTERED',
    data: [
      {
        range: 'Products!A1:Q' + allProductValues.length,
        values: allProductValues,
      },
      {
        range: 'Categories!A1:E' + allCategoryValues.length,
        values: allCategoryValues,
      },
    ],
  };

  const populateRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(batchUpdateValuesPayload),
    }
  );

  if (!populateRes.ok) {
    const err = await populateRes.text();
    console.warn('Could not populate initial values immediately:', err);
  }

  // 5. Apply header styling with subtle royal gold background & bold typography
  try {
    const formatPayload = {
      requests: [
        {
          repeatCell: {
            range: {
              sheetId: createdSheet.sheets[0].properties.sheetId,
              startRowIndex: 0,
              endRowIndex: 1,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.98, green: 0.96, blue: 0.93 },
                textFormat: {
                  bold: true,
                  foregroundColor: { red: 0.1, green: 0.1, blue: 0.1 },
                },
              },
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat)',
          },
        },
        {
          repeatCell: {
            range: {
              sheetId: createdSheet.sheets[1].properties.sheetId,
              startRowIndex: 0,
              endRowIndex: 1,
            },
            cell: {
              userEnteredFormat: {
                backgroundColor: { red: 0.98, green: 0.96, blue: 0.93 },
                textFormat: {
                  bold: true,
                  foregroundColor: { red: 0.1, green: 0.1, blue: 0.1 },
                },
              },
            },
            fields: 'userEnteredFormat(backgroundColor,textFormat)',
          },
        },
      ],
    };

    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formatPayload),
    });
  } catch (err) {
    console.warn('Styling batchUpdate optional step skipped:', err);
  }

  return { spreadsheetId, spreadsheetUrl };
}

/**
 * Reads products and categories live from the user's Google Sheet
 */
export async function fetchCatalogFromSpreadsheet(
  spreadsheetId: string,
  accessToken: string
): Promise<SpreadsheetCatalogResult> {
  // Fetch Products tab
  const productsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Products!A1:Q100`;
  const prodRes = await fetch(productsUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!prodRes.ok) {
    const errorText = await prodRes.text();
    throw new Error(`Failed to load Products tab: ${errorText}`);
  }

  const prodData = await prodRes.json();
  const prodRows: any[][] = prodData.values || [];

  if (prodRows.length < 2) {
    throw new Error('The Products tab is empty or missing data rows.');
  }

  // Parse header mapping
  const headers: string[] = prodRows[0].map((h: string) => String(h).trim().toLowerCase());
  const idIdx = headers.indexOf('id');
  const nameIdx = headers.indexOf('name');
  const catIdx = headers.indexOf('category');
  const catNameIdx = headers.indexOf('categoryname');
  const priceIdx = headers.indexOf('price');
  const origPriceIdx = headers.indexOf('originalprice');
  const imgIdx = headers.indexOf('image');
  const secImgIdx = headers.indexOf('secondaryimage');
  const fabricIdx = headers.indexOf('fabric');
  const embIdx = headers.indexOf('embroidery');
  const piecesIdx = headers.indexOf('pieces');
  const leadIdx = headers.indexOf('leadtime');
  const statusIdx = headers.indexOf('status');
  const featIdx = headers.indexOf('featured');
  const bestIdx = headers.indexOf('bestseller');
  const newIdx = headers.indexOf('newarrival');
  const descIdx = headers.indexOf('description');

  const parsedProducts: Product[] = [];

  for (let i = 1; i < prodRows.length; i++) {
    const row = prodRows[i];
    if (!row || row.length === 0 || !row[nameIdx !== -1 ? nameIdx : 1]) continue;

    const rawId = (idIdx !== -1 ? row[idIdx] : '') || `prod-${i}`;
    const name = (nameIdx !== -1 ? row[nameIdx] : '') || `Ensemble #${i}`;
    const category = ((catIdx !== -1 ? row[catIdx] : '') || 'all').toLowerCase() as CategoryId;
    const categoryName = (catNameIdx !== -1 ? row[catNameIdx] : '') || 'Bridal Couture';
    
    // Parse numeric price, removing PKR, Rs, commas
    const rawPrice = priceIdx !== -1 ? row[priceIdx] : '';
    const cleanPrice = typeof rawPrice === 'string' ? Number(rawPrice.replace(/[^0-9]/g, '')) : Number(rawPrice);
    const price = isNaN(cleanPrice) || cleanPrice <= 0 ? 150000 : cleanPrice;

    const rawOrig = origPriceIdx !== -1 ? row[origPriceIdx] : '';
    const cleanOrig = typeof rawOrig === 'string' ? Number(rawOrig.replace(/[^0-9]/g, '')) : Number(rawOrig);
    const originalPrice = !isNaN(cleanOrig) && cleanOrig > 0 ? cleanOrig : undefined;

    const image = (imgIdx !== -1 ? row[imgIdx] : '') || '/src/assets/images/nikah_ivory_couture_1791159230888.jpg';
    const secondaryImage = secImgIdx !== -1 ? row[secImgIdx] : undefined;
    const fabric = (fabricIdx !== -1 ? row[fabricIdx] : '') || 'Pure Organza & Silk';
    const embroidery = (embIdx !== -1 ? row[embIdx] : '') || 'Handcrafted Karchob Zardozi';
    const pieces = (piecesIdx !== -1 ? row[piecesIdx] : '') || '3-Piece Ensemble';
    const leadTime = (leadIdx !== -1 ? row[leadIdx] : '') || '6 to 8 Weeks';
    const status = (statusIdx !== -1 ? row[statusIdx] : '') || 'Made to Order';
    const isFeatured = featIdx !== -1 ? String(row[featIdx]).toUpperCase() === 'TRUE' : true;
    const isBestseller = bestIdx !== -1 ? String(row[bestIdx]).toUpperCase() === 'TRUE' : false;
    const isNewArrival = newIdx !== -1 ? String(row[newIdx]).toUpperCase() === 'TRUE' : false;
    const description = (descIdx !== -1 ? row[descIdx] : '') || 'Handcrafted bridal couture at Ashrafi Studio Karachi.';

    parsedProducts.push({
      id: String(rawId),
      name: String(name),
      category,
      categoryName: String(categoryName),
      price,
      originalPrice,
      image: String(image),
      secondaryImage: secondaryImage ? String(secondaryImage) : undefined,
      fabric: String(fabric),
      embroidery: String(embroidery),
      pieces: String(pieces),
      leadTime: String(leadTime),
      status: (status as any) || 'Made to Order',
      isFeatured,
      isBestseller,
      isNewArrival,
      description: String(description),
      colors: ['Ivory', 'Gold', 'Crimson'],
      details: [fabric, embroidery, pieces, leadTime],
    });
  }

  // Fetch Categories tab (if exists)
  let parsedCategories: CategoryTheme[] = [];
  try {
    const catUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Categories!A1:E50`;
    const catRes = await fetch(catUrl, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (catRes.ok) {
      const catData = await catRes.json();
      const catRows: any[][] = catData.values || [];
      if (catRows.length >= 2) {
        for (let i = 1; i < catRows.length; i++) {
          const row = catRows[i];
          if (!row || !row[0]) continue;
          const id = String(row[0]).trim().toLowerCase() as CategoryId;
          const title = String(row[1] || id);
          const urduTitle = String(row[2] || '');
          const description = String(row[3] || '');
          const heroImage = String(row[4] || '');

          parsedCategories.push({
            id,
            name: title,
            urduName: urduTitle,
            tagline: `Curated ${title} Ensembles`,
            description,
            heroImage: heroImage || '/src/assets/images/nikah_ivory_couture_1791159230888.jpg',
            accentColor: '#93733A',
            bgGradient: 'from-[#FAF7F2] via-[#F4EFE6] to-[#FDFBF7]',
            badgeTone: 'border-[#93733A]/30 text-[#6B5324] bg-[#93733A]/5',
            paletteDescription: 'Royal Pakistani Bridal Hues',
          });
        }
      }
    }
  } catch (err) {
    console.warn('Categories tab could not be parsed, using defaults:', err);
  }

  return {
    products: parsedProducts.length > 0 ? parsedProducts : PRODUCTS,
    categories: parsedCategories,
  };
}
