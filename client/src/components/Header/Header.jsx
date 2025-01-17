import React, { useEffect, useState } from 'react'
import s from './header.module.css'
import Burger from './Burger'


const Header = ({setShowHelper}) => {
    const [open, setOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false);
    const navItems = [
        {
          id: 1,
          icon: 'home',
          title: 'Главная',
          link: '/', 
        },
        {
          id: 2,
          icon: 'search',
          title: 'Поиск',
          link: '#search', 
        },
        {
          id: 3,
          icon: 'perm_phone_msg',
          title: 'Связаться с нами',
          link: '#contact', 
        },
        {
          id: 4,
          icon: 'shopping_cart',
          title: 'Нужна помощь?',
          link: '#help',
          onClick: () => setShowHelper(true)
        },
        {
          id: 5,
          icon: 'person',
          title: '',
          link: `${localStorage.getItem('token') ? '/profile' : '/login'}`,
        }
      ]
      useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
      
          if (scrollPosition >= windowHeight-70) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        };
      
        window.addEventListener('scroll', handleScroll);
      
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

  return (
    <>
        <header className={s.header}>
            <div className={s.header_container}>
                <div className={s.nav_container}>
                    <nav className={isScrolled ? s.nav + ' ' + s.scrolled_nav : s.nav}>
                        <h1>FLOWERS</h1>
                        <div className={s.nav_list}>
                            {navItems.map((item, key) => 
                              <div className={s.nav_item}>
                                <a className={s.nav_item} {...(item.onClick && { onClick: item.onClick })} key={key} href={item.link}><span className="material-symbols-outlined" style={{cursor: 'pointer'}}>{item.icon}</span> {item.title}</a>
                              </div>
                            )}
                        </div>
                        <div className={open ? s.burger_menu_active : s.burger_menu} onClick={() => setOpen(!open)}>
                            <span/>
                        </div>
                    </nav>
                    <div className={s.header_desc}>
                        <h2>Найти информацию о цветах по различным категориям легче используя поисковую строку </h2>
                    </div>
                    <div className={s.header_catalog}>
                        <div className={s.catalog_btn}>
                            <button><a href="#search">Перейти к поиску</a></button>
                        </div>
                    </div>
                </div>
            </div>
            <Burger open={open} setOpen={setOpen} title="Меню" list={navItems}/>
        </header>
    </>
  )
}

export default Header