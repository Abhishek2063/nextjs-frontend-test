export interface Product {
    id: number;
    title: string;
    description: string;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: [];
    brand: string;
    price: number;
    onViewReviews: (id: number) => void;
}

interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

export interface ReviewModalBoxProps {
    handleClose: () => void;
    open: boolean;
    title: string;
    reviews: Review[];
}

export interface ProductDetails extends Product {
    reviews: Review[];
}

export interface ProductListProps {
    products: Product[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  }