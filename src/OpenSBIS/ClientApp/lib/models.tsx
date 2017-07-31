interface InventoryLocation {
    id: number;
    companyId: number;
    name: string;
    company: Company;
}

interface Company {
    id: number;
    name: string;
}

interface Product {
    id: number;
    companyId: number;
    company: Company;
    inventoryLocationId: number;
    name: string;
    sku: string;
    quantity: number;
}
