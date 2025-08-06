import { motion } from 'framer-motion'
import { FC } from 'react'
import { Link } from 'react-router'

import { getButtonFormMenuConfig } from './getButtonFormMenuConfig'

const FormMenu: FC = () => {
  const menu = getButtonFormMenuConfig

  return (
    <>
      <h1 className="mb-10 mt-10 text-center font-inclusive text-4xl">
        Création de parcours
      </h1>
      <motion.ul
        className="flex flex-row flex-wrap gap-3 rounded-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}>
        {menu.map((item, index: number) => {
          return (
            <li
              key={index}
              className="transition-duration-500 card m-0 flex-auto bg-base-100 shadow-xl sm:max-w-[calc(50%-0.75rem)] sm:flex-[1_1_calc(50%-2*0.75rem)] md:max-w-[calc((100%/3)-0.75rem)] md:flex-[1_1_calc((100%/3)-3*0.75rem)] xl:max-w-[calc(25%-0.75rem)] xl:flex-[1_1_calc(25%-4*0.75rem)] 2xl:max-w-[calc(20%-0.75rem)] 2xl:flex-[1_1_calc(20%-5*0.75rem)]">
              <figure className="aspect-video scale-75 p-4">
                {item.image && (
                  <img src={item.image} alt={item.alt} className="h-full" />
                )}
              </figure>
              <Link
                to={{ pathname: item.route }}
                className="card-body rounded-b-xl bg-sky-50 dark:bg-sky-950">
                <p className="card-title grow-0 font-inclusive uppercase">
                  {item.title}
                </p>
                <p className="font-inclusive">{item.description}</p>
              </Link>
            </li>
          )
        })}
      </motion.ul>
    </>
  )
}

export { FormMenu }
