import React from "react";

const Item = ({ Links, title, optionalText, children }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {children && (
        <div className="flex items-center text-gray-900">{children}</div>
      )}
      {Links.map((link) => (
        <li
          key={link.name}
          className={`${
            link.optionalText ? " flex flex-row items-center gap-2" : ""
          }`}
        >
          {link.optionalText && (
            <h2 className="mb-1 text-sm text-sky-50">{link.optionalText} ·</h2>
          )}
          <a
            className="text-slate-950 hover:text-white duration-300
          text-sm cursor-pointer leading-6"
            href={link.link}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Item;
