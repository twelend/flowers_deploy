import React from 'react'
import s from './footer.module.css'

const Footer = () => {
  return (
    <>
      <div id='contact' className={s.footer}>
        <div className={s.contacts}>
          <div className={s.contacts_containers}>
            <span className="material-symbols-outlined">
              location_on
            </span>
            <div className={s.contact_info}>
              <h3>Главный офис</h3>
              <p title='Студенческая, 42, 3-й корпус - БИ'>​Студенческая, 42, 3-й корпус - БИ</p>
              <p title='Студенческая, 42, 3-й корпус - БИ'>​Студенческая, 42, 3-й корпус - БИ</p>
            </div>
          </div>

          <div className={s.contacts_containers}>
            <span className="material-symbols-outlined">
              phone
            </span>
            <div className={s.contact_info}>
              <h3>Телефоны</h3>
              <a href="tel:+7 999 999 99 99">+7 (999) 999-99-99</a><br />
              <a href="tel:+7 999 999 99 99">+7 (999) 999-99-99</a>
            </div>
          </div>

          <div className={s.contacts_containers}>
            <span className="material-symbols-outlined">
              mail
            </span>
            <div className={s.contact_info}>
              <h3>E-mail</h3>
              <p title='ATFlowers@example.ru'>ATFlowers@example.ru</p>
              <p title='ATFlowers@example.com'>​ATFlowers@example.com</p>
            </div>
          </div>
        </div>
        <div className={s.copyright}>
          <hr />
          <p>© 2025. Все права защищены</p>
        </div>
      </div>
    </>
  )
}

export default Footer