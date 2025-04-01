"use client"

import { motion } from "framer-motion"

interface CategoryMenuProps {
  items: string[]
}

export function CategoryMenu({ items }: CategoryMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 0, y: 10 }}
      whileHover={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute left-0 top-full w-64 bg-white text-gray-800 shadow-lg z-50 hidden group-hover:block"
    >
      <ul className="py-2">
        {items.map((item, index) => (
          <li key={index} className="px-4 py-2 hover:bg-blue-50 cursor-pointer">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

