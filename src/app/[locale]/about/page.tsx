"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Images for the carousel with translations from locale files
const getCarouselImages = (t: (key: string) => string) => [
  {
    src: "/images/about/1_merzouga.jpg",
    alt: t("carousel.merzouga.alt"),
    caption: t("carousel.merzouga.caption"),
  },
  {
    src: "/images/about/2_on_the_edge_nyc.jpg",
    alt: t("carousel.edgenyc.alt"),
    caption: t("carousel.edgenyc.caption"),
  },
  {
    src: "/images/about/3_altopiano_marocco.jpg",
    alt: t("carousel.morocco.alt"),
    caption: t("carousel.morocco.caption"),
  },
  {
    src: "/images/about/4_EC_Helsinki2019_1600px.jpg",
    alt: t("carousel.helsinki2019.alt"),
    caption: t("carousel.helsinki2019.caption"),
  },
  {
    src: "/images/about/5_piedmont_travel.jpg",
    alt: t("carousel.piedmont.alt"),
    caption: t("carousel.piedmont.caption"),
  },
];

export default function AboutPage() {
  const t = useTranslations("about");

  // Carousel settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.h1
        className="text-4xl font-bold mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("title")}
      </motion.h1>{" "}
      {/* Introduction Section */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {" "}
        <div className="card bg-base-100 shadow-xl rounded-3xl overflow-hidden">
          <div className="card-body p-10">
            <h2 className="card-title text-2xl mb-5">
              {t("subtitle") || "About Me"}
            </h2>{" "}
            <div className="prose lg:prose-xl px-2">
              <p>{t("aboutMe.paragraph1")}</p>
              <p>{t("aboutMe.paragraph2")}</p>
              <p>{t("aboutMe.paragraph3")}</p>
              <p>{t("aboutMe.paragraph4")}</p>
            </div>
          </div>
        </div>
      </motion.section>{" "}
      {/* Photo Carousel */}
      <motion.section
        className="mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {" "}
        <div className="card bg-base-100 shadow-xl rounded-3xl overflow-hidden">
          <div className="card-body p-10">
            <h2 className="card-title text-2xl mb-5">{t("photoGallery")}</h2>{" "}
            <div className="max-w-3xl mx-auto px-2">
              <Slider {...sliderSettings}>
                {getCarouselImages(t).map((image, index) => (
                  <div key={index} className="relative px-2">
                    <div className="aspect-w-16 aspect-h-9 relative h-[400px]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    <div className="absolute bottom-0 left-2 right-2 bg-black bg-opacity-60 text-white p-4 rounded-b-lg">
                      <p className="text-center">{image.caption}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
