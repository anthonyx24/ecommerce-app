"use client";
import React, { useEffect, useState } from "react";
import { Listbox } from '@headlessui/react'

import { Product, ProductInfo } from "./types";
import { useUser } from "./contexts/UserContext";
import { useCart } from "./contexts/CartContext";
import { get_products, search_products, filter_products } from "./services";

import ProductCard from "./components/ProductCard";


export default function Home() {

    const [products, setProducts] = useState<ProductInfo[] | undefined>();
    const [search, setSearch] = useState<string>("");
    const [input, setInput] = useState<string>("");
    const [category, setCategory] = useState<string>("all");

    const display_map: { [key: string]: string} = {
        "all": "All Products",
        "smartphones": "Smartphones",
        "laptops": "Laptops",
        "fragrances": "Fragrances",
        "skincare": "Skincare",
        "groceries": "Groceries",
        "home-decoration": "Home Decoration",
        "furniture": "Furniture",
        "tops": "Tops",
        "womens-dresses": "Women's Dresses",
        "womens-shoes": "Women's Shoes",
        "mens-shirts": "Men's Shirts",
        "mens-shoes": "Men's Shoes",
        "mens-watches": "Men's Watches",
        "womens-watches": "Women's Watches",
        "womens-bags": "Women's Bags",
        "womens-jewellery": "Women's Jewellery",
        "sunglasses": "Sunglasses",
        "automotive": "Automotive",
        "motorcycle": "Motorcycle",
        "lighting": "Lighting",
    }

    const dropdown_menu = Object.entries(display_map).map(([key, value]) => ({
        value: key,
        label: value,
    }));
        

    useEffect(() => {

        const custom_search = (products: ProductInfo[], query: string) => {
            return products.filter((product) => product.title.toLowerCase().includes(query.toLowerCase()));
        }
        
        const load_products = async () => {
            try {
                if((search === '') && (category === "all")) {
                    const products = await get_products();
                    setProducts(products);
                }
                else if ((search !== '') && (category === "all")) {
                    const products = await search_products(search);
                    setProducts(products);
                }
                else if (category !== "all") {
                    const products = await filter_products(category);
                    if(search !== '') {
                        setProducts(custom_search(products, search));
                    }
                    else {
                        setProducts(products);
                    }
                }
            }
            catch (error) {
                console.error("Error loading products: ", error);
            }
        };

        load_products();
    }, [search, category]);

    const handleInputChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearch(input);
    }

    const handleClear = () => {
        setInput("");
        setSearch("");
        setCategory("all");
    }

    return (
        <div className="flex flex-col items-center w-full  gap-[60px]">
            <div className="flex flex-row items-center w-full justify-between gap-[20px]">
                <form onSubmit={handleSubmit} className="flex flex-row w-[70%] items-center justify-between gap-[20px]">
                    <input 
                        type="text" 
                        placeholder="Search Here" 
                        value={input}
                        onChange={handleInputChage}
                        className="flex w-[70%] py-[12px] px-[16px] justify-between items-center rounded-[8px] border-[1px] border-[#ccc] font-jakarta text-[16px] font-normal"
                    />
                    <button type="submit" className="flex flex-grow py-[12px] px-[16px] justify-center items-center rounded-[8px] bg-[#000] text-[#fff] font-jakarta text-[16px] font-normal">Search</button>
                </form>
                <div className="relative w-[25%]">
                    <Listbox value={category} onChange={setCategory}>
                        <Listbox.Button className="flex w-full py-[12px] px-[16px] justify-between items-center rounded-[8px] border-[1px] border-[#ccc]">
                            <div className="font-jakarta text-[16px] font-normal">{display_map[category]}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                                <path d="M1.41432 1.03575L1.41431 1.03577L1.41712 1.03852L6.76712 6.26352L7.00114 6.49206L7.23406 6.26241L12.5841 0.987409L12.5841 0.987415L12.5857 0.985751C12.6806 0.890925 12.8195 0.890926 12.9143 0.985751C13.0089 1.0803 13.0091 1.2187 12.9152 1.31351C12.9149 1.31379 12.9146 1.31407 12.9143 1.31435L7.1664 6.96229L7.16639 6.96228L7.16432 6.96435C7.06801 7.06065 7.02315 7.06671 7.00002 7.06671C6.9411 7.06671 6.89005 7.05228 6.82028 6.99915L1.0849 1.36351C0.990902 1.26871 0.991179 1.1303 1.08573 1.03575C1.18055 0.940926 1.3195 0.940926 1.41432 1.03575Z" fill="#637381" stroke="#637381" stroke-width="0.666667"/>
                            </svg>
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-1 min-w-[100%] mt-1 max-h-60 overflow-auto bg-white border-[#ccc] border-[1px] rounded-[8px]">
                            {dropdown_menu.map((item) => (
                                <Listbox.Option 
                                className={
                                    ({ active }) => 
                                    `${active ? 'text-[#fff] bg-[#000]' : 'text-[#000]'}
                                    cursor-pointer select-none relative py-[12px] px-[16px] font-jakarta text-[16px] font-normal`
                                }
                                key={item.value} value={item.value}>
                                    {({ selected }) => (
                                        <div className={`block truncate ${selected ? 'font-[700]' : 'font-[500]'} text-[16px]`}>{item.label}</div>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Listbox>
                </div>
                <button onClick={handleClear} className="flex justify-center items-center gap-[10px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                        <path d="M14.7802 13.719C14.8499 13.7887 14.9052 13.8714 14.9429 13.9625C14.9806 14.0535 15 14.1511 15 14.2496C15 14.3482 14.9806 14.4457 14.9429 14.5368C14.9052 14.6278 14.8499 14.7105 14.7802 14.7802C14.7105 14.8499 14.6278 14.9052 14.5368 14.9429C14.4457 14.9806 14.3482 15 14.2496 15C14.1511 15 14.0535 14.9806 13.9625 14.9429C13.8714 14.9052 13.7887 14.8499 13.719 14.7802L7.5 8.56025L1.28097 14.7802C1.14025 14.9209 0.949387 15 0.750375 15C0.551363 15 0.360502 14.9209 0.21978 14.7802C0.0790571 14.6395 3.923e-09 14.4486 0 14.2496C-3.923e-09 14.0506 0.0790571 13.8598 0.21978 13.719L6.43975 7.5L0.21978 1.28097C0.0790571 1.14025 -1.48275e-09 0.949387 0 0.750375C1.48275e-09 0.551363 0.0790571 0.360502 0.21978 0.21978C0.360502 0.0790571 0.551363 1.48275e-09 0.750375 0C0.949387 -1.48275e-09 1.14025 0.0790571 1.28097 0.21978L7.5 6.43975L13.719 0.21978C13.8598 0.0790571 14.0506 -3.923e-09 14.2496 0C14.4486 3.923e-09 14.6395 0.0790571 14.7802 0.21978C14.9209 0.360502 15 0.551363 15 0.750375C15 0.949387 14.9209 1.14025 14.7802 1.28097L8.56025 7.5L14.7802 13.719Z" fill="#111928"/>
                    </svg>
                    <div className="text-black font-jakarta text-[16px] font-normal">Clear</div>
                </button>
                
            </div>
            {products ? (
                <div className="flex flex-col gap-[20px] self-start">
                    <div className="text-[20px] font-jakarta font-[700]">
                        {products?.length} Products Found {
                            search !== '' ? `for "${search}"` : ''
                        }
                    </div>
                    <div className="grid grid-cols-3 gap-[2vw]">
                        {products?.map((product) => (
                            <ProductCard key={product.id} product={product} categories={display_map}/>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-[20px] font-jakarta font-[700] self-start">No Products Found</div>
            )}
            
        </div>
    );
  }
  