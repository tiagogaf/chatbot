import { PropsWithChildren } from "react";

interface AppLinkProps extends PropsWithChildren {
  link: string;
}

const AppLink = ({ children, link }: AppLinkProps) => {
  return (
    <a
      className="flex items-center"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

export default AppLink;
