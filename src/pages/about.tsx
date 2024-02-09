import { FC } from "react";
import "./../styles/about.css";

const About: FC = () => {
  return (
    <>
      <div className="about">
        <ul className="content-list">
          <li className="content-list__item">
            <h2 className="title-2">About</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus
              est ea praesentium ut dignissimos sint vero? Veniam ipsam soluta,
              velit fugiat quibusdam impedit veritatis, ab doloremque
              repudiandae eveniet dolorum voluptatibus.
            </p>
          </li>
          <li className="content-list__item">
            <h2 className="title-2">Location</h2>
            <p>Zanzibar City,Zanzibar</p>
          </li>
          <li className="content-list__item">
            <h2 className="title-2">Telegram / WhatsApp</h2>
            <p>
              <a href="tel:+255505333001">+255 (505) 333-001</a>
            </p>
          </li>
          <li className="content-list__item">
            <h2 className="title-2">Email</h2>
            <p>
              <a href="mailto:webdev@protonmail.com">webdev@protonmail.com</a>
            </p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default About;
