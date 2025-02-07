import Image from "next/image";
import Img1 from "@/utils/images/user_placeholder.png";

interface AvatarProps {
  image: string;
  isLarge?: boolean;
  hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ isLarge, hasBorder, image }) => {
  return (
    <div
      className={`
      ${hasBorder ? "border-4 border-black" : ""}
      ${isLarge ? "h-32" : "h-12"}
       ${isLarge ? "w-32" : "w-12"}
       hover:opacity-90
       rounded-full
       cursor-pointer
       relative
       transition`}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        src={image || Img1}
        alt="Avatar"
      />
    </div>
  );
};

export default Avatar;
