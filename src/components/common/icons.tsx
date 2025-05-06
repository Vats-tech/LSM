import { iconSizeMap } from "../../util/constants";

interface iconsType {
  id: string;
  classes?: string;
  width?: string;
  height?: string;
  iconSize?: string;
}

const Icons = ({ id, classes, iconSize = "small" }: iconsType) => {
  const iconWidth = (): string => {
    return iconSizeMap[iconSize].width;
  };

  const iconHeight = (): string => {
    return iconSizeMap[iconSize].height;
  };
  return (
    <svg
      data-testid={`lsm-icon-${id}`}
      width={iconWidth()}
      height={iconHeight()}
      className={classes}
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <use href={"/src/assets/icons.svg#${id}"}></use>
    </svg>
  );
};

export default Icons;
