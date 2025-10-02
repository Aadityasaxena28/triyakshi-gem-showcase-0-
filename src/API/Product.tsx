import { Product, RawProduct, toProduct } from "@/DataTypes/product";
import axios from "axios";
const BaseUrl:string =  import.meta.env.VITE_api_url;

export const api = axios.create({
  baseURL: BaseUrl,
  timeout: 10_000,
});

type GetProductsParams = {
  page?:number;
  category?:string;
  productCount?:number; // to keep the track of the total product need to show over on single page
};
export async function getProducts({page=0,category="all", productCount=40}:GetProductsParams):Promise<Product[]>{

  try {
    const { data } = await api.get<RawProduct[]>(`/products/products`,{
      params:{
        page,
        category,
        productCount
      }
    });
    if(!data.isOkay){
      throw new Error("Failed to fetch products");
    }
    // const products:RawProduct[]= data.products;
    console.log(data.data);
    return data.data.map(toProduct);
  } catch (error) {
    throw new Error("Failed to fetch products" + error);
  }
}




// Testing with Dummy Data
const productsData = {
  precious: {
    moonga: [
      { id: 'MNG001', name: 'Premium Red Coral', quantity: '5.25 Ratti', description: 'Natural Italian Red Coral with excellent clarity', price: 12500, originalPrice: 15000 },
      { id: 'MNG002', name: 'Italian Moonga Stone', quantity: '7.5 Ratti', description: 'Deep red coral from Mediterranean sea', price: 18750, originalPrice: 22000 }
    ],
    heera: [
      { id: 'HRA001', name: 'Brilliant Cut Diamond', quantity: '0.50 Carat', description: 'VS1 clarity, F color certified diamond', price: 85000, originalPrice: 95000 },
      { id: 'HRA002', name: 'Round Diamond', quantity: '0.75 Carat', description: 'VVS2 clarity, excellent cut and polish', price: 125000, originalPrice: 140000 }
    ],
    panna: [
      { id: 'PNA001', name: 'Colombian Emerald', quantity: '4.25 Ratti', description: 'Natural emerald with vivid green color', price: 32000, originalPrice: 38000 },
      { id: 'PNA002', name: 'Zambian Panna', quantity: '6.0 Ratti', description: 'Premium quality with minor inclusions', price: 45000, originalPrice: 52000 }
    ],
    moti: [
      { id: 'MTI001', name: 'South Sea Pearl', quantity: '8-9mm', description: 'Natural pearl with excellent luster', price: 8500, originalPrice: 10000 },
      { id: 'MTI002', name: 'Basra Moti', quantity: '10-11mm', description: 'Rare natural pearl, certified authentic', price: 25000, originalPrice: 30000 }
    ],
    manik: [
      { id: 'MNK001', name: 'Burmese Ruby', quantity: '5.5 Ratti', description: 'Pigeon blood red ruby with certification', price: 75000, originalPrice: 85000 },
      { id: 'MNK002', name: 'Madagascar Manik', quantity: '4.0 Ratti', description: 'Natural ruby with excellent color', price: 48000, originalPrice: 55000 }
    ],
    pukhraj: [
      { id: 'PKJ001', name: 'Ceylon Yellow Sapphire', quantity: '6.25 Ratti', description: 'Natural unheated yellow sapphire', price: 42000, originalPrice: 48000 },
      { id: 'PKJ002', name: 'Thai Pukhraj', quantity: '7.5 Ratti', description: 'Premium quality with excellent clarity', price: 52500, originalPrice: 60000 }
    ],
    neelam: [
      { id: 'NLM001', name: 'Kashmir Blue Sapphire', quantity: '5.0 Ratti', description: 'Rare cornflower blue sapphire', price: 95000, originalPrice: 110000 },
      { id: 'NLM002', name: 'Ceylon Neelam', quantity: '6.5 Ratti', description: 'Natural blue sapphire, certified', price: 68000, originalPrice: 78000 }
    ],
    gomed: [
      { id: 'GMD001', name: 'Hessonite Garnet', quantity: '7.25 Ratti', description: 'Natural Ceylon Gomed with honey color', price: 5500, originalPrice: 7000 },
      { id: 'GMD002', name: 'African Gomed', quantity: '9.0 Ratti', description: 'Deep orange-red hessonite', price: 7200, originalPrice: 9000 }
    ],
    vaidurya: [
      { id: 'VDR001', name: "Cat's Eye Chrysoberyl", quantity: '5.5 Ratti', description: 'Sharp chatoyancy effect, honey color', price: 35000, originalPrice: 42000 },
      { id: 'VDR002', name: 'Lahsuniya Stone', quantity: '6.75 Ratti', description: 'Premium quality with excellent eye', price: 45000, originalPrice: 52000 }
    ]
  },
  semiPrecious: {
    sulemani: [
      { id: 'SLM001', name: 'Sulemani Hakik', quantity: '8.0 Ratti', description: 'Natural banded agate with unique patterns', price: 2500, originalPrice: 3200 },
      { id: 'SLM002', name: 'Black Agate Stone', quantity: '10.0 Ratti', description: 'Premium quality Sulemani stone', price: 3200, originalPrice: 4000 }
    ],
    safedPukhraj: [
      { id: 'SPK001', name: 'White Sapphire', quantity: '5.25 Ratti', description: 'Natural colorless sapphire', price: 8500, originalPrice: 10500 },
      { id: 'SPK002', name: 'Ceylon White Pukhraj', quantity: '6.5 Ratti', description: 'Excellent clarity and brilliance', price: 11000, originalPrice: 13500 }
    ],
    haritTurmali: [
      { id: 'HTR001', name: 'Green Tourmaline', quantity: '4.5 Ratti', description: 'Natural green tourmaline with vibrancy', price: 15000, originalPrice: 18000 },
      { id: 'HTR002', name: 'Afghan Harit Turmali', quantity: '5.75 Ratti', description: 'Premium chrome tourmaline', price: 22000, originalPrice: 26000 }
    ],
    chandrakant: [
      { id: 'CHK001', name: 'Moonstone', quantity: '7.0 Ratti', description: 'Natural moonstone with blue sheen', price: 4500, originalPrice: 6000 },
      { id: 'CHK002', name: 'Rainbow Chandrakant', quantity: '8.5 Ratti', description: 'Multi-color adularescence effect', price: 6500, originalPrice: 8000 }
    ],
    gomedak: [
      { id: 'GMK001', name: 'Hessonite Upratna', quantity: '8.0 Ratti', description: 'Natural garnet with warm tones', price: 3500, originalPrice: 4500 },
      { id: 'GMK002', name: 'Orange Gomedak', quantity: '10.0 Ratti', description: 'Bright orange hessonite garnet', price: 4800, originalPrice: 6000 }
    ],
    sunehla: [
      { id: 'SNH001', name: 'Golden Topaz', quantity: '6.25 Ratti', description: 'Natural yellow topaz with brilliance', price: 5500, originalPrice: 7000 },
      { id: 'SNH002', name: 'Imperial Sunehla', quantity: '7.5 Ratti', description: 'Premium golden-orange topaz', price: 8500, originalPrice: 10500 }
    ],
    jamuniya: [
      { id: 'JMN001', name: 'Amethyst', quantity: '9.0 Ratti', description: 'Deep purple amethyst from Brazil', price: 3200, originalPrice: 4200 },
      { id: 'JMN002', name: 'Zambian Jamuniya', quantity: '11.0 Ratti', description: 'Rich violet amethyst stone', price: 4500, originalPrice: 5800 }
    ],
    santreeGomed: [
      { id: 'STG001', name: 'Spessartite Garnet', quantity: '5.5 Ratti', description: 'Orange-red garnet with fire', price: 12000, originalPrice: 15000 },
      { id: 'STG002', name: 'Mandarin Santree', quantity: '6.0 Ratti', description: 'Vibrant orange spessartite', price: 16000, originalPrice: 19500 }
    ],
    vaiduryaUpratna: [
      { id: 'VDU001', name: "Cat's Eye Quartz", quantity: '7.5 Ratti', description: 'Natural chatoyant quartz', price: 5500, originalPrice: 7200 },
      { id: 'VDU002', name: 'Fiber Optic Stone', quantity: '9.0 Ratti', description: 'Strong cat eye effect', price: 7500, originalPrice: 9500 }
    ]
  }
};

export async function getProductById(id: string):Promise<Product | null> {
  return new Promise((resolve) => {
    const product = Object.values(productsData).flatMap(category => Object.values(category).flat()).find(p => p.id === id);
    resolve(product ? toProduct({ 
      _id: product.id,
      name: product.name,
      quantity: product.quantity,
      description: product.description,
      price: product.price,
      discount: Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100),
      image: "", // Provide a default or placeholder value
      availability: "available", // Provide a default or placeholder value
      category: "unknown", // Provide a default or placeholder value
      created_at: new Date().toISOString(), // Provide a default or placeholder value
      weight: 0 // Provide a default or placeholder value
    }) : null);    
})}
