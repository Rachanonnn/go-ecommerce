"use client";
import React, { useTransition, useState, useRef } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { motion, useInView } from "framer-motion";

const TAB_DATA = [
  {
    title: "2019",
    id: "2019",
    content: (
      <div className="flex flex-row justify-start">
        <div className="mr-auto">
          <h2 className="text-lg font-semibold mb-3 justify-start font-bold">
            Lorem
          </h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla
            mi, feugiat nec pulvinar non, pulvinar a sem.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "2020",
    id: "2020",
    content: (
      <ul className="list-disc pl-2">
        <li className="mb-1 text-md font-bold">Lorems</li>
        <p className="mb-4 text-sm">
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla
          mi, feugiat nec pulvinar non, pulvinar a sem.
        </p>
        <li className="mb-1 text-md font-bold">Lorems</li>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla
          mi, feugiat nec pulvinar non, pulvinar a sem.
        </p>
      </ul>
    ),
  },
  {
    title: "2021",
    id: "2021",
    content: (
      <ul className="list-disc pl-2">
        <li>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla
          mi, feugiat nec pulvinar non, pulvinar a sem.
        </li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("2021");
  const [_, startTransition] = useTransition();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTabChange = (id: any) => {
    startTransition(() => {
      setTab(id);
    });
  };
  const currentTab = TAB_DATA.find((t) => t.id === tab);

  const aboutVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  return (
    <section className="text-black" id="about" ref={ref}>
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 mx-auto xl:w-[90%]">
        <motion.div
          variants={aboutVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ duration: 0.4 }}
          className="mx-auto xl:ml-[1rem]"
        >
          <Image
            src={"/homepage/about.jpg"}
            alt="about-image"
            className="rounded-2xl"
            width={380}
            height={380}
          />
        </motion.div>
        <motion.div
          variants={aboutVariants}
          initial="initial"
          animate={isInView ? "animate" : "initial"}
          transition={{ duration: 0.4 }}
          className="mt-4 md:mt-0 text-left flex flex-col h-full"
        >
          <h2 className="text-2xl font-bold text-black mt-4 mb-10">About Us</h2>
          <p className="text-base lg:text-md">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nulla
            mi, feugiat nec pulvinar non, pulvinar a sem. Nulla ut arcu egestas,
            aliquam mi et, venenatis quam. Cras facilisis turpis a lorem rutrum
            ullamcorper. In vitae vehicula purus, vitae porttitor nibh. Duis in
            nulla eros. Orci varius natoque penatibus et magnis dis parturient
            montes, nascetur ridiculus mus. Curabitur iaculis mattis augue, eu
            ullamcorper mi faucibus vitae. Vestibulum faucibus justo at dolor
            tempus pharetra. Duis elit velit, commodo ac justo cursus.
          </p>
          <div className="flex flex-row justify-start mt-8">
            {TAB_DATA.map((tabData) => (
              <TabButton
                key={tabData.id}
                selectTab={() => handleTabChange(tabData.id)}
                active={tab === tabData.id}
              >
                {tabData.title}
              </TabButton>
            ))}
          </div>
          <div className="mt-8">
            {currentTab ? currentTab.content : "Content not available"}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
