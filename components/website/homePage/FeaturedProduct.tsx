"use client";

import React, { useEffect } from "react";
import SpacedContainer from "../SpacedContainer";
import TitleHeader from "../TitleHeader";
import { ProductType } from "@/features/products/product.types";
import ProductCarousel from "../products/ProductCarousel";
import { useAnimation, motion } from "motion/react";
import { useInView } from "react-intersection-observer";

type Props = {
  featured: ProductType[];
};

const FeaturedProduct = ({ featured }: Props) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <SpacedContainer styles="mb-4 md:mb-0">
        <div className="hidden md:block">
          <motion.div variants={itemVariants}>
            <TitleHeader title="Featured Product" />
          </motion.div>
        </div>
        <motion.div variants={itemVariants} className="overflow-hidden">
          <ProductCarousel products={featured} />
        </motion.div>
      </SpacedContainer>
    </motion.div>
  );
};

export default FeaturedProduct;
