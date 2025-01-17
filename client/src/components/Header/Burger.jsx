import React from 'react'
import s from './header.module.css'

const Burger = ({open, setOpen, title, list}) => {
  return (
    <div className={ open ? s.burger + ' ' + s.burger_active : s.burger}>
        <div className={s.burger_title}>
            {title}
        </div>
        <ul className={s.burger_list}>
            {
            list.map((item, key) => 
                <li key={key} >
                    <a style={{display: 'flex', alignItems: 'center', gap: '.5em'}} onClick={() => setOpen(false)} href={item.link}>{item.title}<span className="material-symbols-outlined">{item.icon}</span></a>
                </li>
            )
            }
        </ul>
    </div>
  )
}

export default Burger