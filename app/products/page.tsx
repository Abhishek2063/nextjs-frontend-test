"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { Product, ProductDetails } from '@/types/product';
import { Button } from '@mui/material';
import { PRODUCT_GET_LIST_API_URL } from '@/utils/apiURLS';
import ReviewModalBox from '@/Components/ReviewModalBox';

const columnHelper = createColumnHelper<Product>();

const columns = [
  columnHelper.accessor('title', {
    header: 'Title',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('brand', {
    header: 'Brand',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('price', {
    header: 'Price',
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor('discountPercentage', {
    header: 'Discount %',
    cell: (info) => `${info.getValue()}%`,
  }),
  columnHelper.accessor('rating', {
    header: 'Rating',
    cell: (info) => `${info.getValue()}/5`,
  }),
  columnHelper.accessor('tags', {
    header: 'Tags',
    cell: (info) => info.getValue().join(', '),
  }),
  columnHelper.accessor('stock', {
    header: 'Stock',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('id', {
    header: 'Action',
    cell: (info) => (
      <Button
        variant="contained"
        size="small"
        onClick={() => info.row.original.onViewReviews(info.getValue())}
        className="bg-blue-500 text-white"
      >
        View Reviews
      </Button>
    ),
  }),
];

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);

  const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get(PRODUCT_GET_LIST_API_URL);
    return response.data.products;
  };

  const getProductDetails = async (id: number): Promise<ProductDetails> => {
    const response = await axios.get(`${PRODUCT_GET_LIST_API_URL}/${id}`);
    return response.data;
  };

  const onViewReviews = async (id: number) => {
    const details = await getProductDetails(id);
    setSelectedProduct(details);
    setOpen(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const productList = await getProducts();
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const productsWithAction = products.map((product) => ({
    ...product,
    onViewReviews,
  }));

  const table = useReactTable({
    data: productsWithAction,
    columns,
    getCoreRowModel: getCoreRowModel(),
    autoResetPageIndex: false,
autoResetExpanded: false,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm text-gray-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedProduct && (
        <ReviewModalBox
          open={open}
          handleClose={() => setOpen(false)}
          title={selectedProduct.title}
          reviews={selectedProduct.reviews}
        />
      )}
    </div>
  );
};

export default ProductList;
