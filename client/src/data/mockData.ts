
export interface Product {
  id: string;
  name: string;
  brand: string;
  netVolume: string;
  vintage: string;
  type: string;
  sugarContent: string;
  appellation: string;
  sku: string;
  alcohol: string;
  country: string;
  ean: string;
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  eNumber: string;
  allergens: string[];
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Château Margaux',
    brand: 'Château Margaux',
    netVolume: '750ml',
    vintage: '2019',
    type: 'Red Wine',
    sugarContent: 'Dry',
    appellation: 'Margaux AOC',
    sku: 'CM-2019-750',
    alcohol: '13.5%',
    country: 'France',
    ean: '1234567890123'
  },
  {
    id: '2',
    name: 'Dom Pérignon',
    brand: 'Dom Pérignon',
    netVolume: '750ml',
    vintage: '2012',
    type: 'Champagne',
    sugarContent: 'Brut',
    appellation: 'Champagne AOC',
    sku: 'DP-2012-750',
    alcohol: '12.5%',
    country: 'France',
    ean: '1234567890124'
  },
  {
    id: '3',
    name: 'Opus One',
    brand: 'Opus One',
    netVolume: '750ml',
    vintage: '2018',
    type: 'Red Wine',
    sugarContent: 'Dry',
    appellation: 'Napa Valley AVA',
    sku: 'OO-2018-750',
    alcohol: '14.5%',
    country: 'USA',
    ean: '1234567890125'
  }
];

export const mockIngredients: Ingredient[] = [
  {
    id: '1',
    name: 'Sulfur Dioxide',
    category: 'Preservative',
    eNumber: 'E220',
    allergens: ['sulfites']
  },
  {
    id: '2',
    name: 'Potassium Sorbate',
    category: 'Preservative',
    eNumber: 'E202',
    allergens: []
  },
  {
    id: '3',
    name: 'Ascorbic Acid',
    category: 'Antioxidant',
    eNumber: 'E300',
    allergens: []
  },
  {
    id: '4',
    name: 'Egg White',
    category: 'Fining Agent',
    eNumber: '',
    allergens: ['eggs']
  }
];
